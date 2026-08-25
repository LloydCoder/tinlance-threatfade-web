# ThreatFade Commercial Flywheel

**Status:** Commercial strategy baseline  
**Last reviewed:** 2026-08-25  
**Scope:** Open-core monetization, assessments, pilots, enterprise, managed detection, services, expansion, and research partnerships

## 1. Executive model

ThreatFade should monetize **operationalization and specialized security capability**, not simply access to code.

The recommended commercial staircase is:

```text
Community OSS
    -> Pro
    -> Team
    -> Detection Gap Assessment
    -> Paid Pilot
    -> Enterprise
    -> Managed Detection
    -> Custom Detection Engineering / Research
```

The commercial flywheel then feeds customer evidence back into research and the open-source acquisition layer.

## 2. Recommended pricing baseline

Pricing is a strategic starting point, not a permanent promise. Validate willingness-to-pay with real customer conversations and revise only from evidence.

| Offer | Recommended starting price | Role |
|---|---:|---|
| ThreatFade Community | **$0** | OSS acquisition / trust |
| ThreatFade Pro | **$49/month** or $490/year | Individual professional commitment |
| ThreatFade Team | **$299/month** or $2,990/year | Small team / recurring SaaS |
| Detection Gap Assessment | **$5,000+** | High-intent enterprise wedge |
| Paid Pilot | **$7,500–$15,000** | Validated deployment |
| ThreatFade Enterprise | **$25,000+/year** | Core enterprise ARR |
| ThreatFade Managed | **$3,500/month+** | Managed operational capability |
| Custom Detection Engineering | **$5,000–$25,000+** | High-margin expansion |
| Research Partnership | **$25,000–$150,000+** | Strategic R&D |

These figures should be quoted in USD initially for global clarity. EUR equivalents can be supplied for European procurement without changing the underlying value metric.

## 3. Market calibration

Current adjacent security/open-core pricing supports the general structure:

- Wazuh Cloud currently lists Small at $571/month, Medium at $923/month, Large at $1,467/month, with custom enterprise configurations. It also retains a free/open-source engine. See: https://wazuh.com/cloud/
- Snyk currently uses Free, Team, an enterprise-grade Ignite tier, and Enterprise custom pricing; Team starts at $25/contributing developer/month. See: https://snyk.io/plans/
- GitLab currently lists Free at $0, Premium at $29/user/month billed annually, and Ultimate at custom pricing, with advanced security/governance reserved for higher tiers. See: https://about.gitlab.com/pricing/

These are **adjacent-market reference points, not direct price comparables**. ThreatFade should not copy their units because its value is behavioral detection capability, evidence, deployment scope, and operationalization rather than generic seats or code scans.

## 4. Value ladder

### Level 1 — Community

**$0**

Includes the open-source detection engine and reproducible technical workflows appropriate to the project's license and architecture.

Goal: first successful detection.

### Level 2 — Pro

**$49/month**

Goal: monetize repeated individual usage without crippling the OSS engine.

Potential value:

- higher analysis allowances
- saved investigations
- richer reporting/export
- scheduled analysis
- additional convenience integrations
- private workspaces/projects
- priority support

### Level 3 — Team

**$299/month**

Goal: convert individual adoption into team-level recurring usage.

Potential value:

- shared investigations
- RBAC
- team workspaces
- centralized evidence
- audit history
- team dashboards
- expanded integrations
- shared detection management
- priority support

Additional seats should be an expansion mechanism, not the main value metric.

### Level 4 — Detection Gap Assessment

**$5,000+ one-time**

Core promise:

> Identify where the customer's existing controls may be blind to adversarial behavior that intentionally becomes less observable.

Deliverables can include:

- telemetry/environment review
- threat-model review
- ThreatFade analysis
- prioritized detection gaps
- evidence examples
- ATT&CK mapping where supported
- recommendations
- deployment roadmap

This is the preferred high-intent bridge from OSS credibility to enterprise buying.

### Level 5 — Paid Pilot

**$7,500–$15,000**, typically 30–60 days.

The pilot should be paid. If the customer converts to an annual Enterprise contract, a defined portion or all of the pilot fee can be credited toward the first-year subscription at commercial discretion.

Pilot success criteria must be explicit before deployment.

### Level 6 — Enterprise

**Starting at $25,000/year**

Public positioning:

> **Enterprise from $25k/year — scope-based pricing.**

Potential value:

