# ThreatFade Content Flywheel

**Status:** Active strategic baseline  
**Last reviewed:** 2026-08-25  
**Scope:** Threat research, technical education, OSS distribution, SEO/AI discovery, social distribution, and customer-proof reuse

## 1. Purpose

ThreatFade content must behave like a product-development system, not a publishing calendar.

The core thesis is:

> **Every meaningful threat question should become an experiment; every validated experiment should produce evidence; every useful evidence package should become a reusable content asset; every asset should create a path back to ThreatFade usage.**

## 2. Core loop

```text
Threat question
 -> Hypothesis
 -> ThreatFade experiment
 -> Detection/evidence
 -> Reproducible artifact
 -> Research article
 -> GitHub example / detection pack
 -> Short-form distribution
 -> Community discussion
 -> Qualified traffic
 -> Playground / Docs / GitHub
 -> New users and questions
 -> New threat question
```

## 3. Content pillars

### A. Fade-event research

Primary category-defining content:

- C2 quieting
- deliberate beacon reduction
- encrypted-traffic behavioral change
- gradual LOTL fade
- adversarial reduction of observability
- cross-domain correlation
- GNSS/network correlation where supported by implementation and evidence

### B. Detection engineering

Show how ThreatFade turns signals into evidence:

- rolling entropy
- temporal/statistical deviation
- behavioral correlation
- evidence generation
- ATT&CK mapping
- detection packs
- validation and benchmarking

### C. Reproducibility

Every high-value research claim should preferentially include:

- question
- environment
- data/source assumptions
- methodology
- ThreatFade version/commit where useful
- expected signal
- observed result
- limitations
- reproduction path

### D. Operational security

Translate research into SOC workflows:

- triage
- investigation
- evidence review
- handoff
- SIEM/SOAR integration
- deployment boundaries
- analyst workflow

### E. Security and trust

Publish engineering evidence without overstating assurance:

- secure-by-default design
- threat model
- dependency/supply-chain controls
- authentication/authorization boundaries
- auditability
- deployment security
- limitations and known gaps

### F. Buyer education

Create content that helps a security leader understand when behavioral fade detection is useful, what existing controls may miss, and how to evaluate the capability without making unsupported claims.

## 4. The weekly production unit

A sustainable weekly unit is:

1. **One technical question.**
2. **One experiment.**
3. **One evidence artifact.**
4. **One canonical research article.**
5. **One GitHub reproduction/example.**
6. **One documentation improvement.**
7. **Three to five short distribution assets.**
8. **One targeted community discussion.**
9. **One measured CTA path.**

The goal is not volume. The goal is evidence density and reuse.

## 5. Content atomization model

One strong research result should produce a content tree:

```text
Research result
├── Canonical research article
├── Methodology / technical note
├── GitHub reproduction
├── Detection-pack example
├── Documentation update
├── Evidence screenshot/diagram where appropriate
├── Short technical video/demo
├── LinkedIn technical post
├── X thread
├── Dev/security community post
├── Newsletter item
└── Sales enablement excerpt
```

The canonical article remains the source of truth. Derivative assets must not introduce stronger claims than the underlying evidence.

## 6. SEO and AI-search strategy

Optimize around problems and technical concepts rather than only the product name.

Priority topic families:

- detecting C2 traffic without payload decryption
- encrypted traffic behavioral analysis
- C2 beaconing detection
- threat hunting for reduced observability
- entropy-based network anomaly detection
- living-off-the-land network behavior
- behavioral detection vs signature detection
- network evidence and MITRE ATT&CK mapping
- PCAP threat hunting
- network threat detection research

Use strong technical authorship, reproducible evidence, clear citations, explicit limitations, and first-party implementation references. Avoid keyword stuffing and generic AI-generated security content.

## 7. Distribution strategy

### Tier 1: owned

- ThreatFade website
- Research section
- Documentation
- GitHub repository
- release notes

### Tier 2: professional

- LinkedIn
- X
- security engineering communities
- relevant newsletters
- technical forums

### Tier 3: discovery

- search engines
- AI answer/search systems
- developer communities
- security research indexes
- conferences and talks

The canonical asset should always lead users to a concrete next action: research reproduction, playground, docs, GitHub, assessment, or enterprise evaluation.

## 8. Content-to-conversion mapping

| Content type | Primary CTA |
|---|---|
| Beginner explainer | Explore detection |
| Technical research | Reproduce experiment |
| Detection engineering | GitHub / detection pack |
| Benchmark | Compare / reproduce |
| SOC workflow | Run playground / assessment |
| Security architecture | Enterprise evaluation |
| Customer case study | Assessment / contact |
| Release note | Upgrade / GitHub |

## 9. Evidence rules

ThreatFade content must distinguish:

- implemented behavior
- observed experiment result
- benchmark result
- hypothesis
- roadmap/proposal
- customer-specific observation

Never convert a laboratory result into a universal accuracy claim. Never imply certification, independent assurance, or production effectiveness unless supported by the appropriate evidence.

## 10. Research-to-product loop

Content should improve the product.

When readers repeatedly ask:

- "Can it detect X?"
- "Can it integrate with Y?"
- "Can it run in Z environment?"
- "How do I validate this?"

turn those questions into product backlog candidates or research experiments.

The loop becomes:

```text
Audience question
 -> Research
 -> Product capability
 -> Evidence
 -> Documentation
 -> Content
 -> Audience question
```

## 11. Content metrics

### Reach

- qualified organic impressions
- research-page entrances
- referral traffic
- branded search growth
- AI/search citations where measurable

### Engagement

- article completion proxies
- code/example engagement
- playground starts
- GitHub clicks
- docs starts

### Authority

- backlinks
- citations
- technical mentions
- contributors
- external reproductions
- community discussion quality

### Conversion

- research -> playground
- research -> GitHub
- research -> assessment
- research -> enterprise evaluation
- content-assisted pipeline

## 12. Editorial cadence

Prefer:

- 1 substantial research artifact/week when evidence supports it
- continuous documentation improvements
- derivative social distribution from canonical work
- monthly synthesis/benchmark content
- quarterly major research narrative

Do not manufacture research to satisfy a calendar.

## 13. The content moat

The defensible asset is not article count. It is the accumulation of:

**research questions + experiments + evidence + detection packs + benchmarks + reproducibility + customer-derived insights.**

Over time this creates a proprietary body of technical knowledge around fade events and adversarial reduction of observability.

## 14. Content flywheel health

The system is healthy when:

1. Research creates qualified discovery.
2. Discovery creates product interaction.
3. Interaction creates GitHub adoption or evaluation.
4. Usage creates questions and evidence.
5. Evidence creates better research.
6. Better research increases authority and discovery.

## 15. Related strategy documents

- `docs/strategy/CONVERSION-FLYWHEEL.md`
- `docs/strategy/COMMERCIAL-FLYWHEEL.md`
