# ThreatFade Growth System Reconciliation

**Audit date:** 2026-08-27  
**Repository:** `LloydCoder/tinlance-threatfade-web`  
**Baseline commit:** `9593dd4ebc1ef4fdc1b8fd0782042274fb8f47b2`  
**Method:** source-document review, repository/code inspection, and implementation-evidence review.

## Status vocabulary

Only these statuses are permitted:

`IMPLEMENTED` · `PARTIALLY_IMPLEMENTED` · `MISSING` · `BROKEN` · `UNVERIFIED` · `EXTERNAL_DEPENDENCY` · `INTENTIONALLY_DEFERRED`

## Master matrix

| System                  | Requirement                  | Source                       | Existing                                  | File/Route                                                        | Status                | Gap                               | Change                                   | Test               | Evidence                                     | Owner                |
| ----------------------- | ---------------------------- | ---------------------------- | ----------------------------------------- | ----------------------------------------------------------------- | --------------------- | --------------------------------- | ---------------------------------------- | ------------------ | -------------------------------------------- | -------------------- |
| Commercial Flywheel     | commercial path              | Commercial Flywheel          | public staircase + lead intake            | /pricing /assessment /pilot /enterprise /api/leads                | PARTIALLY_IMPLEMENTED | CRM opportunity state is external | CRM adapter boundary                     | E2E + CRM contract | Web intake exists; CRM ledger absent         | Commercial ops / CRM |
| Commercial Flywheel     | assessment request           | Commercial Flywheel          | validated form + notification             | /assessment /api/leads                                            | IMPLEMENTED           | Durable CRM persistence external  | Keep CRM boundary                        | Unit + E2E         | Success event emitted after accepted request | Web + CRM            |
| Commercial Flywheel     | qualification → revenue      | Commercial Flywheel          | qualification concepts                    | docs/PHASE-14-COMMERCIALIZATION.md                                | EXTERNAL_DEPENDENCY   | No durable opportunity ledger     | Define CRM field contract                | CRM contract       | No in-repo opportunity state                 | Commercial ops       |
| Commercial Research     | signal → score → opportunity | Commercial Research + Demand | deterministic scoring model               | lib/demand-intelligence/model.ts; /api/demand-intelligence/score  | IMPLEMENTED           | External discovery absent         | Provider adapters                        | Unit + API         | Scoring model is in repo                     | Growth intelligence  |
| Commercial Research     | decision makers              | Commercial Research          | buyer-role schema                         | lib/demand-intelligence/model.ts                                  | PARTIALLY_IMPLEMENTED | Person enrichment external        | Provider adapter + privacy review        | Adapter contract   | buyerRoles schema exists                     | External provider    |
| Content Flywheel        | research → content           | Content Flywheel             | MDX research index                        | content/research; /research                                       | IMPLEMENTED           | Distribution external             | Keep canonical source                    | Unit + E2E         | Research routes/content tests                | Content/research     |
| Content Flywheel        | docs → OSS/product           | Content Flywheel             | docs index/breadcrumbs                    | app/docs; content/docs; components/docs                           | IMPLEMENTED           | Install telemetry incomplete      | Instrument real install path             | E2E                | Docs routes are navigable                    | Web                  |
| Content Flywheel        | distribution                 | Content Flywheel             | strategy only                             | docs/growth/THREATFADE-CONTENT-FLYWHEEL.md                        | EXTERNAL_DEPENDENCY   | No provider accounts              | Distribution adapters                    | Provider contract  | Channels documented, not executed            | Growth ops           |
| Conversion Flywheel     | page views                   | Conversion Flywheel          | client tracker + API                      | components/analytics/conversion-tracker.tsx; /api/analytics/event | IMPLEMENTED           | Provider availability external    | Keep PostHog boundary                    | Unit + E2E         | page_view path implemented                   | Analytics            |
| Conversion Flywheel     | lead capture                 | Conversion Flywheel          | Zod + Resend notification                 | /api/leads; lead-capture-form.tsx                                 | IMPLEMENTED           | Email is not CRM storage          | CRM sink boundary                        | E2E + provider     | Server validation + notification             | Resend + CRM         |
| Conversion Flywheel     | consent                      | Conversion Flywheel          | bounded telemetry                         | taxonomy.ts; analytics route                                      | PARTIALLY_IMPLEMENTED | No consent provider               | Consent adapter for regulated deployment | Privacy E2E        | No sensitive form data in analytics          | Privacy boundary     |
| Customer Value Flywheel | first detection              | Customer Value               | canonical event only                      | lib/analytics/taxonomy.ts                                         | EXTERNAL_DEPENDENCY   | Requires durable org state        | Engine emits first event                 | Integration        | Website does not fabricate it                | Engine/state         |
| Demand Intelligence     | explainable score            | Demand Flywheel              | weighted signal model                     | lib/demand-intelligence/model.ts                                  | IMPLEMENTED           | Weights not empirically validated | Label as model hypothesis                | Unit               | Contribution explanation exists              | Growth intelligence  |
| Demand Intelligence     | abuse controls               | Demand Flywheel              | origin/size/rate guards                   | /api/demand-intelligence/score                                    | IMPLEMENTED           | Rate limit is instance-local      | Durable/edge limiter                     | Security + API     | Input guards present                         | Platform             |
| Product / OSS           | GitHub discovery             | Product / OSS                | GitHub CTAs                               | conversion-link.tsx; site pages                                   | IMPLEMENTED           | Telemetry client-side             | Keep canonical event                     | E2E                | github_view maps centrally                   | Web/GitHub           |
| Product / OSS           | playground activation        | Product / OSS                | validated curated playground              | /playground; /api/playground                                      | IMPLEMENTED           | Not production detection          | Keep boundary explicit                   | E2E                | Scenario validation + no verdict             | Web/engine           |
| Product / OSS           | repeat usage                 | Product / OSS                | reserved canonical event                  | lib/analytics/taxonomy.ts                                         | EXTERNAL_DEPENDENCY   | Needs longitudinal identity       | Product telemetry                        | Cohort             | Event reserved, not fabricated               | Engine/product       |
| Research Flywheel       | research discovery           | Research Flywheel            | static research index                     | content/research/index.ts; /research                              | IMPLEMENTED           | Distribution external             | Canonical index                          | Unit + E2E         | Research routes                              | Research             |
| Research Flywheel       | experiment → product         | Research Flywheel            | documented engine boundary                | docs/growth/* + engine repo                                       | PARTIALLY_IMPLEMENTED | No automated roadmap linkage      | Artifact handoff contract                | Docs/contract      | Flow documented                              | Research + engine    |
| Trust / Evidence        | customer consent             | Trust / Evidence             | opt-in manual workflow                    | /contact; /api/customer-value/request                             | IMPLEMENTED           | Consent record external/manual    | Never auto-publish                       | E2E/manual         | UI states opt-in                             | Customer success     |
| Trust / Evidence        | security evidence            | Trust / Evidence             | security docs + CI                        | /security; SECURITY.md; .github/workflows/security.yml            | IMPLEMENTED           | Independent validation external   | Scope claims accurately                  | Security CI        | Security workflow present                    | Security             |
| SEO / AI Discovery      | metadata/canonical           | Content Flywheel             | Next metadata                             | app/*/page.tsx; layouts                                           | IMPLEMENTED           | Coverage can regress              | Route assertions                         | E2E/content        | Canonical metadata on key pages              | Web                  |
| SEO / AI Discovery      | sitemap/robots               | Content Flywheel             | Next generated files                      | app/sitemap.ts; app/robots.ts                                     | IMPLEMENTED           | Search engines external           | Build verification                       | Route/E2E          | Source-generated                             | Web                  |
| SEO / AI Discovery      | structured data              | Trust / Content              | JSON-LD helper                            | lib/seo/json-ld.ts                                                | IMPLEMENTED           | Eligibility external              | Factual schema only                      | Unit/E2E           | JSON-LD helper exists                        | Web                  |
| Growth Automation       | event → signal → action      | Growth Automation            | analytics + signals + external boundaries | analytics/customer/demand surfaces                                | PARTIALLY_IMPLEMENTED | No durable workflow engine        | CRM/customer-success automation          | Contract           | Signals observable; actions external         | Automation           |

