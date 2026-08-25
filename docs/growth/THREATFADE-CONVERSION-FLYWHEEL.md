# ThreatFade Conversion Flywheel

**Status:** Strategic baseline  
**Date:** 2026-08-25  
**Scope:** ThreatFade web + open-core engine  
**Owner:** ThreatFade / TinLance

## 1. Purpose

This document defines the conversion system for ThreatFade: how an anonymous technical visitor becomes an activated user, an open-source adopter, a qualified organizational evaluator, a pilot, and ultimately a paying customer.

The conversion model must preserve ThreatFade's open-core and evidence-first positioning. The goal is not to maximize generic leads or demo requests. The goal is to move technically credible visitors through progressively stronger proof and progressively higher-value commitments.

## 2. Product context

ThreatFade is positioned around detecting behavioral "fade" events: situations in which adversaries reduce or alter observable network behavior in ways that can indicate evasive C2, living-off-the-land activity, or related threat behavior. The engine emphasizes behavioral signals, evidence, ATT&CK context, reproducibility, integrations, and offline-first analysis.

The web repository is the public product and conversion layer. It provides product education, detection explanations, research, security, documentation, integrations, a playground, and enterprise paths. The engine repository is the technical proof and adoption layer.

## 3. Core conversion thesis

> Do not ask a visitor to buy ThreatFade before they have enough evidence to believe ThreatFade can find something useful.

The primary activation event is:

> **A qualified user successfully runs or experiences a ThreatFade detection and inspects the resulting evidence.**

A secondary enterprise activation event is:

> **A security organization agrees to evaluate ThreatFade against representative telemetry or a controlled assessment scope.**

## 4. The flywheel

```text
RESEARCH / THREAT SIGNAL
        ↓
SEARCH / SOCIAL / COMMUNITY DISCOVERY
        ↓
THREATFADE WEBSITE
        ↓
PROBLEM UNDERSTANDING
        ↓
PLAYGROUND / DEMO / EVIDENCE
        ↓
GITHUB + DOCS
        ↓
FIRST SUCCESSFUL DETECTION
        ↓
REPEAT USAGE
        ↓
┌───────────────────────┬────────────────────────┐
│ Individual adoption   │ Organizational interest │
└──────────┬────────────┴──────────────┬─────────┘
           ↓                           ↓
        PRO / TEAM                ASSESSMENT
           ↓                           ↓
           └──────────────┬────────────┘
                          ↓
                       PILOT
                          ↓
                    ENTERPRISE
                          ↓
                 EXPANSION / MANAGED
                          ↓
                 CUSTOMER EVIDENCE
                          ↓
                 RESEARCH / CONTENT
                          ↓
                     DISCOVERY
                          ↺
```

## 5. Visitor-to-value stages

### Stage 0 — Discovery

**Sources:** research, technical SEO, GitHub, security communities, LinkedIn, X, conferences, partner references, technical videos, analyst/researcher sharing.

**Visitor question:** "What is ThreatFade and why should I care?"

**Primary CTA:** Explore the detection problem.

### Stage 1 — Problem recognition

The visitor understands the specific problem: adversaries can become less observable, and a reduction/change in behavioral signals may itself be useful detection evidence.

**Primary CTA:** See how ThreatFade detects it.

### Stage 2 — Proof

The visitor sees a concrete detection flow, evidence chain, ATT&CK mapping, research result, or playground scenario.

**Primary CTA:** Run the experience / inspect evidence.

### Stage 3 — Activation

The user successfully completes a meaningful action: runs a scenario, analyzes a PCAP, generates evidence, or reaches a valid detection result.

**Activation metric:** first successful detection + evidence inspection.

### Stage 4 — Adoption

The user installs/clones the engine, reads documentation, saves investigations, runs additional analyses, or returns for another detection.

**Goal:** convert curiosity into repeat technical usage.

### Stage 5 — Organizational pull

A user identifies a use case for a team, SOC, research group, MSSP, or security organization.

**CTA:** Run an assessment / start an evaluation.

### Stage 6 — Commercial evaluation

ThreatFade is evaluated against representative data or a controlled environment.

**Commercial bridge:** paid Detection Gap Assessment or paid pilot, with pilot credit applied to an annual platform agreement where appropriate.

### Stage 7 — Enterprise conversion

The organization purchases the platform because ThreatFade has demonstrated differentiated detection value and the customer needs operational, deployment, governance, support, or integration capabilities.

### Stage 8 — Expansion

