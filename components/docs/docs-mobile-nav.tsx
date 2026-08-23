"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { docsSections } from "@/config/docs";

export function DocsMobileNav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="docs-mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--tf-line)] bg-[var(--tf-panel)] px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tf-signal)]"
      >
        <Menu className="size-4" /> Documentation menu
      </button>
      {open ? (
        <nav
          id="docs-mobile-menu"
          aria-label="Documentation mobile navigation"
          className="mt-2 rounded-md border border-[var(--tf-line)] bg-[var(--tf-panel)] p-2"
        >
          {docsSections.map((item) => (
            <Link
              onClick={() => setOpen(false)}
              key={item.slug}
              href={`/docs/${item.slug}`}
              aria-current={active === item.slug ? "page" : undefined}
              className="block rounded px-3 py-2 text-sm text-[var(--tf-text-muted)] hover:bg-[var(--tf-panel-raised)] hover:text-[var(--tf-text)]"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
