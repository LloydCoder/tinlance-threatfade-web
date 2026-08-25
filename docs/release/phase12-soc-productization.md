# ThreatFade Phase 12 — SOC Productization

**Status:** Implementation complete on the phase branch; production release remains gated by a real authenticated SOC identity boundary and the repository CI/CodeQL gates.

## Scope

Phase 12 turns the existing public ThreatFade web surface into an investigation-first SOC workspace without replacing or duplicating the public marketing, research, documentation, or playground architecture.

## Implemented operator flow

Detection inbox → triage → investigation → evidence/entities/sessions → case creation → disposition → analyst timeline.

### 12.1 Detection Inbox

- Engine-backed detection list.
- Server-side pagination, status/assignee filtering and deterministic sorting.
- Severity is presentation-only triage priority; confidence and detection score remain distinct engine values.
- Source, timestamps, ATT&CK mapping, confidence, score and ownership are displayed.
- Loading, empty, error and pagination states are explicit.

### 12.2 Investigation Workspace

- Detection detail and investigation view.
- Detection-to-case linkage.
- Analyst workflow transitions.
- Ownership and priority.
- Linked evidence, entities, sessions, dispositions and cases.

### 12.3 Evidence Timeline

The timeline preserves chronological evidence and provenance. Observed facts are not presented as if they were analyst interpretation. Detection rationale and derived confidence remain separate from source evidence.

### 12.4 Analyst Disposition

Supported engine disposition reasons are surfaced without inventing additional engine behavior:

- true positive
- false positive
- benign
- duplicate
- insufficient evidence
- needs tuning

Disposition notes are bounded and persisted with analyst identity and timestamps. Workflow changes and disposition events remain auditable through the engine's canonical case-event trail.

### 12.5 API Boundary

Browser code does not call privileged engine endpoints directly. The web server exposes an exact `/api/analyst/*` allowlist and forwards authenticated requests to the engine.

The proxy enforces:

- server-owned upstream URL
- production HTTPS requirement
- exact path allowlisting
- numeric detection identifiers
- query-parameter allowlisting
- JSON-only mutation bodies
- bounded request and response bodies
- bounded bearer-token length
- same-origin `Origin` checks for mutations
- redirect rejection
- 8-second upstream timeout
- one retry for safe GET transport failures
- sanitized upstream errors
- `no-store` caching

The proxy is not an authorization authority. The engine authenticates the principal, checks permissions and resolves tenant scope authoritatively.

### 12.6 Authorization

Engine analyst routes remain the authorization source of truth. Object-level authorization is tenant-scoped; a detection identifier is never treated as proof of access. Analyst reads require the existing case-read permission and mutations require the existing case-write permission.

The web application does not accept a browser-controlled tenant identifier as an authorization decision.

### 12.7 Reliability

The UI distinguishes loading, unavailable, unauthorized and empty states. Safe GET operations may retry once at the server boundary. Mutations are not automatically retried. Upstream responses and request bodies are size-bounded.

### 12.8 Accessibility

The SOC workspace uses semantic headings, labelled controls, keyboard-operable buttons/links, table captions, status/error semantics and responsive layouts. Reduced-motion behavior follows the existing site accessibility system.

Automated accessibility remains part of the browser test gate. Manual assistive-technology verification remains an explicit release-owner assurance boundary.

### 12.9 Testing

Phase 12 includes unit/integration coverage in the engine and browser coverage for the web SOC route. Repository CI runs formatting, documentation reconciliation, lint, type checking, unit tests, dependency audit, production build and Playwright E2E checks.

## Engine capability boundary

The engine repository `https://github.com/LloydCoder/tinlance-threatfade` is the technical source of truth. The web implementation only exposes capabilities provided by the canonical analyst API. No detection, evidence, entity, session, case or workflow state is fabricated by the website.

Current analyst endpoints consumed by the web application:

- `GET /enterprise/analyst/inbox`
- `GET /enterprise/analyst/detections/{id}`
- `GET /enterprise/analyst/detections/{id}/timeline`
- `GET /enterprise/analyst/detections/{id}/entities`
- `GET /enterprise/analyst/detections/{id}/sessions`
- `PATCH /enterprise/analyst/detections/{id}/workflow`
- `POST /enterprise/analyst/detections/{id}/disposition`
- `POST /enterprise/analyst/detections/{id}/cases`

## Public/enterprise boundary

The public deployment remains a product/research surface. The SOC workspace is not represented as production customer functionality until a real identity provider is configured and authenticated access is validated end-to-end.

The implementation intentionally does not claim customer-scale performance, independent penetration testing, independent detection validation, purple-team validation, SOC 2/ISO certification or external integration assurance.

## Release evidence

A Phase 12 GREEN release requires:

1. Web CI green.
2. Web formatting validation green.
3. Web CodeQL/security checks green.
4. Engine Phase 12 checks green.
5. Both repositories' documentation reconciled to the same capability boundary.
6. The web SOC PR merged only after the checks above are current for its final head SHA.

## Source-of-truth rule

If the engine API changes, update the engine first, then reconcile the web schemas, proxy allowlist, UI behavior and this document. Never infer an engine capability from a UI mock or marketing copy.
