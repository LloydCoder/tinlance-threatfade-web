import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { docsSections, docsVersion } from "@/config/docs";

describe("documentation content", () => {
  it("has valid frontmatter for every published page", () => {
    for (const section of docsSections) {
      const source = readFileSync(join(process.cwd(), "content", "docs", `${section.slug}.mdx`), "utf8");
      const { data, content } = matter(source);
      expect(data.title).toBeTruthy();
      expect(data.description).toBeTruthy();
      expect(data.category).toBeTruthy();
      expect(data.version).toBe(docsVersion);
      expect(["implemented", "experimental", "reference"]).toContain(data.status);
      expect(data.updated).toMatch(/^2026-\d{2}-\d{2}$/);
      expect(content.trim().length).toBeGreaterThan(80);
    }
  });
});
