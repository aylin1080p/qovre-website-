# Current Spec

This is the current implementation spec for continuing work on Qovre after consolidation.

## Scope

- Active application root: `qovre/`
- Archived references: `project-organized/briefs/`
- Legacy reference only: `project-organized/legacy-root-app/`
- Primary visual direction: `project-organized/design-reference/mainlook.png`

Do not restart from legacy files.
Do not create a second application root.

## Stable business decisions

- Brand: `Qovre`
- Operator: `GetFromTR`
- Public base URL: `https://www.qovre.nl`
- Base location: `Den Haag`
- Service area: all Netherlands
- Public contact emails:
  - `contact@qovre.nl`
  - `info@qovre.nl`

## Public messaging constraints

Do not use:

- `Veloq`
- `hello@qovre.nl`
- founding year
- experience-year claims
- low-ticket pricing such as `EUR 799` or `EUR 1,500`

Use:

- premium, fixed-scope pricing language
- `Projects start from EUR 3,000`
- trust language without time-based claims

## Canonical data sources

Primary:

- `qovre/data/seo.ts`

Supporting:

- `qovre/messages/nl.json`
- `qovre/messages/en.json`
- `qovre/lib/metadata.ts`
- `qovre/public/llms.txt`

Public legal assets:

- `qovre/public/legal/ai_usage_policy.pdf`
- `qovre/public/legal/client_contract_template.pdf`
- `qovre/public/legal/data_processing_agreement.pdf`
- `qovre/public/legal/hosting_liability.pdf`
- `qovre/public/legal/refund_policy.pdf`
- `qovre/public/legal/service_level_agreement.pdf`

## Visual implementation rule

`mainlook.png` is a direction reference, not a literal layout to copy.

Apply:

- premium dark atmosphere
- clean section rhythm
- strong CTA hierarchy
- restrained glow
- high-trust landing-page composition

Do not fabricate:

- fake case studies
- fake selected projects
- fake portfolio data

If the visual reference suggests unsupported sections, convert them into real Qovre sections such as:

- services
- process
- FAQ
- city coverage
- trust block
- contact CTA
- legal confidence links

## Current implementation status

All phases complete as of 2026-04-09:

- build passes (TypeScript clean)
- dynamic service pages (`/[locale]/[service]`)
- dynamic city pages (`software-ontwikkeling-[city]`, `software-development-[city]`)
- chat assistant (Gemini, rate limiting, daily cap, WhatsApp button with real number)
- admin area: login page + dashboard styled dark premium
- legal PDFs in public assets — all 6 linked in footer
- consolidated project structure
- dark premium globals, nav, footer, hero (visual baseline)
- ContactForm restyled (dark inputs, grid layout, loading states)
- ContactSection (homepage) + contact page (two-column with trust block)
- TrustBar section (capability pillars + nationwide coverage)
- Process section with translations (nl/en namespace added)
- ServicesGrid link bug fixed (`/[locale]/${slug}`)
- `/services`, `/diensten` pages: seo.ts driven, properly styled
- `/about`, `/over-ons`: brand positioning + differentiators
- `/process`, `/werkwijze`: reuse Process section
- `/industries`, `/sectoren`: minimal dark placeholder
- llms.txt: service URLs corrected to match actual seo.ts slugs
- sitemap.ts: removed non-existent blog/insights URLs
- Homepage and core pages: `generateMetadata` added
- Root layout: title template + canonical description
- Mobile nav: hamburger drawer with animated 3-bar → X, all links, locale switcher, CTA
- CityLanding + ServiceDetail: dark background applied
- Brand audit complete: zero matches for Veloq, hello@qovre.nl, founding year, low-ticket pricing
- Content consistency pass: seo.ts service descriptions and city copy verified brand-compliant
- Operational code review: contact API (CSRF, rate limit, Supabase, Resend) and chat API verified correct

## Required reading order before more coding

1. `project-organized/README.md`
2. `project-organized/PROCESSING_ORDER.md`
3. `project-organized/briefs/QOVRE_MASTER_BRIEF_v2.md`
4. `project-organized/briefs/BRAND_AND_SETUP.md`
5. `project-organized/briefs/DESIGN_BRIEF.md`
6. `project-organized/briefs/IMPLEMENTATION_GUIDE.md`
7. `project-organized/design-reference/mainlook.png`
8. `qovre/package.json`
9. `qovre/data/seo.ts`
10. `qovre/messages/nl.json`
11. `qovre/messages/en.json`
12. `qovre/lib/metadata.ts`
13. `qovre/app/globals.css`
14. `qovre/components/layout/Nav.tsx`
15. `qovre/components/layout/Footer.tsx`
16. `qovre/components/sections/`
17. `qovre/app/[locale]/`
18. `qovre/public/llms.txt`
19. `qovre/public/legal/`

## SEO schema phase (completed 2026-04-10)

- Organization + LocalBusiness JSON-LD in root layout (all pages)
- WebSite JSON-LD on homepage
- Service JSON-LD on all service detail pages
- FAQPage JSON-LD on /nl/veelgestelde-vragen and /en/faq
- LocalBusiness JSON-LD on all city landing pages
- hreflang alternateLocale added to all major page pairs
- OG default image via /opengraph-image.tsx (edge runtime, 1200×630)
- FAQ pages built (20 items, accordion, CTA)
- Industries + Sectoren pages built (5 real sector cards with service links)
- Nav: FAQ link added
- Footer: FAQ + Industries/Sectoren links added
- llms.txt: full rewrite with correct slugs, all new pages, GEO positioning
- FAQ homepage section: shows first 8 items + "view all" link

## Next coding order

All current spec phases complete. Potential next work:

1. E2E smoke test in staging (contact form, chat widget, admin login)
2. Blog/Insights section (no pages yet — sitemap URLs removed)
3. Performance audit (Core Web Vitals, Lighthouse)
4. Analytics integration
5. ServiceDetail CTA copy — currently generic "Klaar om te automatiseren?"
   for all services; could be per-service

## Definition of done for the next phase

The next coding phase is complete when:

- the UI feels visually consistent with the premium dark direction
- all public facts are aligned with canonical business data
- legal assets are clearly surfaced
- routes and links are coherent
- no legacy brand or email leaks remain in active/public surfaces
