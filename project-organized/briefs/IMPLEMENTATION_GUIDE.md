# Qovre - Implementation Guide

This archived guide reflects the consolidated implementation reality.
The active application is `qovre/`.

## Active structure

- `qovre/app/` - routes, layouts, APIs
- `qovre/components/` - layout, sections, admin, UI
- `qovre/data/seo.ts` - canonical business data
- `qovre/messages/` - locale messaging
- `qovre/public/legal/` - public legal and policy assets
- `qovre/lib/` - metadata, animation helpers, service utilities

## Current implementation priorities

1. Keep the active app stable and buildable
2. Keep `qovre/data/seo.ts` as the single business-data source
3. Keep public messaging aligned with:
   - Qovre branding
   - GetFromTR operator language
   - Den Haag plus nationwide Netherlands positioning
   - premium fixed-scope pricing
4. Continue visual refinement using `mainlook.png` as direction, not as a pixel copy
5. Maintain route, locale, and metadata consistency
6. Surface legal assets clearly in the public UI

## Public business constraints

- No `Veloq`
- No `hello@qovre.nl`
- No founding year
- No experience-year claims
- No low-ticket pricing

## SEO and public-facts guidance

- Base URL: `https://www.qovre.nl`
- Keep llms, robots, sitemap, and metadata aligned with canonical business facts
- Use Dutch and English page pairs consistently
- Keep internal linking between services, city pages, and core informational pages healthy

## Suggested validation order

1. `npm run build`
2. route validation
3. metadata and llms validation
4. contact/chat/admin smoke checks
5. visual review against `mainlook.png`
6. legal-link presence review

## Continuation reference

For the current actionable spec, use:

- `project-organized/CURRENT_SPEC.md`
