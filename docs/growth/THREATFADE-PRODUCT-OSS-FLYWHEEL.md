# ThreatFade Product / OSS Flywheel

**Status:** Strategic baseline  
**Date:** 2026-08-25  
**Scope:** Open-core adoption, community feedback, detection packs, engineering, releases, and product improvement  

## Purpose

Create a compounding product loop in which OSS adoption generates feedback and contributions, paid deployments reveal valuable requirements, and validated improvements strengthen the core product without compromising customer confidentiality or the open-core promise.

## Flywheel

```text
OSS discovery
     ↓
Install / clone
     ↓
First detection
     ↓
Repeat usage
     ↓
Issues / questions / contributions
     ↓
Detection packs + engineering improvements
     ↓
Better product + benchmarks
     ↓
Better documentation / examples
     ↓
More GitHub adoption
     ↺
```

Commercial feedback creates a second loop:

```text
Enterprise problem
      ↓
Assessment / pilot
      ↓
Validated requirement
      ↓
Engineering
      ↓
Generalizable capability
      ↓
Core/product improvement
      ↓
Stronger OSS
      ↓
More qualified adoption
```

## OSS principles

1. Keep the core detection thesis genuinely useful.
2. Optimize for reproducibility and technical trust.
3. Make installation and first detection easy.
4. Treat documentation as part of the product.
5. Make contribution paths clear.
6. Publish release notes and meaningful changes.
7. Never add customer-sensitive behavior to public artifacts.
8. Commercialize operational scale, governance, deployment, support, integrations, and expertise—not artificial crippling of the core detection idea.

## Adoption stages

### Discover

GitHub, research, technical content, community, references.

### Install

User reaches a successful local setup.

### Activate

User performs first meaningful detection and inspects evidence.

### Repeat

User runs additional scenarios or workflows.

### Contribute

User files issues, improves docs, adds examples, submits code, or develops detection content.

### Advocate

User recommends ThreatFade or shares results.

## Community contribution paths

- bug reports;
- feature requests;
- detection-pack proposals;
- documentation improvements;
- examples;
- benchmarks;
- integrations;
- research reproduction;
- code contributions.

Contributions must pass the project's security, quality, licensing, and review requirements.

## Detection-pack flywheel

```text
New threat behavior
      ↓
Detection hypothesis
      ↓
Detection pack
      ↓
Benchmark
      ↓
Regression test
      ↓
Release
      ↓
Community use
      ↓
Feedback
      ↺
```

Detection packs should be versioned and validated. Avoid publishing claims that are not supported by the benchmark or test environment.

## Product feedback classification

Every issue or request should be classified as:

- defect;
- security issue;
- usability friction;
- detection gap;
- integration need;
- documentation gap;
- performance issue;
- research question;
- enterprise-only requirement;
- roadmap idea.

Not every request belongs in the core product.

## Commercial-to-core decision rule

Before moving a customer-funded capability into the core product, ask:

1. Is it generalizable?
2. Does it improve the fundamental product?
3. Can it be safely exposed?
4. Does licensing permit it?
5. Does publishing it reveal customer-sensitive information?
6. Does it create support burden that outweighs adoption value?
7. Can it be maintained and tested?

## Product metrics

Track:

- installs/clones;
- first detections;
- repeat users;
- GitHub stars/forks;
- contributors;
- issue quality;
- PR acceptance;
- detection-pack adoption;
- release frequency;
- time-to-fix;
- time-to-first-detection;
- regressions;
- documentation completion;
- commercial leads attributable to OSS.

The strongest OSS KPI is not stars alone. It is:

> **Qualified users who successfully activate and return.**

## Release quality

Every release should have:

- reproducible build/process;
- tests;
- security checks;
- dependency review;
- documentation update;
- release notes;
- migration guidance where needed;
- regression coverage for meaningful detection behavior.

## Definition of a healthy OSS flywheel

More qualified users discover ThreatFade; more users reach first detection; useful feedback and contributions improve the product; improvements increase adoption; enterprise work creates generalizable capabilities; the stronger product generates more research and commercial opportunities.

## Relationship to other flywheels

**Research → Content → Demand → Conversion → Commercial → Customer Value → Product/OSS → Research.**
