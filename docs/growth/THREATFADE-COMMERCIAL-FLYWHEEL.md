# ThreatFade Commercial Flywheel

**Status:** Strategic baseline  
**Date:** 2026-08-25  
**Scope:** Open-core monetization, services, enterprise, managed detection, research partnerships, and expansion  
**Owner:** ThreatFade / TinLance

## 1. Purpose

This document defines how ThreatFade converts open-source adoption and technical proof into recurring revenue while preserving the open-core product as the primary trust and distribution mechanism.

The model is intentionally a staircase rather than a collection of unrelated offers.

## 2. Commercial thesis

> **Free software creates technical trust; assessment creates high-intent evidence; pilots prove organizational value; enterprise monetizes operationalization; managed detection monetizes expertise; customer outcomes create new research and distribution.**

ThreatFade should not attempt to monetize every user. It should monetize the users and organizations for whom ThreatFade solves a sufficiently valuable detection problem.

## 3. Market reference points

Current adjacent open-source/security models support a broad free-to-enterprise range:

- Grafana currently lists Free at $0, Pro from $19/month plus usage, and Enterprise from a $25,000/year spend commitment, with premium support and deployment flexibility at Enterprise. https://grafana.com/pricing/
- Snyk currently lists Free at $0, Team from $25 per contributing developer/month, Ignite from $1,260/year per contributing developer, and Enterprise as custom. https://snyk.io/plans/
- Wazuh Cloud currently lists Small from $571/month, Medium from $923/month, Large from $1,467/month, and Custom for larger requirements. https://wazuh.com/cloud/

These are reference points, not direct price equivalents. ThreatFade should price according to its differentiated detection value, operational scope, deployment model, support burden, and observed willingness to pay.

## 4. Recommended value ladder

| Level | Offer | Recommended standard price | Primary buyer |
|---|---|---:|---|
| 0 | ThreatFade Community / Open Core | **$0** | Researchers, developers, hunters |
| 1 | ThreatFade Pro | **$49/month** or **$490/year** | Individual practitioners |
| 2 | ThreatFade Team | **$299/month** or **$2,990/year** | Small security teams |
| 3 | Detection Gap Assessment | **$5,000+ one-time** | Security teams / leaders |
| 4 | Paid Pilot | **$7,500–$15,000** | Qualified organizations |
| 5 | ThreatFade Enterprise | **$25,000+/year** | Mid-market / enterprise |
| 6 | ThreatFade Managed | **$3,500–$15,000+/month** | Organizations buying operation/expertise |
| 7 | Custom Detection Engineering | **$5,000–$25,000+** | Enterprise / MSSP |
| 8 | Research Partnership | **$25,000–$150,000+** | Enterprises, labs, institutions |

Prices are planning standards, not contractual commitments. Final quotes should reflect scope, deployment, usage, support, integration complexity, and customer requirements.

## 5. Level 0 — Community / Open Core

**Price: $0**

The open-source engine remains the top-of-funnel and technical trust layer.

Recommended community value:

- core detection engine;
- local/offline analysis;
- PCAP analysis;
- core detection packs;
- behavioral signal analysis;
- evidence generation;
- ATT&CK context;
- CLI/API access;
- reproducible research workflows;
- documentation;
- community support;
- public examples and benchmarks.

Do not cripple the fundamental detection thesis merely to manufacture upgrades.

The commercial product should monetize scale, operationalization, governance, support, deployment, integration, and expertise.

## 6. Level 1 — ThreatFade Pro

**$49/month or $490/year**

Purpose: convert high-frequency individual usage into a low-friction paid relationship.

Potential value:

- higher analysis limits;
- saved investigations;
- historical analysis;
- advanced evidence exports;
- scheduled analysis;
- expanded detection packs;
- richer reporting;
- higher API allowance;
- private workspaces/projects;
- priority support.

Pro is not expected to be the main revenue engine. It is a commitment bridge.

## 7. Level 2 — ThreatFade Team

**$299/month or $2,990/year**

Purpose: move from personal tooling to shared security operations.

Potential value:

- shared workspaces;
- team investigations;
- RBAC;
- audit history;
- centralized evidence;
- team dashboards;
- detection management;
- shared detection packs;
- scheduled workflows;
- webhooks;
- SIEM/SOAR integrations;
- priority support.

Recommended baseline: 5 users.

Additional users can be priced separately only if usage data shows that seat economics are useful. Avoid making seats the primary value metric.

## 8. Level 3 — Detection Gap Assessment

**Starting at $5,000 one-time**

This is the commercial wedge for organizations that need evidence before buying software.

Positioning:

> **Discover where your existing detection stack may go blind to behavioral fade.**

Deliverables can include:

- telemetry and architecture review;
- threat model;
- representative data analysis;
- ThreatFade detection analysis;
- evidence examples;
- ATT&CK mapping;
- detection coverage gaps;
- prioritized recommendations;
- deployment roadmap;
- pilot success criteria.

