import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { onboardingRateLimit } from '@/lib/rate-limit'
import { csrfAllowed, validateFileBase64 } from '@/lib/security'
import { createServiceClient } from '@/lib/supabase'

// ---------------------------------------------------------------------------
// Zod schema — mirrors lib/onboarding-types.ts FormState
// ---------------------------------------------------------------------------
const schema = z.object({
  locale: z.string().default('nl'),
  // Step 1
  category: z.enum(['web', 'saas', 'ai']),
  // Step 2 — Web
  webTypes: z.array(z.enum(['website', 'webshop', 'leadgen'])).optional().default([]),
  cmsNeeded: z.boolean().nullable().optional(),
  integrations: z.array(z.enum(['crm', 'calendar', 'payment', 'analytics'])).optional().default([]),
  pageCount: z.enum(['small', 'medium', 'large']).nullable().optional(),
  // Step 2 — SaaS
  userRoles: z.array(z.string().max(50)).optional().default([]),
  complexity: z.enum(['mvp', 'standard', 'enterprise']).nullable().optional(),
  aiFunctions: z.array(z.enum(['analysis', 'bot', 'automation'])).optional().default([]),
  dataMigration: z.boolean().nullable().optional(),
  // Step 2 — AI
  automationTypes: z.array(z.enum(['chatbot', 'data_pipeline', 'document_ai', 'workflow'])).optional().default([]),
  dataSources: z.array(z.enum(['crm', 'email', 'database', 'api', 'files'])).optional().default([]),
  hasExistingAi: z.boolean().nullable().optional(),
  // Step 3 — Infrastructure
  trafficLevel: z.enum(['low', 'medium', 'high', 'enterprise']).nullable().optional(),
  securityLevel: z.enum(['standard', 'advanced', 'enterprise']).nullable().optional(),
  scalability: z.enum(['fixed', 'moderate', 'high']).nullable().optional(),
  hosting: z.enum(['qovre', 'own']).nullable().optional(),
  slaLevel: z.enum(['essential', 'growth', 'partner']).nullable().optional(),
  // Step 4 — Contact
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  competitorUrl: z.union([z.string().url(), z.literal('')]).optional(),
  fileName: z.string().max(200).optional(),
  fileBase64: z.string().max(15_000_000).nullable().optional(),
})

type FormData = z.infer<typeof schema>

// ---------------------------------------------------------------------------
// Label maps
// ---------------------------------------------------------------------------
const CATEGORY_LABELS: Record<string, string> = {
  web: 'Professional Web',
  saas: 'Scalable SaaS',
  ai: 'AI & Automation',
}

const SLA_LABELS: Record<string, string> = {
  essential: 'Essential',
  growth: 'Growth',
  partner: 'Partner',
}

const TRAFFIC_LABELS: Record<string, string> = {
  low: '< 1K bezoekers/mnd',
  medium: '1K–10K bezoekers/mnd',
  high: '10K–100K bezoekers/mnd',
  enterprise: '100K+ bezoekers/mnd',
}

const SECURITY_LABELS: Record<string, string> = {
  standard: 'Standaard',
  advanced: 'Geavanceerd',
  enterprise: 'Enterprise',
}

const SCALABILITY_LABELS: Record<string, string> = {
  fixed: 'Vaste capaciteit',
  moderate: 'Matige groei',
  high: 'Hoge schaalbaarheid',
}

function bool(v: boolean | null | undefined, locale: string) {
  if (locale === 'en') return v === true ? 'Yes' : v === false ? 'No' : '-'
  return v === true ? 'Ja' : v === false ? 'Nee' : '-'
}

