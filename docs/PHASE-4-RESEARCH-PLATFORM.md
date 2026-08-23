# ThreatFade Web — Phase 4 Research Platform

The research platform is a first-class technical publication surface rather than a marketing blog.

## Evidence classes

- **validated** — supported by documented project evidence in the source repository.
- **synthetic** — illustrative material that is not an empirical result.
- **experimental** — work under evaluation and not presented as settled capability.
- **hypothesized** — a research proposition requiring validation.
- **planned** — intended future research or assurance activity.

## Content model

Research metadata is centralized in `content/research/index.ts`. Long-form articles live as MDX under `content/research/` and are rendered through the dynamic `/research/[slug]` route.

Each article carries authorship, publication date, category, tags, evidence status, reading time and references. Article pages emit `TechArticle` structured data and article Open Graph metadata.

## Research taxonomy

The initial taxonomy covers C2 behavior, encrypted traffic, entropy, behavioral fading, QUIC, detection methodology, validation, benchmarks and adversarial behavior. A taxonomy entry does not imply that a corresponding empirical result already exists.

## Claim discipline

The website must never turn repository validation into a universal accuracy claim, and must keep independent assurance separate from project evidence. New research should cite the engine repository or primary experimental artifact and state its limitations.
