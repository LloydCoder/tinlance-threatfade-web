# ThreatFade Web documentation

This directory contains engineering, architecture, governance and operational documentation for the public ThreatFade website. The visitor-facing product documentation is maintained in `content/docs/` and rendered by the Next.js application.

## Start with the user journey

| Need                               | Start here                                              |
| ---------------------------------- | ------------------------------------------------------- |
| Understand the product             | [Getting started](../content/docs/getting-started.mdx)  |
| Install the engine locally         | [Installation](../content/docs/installation.mdx)        |
| Configure identity and persistence | [Configuration](../content/docs/configuration.mdx)      |
| Deploy the engine                  | [Deployment](../content/docs/deployment.mdx)            |
| Understand web/engine boundaries   | [Engine/web compatibility](ENGINE_WEB_COMPATIBILITY.md) |
| Understand the web architecture    | [Architecture](architecture.md)                         |
| Review web and engine settings     | [Configuration reference](reference/configuration.md)   |
| Report a vulnerability             | [Security policy](../SECURITY.md)                       |
| Contribute                         | [Contributing](../CONTRIBUTING.md)                      |

## Diátaxis map

### Tutorials

- [Getting started](../content/docs/getting-started.mdx)
- [Installation](../content/docs/installation.mdx)

### How-to guides

- [Configuration](../content/docs/configuration.mdx)
- [Deployment](../content/docs/deployment.mdx)
- [Contributing](../CONTRIBUTING.md)
- [Repository settings](REPOSITORY_SETTINGS.md)

### Explanation

- [Architecture](architecture.md)
- [Engine/web compatibility](ENGINE_WEB_COMPATIBILITY.md)
- [Research editorial governance](research/editorial-governance.md)
- [Brand identity](../brand/README.md)

### Reference

- [Configuration reference](reference/configuration.md)
- [Engine truth manifest](../content/engine-truth.json)
- [Public API integration](engine-api-integration.md)
- [Security policy](../SECURITY.md)

## Documentation rules

- Treat `content/engine-truth.json` and the engine repository as the authority for implemented capability and evidence status.
- Label planned, adapter, tested, synthetic and independently validated states precisely.
- Do not describe synthetic regression as real-world validation.
- Keep web-specific setup separate from engine installation.
- Prefer relative links within this repository.
- Update the relevant MDX page and this index when documentation structure changes.
