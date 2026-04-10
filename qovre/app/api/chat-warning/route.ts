import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  // Only allow internal calls
  const origin = req.headers.get('origin')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  if (origin && !origin.startsWith(siteUrl) && !origin.startsWith('http://localhost')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let count = 0
  try {
    const body = await req.json() as { count?: number }
    count = body.count ?? 0
  } catch {
    // ignore
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'contact@qovre.nl'
  const { error } = await resend.emails.send({
    from: `Qovre System <${fromAddress}>`,
    to: process.env.ADMIN_EMAIL ?? 'contact@qovre.nl',
    subject: `⚠️ Qovre Chat: Daily limit warning (${count}/1500)`,
    text: [
      `The Qovre AI chat has reached ${count} requests today.`,
      '',
      'The chat will automatically shut down at 1,500 requests.',
      '',
      `Current date: ${new Date().toISOString().split('T')[0]}`,
    ].join('\n'),
  })

  if (error) {
    console.error('Warning email error:', error)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
