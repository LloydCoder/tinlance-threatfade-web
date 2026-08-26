# ThreatFade Phase 16 — Research and Content Scale

**Status:** Implemented on branch; awaiting CI gate.  
**Scope:** research authority, reproducibility, benchmark protocol, detection challenge, technical SEO/AI discovery, research UX and editorial governance.

## Source-of-truth boundary

The engine repository remains authoritative for detection behavior, datasets, benchmark harnesses and validation evidence. The web repository publishes and explains that evidence; it must not invent benchmark results or production capabilities.

## Implemented

### 16.1 Flagship research program

- Published the protocol for **Behavioral Fade Detection Reproducibility Study v1**.
- Pinned the research question, existing detector boundary, dataset, metrics, provenance and publication gate.
- Added the corresponding engine-side study manifest under `research/phase16/`.

### 16.2 Benchmark infrastructure

- Published a benchmark protocol separating detection quality from software data-plane performance.
- Reuses the engine's existing ground-truth fixture and benchmark harness.
- No new benchmark result is claimed by this phase.

### 16.3 Detection Challenge

- Added `/research/challenge`.
- Added engine-side Challenge v1 contract with Track A reproduction, Track B independent detector and Track C robustness research.
- Submission rules include provenance, anti-leakage and bounded evaluation requirements.
- Leaderboard remains empty until real submissions are evaluated.

### 16.4 Content system

Research is structured as:

**protocol → reproducible run → benchmark artifact → technical analysis → docs → GitHub artifact → distribution → evaluation evidence → commercial proof where supported**

### 16.5 SEO

Research metadata, canonical URLs, sitemap coverage, internal links and technical topic architecture are extended without keyword stuffing. Google Search's current guidance continues to emphasize helpful, reliable, people-first content and ordinary SEO fundamentals for AI Search/AI Overviews. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)

### 16.6 AI search

There is no separate “AI SEO” trick layer. Pages expose precise terminology, explicit evidence class, references, source artifacts and canonical URLs. This follows Google's current guidance that AI Search relies on the same foundational Search eligibility and quality practices. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)

### 16.7 Research UX

- Search across title, description, category and tags.
- Category filters.
- Evidence-class visibility.
- Artifact links.
- Challenge and flagship-study paths.
- Empty-state handling.
- Research metadata exposed on detail pages.

### 16.8 Editorial governance

See `docs/research/editorial-governance.md`.

## Evidence classes

- **Synthetic:** deterministic fixtures or generated scenarios.
- **Project validation:** repository-backed evaluation under documented conditions.
- **Independent:** independently collected/labeled or third-party evaluation.
- **Experimental:** candidate methods not promoted to production.
- **Planned:** protocol or future evidence requiring execution/external review.

## Publication gate

A research result may only be promoted to `validated` when its evidence supports that label. A benchmark target, roadmap capability, synthetic test or protocol is never sufficient by itself to claim production performance or universal detection accuracy.

## Security and privacy

Research artifacts must not contain customer telemetry, credentials, secrets, sensitive packet contents or uncontrolled executable submissions. Public challenge evaluation must remain isolated from production systems.

## Success measures

Phase 16 is successful when the repository can repeatedly produce:

- a versioned research protocol;
- a reproducible execution artifact;
- a citable technical publication;
- a discoverable research artifact with canonical metadata;
- a GitHub artifact that a researcher can inspect and reproduce;
- measurable research-to-product CTA events without sensitive telemetry collection.
