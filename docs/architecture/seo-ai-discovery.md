# SEO and AI discovery architecture

## Principles

ThreatFade uses conventional technical SEO as the foundation for discovery. There is no separate "AI SEO" trick layer. Pages are indexable, canonical, semantically structured and written for people first.

Current Google guidance says AI Overviews and AI Mode have no additional technical requirements beyond being indexable and eligible for normal Search; helpful, reliable, people-first content and normal SEO fundamentals remain the foundation.

## Entity model

- **Tinlance Limited** — publisher/organization.
- **ThreatFade** — the open-core security application and product entity.
- **ThreatFade engine** — the implementation and API source of truth represented by the product's repository.
- **ThreatFade website** — the canonical public information surface.
- **Detection concepts** — C2 detection, encrypted-traffic behavioral analysis, QUIC C2 validation, entropy-based detection and related concepts are published only with an explicit evidence boundary.

## Structured data

Sitewide JSON-LD provides Organization, SoftwareApplication and WebSite entities. Research and documentation pages provide TechArticle plus BreadcrumbList. Detection topic pages provide DefinedTerm plus BreadcrumbList.

Structured data must represent content visible on the page. Do not add ratings, customers, certifications, offers, guarantees, FAQs or other properties merely to obtain a rich result.

## Canonicalization

Every indexable route has one canonical URL under `https://threatfade.com`. Dynamic research, docs and detection-topic routes generate their canonical URL from the route slug.

## Indexing

`app/robots.ts` permits crawling and advertises `/sitemap.xml`. The sitemap is generated from stable route lists plus research, documentation and evidence-backed detection topics. It must not include API endpoints or non-public application state.

## Content architecture

Technical pages should answer a specific search intent directly, define terminology, state the evidence class, link to primary documentation/research and expose the source repository where useful. Avoid keyword stuffing and avoid publishing speculative capabilities as current functionality.

## Verification checklist

- unique title and description for primary pages
- canonical URL
- Open Graph metadata
- Twitter/X card metadata
- semantic H1/H2 hierarchy
- internal links to related product/research/docs pages
- sitemap coverage
- robots coverage
- valid JSON-LD syntax
- no fabricated structured-data properties
- no broken internal links
- noindex only where intentionally required

## Sources

- Google Search Central: AI features and your website
- Google Search Central: General structured data guidelines
- Google Search Central: Organization, SoftwareApplication, Article and Breadcrumb structured data
- Next.js Metadata API and App Router SEO guidance
