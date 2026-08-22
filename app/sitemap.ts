import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/product",
    "/detection",
    "/how-it-works",
    "/integrations",
    "/research",
    "/docs",
    "/playground",
    "/changelog",
    "/enterprise",
    "/security",
  ];
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
