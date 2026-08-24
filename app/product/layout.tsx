import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description: "ThreatFade's evidence-first detection and investigation model for adversarial behavior that becomes less observable.",
  alternates: { canonical: "/product" },
};

export default function ProductLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
