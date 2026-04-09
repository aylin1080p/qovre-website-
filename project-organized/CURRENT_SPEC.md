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

Already in place:

- build passes
- dynamic service pages
- dynamic city pages
- chat assistant
- admin area
- legal PDFs in public assets
- consolidated project structure

Still needs structured refinement:

- full visual polish against `mainlook.png`
- public legal/policy discoverability in UI
- metadata and public-facts cross-check
- route/link validation across locale and dynamic pages
- final consistency review of business facts in UI copy

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

## Next coding order

1. Visual polish
   - refine globals, nav, footer, hero, cards, CTA rhythm
   - stay faithful to the atmosphere of `mainlook.png`
   - do not introduce unsupported content sections

2. Legal and policy integration
   - make legal assets clearly reachable from public UI
   - confirm footer and contact-related surfaces expose the right links

3. Content consistency pass
   - verify homepage, services, service detail, city pages, about, process, industries, contact
   - keep all copy aligned with `qovre/data/seo.ts`

4. Route and link validation
   - validate locale routing
   - validate service links
   - validate city links
   - validate footer/nav links

5. Metadata and public facts validation
   - check `llms.txt`
   - check sitemap and robots
   - check page metadata against canonical facts

6. Operational smoke checks
   - contact form
   - chat widget
   - admin login/dashboard

## Definition of done for the next phase

The next coding phase is complete when:

- the UI feels visually consistent with the premium dark direction
- all public facts are aligned with canonical business data
- legal assets are clearly surfaced
- routes and links are coherent
- no legacy brand or email leaks remain in active/public surfaces
