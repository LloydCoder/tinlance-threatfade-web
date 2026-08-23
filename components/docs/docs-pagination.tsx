import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DocSection } from "@/config/docs";

export function DocsPagination({ previous, next }: { previous?: DocSection; next?: DocSection }) {
  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-16 grid gap-3 border-t border-[var(--tf-line)] pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/docs/${previous.slug}`}
          className="tf-panel p-4 hover:border-[var(--tf-line-strong)]"
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
            <ArrowLeft className="size-3" /> Previous
          </span>
          <span className="mt-2 block text-sm text-[var(--tf-text)]">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="tf-panel p-4 text-right hover:border-[var(--tf-line-strong)]"
        >
          <span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
            Next <ArrowRight className="size-3" />
          </span>
          <span className="mt-2 block text-sm text-[var(--tf-text)]">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
