"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { docsSections } from "@/config/docs";

export function DocsSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return docsSections
      .filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(normalized))
      .slice(0, 6);
  }, [query]);
  return (
    <div className="relative max-w-xl">
      <label className="sr-only" htmlFor="docs-search">
        Search documentation
      </label>
      <Search className="pointer-events-none absolute left-3 top-3 size-4 text-[var(--tf-text-subtle)]" />
      <input
        id="docs-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search documentation sections"
        className="w-full rounded-md border border-[var(--tf-line)] bg-[var(--tf-panel)] py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[var(--tf-text-subtle)] focus:border-[var(--tf-line-strong)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--tf-signal)_20%,transparent)]"
      />
      {results.length ? (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-full rounded-md border border-[var(--tf-line)] bg-[var(--tf-panel)] p-1 shadow-xl"
        >
          {results.map((item) => (
            <Link
              role="option"
              key={item.slug}
              href={`/docs/${item.slug}`}
              onClick={() => setQuery("")}
              className="block rounded px-3 py-2 text-sm hover:bg-[var(--tf-panel-raised)]"
            >
              <span className="block text-[var(--tf-text)]">{item.title}</span>
              <span className="block text-xs text-[var(--tf-text-subtle)]">{item.description}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
