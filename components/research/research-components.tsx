import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { TfBadge, TfLabel, TfPanel } from "@/components/ui/tf-primitives";
import type { ResearchEvidence, ResearchStatus as ResearchStatusType } from "@/content/research";

const evidenceLabel: Record<ResearchEvidence, string> = {
  synthetic: "Synthetic",
  project_validation: "Project validation",
  independent: "Independent",
  experimental: "Experimental",
  planned: "Planned",
};

export function ResearchStatus({ status }: { status: ResearchStatusType }) {
  const tone =
    status === "validated"
      ? "signal"
      : status === "planned"
        ? "neutral"
        : status === "experimental"
          ? "warning"
          : "info";
  return <TfBadge tone={tone}>{status}</TfBadge>;
}

export function ResearchMeta({
  author,
  published,
  updated,
  readingTime,
  evidence,
}: {
  author: string;
  published: string;
  updated?: string;
  readingTime: string;
  evidence: ResearchEvidence;
}) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-[var(--tf-line)] py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
      <span>{author}</span>
      <time dateTime={published}>Published {published}</time>
      {updated ? <time dateTime={updated}>Updated {updated}</time> : null}
      <span>{readingTime}</span>
      <span>Evidence: {evidenceLabel[evidence]}</span>
    </div>
  );
}

export function ResearchArtifacts({
  artifacts,
}: {
  artifacts?: { label: string; href: string }[];
}) {
  if (!artifacts?.length) return null;
  return (
    <TfPanel raised className="my-8 p-5">
      <TfLabel>Research artifacts</TfLabel>
      <ul className="mt-4 space-y-3 text-sm">
        {artifacts.map((artifact) => (
          <li key={artifact.href}>
            <a
              className="inline-flex items-center gap-2 text-[var(--tf-signal)]"
              href={artifact.href}
              target="_blank"
              rel="noreferrer"
            >
              {artifact.label}
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </TfPanel>
  );
}

export function ResearchToc({ headings }: { headings: { id: string; title: string }[] }) {
  return (
    <nav aria-label="On this page" className="tf-panel p-5">
      <TfLabel>On this page</TfLabel>
      <ol className="mt-4 space-y-2 text-sm text-[var(--tf-text-muted)]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a className="transition hover:text-[var(--tf-signal)]" href={`#${heading.id}`}>
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ResearchCallout({
  children,
  title = "Evidence boundary",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <TfPanel raised className="my-8 p-5">
      <TfLabel>{title}</TfLabel>
      <div className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{children}</div>
    </TfPanel>
  );
}

export function ResearchCode({ children }: { children: ReactNode }) {
  return (
    <pre className="my-8 overflow-x-auto rounded-lg border border-[var(--tf-line)] bg-[var(--tf-ink)] p-5 font-mono text-xs leading-6 text-[var(--tf-text-muted)]">
      {children}
    </pre>
  );
}
