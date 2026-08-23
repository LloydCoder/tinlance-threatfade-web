# Phase 6 — Interactive Playground

Status: **complete and merged**

## Scope

Phase 6 established `/playground` as a safe, curated ThreatFade demonstration. The public experience uses known scenarios rather than accepting arbitrary PCAPs or arbitrary commands.

## Security boundary

The playground is intentionally separated from the production detection engine. Public scenario selection is constrained to a finite allowlist and the demonstration path does not provide a general-purpose file-processing or code-execution interface.

The implementation is designed around hostile input: bounded request payloads, schema validation, request limits, rate limiting, restrictive response behavior, explicit error handling, and no direct production-engine execution from the browser.

## Evidence policy

Playground visualizations are clearly identified as curated/sample demonstrations. They must not be represented as a live detection result, customer telemetry, or independent benchmark.

The visual pipeline mirrors the documented ThreatFade model:

`traffic → signal extraction → behavioral analysis → deviation → detection → evidence → confidence → ATT&CK → timeline`

## Verification

Phase 6 was verified through the repository's formatting, lint, TypeScript, unit-test, dependency-audit, production-build, Playwright and E2E gates, plus the repository Security and CodeQL workflows.

## Operational boundary

Arbitrary PCAP processing, unrestricted uploads, or direct public access to the production detection backend require a separate security review covering isolation, resource quotas, content validation, timeouts, observability, and abuse controls. Phase 6 does not claim those capabilities.
