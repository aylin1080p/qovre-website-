import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { chatRateLimit } from '@/lib/rate-limit'
import { csrfAllowed, maskPII, hasPromptInjection, sanitizeAiOutput } from '@/lib/security'

const DAILY_LIMIT = 1500
const WARN_THRESHOLD = 1200

const SYSTEM_PROMPT = `Je bent de digitale assistent van Qovre — een professioneel software- en AI-automatiseringsbedrijf dat actief is door heel Nederland.

TOON & STIJL:
- Professioneel maar toegankelijk
- Kort en to-the-point (max 3-4 zinnen per antwoord)
- Geen overdreven enthousiasme, geen emoji's
- Antwoord altijd in de taal van de gebruiker (NL of EN)
- Spreek de gebruiker aan met "u" in het Nederlands

OVER QOVRE:
Qovre is een professioneel software- en AI-bureau met een ervaren team van senior developers, AI-architecten, UX-designers en projectmanagers. Wij werken voor bedrijven door heel Nederland.

DIENSTEN: Custom Software, AI & Automatisering, Content & Groei, Doorlopend Onderhoud
PRIJSMODEL: Vaste scope, vaste prijs. Projecten starten vanaf €3.000.
WERKWIJZE: 5 stappen (Discovery → Architectuur → Bouwen → Lancering → Support)
CONTACT: contact@qovre.nl | Reactietijd: binnen 1 werkdag

DOORVERWIJZINGEN:
- Project starten → /nl/contact of /en/contact
- Diensten bekijken → /nl/diensten of /en/services
- Werkwijze → /nl/werkwijze of /en/process

WAT JE NIET DOET:
- Geen exacte prijsgaranties voor specifieke projecten
- Geen beloftes over exacte deadlines
- Geen negatieve uitspraken over concurrenten
- Niet meer dan 4 zinnen tenzij de vraag echt complex is

ALS JE HET NIET WEET:
"Voor een gedetailleerd antwoord kunt u contact opnemen via contact@qovre.nl."`

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string().max(2000) })),
    })
  ).min(1).max(20),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseAny = any

async function getUsageCount(supabase: SupabaseAny): Promise<number> {
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase
    .from('chat_usage')
    .select('count')
    .eq('date', today)
    .single()
  return (data as { count: number } | null)?.count ?? 0
}

async function incrementUsage(supabase: SupabaseAny): Promise<number> {
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase.rpc('increment_chat_usage', { usage_date: today })
  return (data as number | null) ?? 0
}

export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { success } = await chatRateLimit.limit(ip)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  // 2. CSRF
  if (!csrfAllowed(req.headers.get('origin'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // 3. Daily limit
  const currentCount = await getUsageCount(supabase)
  if (currentCount >= DAILY_LIMIT) {
    return NextResponse.json({ error: 'limit_reached' }, { status: 503 })
  }

  // 4. Parse + schema validation
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = chatSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid messages format' }, { status: 422 })
  }

  const { messages } = parsed.data

  // 5. Prompt injection shield — check all user-role message parts
  const userTexts = messages
    .filter((m) => m.role === 'user')
    .flatMap((m) => m.parts.map((p) => p.text))

  if (userTexts.some(hasPromptInjection)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // 6. PII masking — redact emails/phones/cards before they reach the LLM
  const safeMessages = messages.map((m) => ({
    ...m,
    parts: m.parts.map((p) => ({ text: maskPII(p.text) })),
  }))

  // 7. Call Gemini with sanitized messages
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: safeMessages,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      }),
    }
  )

  if (!geminiRes.ok) {
    const err = await geminiRes.text()
    console.error('Gemini error:', err)
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 })
  }

  const geminiData = await geminiRes.json() as {
    candidates: Array<{ content: { parts: Array<{ text: string }> } }>
  }

  // 8. Sanitize AI output before sending to client
  const rawReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  const reply = sanitizeAiOutput(rawReply)

  // 9. Increment usage counter
  const newCount = await incrementUsage(supabase)

  // 10. Trigger warning email if threshold crossed
  if (currentCount < WARN_THRESHOLD && newCount >= WARN_THRESHOLD) {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/chat-warning`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: newCount }),
    })
  }

  return NextResponse.json({ reply })
}