Expansion is based on environments, telemetry volume, deployment scope, integrations, managed operation, custom detection, and research—not artificial seat inflation.

### Stage 9 — Proof generation

Customer outcomes become anonymized evidence, benchmarks, research questions, detection improvements, case studies, or technical content where permission permits.

## 6. Conversion paths by persona

| Persona | First conversion | Deeper conversion |
|---|---|---|
| Security researcher | Research → Playground → GitHub | Research partnership |
| Detection engineer | Detection → Docs → Install | Team / Enterprise |
| SOC analyst | Evidence → Investigation workflow | Team / Enterprise |
| Security leader | Problem → Evidence → Assessment | Pilot → Enterprise |
| MSSP / consultancy | OSS → Detection pack → Evaluation | Enterprise / Managed |
| Academic / lab | Research → Reproducibility | Research partnership |
| Developer | GitHub → First detection | Pro / Team |

## 7. CTA architecture

The website should not use one universal CTA.

- **Developer:** Run ThreatFade / View GitHub
- **Researcher:** Explore Research
- **Analyst:** See Detection / Inspect Evidence
- **Security team:** Run an Assessment
- **Enterprise:** Request an Evaluation
- **Existing user:** Read Docs / Integrate / Upgrade

The CTA should reflect demonstrated intent.

## 8. Conversion assets

Every major conversion path should have:

1. A specific problem statement.
2. A concrete demonstration.
3. Evidence or reproducibility.
4. A low-friction next action.
5. A technical proof path.
6. A commercial path for high-intent organizations.
7. A trust/security explanation.
8. A clear boundary around what ThreatFade does not claim.

## 9. Conversion instrumentation

Track the following events where technically and legally appropriate:

- `landing_view`
- `detection_page_view`
- `research_view`
- `playground_start`
- `playground_complete`
- `github_click`
- `docs_start`
- `install_started`
- `first_detection`
- `evidence_viewed`
- `repeat_detection`
- `assessment_started`
- `assessment_submitted`
- `pilot_requested`
- `pilot_started`
- `enterprise_evaluation`
- `enterprise_won`
- `managed_expansion`

Avoid collecting unnecessary telemetry. Instrument only what is needed for product and conversion decisions.

## 10. North-star conversion metrics

### Activation Rate

`activated qualified users / qualified product visitors`

### Product Activation Quality

`users who reach repeat detection / users who reach first detection`

### OSS-to-Commercial Rate

`qualified organizations entering commercial evaluation / activated organizations`

### Assessment-to-Pilot Rate

`pilots / paid assessments`

### Pilot-to-Enterprise Rate

`annual contracts / completed pilots`

### Expansion Rate

`expanded ARR / starting ARR`

### Flywheel Efficiency

`new qualified activated users attributable to existing users, content, research, and customer proof / existing qualified user base`

The last metric should be treated as a strategic indicator rather than a perfect accounting metric.

## 11. Conversion rules

1. Evidence before claims.
2. Demonstration before sales pressure.
3. Technical proof before enterprise procurement.
4. Open-source adoption must remain useful without payment.
5. Commercial tiers should monetize operationalization, scale, governance, support, deployment, and expertise.
6. Do not use fake scarcity or misleading security claims.
7. Never imply a detection result is proof of compromise without sufficient evidence.
8. Do not gate the core open-source detection thesis solely to manufacture upgrades.

## 12. Definition of a healthy conversion system

ThreatFade is conversion-healthy when:

- technical visitors understand the problem quickly;
- qualified visitors can experience a real detection;
- the first successful detection is measurable;
- repeat usage grows;
- users naturally introduce ThreatFade into team discussions;
- assessments produce measurable detection findings;
- pilots have explicit success criteria;
- enterprise buyers can justify the purchase using evidence;
- customer evidence produces new research/content;
- acquisition becomes progressively less dependent on founder-led promotion.

## 13. Operating cadence

**Weekly:** inspect activation, top content, referrals, GitHub activity, and commercial opportunities.

**Monthly:** review persona conversion, assessment/pilot pipeline, product friction, content performance, and expansion opportunities.

**Quarterly:** revise pricing, packaging, ICP, activation definition, and conversion assumptions using observed customer behavior.

## 14. Relationship to the other flywheels

The conversion flywheel is one part of a single system:

**Content Flywheel → Conversion Flywheel → Commercial Flywheel → Customer Evidence → Content Flywheel.**

No flywheel should be operated as an isolated marketing function.
