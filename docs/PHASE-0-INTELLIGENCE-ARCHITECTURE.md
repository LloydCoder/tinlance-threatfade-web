# ThreatFade Web — Phase 0 Intelligence & Architecture

**Status:** Complete — 2026-08-22  
**Website repository:** `LloydCoder/tinlance-threatfade-web`  
**Source-of-truth engine:** `LloydCoder/tinlance-threatfade`

## 1. Executive decision

ThreatFade Web is a standalone Next.js application. It is deliberately separated from the detection engine so cloning the engine does not download the public website and cloning the website does not duplicate the Python detection stack.

The engine repository is authoritative for implemented detection behavior, API behavior, integrations, validation evidence, security controls, and assurance boundaries. The website consumes that truth through explicitly typed integration boundaries and curated content.

The website is a **product, research, documentation, demonstration, and enterprise-evaluation surface**, not the detection engine itself.

## 2. Evidence audit

The current engine README identifies ThreatFade v0.4.0 as an evidence-first detection and investigation platform. Implemented repository capabilities include PCAP/PCAPNG ingestion, hybrid signal extraction, rolling Shannon entropy, z-score anomaly detection, C2/LOTL/GNSS scenarios, optional Isolation Forest anomaly detection, structured evidence/confidence scoring, ATT&CK mapping, alert deduplication, live monitoring components, signal-fusion components, deterministic benchmarks, tenant-scoped persistence, OIDC/JWT validation, RBAC, audit events, PostgreSQL production persistence, interoperability exports, OpenTelemetry instrumentation, and security/supply-chain controls.

The engine explicitly states that repository code does **not** prove SOC 2/ISO certification, independent penetration testing, independent detection validation, contractual SLAs, customer-scale performance guarantees, data-residency commitments, or organization-level incident-response obligations. These are hard website claim exclusions unless independently evidenced later.

The engine API exposes health, readiness, version, detection, PCAP detection, scenario detection, tenant-aware detection records, authentication configuration, and interoperability paths. The API applies bounded request/PCAP input, rate limiting, authentication/authorization, tenant checks, restrictive CORS, security headers, and request IDs.

## 3. Verified capability / claims matrix

### IMPLEMENTED — publishable when accurately qualified

| Capability                                      | Evidence                                   | Website treatment                                   |
| ----------------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| Evidence-first detection/investigation          | Engine README + detection pipeline         | Core positioning                                    |
| Rolling Shannon entropy                         | Engine detection capabilities              | Explain methodology                                 |
| Statistical/z-score anomaly detection           | Engine detection capabilities/API response | Explain as one signal                               |
| C2 quieting scenario                            | Engine scenario API                        | Demonstrate                                         |
| LOTL gradual-fade scenario                      | Engine scenario API                        | Demonstrate                                         |
| GNSS jamming/fade scenario                      | Engine scenario API                        | Demonstrate                                         |
| Optional ML anomaly layer                       | Engine API/README                          | Label optional/experimental where applicable        |
| Structured evidence/confidence                  | Engine API response + README               | Core product behavior                               |
| MITRE ATT&CK mapping                            | Engine README/API                          | Product capability                                  |
| PCAP/PCAPNG ingestion                           | Engine README/API                          | Product capability; retain safety boundary          |
| JSON/Sigma/STIX 2.1-compatible interoperability | Engine README                              | Product capability with exact wording               |
| SIEM/FusionOps interoperability                 | Engine README                              | Product capability; avoid implying SIEM replacement |
| Tenant-scoped records                           | Engine architecture/API                    | Enterprise architecture                             |
| OIDC/JWT + RBAC                                 | Engine README/API                          | Security architecture                               |
| Audit events                                    | Engine README/API                          | Security/enterprise documentation                   |
| PostgreSQL production persistence               | Engine README                              | Deployment documentation                            |
| Health/readiness/version endpoints              | Engine API                                 | Operational documentation                           |
| OpenTelemetry instrumentation                   | Engine README                              | Observability documentation                         |
| Security/supply-chain controls                  | Engine README/workflows                    | Security page, without implying certification       |
| Analyst console/dashboard                       | Engine README + dashboard directory        | Product visualization                               |
| Deterministic benchmark framework               | Engine benchmarks + README                 | Research/validation                                 |
| Apache 2.0 open-core engine licensing           | Engine README                              | Open-source page/footer                             |

### EXPERIMENTAL / QUALIFIED

