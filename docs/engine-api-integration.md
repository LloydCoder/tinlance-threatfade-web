# ThreatFade engine/API integration

The web repository treats `LloydCoder/tinlance-threatfade` as the source of truth for engine capabilities and API contracts.

## Verified engine baseline

The current engine README identifies ThreatFade as **v0.4.0 — enterprise engineering baseline**. It exposes `/health`, `/ready` and `/version`, plus authenticated detection endpoints including `/detect`, `/detect/pcap`, `/detect/scenario` and `/detections`.

The documented detection response contains detection state, confidence, score, entropy, drop ratio, z-outlier, fade start, matched-rule count, ATT&CK identifier and structured evidence, with optional ML fields.

## Web integration boundary

`lib/api/client.ts` is a server-side integration boundary. UI components must not construct engine URLs or call the engine directly.

The client:

- validates configuration with Zod;
- permits HTTPS only for non-local engine URLs;
- uses code-owned endpoint paths rather than user-supplied URLs;
- disables redirects to prevent redirect-based SSRF bypasses;
- uses `credentials: omit`;
- applies bounded request timeouts;
- limits successful upstream JSON responses to 1 MiB;
- retries only transient HTTP statuses and transport timeouts;
- never retries schema-validation or bounded-response failures;
- validates every JSON response against typed Zod schemas;
- exposes sanitized application errors rather than raw upstream bodies.

This follows the defensive principle of using an allowlist/code-owned destination where the application only needs to contact a known service, and avoiding automatic redirects in SSRF-sensitive HTTP clients. See the OWASP SSRF Prevention Cheat Sheet.

## Authentication boundary

The engine requires production identity and authorization for detection operations. The website does **not** store or expose engine credentials in browser code. Authentication for a future authenticated integration must terminate at a server-side boundary and use the engine's documented OIDC/JWT/API-key controls.

The current client intentionally exposes only safe read operations and a typed scenario call. It does not proxy arbitrary paths, arbitrary URLs, PCAP uploads, tenant IDs, export paths or raw authentication headers.

## CORS

The website does not depend on browser-to-engine cross-origin credentials. This is deliberate. If a future browser integration is required, the engine's CORS policy must use an explicit allowlist of origins and methods/headers rather than reflecting arbitrary origins. Credentialed CORS must not use `*`.

## Secrets

`THREATFADE_API_URL`, `THREATFADE_API_TIMEOUT_MS` and `THREATFADE_API_MAX_RETRIES` are server configuration. Engine credentials must never be prefixed with `NEXT_PUBLIC_` and must never be embedded in client components.

## Failure handling

The integration distinguishes upstream HTTP failures from unavailable/timeout failures while avoiding leakage of upstream response bodies. `X-Request-ID` is preserved as diagnostic context when the upstream supplies one.

## Synchronization rule

When the engine API changes, update `lib/api/models.ts`, `lib/validation/engine.ts` and this document from the engine source first. Do not infer API contracts from the website UI.
