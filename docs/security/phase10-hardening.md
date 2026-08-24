# Phase 10 security, accessibility and performance hardening

## Scope

This phase audits the public ThreatFade web application against OWASP ASVS 5.0 principles, secure HTTP headers, WCAG 2.2 AA, and Core Web Vitals. ASVS treats input validation, web frontend security, API security, file handling, configuration, and secure coding as explicit verification areas. citeturn0search6turn0search5

## Threat model

The public site is primarily a content and demonstration surface. The interactive playground accepts a constrained scenario identifier rather than arbitrary URLs, commands, files, or engine paths. The engine integration is server-side and code-owned; the browser is never given engine credentials.

### High-risk boundaries reviewed

- untrusted route/query/form values
- playground requests
- server-side engine requests
- redirects and URL construction
- MDX content
- JSON-LD serialization
- third-party resources
- dependency installation and CI

### Required invariants

1. Reject unknown input rather than attempting to sanitize it into an allowed value.
2. Never execute or render untrusted HTML/JavaScript.
3. Never proxy an arbitrary user-supplied URL.
4. Keep secrets server-side and out of public environment variables.
5. Bound request size, time, retries and response size at external service boundaries.
6. Return generic public errors; keep upstream details in server diagnostics only.
7. Do not add browser credentialed CORS unless a concrete product requirement exists.

## Headers

Production responses use CSP, `frame-ancestors`, `X-Content-Type-Options`, strict referrer policy, HSTS, clickjacking protection, and a restrictive Permissions Policy. CSP is intentionally explicit about resource classes; OWASP identifies CSP and secure response headers as important browser-side controls. citeturn0search4turn0search11

The current CSP permits only the resources required by the application. Development-only `unsafe-eval` is never present in production. Inline styles are retained only where required by the framework/font pipeline; no third-party script is authorized by default.

## Accessibility

Target: WCAG 2.2 AA.

The audit covers keyboard access, visible focus, semantic headings/landmarks, form labels, interactive controls, reduced-motion behavior, charts and timelines, dialog semantics, mobile navigation, and screen-reader-readable status information.

## Performance

Core Web Vitals targets:

- LCP < 2.5 s
- INP < 200 ms
- CLS < 0.1

Server Components remain the default. Client Components are limited to interaction-heavy visualization/navigation. Fonts use Next.js font optimization. Images use the framework image pipeline where applicable. Animations respect `prefers-reduced-motion`.

Field performance should be measured after deployment because lab tests cannot represent every user's network/device. web.dev recommends measuring Web Vitals in the field as well as optimizing lab performance. citeturn0search3

## Supply chain

The repository's dependency audit and CodeQL checks remain mandatory CI gates. Dependency changes must be reviewed for runtime exposure and transitive risk rather than accepted solely because an update is available.

## Limitations

A source audit and automated browser tests cannot establish that a site has zero vulnerabilities or guarantee field Core Web Vitals. This document records the controls and verification performed, not a security certification.
