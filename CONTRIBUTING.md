# Contributing to ThreatFade Web

ThreatFade Web is developed as a focused companion to the open-source ThreatFade engine.

## Before contributing

Read the engine repository's terminology, architecture and security documentation before publishing product claims or technical explanations.

## Development

```bash
npm install
npm run dev
```

Before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Contribution principles

- Prefer small, reviewable changes.
- Keep Server Components as the default.
- Add client components only where interaction requires them.
- Avoid unnecessary dependencies.
- Treat accessibility as a requirement.
- Treat user input as hostile by default.
- Do not invent product capabilities or assurance claims.
- Keep research claims tied to reproducible evidence.
- Update documentation when architecture changes.

## Commit style

Use concise conventional-style commits, for example:

`feat(research): add detection methodology article`

`fix(security): validate public form origin`

`perf(home): reduce client JavaScript`
