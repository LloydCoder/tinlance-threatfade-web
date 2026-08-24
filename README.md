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
   ├── Research
   ├── Documentation
   ├── Playground
   └── SOC / Enterprise
          │
          ▼
   Server-side analyst API proxy
          │
          ▼
  ThreatFade engine / API
```

The engine integration is server-side and typed. `lib/api/client.ts` owns public engine URLs, timeouts, retries, response-size limits, redirect behavior and schema validation. The SOC workflow uses an additional server-only `/api/analyst/*` proxy. In normal multi-user mode it forwards the originating consumer bearer token so the engine makes the authorization decision for the actual subject; it never accepts a browser-supplied tenant header. An explicit `THREATFADE_SOC_SERVICE_MODE=true` exists only for single-tenant deployments protected by an upstream SSO/network boundary and is disabled by default.

The public playground is treated as an untrusted-input boundary. Curated demonstrations come first; arbitrary PCAP processing requires a separately reviewed isolation and resource-control design.

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

Authenticated SOC deployments normally forward a consumer bearer token through the authenticated request path. For an explicitly protected single-tenant service-mode deployment, the server-only configuration is:

```text
THREATFADE_API_URL
THREATFADE_API_TOKEN
THREATFADE_SOC_SERVICE_MODE=true
```

Do not set a browser-controlled tenant variable. The ThreatFade engine derives the authoritative tenant from the authenticated principal. Production engine URLs must use HTTPS. Never expose engine credentials through `NEXT_PUBLIC_*` variables. See [`docs/engine-api-integration.md`](./docs/engine-api-integration.md) and [`docs/PHASE-3-SOC-ANALYST-PLATFORM.md`](./docs/PHASE-3-SOC-ANALYST-PLATFORM.md) for the synchronization and security boundary.

## Content policy

Published claims must be traceable to repository evidence or clearly labeled as roadmap/proposal material. The site does not represent repository tests as universal accuracy guarantees, nor engineering controls as SOC 2/ISO certification or independent assurance.

## Security

See [SECURITY.md](./SECURITY.md). Report vulnerabilities through the documented security channel rather than public issues.

## License

The website source is licensed under the repository's MIT license. ThreatFade engine licensing is governed by the engine repository.
