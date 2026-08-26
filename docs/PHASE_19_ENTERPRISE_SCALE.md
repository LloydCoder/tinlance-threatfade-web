# ThreatFade Phase 19 — Enterprise Scale

## Purpose

Phase 19 makes the ThreatFade web product procurement-ready without claiming enterprise capabilities that are not backed by the deployed implementation.

## Evidence model

Enterprise claims are classified as:

- **implemented** — the repository contains the corresponding behavior and the existing CI/test system can validate it.
- **documented** — the interface, boundary or operational requirement is specified, but a deployed connector/service is not claimed.
- **on-demand** — the capability requires a validated customer requirement and implementation scope.
- **not-claimed** — no assurance, certification or capability is represented.

## Identity

The existing authentication path uses an OIDC provider through NextAuth. The provider configuration requires issuer, client ID, client secret and token endpoint settings. PKCE, state and nonce checks are configured, secure production cookies are used, callback URLs are constrained, and the engine enterprise session boundary is invoked after authentication.

SAML is **not** claimed as generally available by Phase 19. It should only be added after a validated enterprise requirement and a concrete implementation/test plan.

## Authorization

Enterprise workflows reuse the existing organization-scoped authenticated product boundary. Resource authorization remains server-side and tenant-aware. The enterprise UI does not create a second authorization system.

## Governance and audit

Enterprise audit events must be structured around UTC timestamps and sufficient metadata to reconstruct who performed what action, against which resource, in which organization, and with what outcome. Authentication operations and failed authorization decisions are security events. Sensitive payloads and credentials must never be logged.

The web product does not claim an immutable or regulated retention service merely because an audit-event boundary exists. Retention is deployment/configuration specific until the backing persistence and export path are validated.

## Deployment management

The engine is the source of truth for engine health/version capabilities. The web layer treats backend failures as untrusted dependency failures: bounded timeouts, no redirect following, bounded response sizes, safe errors and no secret leakage.

Production deployment remains subject to the existing Vercel external deployment constraint; CI/build reproducibility is independent of that quota.

## Integration management

The enterprise integration contract defines server-side adapters for:

| Integration      | Boundary              | Format       | Status           |
| ---------------- | --------------------- | ------------ | ---------------- |
| SIEM             | server-side adapter   | CEF, JSON    | contract-defined |
| SOAR             | server-side adapter   | JSON webhook | contract-defined |
| Webhooks         | signed outbound event | JSON         | contract-defined |
| STIX             | export adapter        | STIX 2.1     | contract-defined |
| Detection export | versioned API/export  | JSON         | contract-defined |

A contract-defined integration is **not** marketed as a live connector until an adapter is deployed, authenticated, tested, rate-limited, observable and documented.

## Security center and procurement UX

The following public routes form the enterprise evidence surface:

- `/enterprise`
- `/enterprise/security`
- `/enterprise/procurement`
- `/security`
- `/integrations`
- `/docs/getting-started`

The procurement center explicitly avoids unsupported certification, compliance, customer, SLA and subprocessor claims.

## Security basis

Phase 19 follows zero-trust principles: access is based on authenticated identity and authorization policy rather than network location. NIST SP 800-207 emphasizes discrete authentication and authorization before enterprise resource access.

Security logging follows the principle that events need sufficient metadata for investigation and that authentication and authorization events are security-relevant. OWASP ASVS 5.0 includes dedicated authentication, authorization, OIDC, data-protection and security-logging requirements.

## Assurance limits

ThreatFade does not claim SOC 2, ISO 27001, FedRAMP, PCI DSS, penetration testing, independent validation or other certification unless the corresponding evidence is actually available.

## Phase gate

Phase 19 is GREEN only when the repository CI suite is green and the enterprise evidence surface contains no unsupported capability claims. External enterprise services such as customer-specific SAML, SIEM/SOAR connectors, retention infrastructure or contractual SLAs remain deployment/customer scoped until implemented and validated.