// ---------------------------------------------------------------------------
// Customer confirmation email (locale-aware)
// ---------------------------------------------------------------------------
function formatCustomerEmail(d: FormData): { subject: string; text: string } {
  const isEN = d.locale === 'en'
  const category = CATEGORY_LABELS[d.category] ?? d.category
  const sla = d.slaLevel ? SLA_LABELS[d.slaLevel] : null

  if (isEN) {
    const subject = `Your project request has been received — ${category}`
    const text = [
      `Hi ${d.name},`,
      '',
      `Thank you for your request. We've received your ${category} project enquiry${sla ? ` with the ${sla} SLA package` : ''}.`,
      '',
      'What happens next:',
      '  1. We analyse your technical scope and infrastructure requirements',
      '  2. We prepare your strategic roadmap and infrastructure analysis',
      '  3. We reach out via the email address you provided',
      '',
      d.company ? `Company: ${d.company}` : '',
      `Category: ${category}`,
      sla ? `SLA package: ${sla}` : '',
      '',
      'If you have urgent questions, reply to this email or reach us at contact@qovre.nl.',
      '',
      'Kind regards,',
      'Qovre',
      'contact@qovre.nl',
    ].filter(Boolean).join('\n')
    return { subject, text }
  }

  const subject = `Uw projectaanvraag is ontvangen — ${category}`
  const text = [
    `Hoi ${d.name},`,
    '',
    `Bedankt voor uw aanvraag. We hebben uw ${category}-aanvraag${sla ? ` met het ${sla}-pakket` : ''} goed ontvangen.`,
    '',
    'Wat er nu gebeurt:',
    '  1. Wij analyseren uw technische scope en infrastructuurwensen',
    '  2. Uw strategische routekaart en infrastructuuranalyse worden opgesteld',
    '  3. Wij nemen contact op via het opgegeven e-mailadres',
    '',
    d.company ? `Bedrijf: ${d.company}` : '',
    `Categorie: ${category}`,
    sla ? `SLA-pakket: ${sla}` : '',
    '',
    'Heeft u urgente vragen? Beantwoord dan deze e-mail of neem contact op via contact@qovre.nl.',
    '',
    'Met vriendelijke groet,',
    'Qovre',
    'contact@qovre.nl',
  ].filter(Boolean).join('\n')
  return { subject, text }
}

