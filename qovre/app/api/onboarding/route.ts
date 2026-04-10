import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { onboardingRateLimit } from '@/lib/rate-limit'
import { csrfAllowed, validateFileBase64 } from '@/lib/security'

const schema = z.object({
  category: z.enum(['visitekaart', 'portfolio', 'leadgen', 'saas']),
  // Step 2 — Visitekaart
  nfcIntegration: z.boolean().nullable().optional(),
  ctaType: z.enum(['whatsapp', 'call', 'form']).nullable().optional(),
  // Step 2 — Portfolio
  contentTypes: z.array(z.enum(['video', 'photo', 'pdf'])).optional(),
  filtering: z.boolean().nullable().optional(),
  cmsNeeded: z.boolean().nullable().optional(),
  // Step 2 — Lead Gen
  calendarIntegration: z.boolean().nullable().optional(),
  crmType: z.enum(['hubspot', 'salesforce', 'other', 'none']).nullable().optional(),
  formSteps: z.number().int().min(1).max(10).optional(),
  // Step 2 — SaaS
  userRoles: z.array(z.string().max(50)).optional(),
  aiFunctions: z.array(z.enum(['analysis', 'bot', 'automation'])).optional(),
  dataMigration: z.boolean().nullable().optional(),
  // Step 3
  competitorUrl: z.union([z.string().url(), z.literal('')]).optional(),
  hosting: z.enum(['qovre', 'own']).nullable().optional(),
  monthlyMaintenance: z.boolean().optional(),
  // Step 4
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  fileName: z.string().max(200).optional(),
  fileBase64: z.string().max(15_000_000).nullable().optional(), // ~10MB base64
})

type Submission = z.infer<typeof schema>

const CATEGORY_LABELS: Record<string, string> = {
  visitekaart: 'De Digitale Visitekaart',
  portfolio: 'Showcase & Portfolio',
  leadgen: 'Conversion & Lead Gen',
  saas: 'Custom SaaS / Platform',
}

function bool(v: boolean | null | undefined) {
  return v === true ? 'Ja' : v === false ? 'Nee' : '-'
}

function formatEmail(d: Submission): string {
  const lines = [
    `NIEUWE PROJECTAANVRAAG`,
    `======================`,
    `Categorie: ${CATEGORY_LABELS[d.category] ?? d.category}`,
    '',
  ]

  if (d.category === 'visitekaart') {
    lines.push('VISITEKAART DETAILS')
    lines.push(`NFC-integratie: ${bool(d.nfcIntegration)}`)
    lines.push(`Hoofd CTA: ${d.ctaType ?? '-'}`)
  } else if (d.category === 'portfolio') {
    lines.push('PORTFOLIO DETAILS')
    lines.push(`Content types: ${(d.contentTypes ?? []).join(', ') || '-'}`)
    lines.push(`Filteroptie: ${bool(d.filtering)}`)
    lines.push(`CMS nodig: ${bool(d.cmsNeeded)}`)
  } else if (d.category === 'leadgen') {
    lines.push('LEAD GEN DETAILS')
    lines.push(`Kalenderintegratie: ${bool(d.calendarIntegration)}`)
    lines.push(`CRM: ${d.crmType ?? '-'}`)
    lines.push(`Formulierstappen: ${d.formSteps ?? '-'}`)
  } else if (d.category === 'saas') {
    lines.push('SAAS DETAILS')
    lines.push(`Gebruikersrollen: ${(d.userRoles ?? []).join(', ') || '-'}`)
    lines.push(`AI-functies: ${(d.aiFunctions ?? []).join(', ') || '-'}`)
    lines.push(`Data-migratie: ${bool(d.dataMigration)}`)
  }

  lines.push('')
  lines.push('CONTEXT & INFRASTRUCTUUR')
  lines.push(`Concurrent URL: ${d.competitorUrl || '-'}`)
  lines.push(`Hosting: ${d.hosting ?? '-'}`)
  lines.push(`Maandelijks onderhoud: ${bool(d.monthlyMaintenance)}`)

  lines.push('')
  lines.push('CONTACTGEGEVENS')
  lines.push(`Naam: ${d.name}`)
  lines.push(`E-mail: ${d.email}`)
  lines.push(`Bedrijf: ${d.company || '-'}`)
  if (d.fileName) lines.push(`Bijlage: ${d.fileName}`)

  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { success } = await onboardingRateLimit.limit(ip)
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  if (!csrfAllowed(req.headers.get('origin'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 422 })
  }

  const data = parsed.data

  // File type guard: only PDF, JPEG, PNG allowed (magic-byte check)
  if (data.fileBase64) {
    const { valid } = validateFileBase64(data.fileBase64)
    if (!valid) {
      return NextResponse.json({ error: 'Unsupported file type. Only PDF, JPG, and PNG are allowed.' }, { status: 422 })
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY?.trim())
  const from = process.env.RESEND_FROM_EMAIL?.trim() ?? 'contact@qovre.nl'
  const to = process.env.ADMIN_EMAIL?.trim() ?? 'contact@qovre.nl'

  // Strip data URL prefix from base64 before attaching
  const attachments =
    data.fileBase64 && data.fileName
      ? [{ filename: data.fileName, content: data.fileBase64.split(',').pop() ?? '' }]
      : []

  const { error } = await resend.emails.send({
    from: `Qovre Onboarding <${from}>`,
    to,
    subject: `Projectaanvraag: ${data.name} — ${CATEGORY_LABELS[data.category]}`,
    text: formatEmail(data),
    ...(attachments.length > 0 && { attachments }),
  })

  if (error) console.error('Resend onboarding error:', error)

  return NextResponse.json({ success: true })
}
