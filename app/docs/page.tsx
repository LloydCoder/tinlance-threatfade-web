import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { docsSections, docsVersion } from "@/config/docs";
import { DocsSearch } from "@/components/docs/docs-search";
import { TfBadge, TfLabel, TfPanel } from "@/components/ui/tf-primitives";

export const metadata = {
  title: "Documentation",
  description: "ThreatFade developer and security engineering documentation.",
};

export default function DocsIndexPage() {
  return (
    <div className="min-w-0">
      <div className="mb-10 flex flex-col gap-6 border-b border-[var(--tf-line)] pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <TfLabel>Developer documentation</TfLabel>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Build with the actual engine.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--tf-text-muted)]">
            Versioned guidance for developers, detection engineers, researchers and SOC teams.
            Claims are anchored to the v0.4.0 engine repository.
          </p>
        </div>
        <TfBadge tone="signal">{docsVersion}</TfBadge>
      </div>
      <DocsSearch />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {docsSections.map((item) => (
          <Link
            key={item.slug}
            href={`/docs/${item.slug}`}
            className="group tf-panel p-5 hover:border-[var(--tf-line-strong)]"
          >
            <BookOpen className="size-4 text-[var(--tf-signal)]" />
            <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">{item.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)] group-hover:text-[var(--tf-signal)]">
              Open <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>
      <TfPanel raised className="mt-8 p-5">
        <TfLabel>Source of truth</TfLabel>
        <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
          If implementation and documentation ever disagree, inspect the engine repository and
          update this documentation rather than inventing behavior.
        </p>
      </TfPanel>
    </div>
  );
}
