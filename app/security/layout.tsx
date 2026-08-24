import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "ThreatFade's documented security model, authentication boundary, input controls, auditability and assurance limits.",
  alternates: { canonical: "/security" },
};

export default function SecurityLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
