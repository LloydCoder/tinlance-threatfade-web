"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { ResearchArticle } from "@/content/research";
import { TfBadge, TfLabel } from "@/components/ui/tf-primitives";

const evidenceLabel: Record<ResearchArticle["evidence"], string> = {
  synthetic: "Synthetic",
  project_validation: "Project validation",
  independent: "Independent",
  experimental: "Experimental",
  planned: "Planned",
};

export function ResearchIndex({ articles, categories }: { articles: ResearchArticle[]; categories: readonly string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const haystack = [article.title, article.description, article.category, ...article.tags].join(" ").toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <label className="flex items-center gap-3 rounded-xl border border-[var(--tf-line)] bg-[var(--tf-surface)] px-4 py-3">
          <Search className="size-4 text-[var(--tf-text-subtle)]" aria-hidden="true" />
          <span className="sr-only">Search research</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search research, methods, scenarios…" className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--tf-text-subtle)]" />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Research categories">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tf-signal)]">
              <TfBadge tone={category === item ? "signal" : "neutral"}>{item}</TfBadge>
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs font-mono uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]" aria-live="polite">{filtered.length} publication{filtered.length === 1 ? "" : "s"}</p>
      <div className="grid gap-5 lg:grid-cols-3">
        {filtered.map((article) => (
          <article key={article.slug} className="tf-panel flex flex-col p-6 transition-colors hover:border-[var(--tf-line-strong)]">
            <div className="flex items-center justify-between gap-3"><TfLabel>{article.category}</TfLabel><TfBadge tone={article.status === "validated" ? "signal" : "warning"}>{evidenceLabel[article.evidence]}</TfBadge></div>
            <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{article.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-[var(--tf-text-muted)]">{article.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{article.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[var(--tf-line)] px-2 py-1 text-[10px] font-mono text-[var(--tf-text-subtle)]">{tag}</span>)}</div>
            <div className="mt-6 flex items-center gap-4 border-t border-[var(--tf-line)] pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]"><span>{article.readingTime}</span><span>{article.published}</span></div>
            <Link className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--tf-signal)]" href={`/research/${article.slug}`}>Read research <ArrowRight className="size-4" /></Link>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className="tf-panel p-8 text-center text-sm text-[var(--tf-text-muted)]">No research matches that filter. Try another topic or evidence class.</div>}
    </div>
  );
}
