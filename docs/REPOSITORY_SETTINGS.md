# GitHub repository settings

This guide records recommended GitHub metadata and repository controls. These settings live in GitHub repository configuration and cannot be enforced by changing files alone.

## About section

Recommended description:

> Official ThreatFade website, documentation, evidence-governed research and enterprise evaluation platform.

Website: `https://threatfade.com`. Confirm that the canonical domain resolves to the intended production website before changing the GitHub About field.

Recommended topics:

- `threatfade`
- `cybersecurity`
- `network-security`
- `threat-detection`
- `nextjs`
- `react`
- `security-research`
- `detection-engineering`
- `mitre-attack`
- `security-analytics`

## Social preview and brand

Use the official source artwork from the owner-supplied ThreatFade logo kit. The tracked brand assets in `public/brand/` and [brand/README.md](../brand/README.md) define approved use. Do not redraw or retype the wordmark.

Upload a reviewed 1280×640 social preview through **Settings → General → Social preview** after a real product screenshot or approved composition is available. A tracked source image does not automatically configure GitHub's social preview.

## Main branch rules

The audit observed `main` reported as unprotected. A repository administrator should configure a ruleset with:

- Require pull requests before merging.
- Require the CI, CodeQL and Security workflows to pass.
- Require branches to be up to date when practical.
- Block force pushes and branch deletion.
- Require CODEOWNERS review for sensitive application, authentication, workflow and security paths.
- Dismiss stale approvals after new commits.
- Apply protections to administrators where operationally practical.

The current CODEOWNERS entry assigns repository ownership to `@LloydCoder`. A single-maintainer repository should avoid a mandatory independent approval rule that makes every merge impossible. Add a second qualified reviewer before requiring an independent approval.

## Releases

The audit found no published GitHub release for this web repository. Keep web releases independent from engine releases. Before publishing:

1. Verify the production build and E2E checks.
2. Update CHANGELOG.md.
3. Tag the exact reviewed commit.
4. Record deployment and rollback notes.
5. Avoid implying that a website release is an engine release.

## OpenSSF Scorecard

No official live Scorecard result was obtained during this audit. Run the official OpenSSF Scorecard action or CLI and review Branch-Protection, Code-Review, Pinned-Dependencies, Token-Permissions, Dangerous-Workflow, Security-Policy, CI-Tests, SAST and Vulnerabilities individually.

References:

- [OpenSSF Scorecard](https://scorecard.dev/)
- [Scorecard checks](https://github.com/ossf/scorecard)
- [GitHub community profile](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories)