The assessment should be tightly scoped and repeatable. Larger or more complex environments should be quoted above the $5,000 starting price.

## 9. Level 4 — Paid Pilot

**$7,500–$15,000**

Typical duration: **30–60 days**.

Pilot success criteria should be agreed before deployment.

Possible criteria:

- representative telemetry coverage;
- detection-pack deployment;
- meaningful detection findings;
- false-positive characterization;
- evidence quality;
- analyst workflow integration;
- operational latency;
- integration validation;
- deployment/security requirements.

Recommended commercial mechanism:

> Credit the pilot fee toward the first annual Enterprise contract when the customer converts within the agreed period.

This preserves buyer risk protection without making high-touch engineering free.

## 10. Level 5 — ThreatFade Enterprise

**Starting at $25,000/year**

Public positioning should be:

> **Enterprise plans from $25k/year.**

Enterprise should monetize operational requirements rather than simply increasing the number of user seats.

Potential capabilities:

- enterprise identity / SSO;
- advanced RBAC;
- tenant isolation;
- advanced audit and governance;
- expanded retention;
- private cloud;
- on-premises deployment;
- hybrid deployment;
- enterprise integrations;
- advanced evidence workflows;
- custom policies;
- SLA;
- premium support;
- deployment assistance;
- detection engineering allocation.

## 11. Enterprise pricing model

Do not make ThreatFade primarily per-seat.

Recommended commercial model:

**Annual platform commitment + deployment scope + usage/processing where justified + optional services.**

Value drivers include:

- number and type of environments;
- telemetry/analysis volume;
- deployment topology;
- retention;
- integrations;
- support/SLA;
- security/compliance requirements;
- custom detection requirements;
- managed operations.

This aligns pricing with the security outcome rather than login count.

## 12. Level 6 — ThreatFade Managed

**Starting around $3,500/month**

Higher-complexity programs may reach **$5,000–$15,000+/month**.

Positioning:

> **ThreatFade operated as a detection capability, not merely another security tool.**

Potential services:

- deployment;
- tuning;
- detection monitoring;
- detection engineering;
- evidence review;
- threat-hunting assistance;
- detection-pack updates;
- monthly reporting;
- operational reviews;
- incident escalation support.

Managed should be an expansion layer on top of the enterprise platform, not a replacement for the product.

## 13. Level 7 — Custom Detection Engineering

**$5,000–$25,000+ per engagement**

Use when a customer has a specific adversary behavior or environment requirement that needs bespoke detection engineering.

Commercial work should, where contractually and technically appropriate, feed generalized product improvements back into the platform.

Do not expose confidential customer detection logic or data.

## 14. Level 8 — Research Partnerships

**$25,000–$150,000+** depending on scope.

Potential partners:

- security vendors;
- enterprises;
- universities;
- research institutes;
- government-funded programs;
- threat-intelligence organizations.

Possible outputs:

- novel detection research;
- benchmark programs;
- datasets;
- adversarial robustness studies;
- detection methodology;
- threat research;
- academic/publication support;
- specialized detection packs.

This tier strengthens both revenue and technical authority.

## 15. The commercial flywheel

```text
OPEN SOURCE
    ↓
TECHNICAL ADOPTION
    ↓
FIRST DETECTION
    ↓
REPEAT USAGE
    ↓
TEAM / ORGANIZATIONAL INTEREST
    ↓
DETECTION GAP ASSESSMENT
    ↓
PAID PILOT
    ↓
ENTERPRISE CONTRACT
    ↓
EXPANSION
    ↓
MANAGED DETECTION / CUSTOM ENGINEERING
    ↓
CUSTOMER EVIDENCE
    ↓
RESEARCH / BENCHMARK / CASE STUDY
    ↓
PUBLIC CREDIBILITY
    ↓
MORE OSS ADOPTION
    ↺
```

## 16. Primary conversion path

The preferred high-value path is:

**Community → Assessment → Pilot → Enterprise → Managed.**

Pro and Team are self-serve paths for users who have not yet reached enterprise intent.

Do not force every customer through every tier.

## 17. Enterprise expansion ladder

An Enterprise account should expand through measurable value:

### Deployment expansion

Single environment → multiple environments → multi-region / multi-business-unit.

### Capability expansion

Detection → evidence → integrations → automated workflows → managed detection.

### Deployment model expansion

Cloud → private cloud → hybrid → on-premises where required.

### Service expansion

Platform → implementation → custom detection → managed operation → research.

## 18. The assessment-to-enterprise mechanism

The assessment should produce an evidence-backed business case.

