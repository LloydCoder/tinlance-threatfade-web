# ThreatFade Phase 14 — Commercialization

**Status:** Implemented — pending final CI gate  
**Date:** 2026-08-25  
**Scope:** Pricing, value ladder, assessment, pilot, enterprise, managed service, commercial trust and conversion measurement.

## Objective

Turn the existing open-core technical trust surface into a clear commercial decision path without presenting ThreatFade as generic SaaS or making unsupported security claims.

## Commercial rate card

| Level | Offer | Public starting standard | Primary motion |
|---|---|---:|---|
| 0 | Community / Open Core | $0 | GitHub / local evaluation |
| 1 | Pro | $49/month or $490/year | Direct commercial enquiry |
| 2 | Team | $299/month or $2,990/year | Team commercial enquiry |
| 3 | Detection Gap Assessment | $5,000+ | Scoped technical assessment |
| 4 | Paid Pilot | $7,500–$15,000 | 30–60 day paid validation |
| 5 | Enterprise | $25,000+/year | Annual platform commitment |
| 6 | Managed | $3,500–$15,000+/month | Managed detection service |
| 7 | Custom Detection Engineering | $5,000–$25,000+ | Scoped professional service |
| 8 | Research Partnership | $25,000–$150,000+ | Scoped research engagement |

These are public planning standards, not contractual promises. Final quotes depend on deployment, analysis volume, integrations, support and security requirements.

## Positioning rule

ThreatFade is an **evidence-first detection and investigation layer for adversarial behavior that becomes intentionally less observable**. It complements existing security operations rather than claiming to replace a SIEM or SOAR.

The commercial boundary is:

- **Open-source capability:** inspectable engine, local/offline analysis, PCAP analysis, core detection packs, evidence, ATT&CK context, CLI/API and documentation.
- **Validated capability:** functionality supported by repository tests and documented validation scope.
- **Experimental capability:** research or optional layers clearly identified as such.
- **Professional services:** assessment, pilot, managed operation, custom detection engineering and research partnerships.

## Implemented routes

- `/pricing` — pricing tiers, feature packaging, value ladder, FAQ and commercial trust.
- `/assessment` — Detection Gap Assessment methodology, deliverables, qualification and starting price.
- `/pilot` — paid pilot scope, success criteria, timeline and conversion mechanism.
- `/enterprise` — enterprise evaluation, annual pricing baseline and assessment/pilot entry points.
- `/managed` — managed detection positioning, scope and service-level boundary.

## Primary conversion path

```text
OPEN SOURCE
    ↓
TECHNICAL ADOPTION
    ↓
REPEAT USAGE
    ↓
TEAM / ORGANIZATIONAL INTEREST
    ↓
DETECTION GAP ASSESSMENT
    ↓
PAID PILOT
    ↓
ENTERPRISE
    ↓
MANAGED / CUSTOM ENGINEERING
    ↓
CUSTOMER EVIDENCE
    ↓
RESEARCH + CONTENT
    ↺
```

Pro and Team are optional commitment bridges. Qualified organizations can enter at Assessment, Pilot or Enterprise directly.

## CTA instrumentation

Commercial CTAs use `ConversionLink` and emit `threatfade:conversion` plus an optional `dataLayer` event. Events include:

- `view_pricing`
- `request_assessment`
- `request_pilot`
- `request_enterprise`
- `request_managed`
- `request_custom_detection`
- `request_research`
- `request_evaluation`

Each commercial surface supplies a `source` so funnel performance can be segmented by page and offer.

## Pricing rationale

The selected entry points sit below many hosted security platforms while keeping high-touch services at professional-security economics. LimaCharlie publishes a free community tier and transparent usage/endpoint pricing; its current Standard plan lists $3/endpoint at 5,000 endpoints and external telemetry at $0.20/GB. Wazuh Cloud currently starts at $571/month for a Small environment and rises to $923/month Medium and $1,467/month Large. Wazuh also monetizes professional support and consulting around an open-source core. These models support a low-friction open-core entry point plus higher-value operational services, but are not direct price equivalents to ThreatFade. See `docs/growth/THREATFADE-COMMERCIAL-RESEARCH.md`.

## Commercial guardrails

1. Do not fabricate testimonials, customers, logos, benchmarks or ROI.
2. Do not imply certifications, SLAs or 24/7 coverage unless contractually provided.
3. Do not claim universal detection accuracy or causality from correlation evidence.
4. Do not hide deployment, integration or support costs.
5. Do not make seat count the primary Enterprise value metric.
6. Do not cripple the open-core detection thesis merely to manufacture upgrades.
7. Keep assessment and pilot scope bounded and paid.
8. Credit pilot fees toward Enterprise only when explicitly agreed in commercial terms.
9. Reprice after actual customer willingness-to-pay and delivery-cost evidence is available.

## Implementation boundary

Phase 14 is a **commercial experience and packaging phase**. It does not introduce billing, payment processing, entitlement enforcement or a fabricated SaaS quota system. Pro/Team pricing is therefore presented as a commercial starting standard and enquiry path until a real billing and entitlement backend is implemented.

## Completion evidence

The Phase 14 gate is GREEN only when formatting, lint, typecheck, unit tests, E2E, documentation checks, build and security workflows pass on the merged commit. Pricing claims must remain consistent with this document and the commercial flywheel.
