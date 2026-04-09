import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { contactRateLimit } from '@/lib/rate-limit'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  message: z.string().min(1, 'Message is required').max(1000),
  locale: z.enum(['nl', 'en']).default('nl'),
  _honeypot: z.string().max(0, 'Bot detected').optional(),
})

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { success } = await contactRateLimit.limit(ip)
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // CSRF check
  const origin = req.headers.get('origin')
  const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.qovre.nl').trim()
  
  // Normalize both by removing trailing slashes
  const normalizedOrigin = origin ? origin.replace(/\/$/, '') : null;
  const normalizedSite = rawSiteUrl.replace(/\/$/, '');
  
  const isAllowedOrigin = !normalizedOrigin || 
    normalizedOrigin.startsWith('http://localhost') || 
    normalizedOrigin === normalizedSite || 
    normalizedOrigin === normalizedSite.replace('://www.', '://') ||
    normalizedOrigin === normalizedSite.replace('://', '://www.')

  if (!isAllowedOrigin) {
    console.error(`CSRF Blocked. Origin: "${normalizedOrigin}", Expected: "${normalizedSite}"`)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 422 }
    )
  }

  const { name, email, company, message, locale } = parsed.data

  // Save to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
  )

  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert({ name, email, company: company ?? null, message, locale })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // Send email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY?.trim())

  const fromAddress = process.env.RESEND_FROM_EMAIL?.trim() ?? 'onboarding@resend.dev'
  const { error: emailError } = await resend.emails.send({
    from: `Qovre <${fromAddress}>`,
    to: (process.env.ADMIN_EMAIL?.trim() ?? 'contact@qovre.nl'),
    subject: `New contact form submission from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company ?? '-'}`,
      `Locale: ${locale}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    // Don't fail — DB write succeeded
  }

  return NextResponse.json({ success: true })
}
