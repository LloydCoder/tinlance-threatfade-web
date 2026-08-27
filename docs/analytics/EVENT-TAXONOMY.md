# ThreatFade Canonical Growth Event Taxonomy

**Status:** Canonical registry  
**Version:** 17.2  
**Source of truth:** `lib/analytics/taxonomy.ts`  
**Scope:** public conversion, product activation, commercial lifecycle, customer value, and advocacy telemetry

## Rules

1. Event names are owned by `lib/analytics/taxonomy.ts`.
2. UI code must call `trackConversion()` or `trackServerEvent()`; it must not define a second event vocabulary.
3. An event is emitted only after its documented trigger genuinely occurs.
4. Client-side events are best-effort telemetry. Server-side commercial/lifecycle events are authoritative when emitted after successful server handling.
5. `page_view` is the generic acquisition event. It is not a substitute for a semantic conversion event.
6. The web repository does not invent engine-side customer state. Events requiring durable product history are explicitly marked as an integration boundary in the growth reconciliation.
7. UTM parameters captured on the first landing are retained as first-touch attribution; the event's current path/source/referrer/UTMs provide last-touch context.

## Canonical events

| Event | Stage | Genuine trigger | Implementation | Authority |
|---|---|---|---|---|
| `page_view` | acquisition | route becomes visible | `components/analytics/conversion-tracker.tsx` | client |
| `cta_click` | engagement | a conversion CTA/link is actually activated | `components/analytics/conversion-link.tsx` | client |
| `research_open` | engagement | research CTA/link is activated | `components/analytics/conversion-link.tsx` | client |
| `docs_start` | engagement | docs CTA/link is activated | `components/analytics/conversion-link.tsx` | client |
| `github_view` | evaluation | GitHub CTA/link is activated | `components/analytics/conversion-link.tsx` | client |
| `playground_start` | activation | a playground scenario request is initiated | `components/playground/playground-client.tsx` | client |
| `playground_complete` | activation | a validated curated playground dataset is successfully returned | `components/playground/playground-client.tsx` | client |
| `detection_start` | activation | production detection workflow starts in an authenticated product surface | engine/analyst integration boundary | external dependency |
| `detection_complete` | activation | production detection returns a valid completed result | engine/analyst integration boundary | external dependency |
| `signup_start` | evaluation | signup flow is genuinely started | authenticated conversion surface | client |
| `signup_complete` | evaluation | signup succeeds | identity provider boundary | external dependency |
| `evaluation_request` | evaluation | evaluation intake is successfully accepted | conversion/lead flow | server |
| `assessment_request` | revenue | assessment intake is successfully accepted | `app/api/leads/route.ts` | server |
| `pilot_request` | revenue | pilot intake is successfully accepted | `app/api/leads/route.ts` | server |
| `enterprise_request` | revenue | enterprise intake is successfully accepted | `app/api/leads/route.ts` | server |
| `evaluation_qualified` | customer | qualification state is recorded by the commercial system | CRM/commercial system boundary | external dependency |
| `onboarding_started` | customer | customer onboarding state is created | CRM/customer-success system boundary | external dependency |
| `onboarding_completed` | customer | onboarding acceptance criteria are completed | CRM/customer-success system boundary | external dependency |
| `first_detection` | customer | first valid production detection for an organization is established | engine + durable customer state boundary | external dependency |
| `first_investigation` | customer | first authenticated investigation is established | engine + durable customer state boundary | external dependency |
| `first_disposition` | customer | first persisted analyst disposition is established | engine + durable customer state boundary | external dependency |
| `repeat_usage` | customer | repeat product usage is established from longitudinal telemetry | analytics/product state boundary | external dependency |
| `pilot_started` | revenue | pilot is formally started | CRM/commercial system boundary | external dependency |
| `pilot_completed` | revenue | pilot completion criteria are recorded | CRM/commercial system boundary | external dependency |
| `expansion_signal` | expansion | validated customer/product signal indicates expansion opportunity | customer-value workflow; commercial state remains external | mixed |
| `advocacy_request` | advocacy | advocacy request is intentionally sent after a validated outcome | customer-success workflow boundary | external dependency |
| `product_feedback_submitted` | product | authenticated customer feedback is successfully delivered | `app/api/customer-value/request/route.ts` | server |
| `customer_request` | customer | authenticated customer request is successfully delivered | `app/api/customer-value/request/route.ts` | server |

## Attribution fields

The canonical event schema supports:

- current path;
- source;
- CTA;
- first-touch landing page;
- referrer;
- first-touch UTM source/medium/campaign/content;
- campaign ID;
- semantic stage;
- bounded business context in `value`.

The browser retains first-touch attribution in `localStorage` under the versioned `threatfade_attribution_v1` key. Current event path/referrer/UTMs remain available for last-touch analysis.

## Privacy and security

- Do not put email addresses, credentials, incident contents, tokens, raw telemetry, or customer-sensitive evidence in analytics properties.
- Public analytics input is schema-validated server-side.
- Public analytics is same-origin constrained and rate-limited.
- Analytics provider credentials remain server-side.
- Referrers are reduced to origins server-side before provider capture.

## External boundaries

The following cannot truthfully be synthesized by the website alone: durable CRM stage, billing state, enterprise contract state, first-ever organization detection, retention cohorts, NRR, and customer advocacy authorization. Those are integration boundaries and must be supplied by the authoritative engine/product, CRM, billing, or customer-success system before being represented as completed lifecycle events.
