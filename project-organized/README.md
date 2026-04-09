## Workspace Map

This workspace is organized around one active application:

- Active app: `qovre/`

Everything else under `project-organized/` is reference, archive, or supporting material.

### Folders

- `briefs/`
  - Planning and strategy documents that define brand, design, SEO, and rollout intent.
- `design-reference/`
  - Visual references for the brand direction.
  - Primary visual reference: `mainlook.png`
- `legacy-root-app/`
  - The old root-level Next.js app and config files that should not be used as the active product anymore.
  - Keep for reference and content extraction only.
- `tooling/`
  - Non-product tooling and ecosystem files that are not part of the live Qovre site.

### Working Rule

If a change affects the live website, make it inside `qovre/` unless a migration task explicitly says otherwise.
