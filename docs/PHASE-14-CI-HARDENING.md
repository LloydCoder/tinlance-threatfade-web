# Phase 14 CI Build Stability

## Decision

The production validation workflow uses a bounded Webpack production build as its CI fallback:

```text
timeout 12m npm run build -- --webpack
```

This does not change the Vercel production build configuration. Next.js 16 uses Turbopack as its normal build path; the CI fallback isolates GitHub-runner build validation from a stalled bundler process while retaining a full production compilation check.

CI also disables telemetry, bounds npm registry fetch behavior, and retains workflow-level concurrency cancellation. The security dependency-audit job installs with lifecycle scripts disabled because dependency installation is only an audit prerequisite; the application CI build still installs normal lifecycle scripts so the production build remains representative.

## Gates

- The CI build must complete successfully within 12 minutes before Playwright E2E validation can begin.
- A timeout is a hard failure; it is not an `continue-on-error` escape hatch.
- Dependency-audit installs are bounded by a 60-second fetch timeout and two fetch retries.
- CodeQL remains independently pinned and does not require an application dependency install for JavaScript/TypeScript analysis.
