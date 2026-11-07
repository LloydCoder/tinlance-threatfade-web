# Security Policy

ThreatFade Web is a public-facing security product surface. We handle vulnerability reports privately and coordinate remediation before public disclosure.

## Reporting

Please report suspected vulnerabilities privately to **security@tinlance.com**. GitHub's private vulnerability-reporting feature may also be used when it is enabled for this repository.

Do not publish exploit details, proof-of-concept payloads, credentials, customer data, packet captures, or other sensitive evidence in public issues or pull requests.

Include, where possible:

- Affected route, component, version, commit, or deployment.
- Reproduction steps and a minimal proof of concept using non-sensitive data.
- Security impact, required privileges, and relevant trust boundaries.
- Relevant logs or screenshots with secrets and personal data removed.
- A suggested mitigation, if known.

Do not send live credentials, private keys, or unredacted customer evidence.

## Response and coordinated disclosure

The project aims to acknowledge reports within 24 hours and provide progress updates as triage and remediation proceed. These are response targets, not contractual service levels or guaranteed resolution times.

We will coordinate validation, severity assessment, remediation, and an appropriate disclosure date with the reporter. Please allow reasonable time for remediation before public disclosure.

## Scope

Reports are especially useful for issues involving:

- Next.js application code, route handlers, server actions, and API boundaries.
- OIDC, session lifecycle, authentication, authorization, and tenant-context handling.
- XSS, CSRF, SSRF, open redirects, injection, or unsafe input handling.
- Playground isolation, arbitrary file processing, abuse controls, or resource exhaustion.
- Secrets, security headers, browser policy, dependencies, CI/CD, or supply-chain integrity.
- Engine integration, privileged proxying, and accidental exposure of sensitive telemetry.

The public playground must not process arbitrary untrusted files through production detection infrastructure unless input validation, rate limiting, resource limits, isolation, and abuse controls have been reviewed and tested.

## Safe testing

Only test systems, accounts, and data that you own or are explicitly authorized to assess. Avoid destructive testing, denial-of-service activity, and access to other users' data.

## Assurance boundary

Automated tests, static analysis, dependency scanning, and deployment checks are engineering controls. They do not by themselves establish independent penetration-test coverage, certification, or a guarantee that the application is vulnerability-free.
