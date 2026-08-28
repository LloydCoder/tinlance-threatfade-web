# ThreatFade Engine ↔ Web Compatibility

**Web baseline:** `0.9.0-dev`  
**Engine runtime/API baseline verified in `config.yaml`:** `0.7.0`

This document is the compatibility boundary for the current ThreatFade web integration. It records the engine routes that the web application currently forwards and the authentication/tenant context required by those routes.

## Identity boundary

The web forwards authenticated identity operations to:

`/enterprise/identity/*`

Verified operations:

- `GET /me`
- `GET /organizations`
- `POST /organizations`
- `GET /organizations/{organization_id}/members`
- `POST /organizations/{organization_id}/invitations`
- `POST /invitations/accept`
- `PATCH /organizations/{organization_id}/members/{subject}`
- `DELETE /organizations/{organization_id}/members/{subject}`
- `POST /organizations/{organization_id}/invitations/{invitation_id}/revoke`
- `POST /sessions`
- `GET /sessions`
- `POST /sessions/revoke`
- `POST /sessions/revoke-all`
- `POST /sessions/switch`

The web supplies the engine bearer access token and, for session-scoped operations, `X-ThreatFade-Session`.

## Analyst boundary

The web forwards authenticated SOC operations to:

`/enterprise/analyst/*`

Verified operations:

- `GET /inbox`
- `GET /detections/{detection_id}`
- `PATCH /detections/{detection_id}/workflow`
- `GET /detections/{detection_id}/timeline`
- `POST /detections/{detection_id}/cases`
- `POST /detections/{detection_id}/disposition`
- `GET /detections/{detection_id}/entities`
- `GET /detections/{detection_id}/sessions`

The engine remains the authoritative tenant/RBAC boundary and requires `X-ThreatFade-Session` plus the authenticated bearer token.

## Evidence boundary

The web must not infer production detection performance, independent assurance, certification, vendor certification or customer-scale capacity from the existence of these routes. Those claims require the corresponding evidence state in the engine assurance manifest.

## Compatibility rule

Changes to engine identity or analyst route paths, methods, request schemas, response schemas, authentication requirements or tenant semantics must be reconciled here and in the web forwarding layer before a web release is promoted.
