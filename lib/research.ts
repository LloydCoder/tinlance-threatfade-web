import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { load } from "js-yaml";
import { researchArticles, type ResearchArticle } from "@/content/research";

const parseYaml = (input: string): object => load(input) as object;

export async function getResearchSource(slug: string) {
  const file = path.join(process.cwd(), "content", "research", `${slug}.mdx`);
  const source = await readFile(file, "utf8");
  return matter(source, { engines: { yaml: parseYaml } });
}

export function getResearchIndex(): ResearchArticle[] {
  return researchArticles;
}
