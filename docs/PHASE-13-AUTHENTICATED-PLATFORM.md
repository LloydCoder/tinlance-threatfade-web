# Phase 13 — Authenticated Platform

## Status

Phase 13 adds the authenticated customer boundary on top of the Phase 12 SOC workspace while preserving the public ThreatFade website, research hub, documentation and open-core experience.

## Trust boundaries

`Browser → Next.js 16 Proxy → Auth.js → OIDC provider`

`Browser → Next.js server BFF → ThreatFade engine → tenant-scoped persistence`

The browser never sends a bearer token to the engine. The SOC and identity BFFs read the server-only Auth.js JWT and forward the OIDC access token plus the opaque ThreatFade session token. Client-provided `Authorization` headers are ignored by these BFFs.

## Authentication

- Stable NextAuth.js 4.24.15 is used for the current production codebase.
- Authorization Code flow with PKCE, state and nonce checks.
- OIDC discovery is anchored to the configured issuer.
- Callback redirects are restricted to the same origin.
- Session cookies are HttpOnly, Secure in production and SameSite=Lax.
- Browser session maximum lifetime is 8 hours.
- OIDC refresh tokens are retained only inside the encrypted server-side JWT and are never exposed to the client session object.
- The ThreatFade engine creates a separate server-revocable session after successful OIDC authentication.

Next.js 16 uses `proxy.ts` for the request boundary; it is an optimistic login gate only. The engine remains authoritative for authorization on every resource request.

## RBAC

The engine is authoritative for the following roles:

- owner — full organization control;
- admin — operational and membership administration;
- analyst — detection and investigation workflow;
- viewer — read-only analyst access.

The web UI uses these roles only to present appropriate controls. It never grants access based on client state.

## Organizations

Organizations are customer tenants. A user may belong to multiple organizations and may have different roles in each. Organization switching is an authenticated server-side operation and changes the engine session's active organization only after membership verification.

Invitations are seven-day, single-use, email-bound random tokens. Only their SHA-256 hashes are persisted by the engine.

## Security testing boundary

Phase 13 requires automated coverage for:

- IDOR/BOLA by changing organization and detection identifiers;
- privilege escalation from viewer/analyst to admin operations;
- session fixation and revocation;
- cross-origin mutation requests;
- forged browser Authorization headers;
- OIDC issuer/audience/signature validation;
- callback open redirects;
- invitation replay and email mismatch;
- disabled-account sessions;
- rate-limited authenticated identity operations.

## Production environment

The web deployment requires:

`NEXTAUTH_SECRET`

`THREATFADE_OIDC_ISSUER`

`THREATFADE_OIDC_CLIENT_ID`

`THREATFADE_OIDC_CLIENT_SECRET`

`THREATFADE_OIDC_TOKEN_URL`

`THREATFADE_API_URL` (HTTPS in production)

The public deployment must not expose the authenticated SOC as a demo without a real OIDC provider and engine identity database. The public marketing/research surfaces remain usable without these variables.

## Standards basis

The implementation follows OAuth 2.0 security BCP (RFC 9700), OpenID Connect Core, OWASP authentication and authorization guidance, secure cookie/session practices, and Next.js 16's current Proxy convention.
