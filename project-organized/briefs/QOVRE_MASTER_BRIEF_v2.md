# QOVRE - Master Brief v2

This file is the archived high-level brief for the consolidated Qovre project.
It has been aligned to the active application and should be read together with:

- `project-organized/design-reference/mainlook.png`
- `project-organized/PROCESSING_ORDER.md`
- `project-organized/CURRENT_SPEC.md`

## Project status

- Active application root: `qovre/`
- Brand: `Qovre`
- Operator: `GetFromTR`
- Live base URL: `https://www.qovre.nl`
- Primary market: businesses across the Netherlands
- Base location: Den Haag
- Languages: Dutch (`/nl`) and English (`/en`)

## Current business rules

- Use only `contact@qovre.nl` and `info@qovre.nl`
- Do not show founding year
- Do not show experience-year claims
- Do not use low-ticket pricing like `EUR 799` or `EUR 1,500`
- Public pricing language should stay fixed-scope and premium
- Safe pricing baseline: `Projects start from EUR 3,000`

## Visual direction

- Primary visual direction: `mainlook.png`
- Treat it as a mood and composition reference, not a pixel-perfect layout to copy
- If the image shows sections that the product does not have data for, adapt the structure to real content instead of inventing fake material
- Prefer premium dark presentation, clear CTA hierarchy, restrained glow, clean spacing, and service-led trust sections

## Active product areas

- Homepage
- Services overview pages
- Dynamic service detail pages
- City landing pages
- About / Process / Industries / Contact pages
- Contact form
- Chat assistant
- Admin area
- Public legal assets

## Canonical content source

The canonical business-data source for active development is:

- `qovre/data/seo.ts`

This file should remain the single source of truth for:

- brand and operator facts
- services
- cities
- pricing language
- FAQs
- trust copy
- public business facts used by SEO, schema, and llms content

## Legal and policy scope

The following legal assets are part of the active public system and must not be ignored:

- `qovre/public/legal/ai_usage_policy.pdf`
- `qovre/public/legal/client_contract_template.pdf`
- `qovre/public/legal/data_processing_agreement.pdf`
- `qovre/public/legal/hosting_liability.pdf`
- `qovre/public/legal/refund_policy.pdf`
- `qovre/public/legal/service_level_agreement.pdf`

## Technical status

- The active app builds successfully
- The active route tree is in `qovre/app/`
- Legacy root-app files are archived under `project-organized/legacy-root-app/`
- Archived material should only be used as reference, not as an active implementation source

## What this file is for

Use this file to understand the stable business direction.
For implementation sequencing and next coding priorities, use:

- `project-organized/PROCESSING_ORDER.md`
- `project-organized/CURRENT_SPEC.md`
