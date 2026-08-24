import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detection",
  description:
    "Behavioral detection topics covering C2 quieting, encrypted traffic signals, entropy and project validation boundaries.",
  alternates: { canonical: "/detection" },
};

export default function DetectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
