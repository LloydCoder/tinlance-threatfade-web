import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Explore curated ThreatFade behavioral signal scenarios without sending arbitrary input to the production detection engine.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
