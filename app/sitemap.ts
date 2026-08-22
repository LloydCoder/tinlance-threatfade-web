import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { researchArticles } from "@/content/research";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/product", "/detection", "/how-it-works", "/integrations", "/research", "/docs", "/playground", "/changelog", "/enterprise", "/security"];
  const research = researchArticles.map((article) => ({ url: `${siteConfig.url}/research/${article.slug}`, lastModified: article.updated ?? article.published, changeFrequency: "monthly" as const, priority: 0.75 }));
  return [...routes.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: path === "/" ? "weekly" as const : "monthly" as const, priority: path === "/" ? 1 : 0.7 })), ...research];
}
