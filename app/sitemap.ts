import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { docsSections } from "@/config/docs";
import { researchArticles } from "@/content/research";
import { seoTopics } from "@/config/seo-topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/product",
    "/detection",
    "/how-it-works",
    "/integrations",
    "/research",
    "/research/challenge",
    "/validation",
    "/docs",
    "/playground",
    "/changelog",
    "/pricing",
    "/assessment",
    "/pilot",
    "/managed",
    "/enterprise",
    "/enterprise/security",
    "/enterprise/procurement",
    "/enterprise/assurance",
    "/security",
    "/contact",
  ];
  const research = researchArticles.map((article) => ({
    url: `${siteConfig.url}/research/${article.slug}`,
    lastModified: new Date(article.updated ?? article.published),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  // Do not emit a fabricated, repository-wide modification date for docs or
  // taxonomy pages. Add lastModified only when content supplies real metadata.
  const docs = docsSections.map((doc) => ({
    url: `${siteConfig.url}/docs/${doc.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const topics = Object.keys(seoTopics).map((slug) => ({
    url: `${siteConfig.url}/detection/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  const entries = [
    ...routes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...docs,
    ...research,
    ...topics,
  ];
  const seen = new Set<string>();
  return entries.filter((entry) => !seen.has(entry.url) && seen.add(entry.url));
}
