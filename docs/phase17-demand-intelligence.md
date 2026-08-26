# ThreatFade Phase 17 — Demand Intelligence

## Purpose

Phase 17 adds a research-first demand intelligence layer for TADS/FadeReach. It prioritizes accounts for human research and relevant product journeys without treating signals as proof of intent or automating indiscriminate outreach.

## Architecture

```text
External research / approved data source
        |
        v
Signal normalization
        |
        +--> account profile
        |
        +--> ThreatFade fit score
        |
        +--> buying-intent score
        |
        v
Human verification
        |
        v
Problem-focused landing page
        |
        v
Existing conversion analytics
```

The website currently provides a typed account-profile model, explainable scoring boundary, authenticated analyst workspace, and reusable problem-focused landing pages. It does **not** scrape the open web, buy contact lists, send bulk outreach, or claim that a job posting proves purchase intent.

## Signal model

Supported signal classes:

- security leadership change
- security hiring surge
- detection engineering hiring
- SOC expansion
- SIEM migration
- cloud migration
- compliance initiative
- security incident
- funding
- AI infrastructure expansion

Each signal carries source, observed time, recency, strength, confidence, and optional provenance URL/notes. Scores apply recency decay and cap the aggregate score.

### ThreatFade fit

Fit answers: **"How relevant does this account's observed situation appear to ThreatFade's problem space?"**

### Buying intent

Intent answers: **"How strongly do the supplied signals resemble an active buying situation?"**

The two scores deliberately use different weights. Neither is evidence of a purchase decision.

## Account profiles and buyer mapping

Profiles support organization-level identity and research fields plus mapped buyer roles:

- CISO
- CTO
- Head of Security
- SOC Lead
- Detection Engineering Lead
- Security Architect

Personal contact data is intentionally outside the scoring model. If future connectors ingest personal data, they must add source provenance, lawful-basis/notice metadata, retention, suppression handling, and access controls before production use.

## Personalized landing pages

Reusable problem paths are available for:

- C2 beaconing
- SOC expansion
- SIEM migration
- encrypted-traffic evaluation

They use problem language rather than asserting that a target account has experienced an incident or has a specific security weakness.

## Campaign attribution

Phase 15's existing analytics boundary captures:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- landing page
- source
- CTA
- referrer

Phase 17 adds a validated `campaign_id` property for controlled account/campaign attribution. It is limited to a short allow-listed identifier format and is not an authoritative customer or revenue state. PostHog receives the field only when analytics is configured.

The existing conversion system remains the single attribution path; Phase 17 does not create a parallel analytics store.

## Compliance boundary

The demand-intelligence layer is **not** an outbound mailer. It is a qualification and research system.

Before electronic outreach, the operator must establish the applicable jurisdiction, subscriber/contact class, lawful basis, suppression status, sender identity, and opt-out mechanism. Corporate B2B rules differ from sole-trader/individual rules and can change by jurisdiction.

The repository compliance guard blocks unknown/suppressed contacts, missing sender identity/address configuration, missing lawful-basis documentation, and unclassified individual/sole-trader outreach.

Current primary guidance reviewed for this phase:

- ICO direct marketing guidance (updated April 2026)
- ICO B2B marketing guidance
- FTC CAN-SPAM business guidance
- NIST Privacy Framework

## TADS/FadeReach interface

TADS/FadeReach should provide normalized account research records to a future connector boundary rather than writing directly into UI state.

Required future connector contract:

```text
AccountProfile
  accountId
  name
  website
  industry
  employeeBand
  geography
  buyers[]
  signals[]

Signal
  type
  observedAt
  source
  sourceUrl?
  strength
  recencyDays
  confidence
  notes?
```

The website then computes scores, displays explanations, routes the human researcher to an appropriate problem page, and records safe campaign attribution through the existing analytics system.

No connector may use a public website observation as a fact about an organization's security posture without verification.
