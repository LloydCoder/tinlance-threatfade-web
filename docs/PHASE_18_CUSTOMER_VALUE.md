# ThreatFade Phase 18 — Customer Value and Expansion

## Purpose

Phase 18 turns authenticated product activity into a customer-value feedback loop: activation, adoption, human-reviewed expansion signals, customer success milestones, advocacy requests, and product feedback.

## Source of truth

- Detection and investigation facts come from the authenticated analyst/engine contract.
- Organization identity and membership come from the authenticated identity service.
- Commercial lifecycle events use the existing analytics taxonomy/provider.
- Customer advocacy and feedback requests are authenticated, rate-limited and delivered through the existing transactional email boundary.

## Lifecycle

`evaluation → onboarding → first detection → first investigation → first disposition → repeat usage → team adoption → pilot/expansion`

No lifecycle stage is inferred from a marketing page alone.

## Expansion signals

The workspace can surface explainable signals for:

- additional users
- additional environments
- increased detection volume
- integration requests
- custom detection requests

Signals are advisory. They do not automatically change a plan, contact a customer, or create a billing event.

## Commercial paths

The customer workspace exposes review paths for:

`Team → Enterprise → Managed → Custom Detection`

These links are navigation only. A commercial recommendation requires human validation of the underlying customer need.

## Advocacy

References, case studies, testimonials and research collaboration are opt-in. No customer evidence is published or represented as a testimonial without appropriate consent and review.

## Metrics

The implementation instruments activation and lifecycle events. Point-in-time product data is intentionally not used to fabricate retention, churn or NRR. Those metrics require longitudinal customer and revenue cohorts.

Required longitudinal datasets:

- retention: active-organization cohorts over time
- churn: subscription/customer-state history
- NRR: beginning recurring revenue, expansion, contraction and churn by cohort

## Privacy

Customer telemetry is minimized. The customer request endpoint requires authentication, validates input, enforces same-origin mutation and rate limits, and sends only the necessary request content through the existing email boundary. No packet payloads, credentials or security telemetry are added to lifecycle analytics.

## TADS/FadeReach boundary

Demand Intelligence remains separate from customer-value state. TADS/FadeReach may identify account-level signals for research and acquisition, but it must not write customer lifecycle state or infer customer intent from internal product activity without an explicit, validated integration.