| Capability                      | Reason                                                                                       | Website treatment                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ML anomaly detection            | Optional layer and current implementation should not be represented as universally validated | Clearly label optional/experimental and tie claims to evidence                                    |
| Live network/process monitoring | Components exist, but operational scope must not be overstated                               | Describe as implemented components; avoid claiming broad production coverage                      |
| AIS/ADS-B/GPS signal fusion     | Components exist                                                                             | Present as capability/components, not universal detection coverage                                |
| QUIC/C2 validation              | Repository documents project validation                                                      | Present exact validation evidence and conditions; no universal accuracy claim                     |
| Cobalt Strike/IcedID validation | Repository records author-confirmed validation                                               | Present as project validation, not independent assurance                                          |
| 0% false-positive baseline      | Repository documents a specific baseline                                                     | Only publish with its exact scope: five normal traffic patterns / 100 test runs; never generalize |

### PLANNED / FUTURE

| Area                                        | Rule                                                           |
| ------------------------------------------- | -------------------------------------------------------------- |
| Independent labeled-corpus validation       | Do not present as completed                                    |
| Third-party penetration testing             | Do not present as completed                                    |
| Purple-team validation                      | Do not present as completed unless evidence is added           |
| Customer-scale load testing                 | Do not present as completed                                    |
| Contractual SLO/SLA guarantees              | Do not present as guarantees                                   |
| Formal certifications                       | Do not claim until independently certified                     |
| Broad data-residency commitments            | Do not claim without deployment/legal evidence                 |
| Arbitrary public PCAP playground processing | Requires separately reviewed isolation/resource-control design |

### NOT SUPPORTED / EXPLICIT EXCLUSIONS

- ThreatFade is not a replacement for an enterprise SIEM/SOAR.
- Repository tests are not universal accuracy guarantees.
- Repository security controls are not SOC 2 or ISO certification.
- Project validation is not independent validation.
- SLO targets are not measured guarantees.
- The website must not imply customer deployments, logos, testimonials, certifications, or contractual guarantees without evidence.

### UNVERIFIED FOR WEBSITE PURPOSES

Any metric, benchmark, integration, deployment topology, customer outcome, performance figure, or assurance statement that cannot be traced to the current engine repository or an independently supplied primary source remains unverified and must stay out of marketing copy.

## 4. Positioning decision

Preferred working positioning:

> **Detect when attackers go quiet.**

Supporting category:

> **Evidence-first behavioral threat detection for adversarial activity that becomes intentionally less observable.**

The phrase "encrypted traffic" may be used when explaining the engine's encrypted/unencrypted signal extraction, but the website must not imply that ThreatFade can decrypt arbitrary encrypted traffic. The technical story is behavioral/signal analysis, not decryption.

The product narrative should center on the **fade event**: a meaningful reduction or change in observable adversarial behavior that should be modeled rather than automatically dismissed as benign.

## 5. Audience funnels

### Developer

Discover → understand → GitHub → install → run → inspect → contribute

Primary CTA: **View on GitHub / Run ThreatFade**

### Researcher

Discover → methodology → experiments → evidence → research → GitHub

Primary CTA: **Read the research**

### SOC / detection engineer

Problem → detection pipeline → evidence → dashboard → playground → integration

Primary CTA: **Explore detection / Run a demo**

### Enterprise

Problem → architecture → security boundary → interoperability → deployment → evaluation

Primary CTA: **Request an evaluation**

## 6. Information architecture

Primary routes:

- `/` — product overview and conversion hub
- `/product` — product capabilities and operational model
- `/detection` — detection methodology and supported scenarios
- `/how-it-works` — technical pipeline and evidence model
- `/integrations` — interoperability and operational handoff
- `/research` — research index
- `/research/[slug]` — technical research articles
- `/docs` — documentation home
- `/docs/[slug]` — documentation pages
- `/playground` — safe curated demonstration
- `/changelog` — public product/research changes
- `/enterprise` — deployment/evaluation architecture
- `/security` — security posture and assurance boundary

A route should only exist when it has a distinct user/search intent. Avoid thin pages created only to increase URL count.

## 7. Component architecture

Use four layers:

1. **Route composition** — `app/` owns page composition and metadata.
2. **Product primitives** — reusable ThreatFade-specific UI in `components/`.
3. **Content system** — MDX/content loaders and schemas in `content/` and `lib/`.
4. **Integration boundary** — typed engine/API access in `lib/`, never directly inside presentational components.

Prefer server components by default. Client components are reserved for meaningful interaction such as the signal visualization, playground controls, navigation state, and other browser-only behavior.

Avoid premature global state, client-side data fetching for static content, a CMS, a database, or a monorepo unless a later requirement proves one necessary.

## 8. Content architecture

Content is evidence-backed and typed.

Recommended content classes:

- Product pages
- Documentation
- Research articles
- Validation reports
- Changelog entries
- Security/assurance records

Each research/validation item should carry structured metadata such as status, publication date, update date, evidence class, scope, and references where applicable.

