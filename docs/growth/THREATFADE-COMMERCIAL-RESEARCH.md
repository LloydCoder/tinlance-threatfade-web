# ThreatFade Commercial Pricing Research

**Research date:** 2026-08-25  
**Purpose:** Validate Phase 14 pricing and packaging against current security/open-core commercial models.

## Findings

### LimaCharlie

LimaCharlie currently publishes a transparent free Community tier and usage-oriented paid pricing. Its current pricing page lists Community for individual researchers and learners, Standard for security teams, $3/endpoint at 5,000 endpoints, and $0.20/GB for telemetry sources, with private-cloud and volume pricing available. The model demonstrates that a security platform can combine open/free adoption with transparent usage and higher-value service relationships.

Source: https://limacharlie.io/pricing

### Wazuh

Wazuh continues to monetize an open-source security core through cloud and professional services. Its current Cloud page lists Small from $571/month, Medium from $923/month and Large from $1,467/month, with Custom for larger environments. Wazuh also publishes professional support and consulting services covering architecture, health checks, custom rules, dashboards, integrations and software development.

Sources:

- https://wazuh.com/cloud/
- https://wazuh.com/services/professional-support/
- https://wazuh.com/services/consulting-services/

### Panther

Panther's current materials emphasize security-lake/SIEM economics and the distinction between ingestion-based and other pricing models. Panther notes that traditional per-GB SIEM pricing can create unpredictable cost as coverage expands. This reinforces the ThreatFade decision not to make raw telemetry volume the only commercial value metric at the initial stage.

Sources:

- https://panther.com/product/data-pipeline
- https://panther.com/blog/siem-as-a-service

## Pricing decision

The research supports the following initial ThreatFade rate card:

- Community: **$0**
- Pro: **$49/month or $490/year**
- Team: **$299/month or $2,990/year**
- Detection Gap Assessment: **$5,000+**
- Paid Pilot: **$7,500–$15,000**
- Enterprise: **$25,000+/year**
- Managed: **$3,500–$15,000+/month**
- Custom Detection Engineering: **$5,000–$25,000+**
- Research Partnership: **$25,000–$150,000+**

These prices are not claimed to be market averages. They are ThreatFade starting standards chosen to create a coherent ladder from low-friction technical adoption to high-touch security services.

## Why not price ThreatFade like a generic SIEM?

ThreatFade is intentionally narrower: it is a behavioral detection and investigation layer focused on adversarial activity becoming less observable. The commercial unit should therefore follow operational scope, deployment requirements, governance, integration burden and expertise rather than forcing a generic log-ingestion or seat metric.

## Why the $49 / $299 entry points?

The Pro and Team levels are commitment bridges, not the primary revenue engine. They create a low-friction path for individual practitioners and small teams while preserving the high-intent Assessment → Pilot → Enterprise motion for organizations with a material security problem.

## Why services start higher?

Assessment, pilot, managed detection and custom engineering consume scarce security-engineering capacity. They must be paid offers with explicit scope. The public starting prices are intended to qualify buyers and avoid an unbounded free-consulting funnel.

## Caveats

- Competitor pricing changes frequently.
- Security products differ substantially in data model, deployment, support and target customer.
- ThreatFade does not yet have sufficient live customer pricing evidence to claim price-market fit.
- Prices should be reviewed after real sales conversations, delivery-cost measurement and conversion data.
- No price should be used to imply an unsupported security outcome.