```text
CURRENT STACK
     ↓
THREATFADE ASSESSMENT
     ↓
DETECTION FINDINGS
     ↓
EVIDENCE + LIMITATIONS
     ↓
PRIORITIZED GAP REPORT
     ↓
PILOT DESIGN
     ↓
MEASURED PILOT
     ↓
ENTERPRISE DECISION
```

This is preferable to a generic demo because the buyer receives a measurable technical evaluation.

## 19. Pilot-to-enterprise mechanism

Every pilot must define:

- starting environment;
- detection objectives;
- data sources;
- baseline controls;
- success criteria;
- false-positive evaluation;
- analyst workflow;
- integration requirements;
- security requirements;
- commercial decision date.

The pilot should end with a quantified outcome and a recommendation—not an open-ended trial.

## 20. Pricing guardrails

1. Do not underprice enterprise security work merely to close early customers.
2. Do not invent enterprise pricing based on arbitrary seat counts.
3. Do not make high-touch assessment/pilot work permanently free.
4. Do not hide material deployment or support costs.
5. Do not make unsupported ROI claims.
6. Use annual commitments for Enterprise and Managed programs where operational resources are reserved.
7. Review pricing after real customer evidence is available.
8. Maintain a consistent rate card before negotiating discounts.
9. Discount for strategic reasons only: annual prepayment, multi-year commitment, reference rights, research collaboration, or clearly defined strategic scope.
10. Never exchange security or safety controls for price concessions.

## 21. Revenue metrics

### ARR

Annual recurring revenue from Pro, Team, Enterprise, and recurring Managed contracts.

### ACV

Average annual contract value for Enterprise customers.

### Assessment Revenue

One-time assessment revenue.

### Pilot Conversion

`Enterprise wins / completed pilots`

### Assessment Conversion

`Pilots / completed assessments`

### Expansion ARR

`Ending ARR - starting ARR - new-logo ARR`

### Net Revenue Retention

Track Enterprise and Managed accounts separately from self-serve plans.

### Services Attach Rate

`customers buying services / enterprise customers`

### OSS-to-Commercial Conversion

`qualified commercial accounts / activated organizations`

## 22. Commercial operating cadence

### Weekly

- pipeline review;
- new qualified organizations;
- assessment opportunities;
- pilot blockers;
- enterprise procurement blockers;
- product gaps discovered in sales.

### Monthly

- conversion by stage;
- ACV;
- win/loss reasons;
- pricing objections;
- expansion opportunities;
- services utilization;
- customer evidence candidates.

### Quarterly

- pricing review;
- packaging review;
- ICP review;
- sales-cycle review;
- retention and expansion analysis;
- product roadmap changes based on paid demand.

## 23. Commercial qualification

Prioritize organizations with:

- a meaningful network security problem;
- a functioning security/SOC capability;
- sufficient telemetry;
- a clear owner for detection engineering or security operations;
- a reason to investigate behavioral fade/evasion;
- deployment authority;
- budget or a credible path to budget;
- a defined evaluation environment.

Do not spend enterprise-sales resources indiscriminately on low-fit traffic.

## 24. Commercial moat

The strongest moat is the feedback loop:

**Open-source adoption → detections → customer problems → paid engineering → generalized detection capability → better research → better product → stronger evidence → more adoption.**

Every paid engagement should be evaluated for whether it increases reusable product capability without compromising customer confidentiality.

## 25. Definition of a healthy commercial flywheel

The system is healthy when:

- OSS adoption produces qualified organizational conversations;
- assessments have strong pilot conversion;
- pilots have strong enterprise conversion;
- Enterprise customers expand deployment or capability;
- Managed services attach where customers lack operational capacity;
- custom detection work improves reusable capabilities;
- customer evidence strengthens research and content;
- revenue becomes less dependent on one-off consulting;
- recurring revenue becomes the dominant long-term component.

## 26. Strategic pricing position

ThreatFade should be positioned as:

> **Open-source at the detection core; premium where operationalization, governance, deployment, evidence, support, and expertise become valuable.**

The recommended initial standard rate card is therefore:

- **Community:** $0
- **Pro:** $49/month
- **Team:** $299/month
- **Assessment:** $5,000+
- **Pilot:** $7,500–$15,000
- **Enterprise:** $25,000+/year
- **Managed:** $3,500–$15,000+/month
- **Custom Detection:** $5,000–$25,000+
- **Research:** $25,000–$150,000+

These prices should be validated against actual customer willingness to pay and delivery cost before becoming permanent public commitments.

## 27. Final commercial principle

> **Do not sell ThreatFade as another security tool. Sell the ability to discover and operationalize detection of behavior that existing controls may not expose clearly.**

The commercial system should make the buyer move from curiosity to evidence, from evidence to evaluation, and from evaluation to an operational capability.

## 28. Relationship to the other flywheels

**Content Flywheel → Conversion Flywheel → Commercial Flywheel → Customer Evidence → Content Flywheel.**

This is the central growth system for ThreatFade.
