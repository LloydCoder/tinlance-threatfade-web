import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations",
  description: "ThreatFade interoperability with JSON, Sigma-compatible output, STIX 2.1-compatible bundles, CEF, CSV, SIEM and FusionOps paths.",
  alternates: { canonical: "/integrations" },
};

export default function IntegrationsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
