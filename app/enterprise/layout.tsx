import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise evaluation",
  description:
    "ThreatFade deployment, identity, tenancy, security boundaries and evaluation considerations for security teams.",
  alternates: { canonical: "/enterprise" },
};

export default function EnterpriseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
