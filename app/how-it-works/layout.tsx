import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How ThreatFade works",
  description: "Understand ThreatFade's signal extraction, behavioral analysis, deviation scoring, evidence and ATT&CK mapping pipeline.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
