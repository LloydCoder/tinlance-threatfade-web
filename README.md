# ThreatFade Web

The official ThreatFade web platform: product discovery, documentation, security research, interactive demonstrations and enterprise evaluation.

> ThreatFade is an evidence-first detection and investigation platform for adversarial activity that becomes intentionally less observable.

## Repository boundary

This repository contains the public web platform. The detection engine and core security technology live in the separate open-source repository:

- **Engine:** https://github.com/LloydCoder/tinlance-threatfade
- **Web repository:** https://github.com/LloydCoder/tinlance-threatfade-web
- **Website:** https://threatfade.com

The website must never invent capabilities or assurance claims. The engine repository is the source of truth for implemented detection behavior, integrations, validation evidence and security controls.

## Stack

- Next.js 16 / App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui primitives
- Motion for purposeful interaction
- MDX content architecture
- Vitest + Testing Library
- Playwright
- GitHub Actions
- Vercel deployment target

## Architecture

```text
Browser
   │
   ▼
Next.js web platform
   ├── Marketing
   ├── Research + benchmark protocols + challenge
   ├── Documentation
   ├── Playground
   └── SOC / Commercial
          │
          ▼
   Server-side analyst API proxy
          │
          ▼
  ThreatFade engine / API
```

The engine integration is server-side and typed. `lib/api/client.ts` owns public engine URLs, timeouts, retries, response-size limits, redirect behavior and schema validation. The SOC workflow uses an additional server-only `/api/analyst/*` proxy. The proxy requires a real authenticated consumer bearer token and forwards it so the engine makes the authorization decision for the actual subject; it never accepts a browser-supplied tenant header as an authorization decision.

The public playground is treated as an untrusted-input boundary. Curated demonstrations come first; arbitrary PCAP processing requires a separately reviewed isolation and resource-control design.

## Research and content scale

Phase 16 turns ThreatFade research into a reproducible authority loop rather than a generic content factory:

**Research question → protocol → reproducible run → benchmark artifact → technical analysis → documentation → GitHub artifact → distribution → evaluation evidence → supported commercial proof**

The research index supports search and category filtering and exposes an explicit evidence class for every publication. The flagship **Behavioral Fade Detection Reproducibility Study v1** is protocol-first; it does not publish invented results. The public **Detection Challenge v1** uses non-sensitive synthetic artifacts, anti-leakage rules and a deliberately empty leaderboard until real submissions are evaluated.

Research claims follow an evidence ladder: synthetic, project validation, independent, experimental and planned. See [`docs/PHASE-16-RESEARCH-CONTENT-SCALE.md`](./docs/PHASE-16-RESEARCH-CONTENT-SCALE.md) and [`docs/research/editorial-governance.md`](./docs/research/editorial-governance.md).

The SEO/AI-search architecture follows conventional technical SEO and current Google guidance: useful people-first content, indexability, canonical URLs, accurate structured data, internal linking and citable primary-source artifacts. There is no separate AI-search trick layer. See [`docs/architecture/seo-ai-discovery.md`](./docs/architecture/seo-ai-discovery.md).

## SOC analyst workspace

Phase 12 adds an engine-backed investigation workflow covering detection inbox, investigation detail, evidence/provenance, entities, sessions, cases, workflow state and analyst disposition/history. The web application does not fabricate analyst data or duplicate engine persistence. The engine repository remains authoritative for capability, authentication, authorization and tenant isolation.

See [`docs/release/phase12-soc-productization.md`](./docs/release/phase12-soc-productization.md) for the canonical Phase 12 implementation and release boundary.

## Commercialization

Phase 14 adds a commercial decision layer without introducing fake SaaS billing or unsupported entitlements. The public starting rate card is:

| Offer | Starting standard |
| --- | ---: |
| Community / Open Core | $0 |
| Pro | $49/month or $490/year |
| Team | $299/month or $2,990/year |
| Detection Gap Assessment | $5,000+ |
| Paid Pilot | $7,500–$15,000 |
| Enterprise | $25,000+/year |
| Managed | $3,500–$15,000+/month |
| Custom Detection Engineering | $5,000–$25,000+ |
| Research Partnership | $25,000–$150,000+ |

Commercial routes:

- `/pricing` — value ladder, packaging, FAQ and commercial trust.
- `/assessment` — Detection Gap Assessment methodology and qualification.
- `/pilot` — bounded 30–60 day paid pilot and success criteria.
- `/enterprise` — annual enterprise evaluation and deployment path.
- `/managed` — managed detection and engineering service.

These prices are public planning standards, not contractual promises. Final quotes reflect deployment, usage, integrations, support and security requirements. Phase 14 does not claim payment processing, entitlement enforcement or billing infrastructure that is not implemented.

The primary high-intent path is **Community → Assessment → Pilot → Enterprise → Managed**, while Pro and Team are optional commitment bridges. See [`docs/PHASE-14-COMMERCIALIZATION.md`](./docs/PHASE-14-COMMERCIALIZATION.md) for the authoritative implementation boundary and [`docs/growth/THREATFADE-COMMERCIAL-FLYWHEEL.md`](./docs/growth/THREATFADE-COMMERCIAL-FLYWHEEL.md) for the strategic flywheel.

## Conversion engine

Phase 15 adds the measurable acquisition → activation → evaluation → revenue boundary. The canonical website events are defined in `lib/analytics/taxonomy.ts` and captured through the server-side `/api/analytics/event` boundary.

The website-level funnel is:

**Visitor → Research/Product engagement → GitHub → Installation → First detection → Repeat detection → Evaluation request → Assessment → Pilot → Enterprise → Expansion**

The website only emits events it can actually observe. Installation, organization activation, contract revenue and expansion remain authoritative in product/commercial systems. The site does not fabricate those outcomes.

Attribution is limited to UTM source/medium/campaign/content, landing path and referrer origin. Security telemetry, credentials, packet contents, incident data and unnecessary personal data are excluded.

Authenticated analytics administrators can use `/account/conversion` for the trailing-30-day funnel view. See [`docs/PHASE-15-CONVERSION-ENGINE.md`](./docs/PHASE-15-CONVERSION-ENGINE.md) for the authoritative taxonomy, activation definition, provider boundary, lead-capture controls and environment configuration.

## Development

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Engine integration configuration

Public engine integration uses server-only configuration:

```text
THREATFADE_API_URL
THREATFADE_API_TIMEOUT_MS
THREATFADE_API_MAX_RETRIES
```

Authenticated SOC requests forward the authenticated consumer bearer token through the server-side analyst proxy. Do not set a browser-controlled tenant variable. The ThreatFade engine derives the authoritative tenant from the authenticated principal. Production engine URLs must use HTTPS. Never expose engine credentials through `NEXT_PUBLIC_*` variables. See [`docs/engine-api-integration.md`](./docs/engine-api-integration.md) and [`docs/architecture.md`](./docs/architecture.md) for the synchronization and security boundary.

## Content policy

Published claims must be traceable to repository evidence or clearly labeled as roadmap/proposal material. The site does not represent repository tests as universal accuracy guarantees, nor engineering controls as SOC 2/ISO certification or independent assurance. AI assistance may support research or editing, but final publications require human evidence review and must add original value.

## Security

See [SECURITY.md](./SECURITY.md). Report vulnerabilities through the documented security channel rather than public issues.

## License

The website source is licensed under the repository's MIT license. ThreatFade engine licensing is governed by the engine repository.
