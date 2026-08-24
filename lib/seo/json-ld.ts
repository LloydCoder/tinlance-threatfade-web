import { siteConfig } from "@/config/site";

export const entityIds = {
  organization: `${siteConfig.url}/#organization`,
  product: `${siteConfig.url}/#threatfade`,
  engine: `${siteConfig.url}/#engine`,
  website: `${siteConfig.url}/#website`,
} as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": entityIds.organization,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.github],
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": entityIds.product,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Linux",
    softwareVersion: siteConfig.version,
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    isAccessibleForFree: true,
    codeRepository: siteConfig.github,
    publisher: { "@id": entityIds.organization },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": entityIds.website,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": entityIds.organization },
    about: { "@id": entityIds.product },
  };
}

export function breadcrumbJsonLd(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  published: string;
  updated?: string;
  author?: string;
  type?: "Article" | "TechArticle";
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "TechArticle",
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.published,
    ...(input.updated ? { dateModified: input.updated } : {}),
    author: {
      "@type": "Organization",
      "@id": entityIds.organization,
      name: input.author ?? siteConfig.legalName,
    },
    publisher: { "@id": entityIds.organization },
    isPartOf: { "@id": entityIds.website },
    about: { "@id": entityIds.product },
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
