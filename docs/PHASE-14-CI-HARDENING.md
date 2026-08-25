# Phase 14 CI Build Stability

## Decision

The production validation workflow uses a bounded Webpack production build as its CI fallback:

```text
timeout 12m npm run build -- --webpack
```

This does not change the Vercel production build configuration. Next.js 16 uses Turbopack as its normal build path; the CI fallback isolates GitHub-runner build validation from a stalled bundler process while retaining a full production compilation check.

The workflow also disables telemetry in CI and retains the existing workflow-level concurrency cancellation.

## Gate

The CI build must complete successfully within 12 minutes before Playwright E2E validation can begin. A timeout is treated as a failure; it is not an `continue-on-error` escape hatch.
