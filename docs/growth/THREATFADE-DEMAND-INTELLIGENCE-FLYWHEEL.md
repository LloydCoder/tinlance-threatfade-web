# ThreatFade Demand Intelligence Flywheel

**Status:** Strategic baseline  
**Date:** 2026-08-25  
**Scope:** TADS/FadeReach, reverse job posting, account signals, ICP prioritization, and outbound demand generation  

## Purpose

Turn public organizational signals into high-intent ThreatFade opportunities. Reverse job posting is one input, not the entire strategy.

## Flywheel

```text
Public company signals
        ↓
Signal collection
        ↓
TADS / FadeReach enrichment
        ↓
ThreatFade fit score
        ↓
Buying-intent score
        ↓
Account prioritization
        ↓
Buyer identification
        ↓
Opportunity hypothesis
        ↓
Evidence-led outreach
        ↓
Assessment / evaluation
        ↓
Outcome data
        ↓
Better scoring and targeting
        ↺
```

## Signal categories

### Hiring / reverse job posting

Prioritize:

- CISO / Head of Security appointments;
- security engineering surges;
- detection engineering roles;
- threat hunting roles;
- SOC engineering roles;
- network security roles;
- SIEM/SOAR engineering roles;
- security architecture hiring;
- AI/security infrastructure roles.

A job posting is a trigger, not proof of purchase intent.

### Technology change

Monitor evidence of:

- cloud migration;
- multi-cloud expansion;
- Kubernetes adoption;
- SIEM migration;
- SOAR deployment;
- zero-trust programs;
- network modernization;
- AI infrastructure expansion.

### Organizational change

Monitor:

- funding;
- acquisitions;
- major product launches;
- rapid employee growth;
- new security leadership;
- geographic expansion;
- new regulated markets.

### Security/compliance signals

Monitor:

- NIS2-related programs;
- DORA-related programs;
- SOC 2;
- ISO 27001;
- PCI DSS;
- incident response investment;
- SOC buildout.

### Threat signals

Monitor credible evidence of:

- security incidents;
- exposed infrastructure;
- relevant threat campaigns;
- sector-specific targeting;
- material changes in attack surface.

Use public information responsibly and do not make unsupported claims about a company's security posture.

## Account scoring

Use a composite score rather than one signal.

Initial planning weights:

| Signal | Weight |
|---|---:|
| Security leadership change | 20% |
| Security hiring surge | 20% |
| Relevant technology change | 15% |
| Security/compliance initiative | 15% |
| Credible threat/security signal | 15% |
| Growth/funding/expansion | 10% |
| Individual relevant job description | 5% |

These weights are hypotheses. Replace them with observed conversion data once sufficient history exists.

## Reverse-job-posting workflow

1. Detect relevant vacancy.
2. Parse actual responsibilities and technologies.
3. Determine whether hiring is growth, replacement, or ambiguous.
4. Find related hiring and organizational signals.
5. Identify the likely problem owner.
6. Build a ThreatFade opportunity hypothesis.
7. Validate against public company information.
8. Rank account.
9. Create evidence-led outreach.
10. Route high-intent accounts to assessment/evaluation.

## Example high-intent pattern

```text
New Head of Security
+
3 detection/security engineering hires
+
Cloud migration
+
SOC/SIEM modernization
+
regulated-market expansion
        ↓
High ThreatFade priority
```

The outreach should focus on the observed transformation and a relevant detection problem—not on telling the prospect that their hiring activity was scraped.

## Opportunity hypothesis

Every qualified account should have a short internal hypothesis:

> What changed?
>
> Why does it matter?
>
> What ThreatFade capability could be relevant?
>
> What evidence can we show?
>
> Who owns the problem?
>
> What is the lowest-risk next action?

## Outreach ladder

Low intent → research/evidence.

Technical intent → technical evaluation.

Operational intent → Detection Gap Assessment.

High enterprise intent → paid pilot / enterprise evaluation.

Never send the same generic message to every signal type.

## TADS/FadeReach architecture

```text
Discovery
  ├─ job signals
  ├─ company signals
  ├─ technology signals
  ├─ leadership signals
  ├─ compliance signals
  └─ threat signals
        ↓
Enrichment
        ↓
Classification
        ↓
ThreatFade Fit
        ↓
Intent
        ↓
Decision-maker
        ↓
Opportunity hypothesis
        ↓
Outreach
        ↓
CRM / pipeline
```

## Guardrails

- Do not scrape or process data in violation of platform terms or applicable law.
- Respect robots.txt, API terms, rate limits, and privacy requirements where applicable.
- Do not infer sensitive personal attributes.
- Do not claim a company has been breached based only on public signals.
- Do not reveal that a specific employee's activity was used in an intrusive way.
- Keep outreach relevant and limited.
- Maintain suppression/opt-out controls.

## Metrics

Track:

- accounts discovered;
- qualified accounts;
- signal-to-qualified rate;
- qualified-to-reply rate;
- reply-to-meeting rate;
- meeting-to-assessment rate;
- assessment-to-pilot rate;
- pilot-to-enterprise rate;
- ARR per signal category;
- time from signal to outreach;
- time from signal to opportunity.

The key metric is not the number of job postings collected. It is:

> **Qualified ThreatFade opportunities generated per unit of signal-processing effort.**

## Definition of a healthy demand flywheel

The system reliably identifies organizations shortly after meaningful security, infrastructure, or organizational changes; the resulting outreach is relevant; high-intent accounts convert to assessments/evaluations; outcomes improve future signal scoring.

## Relationship to other flywheels

**Research/Content → Demand Intelligence → Conversion → Commercial → Customer Value → Research.**
