<p align="center">
  <img src="public/brand/threatfade-wordmark-on-dark.svg" alt="ThreatFade — Network threat detection" width="420" />
</p>

<p align="center">
  <strong>Evidence-first detection and investigation for security teams assessing adversarial activity that becomes intentionally less observable.</strong>
</p>

<p align="center">
  <a href="https://github.com/LloydCoder/tinlance-threatfade-web/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/LloydCoder/tinlance-threatfade-web/actions/workflows/ci.yml/badge.svg?branch=main"></a>
  <a href="https://github.com/LloydCoder/tinlance-threatfade-web/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/LloydCoder/tinlance-threatfade-web/actions/workflows/codeql.yml/badge.svg?branch=main"></a>
  <a href="https://github.com/LloydCoder/tinlance-threatfade-web/actions/workflows/security.yml"><img alt="Security" src="https://github.com/LloydCoder/tinlance-threatfade-web/actions/workflows/security.yml/badge.svg?branch=main"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

> Product UI screenshots and a short end-to-end demonstration are not yet published in this repository. The official logo above is brand identification, not a product demo.

## Why ThreatFade Web

ThreatFade Web is the public product and evaluation surface for the separate ThreatFade detection engine. It brings product information, technical documentation, evidence-governed research, interactive demonstrations and authenticated analyst workflows into one application.

| Concern | ThreatFade Web approach |
|---|---|
| Product truth | Engine capability and validation status are synchronized from the engine repository; the website must not invent detection claims. |
| Evidence | Research content identifies its evidence class and limitations. Synthetic regression is not presented as independent real-world validation. |
| Security boundary | Server-side API clients and analyst proxies preserve engine-side authentication, authorization and tenant decisions. |
| User experience | Product, docs, research, evaluation and analyst workflows share a Next.js application. |
| Open source boundary | This repository contains the website. Detection logic and engine contracts live in the separate engine repository. |

## Quick start

Requirements: Node.js **20.19 or later** and npm.

```bash
git clone https://github.com/LloydCoder/tinlance-threatfade-web.git
cd tinlance-threatfade-web
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Installation

1. Install Node.js 20.19+ (Node.js 22 is used in CI) and npm.
2. Clone the repository and install the committed dependency graph with `npm ci`.
3. Copy `.env.example` to `.env.local` only if you are enabling integrations that require environment configuration.
4. Start the local server with `npm run dev`.

Do not add production secrets to `.env.example`, source control or any `NEXT_PUBLIC_*` variable. The package enforces its Node.js engine requirement through `.npmrc`.

## Usage

### Run the website

```bash
npm run dev
```

### Validate before submitting changes

```bash
npm run format:check
npm run docs:check
npm run growth:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The CI workflow is authoritative for required checks. Playwright may require browser installation on a fresh local environment; use `npx playwright install --with-deps chromium` when needed.

### Configure the engine API

The website's server-side engine integration reads:

| Variable | Purpose | Exposure |
|---|---|---|
| `THREATFADE_API_URL` | Engine API origin | Server only |
| `THREATFADE_API_TIMEOUT_MS` | Request timeout override | Server only |
| `THREATFADE_API_MAX_RETRIES` | Bounded retry override | Server only |

The implementation defaults are defined in `lib/api/client.ts`; consult [the configuration reference](docs/reference/configuration.md) before overriding them. Production engine URLs must use HTTPS.

Authenticated analyst requests forward the authenticated consumer bearer token through the server-side proxy. The engine remains authoritative for authorization and tenant derivation. A browser-supplied tenant header is never an authorization decision.

## Features

| Area | What the web application provides |
|---|---|
| Product | Product information, integrations, evaluation and enterprise pathways |
| Documentation | Version-aware engine documentation and installation guidance |
| Research | Searchable research library with evidence classes and editorial governance |
| Playground | Curated demonstrations with untrusted-input boundaries |
| SOC workspace | Engine-backed analyst workflows, evidence and case context where configured |
| Commercial evaluation | Assessment, pilot, enterprise and managed-service information |
| Conversion analytics | Privacy-conscious website event taxonomy and server-side event boundary |
| SEO and discovery | Canonical metadata, sitemap, structured content and internal linking |

