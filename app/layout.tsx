import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  icons: { icon: "/icon.svg" },
};

const jsonLd = [organizationJsonLd(), softwareApplicationJsonLd(), websiteJsonLd()];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {jsonLd.map((item) => (
          <script
            key={item["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdScript(item)}
          />
        ))}
        <Providers>
          <ConversionTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
