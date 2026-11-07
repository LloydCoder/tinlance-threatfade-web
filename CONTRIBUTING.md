# Contributing to ThreatFade Web

Thank you for helping improve the public ThreatFade website. This repository owns the web application, documentation presentation, research publishing surface and web-to-engine integration. Detection logic and authoritative API behavior belong in the [ThreatFade engine repository](https://github.com/LloydCoder/tinlance-threatfade).

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating. For security issues, follow [SECURITY.md](SECURITY.md) rather than opening a public issue.

## Before you start

- Search existing issues and pull requests before proposing a change.
- For engine behavior, API contracts or detection capabilities, start in the engine repository.
- Keep product and research claims aligned with `content/engine-truth.json` and the engine's current source.
- Do not publish credentials, customer information, packet captures or sensitive telemetry.

## Development environment

Requirements:

- Node.js 20.19 or later (Node.js 22 is used in CI).
- npm.
- Git.

```bash
git clone https://github.com/LloydCoder/tinlance-threatfade-web.git
cd tinlance-threatfade-web
npm ci
npm run dev
```

Create a focused branch from the current `main`:

```bash
git switch -c feat/short-description
```

Use a descriptive branch prefix such as `feat/`, `fix/`, `docs/`, `test/`, `refactor/` or `chore/`.

## Engineering conventions

- Keep Next.js Server Components as the default. Add Client Components only when browser interaction requires them.
- Preserve the existing App Router, API client, authentication and server-side proxy architecture.
- Keep authorization decisions in the engine or trusted server boundary. Never trust a browser-supplied tenant identifier.
- Validate external input at the boundary; render untrusted content safely.
- Avoid unnecessary dependencies and broad configuration changes.
- Maintain keyboard access, semantic HTML, visible focus and accessible names.
- Keep analytics privacy-conscious. Do not collect packet contents, security telemetry or credentials as marketing attribution.
- Use the existing design tokens and official ThreatFade brand assets. Do not redraw or retype the wordmark.
- Keep web and engine license boundaries explicit.
- Add or update tests for behavior changes and documentation for changed workflows.

## Documentation and product truth

The engine repository is the source of truth for detection capabilities, integrations, validation and security controls. The website must not independently claim a detection rate, false-positive rate, customer-scale performance, certification or independent validation without traceable evidence.

Use the evidence classes in the engine truth manifest accurately. Synthetic test results are not external validation. Planned work must remain labeled planned.

## Verification

Run the relevant checks before opening a pull request:

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

For browser tests on a fresh machine:

```bash
npx playwright install --with-deps chromium
```

Report the commands actually run and their results. Do not state that a check passed if it was not executed. The CI workflow is the final merge gate.

## Pull request process

1. Fork the repository or create a branch if you have repository write access.
2. Make a focused change with tests and documentation where applicable.
3. Run the relevant verification commands.
4. Commit with a concise conventional-style message.
5. Push the branch and open a pull request against `main`.
6. Complete the pull-request template, including security, product-truth and verification sections.
7. Respond to review feedback and keep the branch current.
8. Merge only after required checks pass and review requirements are satisfied.

Examples:

- `feat(research): add reproducibility methodology page`
- `fix(auth): preserve analyst session exchange contract`
- `docs: clarify engine configuration boundary`
- `test(api): cover upstream timeout handling`

## Commit style

Use Conventional Commit-style prefixes where practical: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci` and `chore`. Keep the subject imperative, specific and concise.

## Security and responsible disclosure

Do not include secrets in commits, screenshots, test fixtures or logs. Do not test systems without authorization. Report vulnerabilities privately using the contact and process in [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are submitted under the repository's MIT license, subject to applicable project contribution terms. The separate engine repository's Apache-2.0 license does not alter this repository's license.
