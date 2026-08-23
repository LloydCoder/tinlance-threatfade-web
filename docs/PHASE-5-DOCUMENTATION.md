# ThreatFade Web — Phase 5 Documentation Platform

Phase 5 establishes the public developer documentation system for the v0.4.0 engine.

## Scope

- Versioned MDX content under `content/docs/`.
- Canonical navigation in `config/docs.ts`.
- Server-side MDX rendering with JavaScript expressions and dangerous evaluation disabled.
- Accessible sidebar, mobile navigation, breadcrumbs and previous/next navigation.
- Copyable code blocks.
- Lightweight section search without a client-side search index.
- `TechArticle` JSON-LD for individual documentation pages.
- Sitemap inclusion for all documentation routes.
- Frontmatter and content validation tests.

## Evidence discipline

Documentation is constrained to the current ThreatFade engine repository. It explicitly distinguishes implementation from experimental/reference material and does not represent repository validation as independent assurance.

## Source of truth

Engine: https://github.com/LloydCoder/tinlance-threatfade
Web: https://github.com/LloydCoder/tinlance-threatfade-web
