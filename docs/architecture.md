# ThreatFade Web Architecture

## Boundary

ThreatFade Web is intentionally separate from the ThreatFade engine repository. The website is responsible for public product communication, research, documentation, demonstrations and enterprise evaluation. The engine repository remains the source of truth for implemented detection behavior.

```text
Visitor
  │
  ▼
Next.js 16 web platform
  ├── Marketing
  ├── Research / MDX
  ├── Documentation / MDX
  ├── Safe Playground
  └── Enterprise
          │
          ▼
   Explicit HTTPS/API boundary
          │
          ▼
ThreatFade API / detection engine
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

Server Components are the default. Client Components are reserved for genuine interaction such as signal visualizations, playground controls and future interactive evidence views.

## Claim boundary

The website may publish claims only when they are supported by current engine documentation, tests, benchmarks or clearly labeled external evidence. Repository validation must not be presented as universal accuracy, certification, independent assurance, SLA or customer-scale performance.

## Security boundary

The playground is treated as hostile-input infrastructure. Curated sample scenarios are the initial public mode. Arbitrary file processing requires validation, rate limiting, resource limits, isolation and an explicit security review.

## Evolution

A monorepo is intentionally not used. If the web repository grows into multiple independently deployable applications, shared packages can be introduced deliberately rather than preemptively.