Availability of authenticated or engine-backed features depends on deployment configuration and a compatible engine service. The website does not imply that every integration, commercial entitlement or payment workflow is enabled in every deployment.

## Architecture

```text
Browser
  |
  v
Next.js 16 / React 19 web application
  |-- Marketing and product pages
  |-- MDX documentation and research
  |-- Curated playground
  |-- Authenticated SOC / commercial surfaces
  |
  v
Server-side typed API client and analyst proxy
  |
  v
ThreatFade engine / API (separate repository)
  |-- Authentication and authorization
  |-- Tenant policy and audit
  |-- Detection and evidence
  |-- Persistence and integrations
```

The web application uses Next.js App Router, TypeScript, Tailwind CSS, MDX, Vitest, Testing Library and Playwright. Server Components remain the default; client components are used where interaction requires them.

## Documentation

| Resource | Description |
|---|---|
| [Documentation index](docs/README.md) | Navigation by tutorials, how-to guides, explanation and reference |
| [Getting started](content/docs/getting-started.mdx) | Product workflow and engine entry point |
| [Installation](content/docs/installation.mdx) | Local engine installation |
| [Configuration](content/docs/configuration.mdx) | Engine identity, tenancy and persistence |
| [Deployment](content/docs/deployment.mdx) | Production deployment boundaries |
| [Configuration reference](docs/reference/configuration.md) | Web/engine environment boundary |
| [Architecture](docs/architecture.md) | Web application architecture |
| [Engine/web compatibility](docs/ENGINE_WEB_COMPATIBILITY.md) | Integration contract and source-of-truth rules |
| [Research editorial governance](docs/research/editorial-governance.md) | Evidence and publication standards |
| [LLM project index](llms.txt) | Curated documentation entry points |

## Repository boundaries and product truth

- **Web:** https://github.com/LloydCoder/tinlance-threatfade-web
- **Engine:** https://github.com/LloydCoder/tinlance-threatfade
- **Canonical website:** https://threatfade.com

The engine repository is authoritative for implemented detection behavior, API contracts, validation evidence, integrations and security controls. The web repository consumes those contracts and presents them. The `content/engine-truth.json` manifest is synchronized with the engine source.

Research claims follow an evidence ladder: synthetic, project validation, independent, experimental and planned. The flagship reproducibility study is protocol-first; it does not invent results. The public Detection Challenge uses non-sensitive synthetic artifacts and does not publish an empty leaderboard as evidence of performance.

Commercial prices shown on the website are planning standards, not contractual promises. The site does not claim payment processing, entitlement enforcement or billing infrastructure unless those capabilities are implemented and verified.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and use the pull-request template. Security reports must follow [SECURITY.md](SECURITY.md), not public issues.

## License and acknowledgements

The source code in this repository is licensed under the [MIT License](LICENSE). The ThreatFade engine is a separate project licensed under Apache-2.0; its license does not change the license of this website repository.

ThreatFade uses open-source frameworks and libraries listed in `package.json` and `package-lock.json`. Their respective licenses remain applicable. The official ThreatFade brand assets are governed by the owner-supplied logo kit and [brand usage guide](brand/README.md).

## Troubleshooting

<details>
<summary>npm reports an unsupported Node.js version</summary>

Use Node.js 20.19 or later. Node.js 22 matches CI. The repository enables strict engine checks.
</details>

<details>
<summary>The website cannot reach the engine</summary>

Confirm `THREATFADE_API_URL` is set in the server environment, points to a reachable engine API and uses HTTPS in production. Check the deployed engine's `/health`, `/ready` and `/version` endpoints. Never expose engine credentials to browser code.
</details>

<details>
<summary>Playwright cannot find Chromium</summary>

Install the browser required by the E2E suite with `npx playwright install --with-deps chromium`.
</details>

## Support

See [SUPPORT.md](SUPPORT.md) for the right channel. Vulnerability reports belong in [SECURITY.md](SECURITY.md).