## Cross-system controls

### Security

- XSS/injection: schema validation, HTML escaping, and constrained MDX paths are used across lead, customer, demand, and analytics surfaces. Status: `IMPLEMENTED`; continuous scanning remains the verification boundary.
- CSRF/origin: mutating growth routes use same-origin/origin guards. Status: `IMPLEMENTED`; trusted server-to-server callers require explicit integration boundaries.
- SSRF/open redirects: provider/engine URLs are environment-controlled and validated; redirects use error handling. Status: `IMPLEMENTED`.
- PII leakage: analytics schemas exclude email, credentials, incident evidence, and raw telemetry. Operational lead/customer data remains outside analytics. Status: `IMPLEMENTED` with retention policy external.

### Supply chain and CI

- GitHub Actions use read permissions and pinned third-party action SHAs in the audited workflows.
- CI contains format, documentation, growth-registry consistency, lint, typecheck, unit tests, dependency audit, production build, and E2E gates.
- CodeQL and security workflows exist; Dependabot/security-update configuration exists.
- Branch protection/ruleset enforcement cannot be proven from repository contents and remains a GitHub-admin boundary.

### Analytics and attribution

`lib/analytics/taxonomy.ts` is the only canonical event registry. `components/analytics/conversion-link.tsx` is a compatibility wrapper and no longer dispatches a second `dataLayer`/`CustomEvent` analytics bus. Commercial request events are emitted on accepted lead intake; CTA clicks use `cta_click` and do not masquerade as successful conversions.

