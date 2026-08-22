# ThreatFade Web — Phase 1 Production Foundation

**Status:** Implemented; awaiting GitHub-hosted execution verification
**Date:** 2026-08-22

## Scope

Phase 1 establishes the production foundation without changing the ThreatFade engine architecture.

Implemented:

- Next.js 16 App Router foundation
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- shadcn-compatible component configuration
- ESLint / Next.js Core Web Vitals rules
- Prettier configuration and CI format gate
- Vitest + Testing Library setup
- Playwright E2E setup and homepage smoke test
- Zod-backed environment configuration
- Route error boundary
- Route loading state
- not-found handling
- security headers and CSP
- metadata / Open Graph foundation
- sitemap / robots / manifest
- Dependabot for npm and GitHub Actions
- CodeQL JavaScript/TypeScript analysis
- CI gates for formatting, linting, typechecking, unit tests, dependency audit, production build and E2E
- contribution and security documentation inherited from Phase 0 foundation

## Security decisions

The CSP defaults to same-origin resources and explicitly constrains frames, forms, objects, workers, connections and permissions. Development permits the minimum additional `unsafe-eval` behavior needed by local tooling; production does not.

No application secret is exposed through `NEXT_PUBLIC_*`. `THREATFADE_API_URL` is intentionally server-side configuration and is not wired into browser code during this phase.

The public playground remains a future hostile-input boundary and is not opened to arbitrary uploads in Phase 1.

## Verification gate

GitHub Actions workflow definitions are committed, but the available repository integration currently reports no workflow run/status for the latest commit. Therefore Phase 1 must not be marked fully green until GitHub executes the workflows and their results can be inspected.

Required release checks:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm audit --audit-level=high`
- `npm run build`
- `npm run test:e2e`
- CodeQL analysis

## Exit criteria

Phase 1 is fully complete only after the above checks execute successfully on GitHub and any failures are fixed and rerun.
