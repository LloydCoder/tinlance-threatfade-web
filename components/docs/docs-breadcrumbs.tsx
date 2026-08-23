import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { docsBySlug } from "@/config/docs";

export function DocsBreadcrumbs({ slug }: { slug?: string }) {
  const item = slug ? docsBySlug.get(slug) : undefined;
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-1.5 text-xs text-[var(--tf-text-subtle)]"
    >
      <Link href="/docs" className="hover:text-[var(--tf-text)]">
        Docs
      </Link>
      {item ? (
        <>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span aria-current="page" className="text-[var(--tf-text-muted)]">
            {item.title}
          </span>
        </>
      ) : null}
    </nav>
  );
}
