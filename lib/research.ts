import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { researchArticles, type ResearchArticle } from "@/content/research";

export async function getResearchSource(slug: string) {
  const file = path.join(process.cwd(), "content", "research", `${slug}.mdx`);
  const source = await readFile(file, "utf8");
  return matter(source);
}

export function getResearchIndex(): ResearchArticle[] {
  return researchArticles;
}
