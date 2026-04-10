// ──────────────────────────────────────────────────────────────────────────────
// Shared security utilities
// ──────────────────────────────────────────────────────────────────────────────

// CSRF: same-origin check shared across all API routes
export function csrfAllowed(origin: string | null): boolean {
  if (!origin) return true // server-to-server calls have no Origin header
  const o = origin.replace(/\/$/, '')
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.qovre.nl').trim().replace(/\/$/, '')
  return (
    o.startsWith('http://localhost') ||
    o === site ||
    o === site.replace('://www.', '://') ||
    o === site.replace('://', '://www.')
  )
}

// ── PII masking ───────────────────────────────────────────────────────────────
const PII_PATTERNS: [RegExp, string][] = [
  [/\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g, '[EMAIL]'],
  [/(\+31|0031|\b0)[.\- ]?(\d[.\- ]?){9}/g, '[PHONE]'],
  [/\+\d{1,3}[.\- ]?(\(?\d\)?[.\- ]?){7,14}/g, '[PHONE]'],
  [/\b(?:\d[ \-]?){13,16}\b/g, '[CARD]'],
]

export function maskPII(text: string): string {
  return PII_PATTERNS.reduce((t, [re, mask]) => t.replace(re, mask), text)
}

// ── AI output sanitization ────────────────────────────────────────────────────
export function sanitizeAiOutput(text: string): string {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/\bon\w+\s*=/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .trim()
}

// ── Prompt injection detection ────────────────────────────────────────────────
const INJECTION_RES = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/i,
  /system\s+prompt/i,
  /\bpretend\s+(you\s+(are|were)|to\s+be)\b/i,
  /\bact\s+as\b.{0,40}(gpt|claude|gemini|llm|\bai\b)/i,
  /jailbreak/i,
  /\bDAN\b/,
  /bypass\s+(your\s+)?(restrictions?|guidelines?|rules?|safety)/i,
  /reveal\s+(your\s+)?(system|prompt|instructions?|training)/i,
  /forget\s+(all\s+)?(previous|prior)\s+/i,
  /new\s+conversation\s+start/i,
]

export function hasPromptInjection(text: string): boolean {
  return INJECTION_RES.some((re) => re.test(text))
}

// ── File type validation via magic bytes ──────────────────────────────────────
// PDF  : %PDF  → base64 prefix: JVBE
// JPEG : FF D8 FF → base64 prefix: /9j/
// PNG  : \x89PNG → base64 prefix: iVBOR
export function validateFileBase64(input: string): { valid: boolean; ext?: string } {
  // Strip data URL prefix (data:<mime>;base64,<data>) if present
  const b64 = input.includes(',') ? input.split(',').slice(1).join(',') : input
  if (!b64) return { valid: false }
  if (b64.startsWith('JVBE')) return { valid: true, ext: 'pdf' }
  if (b64.startsWith('/9j/')) return { valid: true, ext: 'jpg' }
  if (b64.startsWith('iVBOR')) return { valid: true, ext: 'png' }
  return { valid: false }
}