First-touch attribution is persisted locally under `threatfade_attribution_v1`; campaign ID is retained. Current event path/referrer/UTMs provide last-touch context. This is not cross-device identity stitching.

### Customer-value truthfulness

`/account/customer` reads actual detection/member APIs where available and explicitly marks unavailable investigation/disposition/longitudinal metrics instead of displaying fabricated zeroes. First-ever detection, repeat usage, retention, churn, NRR, contract state, and durable expansion state remain authoritative engine/product/CRM/billing boundaries.

### Production verification boundary

The repository can prove source-level behavior and automated test results. It cannot prove third-party provider availability, real customer outcomes, search-engine indexing, field Core Web Vitals, GitHub branch protection, or external CRM/billing state without those systems and credentials. Those claims remain `EXTERNAL_DEPENDENCY` or `UNVERIFIED` rather than being inferred.

## Material implementation changes

1. Removed duplicate lead-request telemetry on form start; request events now represent accepted requests.
2. Added `campaign_id` to first-touch attribution.
3. Added genuine `playground_start` and `playground_complete` instrumentation around the real curated playground API call.
4. Added canonical `cta_click` and routed legacy conversion-link aliases through the single taxonomy.
5. Removed the duplicate browser `dataLayer`/`CustomEvent` analytics bus.
6. Added customer-value `known` flags so unavailable lifecycle metrics cannot be represented as measured zeroes.
7. Added `docs/analytics/EVENT-TAXONOMY.md` and CI validation that code events and documented events remain identical.
8. Added this master growth reconciliation and made external boundaries explicit.

## Release rule

The final audit may only mark a requirement `IMPLEMENTED` when the code path and test evidence exist. External provider capabilities remain `EXTERNAL_DEPENDENCY` until the actual integration and provider acceptance test exist. Unmeasured production behavior remains `UNVERIFIED` rather than being inferred from code inspection.
