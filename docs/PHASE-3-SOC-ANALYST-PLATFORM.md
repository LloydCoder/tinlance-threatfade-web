# Phase 3 — SOC / Analyst Platform

The ThreatFade web application now includes an investigation-first SOC workspace at `/soc`.

## Operator flow

Detection inbox → investigation workspace → evidence review → timeline → disposition → case linkage.

The UI deliberately separates detection score/confidence from evidence. Evidence cards show provenance hashes and collection timestamps; confidence is an analytical assessment.

## Security boundary

The browser does not call privileged engine endpoints directly. `/api/analyst/*` is a server-side allowlisted proxy. Engine credentials and the configured tenant are server-side environment values. The engine remains authoritative for OIDC authentication, RBAC, tenant isolation and object-level authorization.

Mutating proxy requests reject a cross-origin `Origin` header. Request and response bodies are bounded and upstream redirects are disabled.

## Validation boundary

The workspace is repository-implemented and is intended for authenticated enterprise deployments. Production identity-provider configuration, real customer-scale usability, and external FusionOps connectivity remain deployment validation rather than claims made by the public website.
