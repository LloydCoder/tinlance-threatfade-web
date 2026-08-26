# ThreatFade Research Editorial Governance

## Purpose

ThreatFade research is a technical evidence surface, not a high-volume SEO content factory. Publications must add original analysis, reproducible methodology, implementation evidence or a clearly labeled research hypothesis.

Google's current guidance emphasizes helpful, reliable, people-first content and warns against scaled content created primarily to manipulate Search. ThreatFade therefore treats AI assistance as an editing/research aid, never as a substitute for evidence or technical review.

## Evidence policy

Every research item has one evidence class:

| Class              | Meaning                         | Allowed claims                          |
| ------------------ | ------------------------------- | --------------------------------------- |
| Synthetic          | Deterministic/generated fixture | Fixture-level behavior only             |
| Project validation | Repository-backed evaluation    | Conditions documented in the repository |
| Independent        | Independent corpus/evaluation   | Only the scope actually evaluated       |
| Experimental       | Candidate method                | Experimental findings only              |
| Planned            | Protocol/hypothesis             | No observed result claim                |

## Claim policy

Before publication:

1. Every quantitative claim must point to an execution artifact or primary source.
2. Every capability claim must be traceable to the engine or web implementation.
3. Benchmark targets must never be presented as observed results.
4. Repository tests must not be presented as independent assurance.
5. Synthetic data must be labeled synthetic.
6. Correlation must not be described as causation without causal evidence.
7. Security assurance claims require the exact assurance evidence.
8. Unknowns and limitations belong in the publication, not in a private footnote.

## Review process

1. Author drafts the research question and evidence class.
2. Engineer verifies implementation references and reproducibility commands.
3. Security reviewer checks for sensitive artifacts, unsafe challenge boundaries and unsupported security claims.
4. Editor checks clarity, citations, terminology and internal linking.
5. Release owner verifies metadata, canonical URL, sitemap inclusion and status.
6. Published corrections receive an updated date and a changelog entry when material.

## Versioning

Research protocols and benchmark manifests use explicit versions. Changing the dataset, split, detector configuration or metric contract requires a new version rather than silently rewriting history.

## Corrections

Material errors are corrected publicly. The page must identify what changed, why it changed and which evidence is authoritative. Superseded benchmark artifacts remain discoverable where practical so the historical record is auditable.

## AI-assisted writing

AI may help summarize source material, generate outlines or identify missing questions. A human maintainer remains responsible for the final technical claim. Generated text must not introduce unsupported citations, invented results, fabricated quotations, synthetic customer evidence or unverified security claims.

## Distribution

A flagship study should be atomized into technical articles, documentation references, GitHub artifacts and social distribution only after the source evidence is stable. Distribution copy must preserve the same evidence class and limitations as the source publication.
