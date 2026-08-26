# SEO and AI discovery architecture

## Principles

ThreatFade uses conventional technical SEO as the foundation for discovery. There is no separate "AI SEO" trick layer. Pages are indexable, canonical, semantically structured and written for people first.

Google's current guidance for AI Overviews and AI Mode states that the same foundational Search practices apply: pages must be eligible for Search, and useful, reliable, people-first content remains central. Google also warns against scaled content produced primarily to manipulate Search. ThreatFade therefore treats AI assistance as a research/editing aid rather than a content-production shortcut.

## Entity model

- **Tinlance Limited** — publisher/organization.
- **ThreatFade** — the open-core security application and product entity.
- **ThreatFade engine** — the implementation and API source of truth represented by the product's repository.
- **ThreatFade website** — the canonical public information surface.
- **Research artifacts** — versioned protocols, benchmark manifests, challenge contracts and execution reports.
- **Detection concepts** — C2 detection, encrypted-traffic behavioral analysis, QUIC C2 validation, entropy-based detection, beaconing and related concepts are published only with an explicit evidence boundary.

## Structured data

Sitewide JSON-LD provides Organization, SoftwareApplication and WebSite entities. Research pages provide TechArticle plus BreadcrumbList. Detection topic pages provide DefinedTerm plus BreadcrumbList.

Structured data must represent visible page content. Do not add ratings, customers, certifications, offers, guarantees, fabricated metrics or other properties merely to obtain a rich result. Google's general structured-data guidelines require markup to describe the page it is placed on and recommend the most specific applicable type/property.

## Canonicalization

Every indexable route has one canonical URL under `https://threatfade.com`. Dynamic research, docs and detection-topic routes generate their canonical URL from the route slug.

Research filtering is client-side and does not create indexable filter URLs, avoiding unnecessary duplicate/faceted navigation pages. The research index remains a single canonical discovery page.

## Indexing

`app/robots.ts` permits crawling and advertises `/sitemap.xml`. The sitemap is generated from stable route lists plus research, documentation and evidence-backed detection topics. It includes the Phase 16 research challenge and must not include API endpoints or non-public application state.

## Content architecture

Technical pages should answer a specific search intent directly, define terminology, state the evidence class, link to primary documentation/research and expose the source repository where useful. Avoid keyword stuffing and avoid publishing speculative capabilities as current functionality.

The Phase 16 topic cluster covers behavioral threat detection, C2 detection, encrypted traffic detection, entropy-based detection, network threat hunting, detection engineering, beaconing and QUIC C2, with internal links into research, docs and product surfaces.

## Research discoverability

Each research item exposes:

- title and technical description;
- category and tags;
- publication/update date;
- explicit evidence class;
- references;
- reproducibility artifacts where available;
- canonical URL;
- related product/documentation routes.

The research index supports user-facing search and category filtering. The filter is intentionally not a separate crawlable URL surface.

## AI-search readiness

The content is designed to be easy for retrieval systems and human readers to cite because it uses:

- precise definitions;
- short answer-first sections;
- explicit scope and limitations;
- stable URLs;
- source artifacts and repository references;
- structured metadata;
- internal links between concept → research → documentation → product;
- versioned protocols rather than unsupported claims.

This is an information architecture choice, not a claim of guaranteed AI-search placement.

## Verification checklist

- unique title and description for primary pages
- canonical URL
- Open Graph metadata
- semantic H1/H2 hierarchy
- internal links to related product/research/docs pages
- sitemap coverage
- robots coverage
- valid JSON-LD syntax
- no fabricated structured-data properties
- no broken internal links
- noindex only where intentionally required
- research filter does not create crawlable duplicate pages
- every quantitative claim has an evidence source

## Primary guidance

- Google Search Central — AI features and your website
- Google Search Central — optimizing websites for generative AI features
- Google Search Central — creating helpful, reliable, people-first content
- Google Search Central — general structured data guidelines
- Google Search Central — crawling/indexing and canonicalization
- Next.js App Router Metadata API
