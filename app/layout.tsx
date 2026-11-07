import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { ConversionTracker } from "@/components/analytics/conversion-tracker";
import {
  jsonLdScript,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/json-ld";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ThreatFade — Behavioral threat detection for C2 evasion",
    template: "%s — ThreatFade",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: "Next.js",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "ThreatFade — Behavioral threat detection for C2 evasion",
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreatFade — Behavioral threat detection for C2 evasion",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = [organizationJsonLd(), softwareApplicationJsonLd(), websiteJsonLd()];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {jsonLd.map((item) => (
          <script
            key={item["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdScript(item)}
          />
        ))}
        <Providers>
          <Suspense fallback={null}>
            <ConversionTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
