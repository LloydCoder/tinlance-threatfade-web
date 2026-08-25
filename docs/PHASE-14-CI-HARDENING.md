# Phase 14 CI Build Stability

## Decision

The production validation workflow uses a bounded Webpack production build as its CI fallback:

```text
timeout 12m npm run build -- --webpack
```

This does not change the Vercel production build configuration. Next.js 16 uses Turbopack as its normal build path; the CI fallback isolates GitHub-runner build validation from a stalled bundler process while retaining a full production compilation check.

CI also disables telemetry, bounds npm registry fetch behavior, and retains workflow-level concurrency cancellation. The security dependency-audit job resolves a production-only lockfile graph without downloading application packages, then runs `npm audit --omit=dev`. The application CI build still installs normal lifecycle scripts so the production build remains representative.

## Regression fixed

The identity catch-all route previously exported an internal `forward` helper from a Next.js App Router route module. Next.js 16 treats unknown route-module exports as an invalid route contract during production type generation. The helper is now private (`forwardRequest`), leaving only supported HTTP handlers exported from the route module.

The regression is covered by the production build gate: Next.js route type generation must complete before E2E validation can start.

## Gates

- The CI build must complete successfully within 12 minutes before Playwright E2E validation can begin.
- A timeout is a hard failure; it is not an `continue-on-error` escape hatch.
- Dependency-audit graph resolution is production-only and bounded by a 60-second fetch timeout and two fetch retries.
- CodeQL remains independently pinned and does not require an application dependency install for JavaScript/TypeScript analysis.
