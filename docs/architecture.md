# ThreatFade Web Architecture

## Boundary

ThreatFade Web is intentionally separate from the ThreatFade engine repository. The website is responsible for public product communication, research, documentation, demonstrations and the SOC/enterprise presentation layer. The engine repository remains the source of truth for implemented detection behavior, analyst capabilities, authorization and validation evidence.

- Engine source of truth: https://github.com/LloydCoder/tinlance-threatfade
- Web platform: https://github.com/LloydCoder/tinlance-threatfade-web

```text
Visitor / Analyst browser
          │
          ▼
   Next.js 16 web platform
     ├── Marketing
     ├── Research / MDX
     ├── Documentation / MDX
     ├── Safe Playground
     └── SOC / Enterprise
             │
             ▼
     Server-side analyst proxy
             │
             ▼
 ThreatFade engine / analyst API
```

## Application boundaries

- `app/`: route composition and Next.js conventions.
- `components/`: reusable UI and domain presentation.
- `content/`: version-controlled research and documentation.
- `lib/`: integration, validation, SEO, analytics and security logic.
- `config/`: canonical product/navigation configuration.
- `public/`: static assets.
- `tests/`: unit, integration, accessibility and browser verification.

## Rendering policy

Server Components are the default. Client Components are reserved for genuine interaction such as signal visualizations, playground controls and interactive evidence/investigation views.

## SOC boundary

The SOC workspace consumes only the engine's canonical authenticated analyst API. Browser code never constructs privileged engine URLs or decides tenant identity. `/api/analyst/*` is a server-side path allowlist that forwards the authenticated consumer token; the engine remains authoritative for authentication, RBAC and tenant-scoped object authorization.

The SOC workspace exposes only engine-backed capabilities: detection inbox, investigation detail, evidence/provenance, entities, sessions, cases, workflow state, dispositions and analyst history. It does not fabricate detection state or imply engine functionality that is absent from the engine repository.

## Claim boundary

The website may publish claims only when they are supported by current engine documentation, tests, benchmarks or clearly labeled external evidence. Repository validation must not be presented as universal accuracy, certification, independent assurance, SLA or customer-scale performance.

## Security boundary

The playground is treated as hostile-input infrastructure. Curated sample scenarios are the initial public mode. Arbitrary file processing requires validation, rate limiting, resource limits, isolation and an explicit security review.

SOC proxy requests are bounded, redirect-free and server-side. Mutations require same-origin request context and JSON bodies. Upstream failures are sanitized and privileged credentials are never exposed to client JavaScript.

## Evolution

A monorepo is intentionally not used. If the web repository grows into multiple independently deployable applications, shared packages can be introduced deliberately rather than preemptively.

## Phase 12 record

The canonical Phase 12 implementation and release boundary is documented in `docs/release/phase12-soc-productization.md`.
