import type { Route } from "next";

export const siteConfig = {
  name: "ThreatFade",
  legalName: "Tinlance Limited",
  description:
    "An evidence-first detection and investigation platform for adversarial activity that becomes intentionally less observable.",
  url: "https://threatfade.com",
  github: "https://github.com/LloydCoder/tinlance-threatfade",
  webRepository: "https://github.com/LloydCoder/tinlance-threatfade-web",
  version: "0.9.0-dev",
  engineApiVersion: "0.7.0",
  license: "Apache-2.0",
  navigation: [
    { label: "Product", href: "/product" },
    { label: "Detection", href: "/detection" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Integrations", href: "/integrations" },
    { label: "Research", href: "/research" },
    { label: "Security", href: "/security" },
    { label: "Docs", href: "/docs" },
    { label: "Playground", href: "/playground" },
    { label: "Pricing", href: "/pricing" },
    { label: "Enterprise", href: "/enterprise" },
  ] satisfies ReadonlyArray<{ label: string; href: Route }>,
} as const;
