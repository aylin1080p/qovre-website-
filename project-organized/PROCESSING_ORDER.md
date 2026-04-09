# Processing Order

This file defines the current working order for the Qovre cleanup and build-out.

## Active Scope

- Work in: `qovre/`
- Use as visual direction: `project-organized/design-reference/mainlook.png`
- Use as planning reference: `project-organized/briefs/`
- Use only as legacy reference: `project-organized/legacy-root-app/`

## Processing Sequence

1. Stabilize the active app
   - Make `qovre/` build successfully.
   - Fix missing dependencies, broken imports, and route mismatches first.

2. Canonicalize business data
   - Make `qovre/data/seo.ts` the single source of truth for brand, services, cities, pricing language, contact info, legal/operator language, and FAQ data.
   - Remove conflicting facts from other active files after their useful content is merged.

3. Finish brand cleanup
   - Remove all remaining `Veloq` references from active and public-facing files.
   - Remove `hello@qovre.nl` everywhere.
   - Keep only `contact@qovre.nl` and `info@qovre.nl`.
   - Remove founding year and experience-year claims from active/public text.

4. Align the visual system
   - Update `qovre/app/globals.css`, layout, nav, footer, and key sections to follow the atmosphere of `mainlook.png`.
   - Do not copy the image literally.
   - Adapt the theme to the real Qovre content model.

5. Validate page architecture
   - Homepage
   - Services list pages
   - Service detail pages
   - City landing pages
   - Process, About, Contact, FAQ
   - Confirm that routes, links, and data all match.

6. Validate operational features
   - Contact form
   - Chat widget
   - Admin area
   - Legal asset availability in `qovre/public/legal/`

7. Reconcile metadata and public facts
   - `llms.txt`
   - sitemap
   - robots
   - metadata/schema content
   - locale messaging

8. Cleanup remaining duplicates
   - Only after steps 1-7 are complete.
   - If information from `project-organized/legacy-root-app/` has been fully merged, keep it archived and stop using it.
   - Do not reintroduce root-level duplicate app files.

## Current Priority

The next practical step is:

- `qovre/` build stabilization

Reason:

- The active app currently contains new UI components and routes, but build validity must come before any deeper consolidation or styling pass.
