# Qovre - Brand and Setup

This archived reference summarizes the final brand and setup decisions for the current Qovre system.

## Brand

- Brand name: `Qovre`
- Operator / legal umbrella: `GetFromTR`
- Positioning: premium digital studio for businesses in the Netherlands
- Location language: based in Den Haag, serving clients across the Netherlands

## Domains

- Primary live website: `https://www.qovre.nl`
- Keep redirects and supporting domains secondary to the main `www.qovre.nl` destination

## Contact rules

Only these addresses should be used in public-facing materials:

- `contact@qovre.nl`
- `info@qovre.nl`

Do not use:

- `hello@qovre.nl`

## Messaging constraints

- Do not mention a founding year
- Do not mention experience-year counts
- Use trust language without time-based claims
- Prefer wording such as:
  - experienced team
  - senior specialists
  - structured delivery
  - trusted execution

## Pricing language

- Maintain a premium, fixed-scope positioning
- Do not use low-ticket package pricing
- Safe public pricing line:
  - `Projects start from EUR 3,000`

## Hosting and deployment

- Active application root: `qovre/`
- Current production domain: `https://www.qovre.nl`
- Active deployment target: Vercel

## Legal assets

The public legal and policy files live in:

- `qovre/public/legal/`

These files are part of the active system and should be linked or surfaced where appropriate:

- `ai_usage_policy.pdf`
- `client_contract_template.pdf`
- `data_processing_agreement.pdf`
- `hosting_liability.pdf`
- `refund_policy.pdf`
- `service_level_agreement.pdf`

## Source-of-truth guidance

- Active business truth: `qovre/data/seo.ts`
- Active UI locale copy: `qovre/messages/nl.json`, `qovre/messages/en.json`
- Active implementation plan: `project-organized/CURRENT_SPEC.md`