The content system must distinguish:

**Implemented → Experimental → Validated result → External assurance → Planned**

## 9. Design direction

The visual language should resemble a security research instrument rather than a cyberpunk marketing site.

Core visual metaphors:

- signal decay
- entropy
- behavioral deviation
- packet timing
- evidence trails
- confidence
- investigation timelines
- ATT&CK pivots

Avoid hooded hackers, stock SOC screens, excessive neon, generic AI gradients, fake telemetry, and decorative 3D objects that do not explain the product.

Motion should communicate state, flow, temporal change, and investigation—not decoration.

## 10. API boundary

The website must treat the engine as an explicit backend boundary.

```text
Browser
  ↓
Next.js server/UI boundary
  ↓
Typed integration client
  ↓
ThreatFade API
  ↓
Detection / evidence / persistence
```

The public website should not expose private credentials to the browser. Server-side integration is preferred for privileged engine operations.

The public playground starts with curated fixtures. Arbitrary PCAP processing remains behind a separate security review because file ingestion is a hostile-input boundary.

## 11. Security boundary

The website inherits the engine's security philosophy but does not claim to inherit its backend guarantees automatically.

Required website controls:

- strict input validation
- output encoding through framework defaults
- secure headers/CSP
- safe external-link handling
- no secret exposure
- rate limiting for public dynamic operations
- abuse protection
- safe error messages
- dependency auditing
- CodeQL/secret scanning where appropriate
- WCAG 2.2 AA
- E2E security regression coverage

The engine API already has bounded bodies, PCAP validation, rate limiting, authentication/authorization, tenant checks, restrictive CORS and security headers; integration work must preserve those boundaries rather than bypass them.

## 12. Testing strategy

Four layers:

1. Static: TypeScript, ESLint, formatting.
2. Component/unit: Vitest + Testing Library.
3. Browser: Playwright.
4. Security/accessibility/performance: dependency audit, CodeQL/secret scanning, axe-based accessibility checks, and Core Web Vitals measurement.

Release gates must include production build and route/link validation.

## 13. SEO and AI-discovery strategy

Technical SEO is architecture-first:

- unique titles/descriptions
- canonical URLs
- sitemap
- robots
- semantic headings
- strong internal linking
- JSON-LD where appropriate
- research/article metadata
- documentation metadata
- stable terminology
- authoritative references

Do not keyword-stuff.

AI-search discoverability should come from clear definitions, explicit technical relationships, evidence boundaries, structured metadata, citations, and canonical documentation—not from generated FAQ spam.

## 14. Deployment architecture

Target:

```text
GitHub
  ↓
GitHub Actions
  ↓
Vercel
  ↓
ThreatFade Web
  ↓
(optional, explicit server-side boundary)
ThreatFade API
```

Cloudflare may be used for DNS, edge/security controls, and appropriate perimeter services, but should not be introduced as an additional application runtime unless a concrete requirement justifies it.

## 15. Technology decisions

Approved baseline:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui-compatible primitives
- Motion
- MDX content architecture
- Zod
- Vitest
- Testing Library
- Playwright
- GitHub Actions
- Vercel

Tailwind v4's CSS-first configuration and native CSS theme variables should be preferred over legacy JavaScript configuration. shadcn/ui has current Tailwind v4 and React 19 support.

## 16. Web standards research conclusions

- Next.js App Router is the correct architectural choice for server-first rendering and modern React features.
- Tailwind CSS v4 should use CSS-first theme configuration.
- shadcn/ui is appropriate because its components are owned source code rather than a hidden runtime abstraction.
- WCAG 2.2 AA is the accessibility target. Particular attention is required for focus visibility, target size, accessible authentication, reduced motion, and semantic structure.
- Core Web Vitals target the 75th percentile: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- OWASP ASVS 5.0 is the application security verification reference.
- Vercel is the primary deployment target; Cloudflare is optional perimeter infrastructure, not a reason to duplicate application hosting.

## 17. Phase 0 exit criteria

- [x] Both repositories inspected at architecture/source-of-truth level.
- [x] Engine capabilities and explicit assurance boundaries identified.
- [x] API and dashboard boundaries identified.
- [x] Claims matrix established.
- [x] Unsupported claims explicitly excluded.
- [x] Positioning established as a working hypothesis grounded in engine behavior.
- [x] Information architecture established.
- [x] Component/content architecture established.
- [x] API and security boundaries established.
- [x] Testing strategy established.
- [x] SEO/AI discovery strategy established.
- [x] Deployment strategy established.
- [x] Technology choices validated against current official guidance.
- [x] Phase 0 decisions committed to the repository.

Phase 1 may proceed without redoing this discovery work unless new engine evidence invalidates a decision.
