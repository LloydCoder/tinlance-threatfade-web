# ThreatFade Web

The official ThreatFade web platform: product discovery, documentation, security research, interactive demonstrations and enterprise evaluation.

> ThreatFade is an evidence-first detection and investigation platform for adversarial activity that becomes intentionally less observable.

## Repository boundary

This repository contains the public web platform. The detection engine and core security technology live in the separate open-source repository:

- **Engine:** https://github.com/LloydCoder/tinlance-threatfade
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
   └── Enterprise
          │
          ▼
     Explicit API boundary
          │
          ▼
  ThreatFade engine / API
```

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

## Content policy

Published claims must be traceable to repository evidence or clearly labeled as roadmap/proposal material. The site does not represent repository tests as universal accuracy guarantees, nor engineering controls as SOC 2/ISO certification or independent assurance.

## Security

See [SECURITY.md](./SECURITY.md). Report vulnerabilities through the documented security channel rather than public issues.

## License

The website source is licensed under the repository's MIT license. ThreatFade engine licensing is governed by the engine repository.
