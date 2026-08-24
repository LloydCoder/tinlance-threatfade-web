# Phase 3 — SOC / Analyst Platform

The ThreatFade web application now includes an investigation-first SOC workspace at `/soc`.

## Operator flow

Detection inbox → investigation workspace → evidence review → timeline → disposition → case linkage.

The UI deliberately separates detection score/confidence from evidence. Evidence cards show provenance hashes and collection timestamps; confidence is an analytical assessment.

## Security boundary

The browser does not call privileged engine endpoints directly. `/api/analyst/*` is a server-side, path-allowlisted proxy. In the normal multi-user model it forwards the originating consumer bearer token to the ThreatFade engine, so the engine makes the final authentication, RBAC and tenant decision for the actual subject. The proxy never accepts a browser-supplied tenant header.

An explicit `THREATFADE_SOC_SERVICE_MODE=true` is supported only for single-tenant deployments that place the web application behind an upstream SSO/network boundary. It is disabled by default. A machine/service token is never presented as a substitute for user authorization in a normal multi-user deployment.

Mutating proxy requests reject a cross-origin `Origin` header. Route paths are allowlisted to exact analyst operations, numeric detection IDs are validated, request/response bodies are bounded and upstream redirects are disabled. This follows the server-side, object-level authorization model required by OWASP ASVS 5.0 V8.3/V8.4.

## Validation boundary

The workspace is repository-implemented and is intended for authenticated enterprise deployments. Production identity-provider configuration, real customer-scale usability, and external FusionOps connectivity remain deployment validation rather than claims made by the public website.