- expanded users and environments
- SSO/OIDC
- advanced RBAC
- tenant isolation
- enterprise auditability
- retention controls
- private cloud / on-prem deployment
- enterprise integrations
- SLA and premium support
- security review support
- deployment assistance
- included detection-engineering capacity

Do not price Enterprise primarily per seat. Use a hybrid model based on deployment scope, telemetry/processing needs, environments, and required services.

### Level 7 — Managed Detection

**Starting around $3,500/month**, expanding to $5,000–$15,000+/month for larger operational scope.

Customer buys an outcome, not another dashboard.

Potential service:

- deployment
- tuning
- monitoring
- detection engineering
- evidence review
- threat hunting assistance
- detection-pack maintenance
- monthly reporting
- escalation workflow

Managed service should be an Enterprise expansion, not required for every customer.

## 5. Expansion paths

A healthy Enterprise account expands through:

### Environment expansion

One environment -> multiple environments -> business units -> regions/tenants.

### Capability expansion

Detection -> evidence -> integration -> automation -> managed operation.

### Deployment expansion

SaaS/cloud -> private cloud -> hybrid -> on-prem.

### Service expansion

Assessment -> implementation -> custom detection -> managed detection -> research partnership.

## 6. The strongest commercial path

```text
Research / OSS
    ↓
First detection
    ↓
Internal champion
    ↓
Detection Gap Assessment ($5k+)
    ↓
Paid Pilot ($7.5k–$15k)
    ↓
Enterprise ($25k+/yr)
    ↓
Managed Detection ($3.5k+/mo+)
    ↓
Custom Detection / Research
    ↓
Customer evidence
    ↓
Research + content
    ↓
New OSS users
```

Not every customer must follow every step. The path should be intent-driven.

## 7. Why the assessment is central

The assessment changes the sales conversation from:

> "Buy our cybersecurity platform."

to:

> "Let's determine whether ThreatFade identifies a meaningful detection gap in your environment."

This lowers enterprise buying friction while preserving the value of professional expertise.

## 8. Why OSS remains commercially valuable

Open source should provide enough capability to establish technical credibility and enable reproducibility. Commercial tiers monetize:

- collaboration
- operational governance
- enterprise identity
- deployment complexity
- support
- scale
- private environments
- managed operation
- custom detection
- research services.

Never manufacture artificial limitations solely to force upgrades where doing so would damage trust or reproducibility.

## 9. Unit economics to monitor

### Acquisition

- cost per qualified visitor
- cost per activated user
- organic vs outbound acquisition

### Product

- activation rate
- weekly/monthly recurring usage
- analysis volume
- repeat detection rate
- team expansion

### Sales

- qualified evaluation rate
- assessment close rate
- pilot conversion
- pilot-to-enterprise conversion
- sales cycle
- average contract value

### Expansion

- Enterprise expansion ARR
- managed-service attachment rate
- services revenue/customer
- net revenue retention
- gross retention

## 10. Commercial guardrails

- Do not claim customer ROI before it is measured.
- Do not claim guaranteed detection or prevention.
- Do not imply certifications that do not exist.
- Do not use unsupported security claims to justify premium pricing.
- Keep assessment and pilot scopes explicit.
- Keep service deliverables and response commitments contractually precise.
- Avoid seat-only pricing when deployment scope drives value.
- Revisit pricing after sufficient qualified customer interviews and closed deals.

## 11. Example customer economics

Illustrative scenario only:

```text
$5k assessment
+ $10k pilot
+ $25k Enterprise annual contract
+ $42k Managed annual service
= $82k first-year commercial value
```

This is an example of a possible expansion path, not a forecast or guaranteed deal size.

## 12. Commercial flywheel health

The model is healthy when:

1. OSS adoption creates qualified enterprise champions.
2. Assessments uncover real, defensible problems.
3. Pilots demonstrate measurable value.
4. Enterprise contracts produce recurring revenue.
5. Managed/custom services increase account value.
6. Customer deployments generate new evidence and product insight.
7. Evidence becomes research/content.
8. Research drives new OSS adoption.

## 13. Relationship to product strategy

The engine repository is the technical source of truth. The web repository is the discovery, research, documentation, playground, and enterprise-evaluation surface. Commercial packaging must never imply functionality that the engine does not actually implement and validate.

## 14. Related strategy documents

- `docs/strategy/CONVERSION-FLYWHEEL.md`
- `docs/strategy/CONTENT-FLYWHEEL.md`
- `docs/enterprise/conversion-events.md`
