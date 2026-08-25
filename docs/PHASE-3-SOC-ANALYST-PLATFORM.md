# Phase 12 — SOC Productization

ThreatFade Web now exposes an investigation-first SOC workspace at `/soc` while preserving the public product, research, documentation and playground surfaces.

## Operator flow

Detection inbox → triage → investigation → evidence/entities/sessions → case creation → disposition → timeline.

The web UI distinguishes observed evidence/provenance from analytical confidence and from the presentation-only triage severity band.

## Engine-backed capabilities

The web SOC consumes the ThreatFade engine's authenticated analyst API:

- `GET /enterprise/analyst/inbox`
- `GET /enterprise/analyst/detections/{id}`
- `GET /enterprise/analyst/detections/{id}/timeline`
- `GET /enterprise/analyst/detections/{id}/entities`
- `GET /enterprise/analyst/detections/{id}/sessions`
- `PATCH /enterprise/analyst/detections/{id}/workflow`
- `POST /enterprise/analyst/detections/{id}/disposition`
- `POST /enterprise/analyst/detections/{id}/cases`

These routes are implemented by the engine's canonical `core/analyst.py` and `core/analyst_routes.py` layers. The web repository does not fabricate detections, evidence, sessions, entities, cases or workflow state.

## Security boundary

The browser does not call privileged engine endpoints directly. `/api/analyst/*` is a server-side, path-allowlisted proxy.

The proxy requires an authenticated bearer token and forwards that token to the engine. The engine remains authoritative for authentication, RBAC and tenant authorization. The proxy never accepts a browser-supplied tenant identity as an authorization decision.

The proxy additionally enforces:

- exact path allowlisting
- numeric detection identifiers
- query-parameter allowlisting
- JSON-only mutation bodies
- bounded request and response bodies
- bearer-token length bounds
- same-origin `Origin` checks for mutations
- upstream HTTPS in production
- upstream redirect rejection
- an 8-second upstream timeout
- one bounded retry for safe GET network failures
- sanitized upstream error responses
- no-store caching.

There is no browser-accessible static service-token mode. A real authenticated identity boundary is required before the SOC proxy will forward a request.

## Authorization

Object-level authorization is authoritative in the engine. A detection ID alone is never treated as proof of access. Every analyst endpoint authenticates the principal, checks the required permission, resolves the authoritative tenant from the principal, and queries with tenant scoping.

Current analyst routes require `case:read` for analyst reads and `case:write` for workflow, disposition and case mutations. The engine's existing role/permission matrix remains authoritative.

## Reliability

The web proxy bounds body size and upstream response size, disables redirects, applies an 8-second timeout and returns bounded, user-safe failure messages. The engine-backed inbox supports server-side pagination, filtering and deterministic sorting.

## Accessibility

The workspace uses semantic headings, tables, labels, keyboard-operable controls, focusable links/buttons, explicit loading/error/empty states and `aria` status/error semantics. It remains subject to the repository's WCAG/axe E2E gate.

## Validation boundary

Phase 12 establishes the repository implementation and test boundary. It does **not** claim that a production identity provider is configured, that a customer-scale deployment has been validated, or that external FusionOps connectivity has been exercised in a live customer environment.

Independent penetration testing, independent detection validation, purple-team validation and customer-scale performance evidence remain external assurance activities.

The public deployment remains a marketing/research surface until a real authenticated identity provider is configured for the SOC workspace.
