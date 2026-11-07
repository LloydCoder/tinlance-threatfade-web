## Summary

Describe the user-visible or engineering change and why it is needed.

## Scope

- [ ] Website UI or interaction
- [ ] Documentation or content
- [ ] Authentication / authorization / API boundary
- [ ] Security / dependency / CI
- [ ] SEO / metadata / accessibility
- [ ] Other

## Verification

- [ ] `npm run format:check`
- [ ] `npm run docs:check`
- [ ] `npm run growth:check`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run test:e2e` (when applicable)

List commands actually run and summarize their results. Do not check boxes for commands that were not run.

## Security and privacy

- [ ] No secrets, credentials, customer data or sensitive telemetry are included.
- [ ] Server-side authorization remains authoritative; browser-controlled tenant identifiers are not trusted.
- [ ] User-controlled input and external content are validated and safely rendered.
- [ ] No new external network, dependency or privileged action is introduced without review.
- [ ] Security-sensitive changes include appropriate tests and documentation.

## Product truth and content

- [ ] Product and detection claims are supported by the engine source of truth.
- [ ] Research claims identify their evidence class and limitations.
- [ ] Commercial, certification and performance claims are not overstated.
- [ ] Documentation and changelog are updated where needed.

## Screenshots / evidence

Add before-and-after screenshots or test evidence for visual or behavior changes. Redact sensitive information.

## Deployment and rollback

Describe configuration changes, migrations, rollout considerations and rollback steps, or state "Not applicable".
