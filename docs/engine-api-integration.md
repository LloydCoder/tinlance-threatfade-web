# ThreatFade engine/API integration

The web repository treats `LloydCoder/tinlance-threatfade` as the source of truth for engine capabilities and API contracts.

## Verified engine baseline

The current engine baseline used for this integration is **v0.4.0**. The engine documents `/health`, `/ready` and `/version`, plus authenticated detection operations including `/detect`, `/detect/pcap`, `/detect/scenario` and `/detections`.

The documented detection model includes detection state, confidence, score, entropy, drop ratio, z-outlier, fade start, matched-rule count, ATT&CK identifier and structured evidence, with optional ML fields.

## SOC analyst contract

Phase 12 consumes the engine's canonical authenticated analyst API:

- `GET /enterprise/analyst/inbox`
- `GET /enterprise/analyst/detections/{id}`
- `GET /enterprise/analyst/detections/{id}/timeline`
- `GET /enterprise/analyst/detections/{id}/entities`
- `GET /enterprise/analyst/detections/{id}/sessions`
- `PATCH /enterprise/analyst/detections/{id}/workflow`
- `POST /enterprise/analyst/detections/{id}/disposition`
- `POST /enterprise/analyst/detections/{id}/cases`

The engine owns the persistence and authorization model for these operations. The web repository does not create a duplicate detection, evidence, session, case or workflow database.

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

The SOC proxy adds an exact path allowlist, numeric detection-ID validation, bounded query parameters and JSON mutation bodies, an 8-second timeout, redirect rejection, bounded retry for safe GET transport failures, body-size limits and sanitized upstream errors.

## Authentication and authorization boundary

Production detection and analyst operations require the engine's documented identity and authorization controls. The website does **not** store or expose engine credentials in browser code.

For SOC requests, the browser sends the authenticated consumer bearer token to the same-origin web server. The server forwards it to the engine. The web server never treats a browser-supplied tenant header as authoritative. The engine authenticates the principal, checks the required permission and derives tenant scope before reading or mutating resources.

Authenticated analyst reads require the engine's existing case-read permission; workflow, disposition and case mutations require the existing case-write permission. A detection ID alone is never proof of access.

## CORS

The website does not depend on browser-to-engine credentialed CORS. If a future browser integration is required, the engine CORS policy must explicitly allow the required origins, methods and headers. Credentialed CORS must never use a wildcard origin.

## Secrets

`THREATFADE_API_URL`, `THREATFADE_API_TIMEOUT_MS` and `THREATFADE_API_MAX_RETRIES` are server configuration. Engine credentials must never be prefixed with `NEXT_PUBLIC_` or embedded in client components.

## Failure handling

The integration distinguishes upstream HTTP failures from unavailable/timeout failures without returning upstream response bodies to users. `X-Request-ID` is retained as diagnostic context when supplied by the upstream.

## Synchronization rule

When the engine API changes, update the engine first, then update `lib/api/models.ts`, `lib/validation/engine.ts`, the analyst proxy allowlist, SOC UI behavior and this document. Do not infer API contracts from the website UI.
