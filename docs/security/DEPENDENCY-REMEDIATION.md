# Dependency Remediation and Residual Risk

**Reviewed:** 2026-10-09  
**Scope:** production dependencies and the current Next.js/ESLint toolchain

## Verified production dependency gate

The remediation workflow runs:

```bash
npm audit --omit=dev --audit-level=high
```

This is the release-blocking dependency gate for shipped production packages. The remediation workflow passed this gate after regenerating the lockfile and then ran formatting, lint, type checking, unit tests, documentation/truth checks, growth checks, and a production build.

## Residual development-toolchain advisory

The full development dependency graph still reports the high-severity `braces` advisory through the Next.js ESLint tooling chain. The upstream advisory currently has no patched release for the affected dependency path. This is **not** represented as fully remediated.

The team must continue to:
- Keep the residual advisory visible in dependency-risk records.
- Re-check the advisory and transitive dependency path during scheduled dependency reviews.
- Remove or replace the affected development-toolchain dependency when a reviewed fix is available.
- Avoid claiming that the entire development dependency graph is vulnerability-free based solely on the production-only audit.

## Release decision

A production audit pass is necessary but not sufficient for release. Formatting, lint, type checking, tests, documentation/truth checks, growth validation, build, security workflows, and the integration contract gates must also pass. The production-only audit scope must remain explicit in release notes and evidence.
