import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { docsBySlug, docsSections, type DocSection } from "@/config/docs";

export type DocFrontmatter = {
  title: string;
  description: string;
  category: string;
  version: string;
  status: "implemented" | "experimental" | "reference";
  updated: string;
};

function sourcePath(slug: string) {
  return path.join(process.cwd(), "content", "docs", `${slug}.mdx`);
}

export async function getDoc(slug: string) {
  if (!docsBySlug.has(slug)) return null;
  const source = await readFile(sourcePath(slug), "utf8");
  const parsed = matter(source);
  const frontmatter = parsed.data as DocFrontmatter;
  return { slug, source, frontmatter, section: docsBySlug.get(slug) as DocSection };
}

export async function getDocSlugs() {
  return docsSections.map(({ slug }) => slug);
}

export function validateDocFrontmatter(frontmatter: Partial<DocFrontmatter>, slug: string) {
  const required = ["title", "description", "category", "version", "status", "updated"] as const;
  const missing = required.filter((key) => !frontmatter[key]);
  if (missing.length)
    throw new Error(`Invalid docs frontmatter for ${slug}: missing ${missing.join(", ")}`);
  if (!docsBySlug.has(slug)) throw new Error(`Unknown documentation slug: ${slug}`);
}