// ---------------------------------------------------------------------------
// Admin technical analysis email
// ---------------------------------------------------------------------------
function formatAdminEmail(d: FormData): string {
  const category = CATEGORY_LABELS[d.category] ?? d.category
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qovre.nl'}/admin/dashboard`

  const lines = [
    'NIEUWE VIP PROJECTAANVRAAG',
    '==========================',
    `Categorie: ${category}`,
    `Tijdstip:  ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}`,
    '',
    '── CONTACTGEGEVENS ──────────────────────────',
    `Naam:     ${d.name}`,
    `E-mail:   ${d.email}`,
    `Bedrijf:  ${d.company || '-'}`,
    d.competitorUrl ? `Ref. URL: ${d.competitorUrl}` : '',
    '',
    '── SERVICE DETAILS ──────────────────────────',
  ]

  if (d.category === 'web') {
    lines.push(`Web types:      ${d.webTypes?.join(', ') || '-'}`)
    lines.push(`Pagina's:       ${d.pageCount ?? '-'}`)
    lines.push(`CMS nodig:      ${bool(d.cmsNeeded, 'nl')}`)
    lines.push(`Integraties:    ${d.integrations?.join(', ') || '-'}`)
  } else if (d.category === 'saas') {
    lines.push(`Gebruikersrollen: ${d.userRoles?.join(', ') || '-'}`)
    lines.push(`Complexiteit:     ${d.complexity ?? '-'}`)
    lines.push(`AI-functies:      ${d.aiFunctions?.join(', ') || '-'}`)
    lines.push(`Data-migratie:    ${bool(d.dataMigration, 'nl')}`)
  } else if (d.category === 'ai') {
    lines.push(`Automatiseringstypen: ${d.automationTypes?.join(', ') || '-'}`)
    lines.push(`Databronnen:          ${d.dataSources?.join(', ') || '-'}`)
    lines.push(`Bestaande AI:         ${bool(d.hasExistingAi, 'nl')}`)
  }

  lines.push('')
  lines.push('── INFRASTRUCTUUR & SLA ────────────────────')
  lines.push(`SLA-pakket:    ${d.slaLevel ? SLA_LABELS[d.slaLevel] : '-'}`)
  lines.push(`Hosting:       ${d.hosting === 'qovre' ? 'Qovre Managed' : d.hosting === 'own' ? 'Eigen hosting' : '-'}`)
  lines.push(`Traffic:       ${d.trafficLevel ? TRAFFIC_LABELS[d.trafficLevel] : '-'}`)
  lines.push(`Beveiliging:   ${d.securityLevel ? SECURITY_LABELS[d.securityLevel] : '-'}`)
  lines.push(`Schaalbaarheid: ${d.scalability ? SCALABILITY_LABELS[d.scalability] : '-'}`)

  if (d.fileName) {
    lines.push('')
    lines.push('── BIJLAGE ──────────────────────────────────')
    lines.push(`Bestandsnaam: ${d.fileName}`)
  }

  lines.push('')
  lines.push('── DASHBOARD ────────────────────────────────')
  lines.push(`Bekijk aanvraag: ${dashboardUrl}`)

  return lines.filter(l => l !== undefined).join('\n')
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
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

  // File type guard: only PDF, JPEG, PNG (magic-byte check)
  if (data.fileBase64) {
    const { valid } = validateFileBase64(data.fileBase64)
    if (!valid) {
      return NextResponse.json(
        { error: 'Unsupported file type. Only PDF, JPG, and PNG are allowed.' },
        { status: 422 }
      )
    }
  }

  // ---------------------------------------------------------------------------
  // 1. Persist to Supabase
  // ---------------------------------------------------------------------------
  try {
    const serviceClient = createServiceClient()
    const { error: dbError } = await serviceClient.from('onboarding_submissions').insert({
      category: data.category,
      status: 'new',
      sla_level: data.slaLevel ?? null,
      hosting: data.hosting ?? null,
      traffic_level: data.trafficLevel ?? null,
      security_level: data.securityLevel ?? null,
      scalability: data.scalability ?? null,
      name: data.name,
      email: data.email,
      company: data.company || null,
      file_name: data.fileName || null,
      payload: data,
    })
    if (dbError) console.error('Supabase insert error:', dbError)
  } catch (err) {
    console.error('Supabase client error:', err)
  }

  // ---------------------------------------------------------------------------
  // 2. Send emails
  // ---------------------------------------------------------------------------
  const resend = new Resend(process.env.RESEND_API_KEY?.trim())
  const from = process.env.RESEND_FROM_EMAIL?.trim() ?? 'contact@qovre.nl'
  const adminTo = process.env.ADMIN_EMAIL?.trim() ?? '4ylingunes@gmail.com'

  const attachments =
    data.fileBase64 && data.fileName
      ? [{ filename: data.fileName, content: data.fileBase64.split(',').pop() ?? '' }]
      : []

  // Admin email (with attachment)
  const adminEmailText = formatAdminEmail(data)
  const { error: adminEmailError } = await resend.emails.send({
    from: `Qovre Onboarding <${from}>`,
    to: adminTo,
    subject: `VIP Aanvraag: ${data.name} — ${CATEGORY_LABELS[data.category]}`,
    text: adminEmailText,
    ...(attachments.length > 0 && { attachments }),
  })
  if (adminEmailError) console.error('Resend admin email error:', adminEmailError)

  // Customer confirmation email
  const { subject: customerSubject, text: customerText } = formatCustomerEmail(data)
  const { error: customerEmailError } = await resend.emails.send({
    from: `Qovre <${from}>`,
    to: data.email,
    subject: customerSubject,
    text: customerText,
  })
  if (customerEmailError) console.error('Resend customer email error:', customerEmailError)

  return NextResponse.json({ success: true })
}
