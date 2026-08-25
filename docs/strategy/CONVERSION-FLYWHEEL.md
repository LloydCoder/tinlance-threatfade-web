# ThreatFade Conversion Flywheel

**Status:** Active strategic baseline  
**Last reviewed:** 2026-08-25  
**Scope:** ThreatFade public web platform + open-source engine + enterprise evaluation journey

## 1. Purpose

The conversion flywheel turns ThreatFade attention into measurable product activation, technical adoption, qualified evaluations, pilots, enterprise revenue, and new proof that feeds future acquisition.

ThreatFade is not a conventional brochure-to-demo SaaS product. Its strongest conversion asset is evidence: a qualified visitor should be able to understand the "attackers go quiet" problem, experience a curated detection, inspect evidence, and then choose the next path appropriate to their role.

## 2. Core loop

```text
DISCOVER
  -> Understand the problem
  -> Experience a curated detection
  -> Inspect evidence
  -> Validate technical credibility
  -> Run/open-source ThreatFade
  -> Repeat analysis
  -> Become an internal champion
  -> Request assessment / pilot
  -> Deploy
  -> Generate customer evidence
  -> Publish sanitized proof / research
  -> DISCOVER
```

## 3. Primary activation event

The north-star activation event is:

> **A qualified user successfully experiences a ThreatFade detection and inspects the resulting evidence.**

A pageview, GitHub star, email click, or demo request is not activation by itself.

Recommended activation sequence:

1. Visitor lands on a problem-led page.
2. Visitor understands what "fade" means.
3. Visitor starts a curated playground/research demonstration.
4. Visitor sees signal reduction, anomaly/detection output, evidence, and ATT&CK context where applicable.
5. Visitor chooses a next action: GitHub, Docs, Research, Assessment, or Enterprise.

## 4. Persona conversion paths

| Persona | Primary proof | Next action | Commercial direction |
|---|---|---|---|
| Developer | Runnable OSS + docs | GitHub / install | Pro / Team |
| Threat hunter | Detection + evidence | Playground / engine | Pro / Team |
| Researcher | Reproducible experiment | Research / GitHub | Research partnership |
| SOC analyst | Investigation workflow | Assessment / pilot | Enterprise |
| Security leader | Risk + evidence + deployment model | Assessment / contact | Enterprise / Managed |
| MSSP / security consultancy | Detection capability + integration | Partner/evaluation | Team / Enterprise / OEM-style discussion |

## 5. Website conversion architecture

The web repository is the public orchestration layer. Its README defines the platform as product discovery, documentation, security research, interactive demonstrations, and enterprise evaluation, with the engine repository as the source of truth for implemented detection behavior and validation evidence.

Primary journeys:

- **Product -> Detection -> How it works -> Playground**
- **Research -> evidence -> GitHub -> reproducibility**
- **Docs -> install/integration -> repeated usage**
- **Enterprise -> assessment/evaluation -> pilot -> contract**

The site must not invent capabilities or assurance claims.

## 6. Conversion event taxonomy

The current website already defines these provider-neutral events:

- `run_playground`
- `view_github`
- `read_docs`
- `explore_research`
- `request_evaluation`
- `contact_threatfade`

These are intentionally non-PII and provider-neutral. The existing event contract should remain the canonical semantic layer; analytics providers may subscribe without changing event meanings.

## 7. Funnel instrumentation

Track the following stages:

### Acquisition

- qualified landing sessions
- source/channel
- research-page entry
- GitHub referral
- branded vs non-branded search

### Activation

- playground start
- playground completion
- evidence viewed
- GitHub click
- docs entry
- first successful local detection where measurable

### Evaluation

- assessment request
- evaluation request
- technical qualification
- pilot start
- pilot completion

### Revenue

- paid conversion
- annual contract value
- expansion
- managed-service attachment
- renewal

### Flywheel health

- qualified new users generated per existing active user/customer
- research artifacts generated per meaningful detection
- customer evidence converted into publishable proof
- repeat usage rate

## 8. Conversion principles

### Evidence before persuasion

Do not rely on generic claims such as "AI-powered cybersecurity". Show the detection, evidence chain, limitations, and operational context.

### One next action per intent

Do not force every visitor into a sales CTA.

- Developer -> GitHub
- Researcher -> Research
- Analyst -> Detection/Playground
- Enterprise -> Assessment/Evaluation

### Open source is a conversion asset

The open-source engine is not a free trial with artificial crippling. It is the technical trust layer. Commercial value comes from operationalization, collaboration, enterprise controls, support, managed capability, and specialized services.

### Assessment is the enterprise bridge

The preferred enterprise path is:

```text
OSS / Research
  -> Assessment
  -> Paid Pilot
  -> Enterprise
  -> Managed / Expansion
```

This avoids asking an enterprise buyer to purchase an unfamiliar security platform before seeing evidence in its own environment.

## 9. Conversion targets

Targets should be treated as operating hypotheses until production data exists.

Initial planning model:

```text
1,000 qualified visitors
 -> 100 meaningful product interactions
 -> 30 technical activations
 -> 10 recurring users
 -> 3 qualified organizational evaluations
 -> 1 assessment/pilot opportunity
 -> enterprise conversion
```

Do not treat these ratios as industry benchmarks. Replace them with observed ThreatFade cohorts as soon as enough traffic exists.

## 10. Anti-patterns

Avoid:

- forcing every visitor to "Book a Demo"
- hiding the OSS engine behind lead capture
- fake scarcity
- unsupported detection/accuracy claims
- collecting unnecessary PII
- confusing tests with universal security guarantees
- pricing based only on seats when organizational detection scope is the real value driver

## 11. Definition of a healthy flywheel

The conversion flywheel is working when:

1. Research creates qualified traffic.
2. Traffic reaches an evidence-producing experience.
3. Evidence causes technical activation.
4. Technical activation produces organizational conversations.
5. Assessments/pilots produce revenue.
6. Deployments produce evidence and customer insight.
7. Evidence creates new research/content.
8. New research brings in the next qualified cohort.

## 12. Source-of-truth boundary

The web platform must derive product claims from the engine repository. The engine repository remains authoritative for implemented detection behavior, integrations, validation evidence, and security controls. The web repository owns public presentation, research publishing, documentation, playground UX, and enterprise evaluation flows.

## 13. Related strategy documents

- `docs/strategy/CONTENT-FLYWHEEL.md`
- `docs/strategy/COMMERCIAL-FLYWHEEL.md`
- `docs/enterprise/conversion-events.md`
