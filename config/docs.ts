export const docsVersion = "v0.4.0";

export type DocSection = { slug: string; title: string; description: string };

export const docsSections: DocSection[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Understand the product and run the reference engine locally.",
  },
  {
    slug: "installation",
    title: "Installation",
    description: "Set up the Python engine, API and dashboard.",
  },
  {
    slug: "configuration",
    title: "Configuration",
    description: "Configure authentication, tenancy, persistence and operational boundaries.",
  },
  {
    slug: "detection-packs",
    title: "Detection packs",
    description: "Work with stable detection IDs, versions and ATT&CK mappings.",
  },
  {
    slug: "api",
    title: "API",
    description: "Use the health, readiness, version and detection service boundaries.",
  },
  {
    slug: "integrations",
    title: "Integrations",
    description: "Connect JSON, SIEM, Sigma, STIX and FusionOps outputs.",
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Move from local development to a hardened production boundary.",
  },
  {
    slug: "security",
    title: "Security",
    description: "Understand authentication, tenancy, supply-chain and assurance boundaries.",
  },
  {
    slug: "reference",
    title: "Reference",
    description: "Keep the core pipeline, repository map and operational vocabulary close at hand.",
  },
];

export const docsBySlug = new Map(docsSections.map((section) => [section.slug, section]));

export function getDocNavigation(slug: string) {
  const index = docsSections.findIndex((section) => section.slug === slug);
  return {
    previous: index > 0 ? docsSections[index - 1] : undefined,
    next: index >= 0 && index < docsSections.length - 1 ? docsSections[index + 1] : undefined,
  };
}
