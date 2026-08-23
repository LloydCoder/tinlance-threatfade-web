# Conversion event taxonomy

The web platform uses a small, intent-based event vocabulary. Instrumentation should remain privacy-respecting and should not capture message bodies, security telemetry, PCAP contents, tokens or other sensitive input.

| Event | Meaning |
| --- | --- |
| `github_view` | Visitor selects the canonical engine repository. |
| `docs_start` | Visitor enters the developer documentation funnel. |
| `playground_start` | Visitor enters the curated playground. |
| `research_open` | Visitor opens a research publication. |
| `evaluation_request` | Visitor selects the technical evaluation CTA. |
| `contact_request` | Visitor selects a direct contact CTA. |

Events should carry only coarse context such as source route and audience path. No third-party analytics dependency is required until there is a justified measurement need and privacy policy covering it.
