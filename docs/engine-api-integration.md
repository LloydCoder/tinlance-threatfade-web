# ThreatFade engine/API integration

The web repository treats `LloydCoder/tinlance-threatfade` as the source of truth for engine capabilities and API contracts.

## Verified engine baseline

The current engine baseline used for this integration is **v0.4.0**. The engine documents `/health`, `/ready` and `/version`, plus authenticated detection operations including `/detect`, `/detect/pcap`, `/detect/scenario` and `/detections`.

The documented detection model includes detection state, confidence, score, entropy, drop ratio, z-outlier, fade start, matched-rule count, ATT&CK identifier and structured evidence, with optional ML fields.

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

This follows the defensive principle of using an allowlist/code-owned destination where the application only needs to contact a known service, and avoiding automatic redirects in SSRF-sensitive HTTP clients.

## Authentication boundary

Production detection operations require the engine's documented identity and authorization controls. The website does **not** store or expose engine credentials in browser code. Any future authenticated integration must terminate at a server-side boundary and use the engine's documented OIDC/JWT/API-key controls.

The current client intentionally avoids arbitrary proxying: it does not accept arbitrary paths, arbitrary URLs, tenant identifiers, export paths, raw authentication headers, or unrestricted PCAP uploads.

## CORS

The website does not depend on browser-to-engine credentialed CORS. If a future browser integration is required, the engine CORS policy must explicitly allow the required origins, methods and headers. Credentialed CORS must never use a wildcard origin.

## Secrets

`THREATFADE_API_URL`, `THREATFADE_API_TIMEOUT_MS` and `THREATFADE_API_MAX_RETRIES` are server configuration. Engine credentials must never be prefixed with `NEXT_PUBLIC_` or embedded in client components.

## Failure handling

The integration distinguishes upstream HTTP failures from unavailable/timeout failures without returning upstream response bodies to users. `X-Request-ID` is retained as diagnostic context when supplied by the upstream.

## Synchronization rule

When the engine API changes, update `lib/api/models.ts`, `lib/validation/engine.ts` and this document from the engine source first. Do not infer API contracts from the website UI.
