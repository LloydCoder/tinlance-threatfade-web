# ThreatFade Phase 15 — Conversion Engine

## Status

Implementation target: production conversion measurement with a provider-neutral server boundary.

## Canonical funnel

`Visitor → Research/Product engagement → GitHub → Installation → First detection → Repeat detection → Evaluation request → Assessment → Pilot → Enterprise → Expansion`

The website tracks the measurable web-side stages. Installation, first detection, repeat detection, expansion and contract outcomes must be emitted by authenticated/product or commercial systems when those actions actually occur; the website must not fabricate them.

## Canonical event taxonomy

| Event                | Stage       | Trigger                          |
| -------------------- | ----------- | -------------------------------- |
| `page_view`          | acquisition | Route/page becomes visible       |
| `research_open`      | engagement  | Research content opened          |
| `docs_start`         | engagement  | Documentation journey started    |
| `github_view`        | evaluation  | Repository CTA opened            |
| `playground_start`   | activation  | Playground session begins        |
| `detection_start`    | activation  | A real detection workflow begins |
| `detection_complete` | activation  | Detection completes successfully |
| `signup_start`       | evaluation  | Signup flow begins               |
| `signup_complete`    | evaluation  | Signup completes                 |
| `evaluation_request` | evaluation  | Evaluation CTA/form submitted    |
| `assessment_request` | revenue     | Assessment CTA/form submitted    |
| `pilot_request`      | revenue     | Pilot CTA/form submitted         |
| `enterprise_request` | revenue     | Enterprise CTA/form submitted    |

Legacy CTA event names remain accepted at the `ConversionLink` boundary and are normalized into the canonical taxonomy. New code should use canonical names.

## Attribution

Only these campaign fields are retained:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- landing page path
- referrer origin

First-touch attribution is stored locally in browser storage and is not joined to security telemetry. No query-string payload, credentials, IP address, detection evidence, packet content or incident data is sent as an analytics property.

## Activation definition

A **website-level activated organization** is not declared from a pageview or signup alone. The authoritative product activation definition is:

> An organization has completed at least one real ThreatFade detection and subsequently completed a second detection within the defined evaluation window.

The website may emit `detection_start` and `detection_complete`, but only authenticated product/engine telemetry can establish organization-level activation.

## Provider boundary

Analytics is accessed through `AnalyticsProvider` so the product does not couple the public website to a single analytics vendor. The current adapter is PostHog.

Server-only configuration:

- `POSTHOG_HOST` (optional; defaults to US PostHog)
- `POSTHOG_PROJECT_ID`
- `POSTHOG_PROJECT_API_KEY`
- `POSTHOG_API_KEY` for server-side funnel queries

The project API key is never sent to the browser.

## Conversion dashboard

Authenticated analytics administrators can use `/account/conversion` for the trailing-30-day event counts and step conversion view. Access requires an authenticated session plus an email present in `THREATFADE_ANALYTICS_ADMIN_EMAILS`.

When the provider is not configured, the dashboard explicitly reports that state instead of displaying invented metrics.

## Lead capture

Assessment, pilot and enterprise pages expose a minimal technical intake form. Accepted fields are:

- work email
- company
- role
- optional qualification notes

A honeypot, same-origin check, body limit, schema validation and rate limit protect the endpoint. The service sends the lead through the configured Resend boundary only when `RESEND_API_KEY`, `THREATFADE_LEAD_TO_EMAIL`, and `THREATFADE_LEAD_FROM_EMAIL` are present. Otherwise the UI provides the existing email fallback.

Analytics failure never prevents successful lead delivery.

## Security and privacy boundary

Analytics must never contain:

- packet payloads
- IP addresses as an analytics property
- credentials or tokens
- detection evidence
- customer incident details
- internal stack traces
- sensitive organization data

The event endpoint validates names and property types, strips query strings from paths, normalizes referrer data to origin, caps request size, and applies abuse controls. Errors returned to callers are intentionally generic.

## CRM/email integration boundary

The website owns the normalized lead contract but does not hard-code a CRM data model. Resend is currently used only as an optional notification transport. A future CRM adapter can consume the same normalized request without changing the public CTA contract.

## Funnel metrics

For each stage, report:

- unique users
- step conversion versus the preceding stage
- conversion trend by period
- acquisition attribution where available

Revenue-stage conversion is not inferred from clicks alone. Assessment, pilot and enterprise events represent requests, not booked revenue. Contract value and expansion must be emitted from the authoritative commercial system.

## Research basis

The implementation follows current Next.js guidance for client navigation/analytics and deferred third-party integrations, PostHog's current event and funnel model, and OWASP guidance for protecting collected event/log data and avoiding sensitive information in logs. Third-party analytics is kept behind a server boundary where possible.
