# Security Policy

ThreatFade Web is a public-facing security product surface. Security issues should be handled privately and reproducibly.

## Scope

Report vulnerabilities involving:

- Next.js application code
- route handlers and API boundaries
- authentication or authorization assumptions
- unsafe input handling
- XSS, CSRF, SSRF or open redirects
- playground isolation or abuse paths
- secrets or sensitive configuration
- dependency or supply-chain vulnerabilities
- security headers and browser policy

## Reporting

Please use GitHub's private security advisory/reporting mechanism for this repository when available. Do not publish exploit details in a public issue before remediation.

Include:

- affected route/component
- reproduction steps
- impact
- relevant logs or screenshots with secrets removed
- suggested mitigation, if known

## Security standard

The project follows OWASP-oriented secure development practices and uses automated dependency/security checks. Repository controls are not represented as independent certification or assurance.

## Playground boundary

The public playground must not process arbitrary untrusted files through production detection infrastructure until input validation, rate limiting, resource limits, isolation and abuse controls have been reviewed and tested.
