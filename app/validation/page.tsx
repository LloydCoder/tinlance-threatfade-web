import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";
import truth from "@/content/engine-truth.json";

export const metadata: Metadata = {
  title: "Validation",
  description: "ThreatFade validation evidence, methodology, scope, limitations and reproducibility boundaries.",
  alternates: { canonical: "/validation" },
  openGraph: { title: "ThreatFade Validation", description: "Evidence records with methodology, scope, limitations and reproducibility boundaries.", url: "/validation" },
  twitter: { card: "summary_large_image", title: "ThreatFade Validation", description: "Evidence records with methodology, scope, limitations and reproducibility boundaries." },
};

function statusTone(status: string) {
  return status === "VALIDATED" || status === "TESTED" ? "signal" : "neutral";
}

export default function ValidationPage() {
  return (
    <PageShell eyebrow="Validation / evidence" title="Evidence with a boundary, not a headline." description="ThreatFade separates deterministic repository validation from external validation. Every published result identifies its method, scope, limitations and reproducibility path.">
      <TfPanel className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3"><TfBadge tone="signal">v{truth.version}</TfBadge><TfBadge tone="neutral">Development line</TfBadge></div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">The authoritative evidence boundary is maintained in the engine repository. This page is a synchronized presentation surface; it does not create new validation evidence.</p>
        <Link href="https://github.com/LloydCoder/tinlance-threatfade/blob/main/docs/GROUP_10_VALIDATION.md" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-[var(--tf-signal)]">Read the validation boundary →</Link>
      </TfPanel>
      <section className="mt-10">
        <div className="mb-5"><span className="tf-mono-label text-[var(--tf-signal)]">Evidence records</span><h2 className="mt-3 text-2xl font-semibold">What has actually been evaluated?</h2></div>
        <div className="grid gap-5 lg:grid-cols-2">
          {truth.validation.map((item) => (
            <TfPanel key={item.id} className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--tf-text-subtle)]">{item.id}</p><h3 className="mt-2 text-lg font-semibold">{item.title}</h3></div><TfBadge tone={statusTone(item.status)}>{item.status}</TfBadge></div>
              <dl className="mt-6 grid gap-4 text-sm">
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Category</dt><dd className="mt-1 text-[var(--tf-text-muted)]">{item.category}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Methodology</dt><dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">{item.methodology}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Dataset / sample</dt><dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">{item.dataset}{"sampleSize" in item ? ` · ${item.sampleSize}` : ""}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Result boundary</dt><dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">{item.resultBoundary}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Limitations</dt><dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">{item.limitations}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Reproducibility</dt><dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">{item.reproducibility}</dd></div>
              </dl>
            </TfPanel>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <div className="mb-5"><span className="tf-mono-label text-[var(--tf-signal)]">Evidence taxonomy</span><h2 className="mt-3 text-2xl font-semibold">Implementation is not the same as validation.</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{truth.evidenceTaxonomy.map((status) => <TfPanel key={status} className="p-5"><TfBadge tone={status === "VALIDATED" ? "signal" : "neutral"}>{status}</TfBadge><p className="mt-3 text-sm leading-6 text-[var(--tf-text-muted)]">{status === "IMPLEMENTED" && "Capability exists in the current codebase."}{status === "TESTED" && "Automated or reproducible tests exercise the capability."}{status === "VALIDATED" && "Documented evaluation evidence exists for a defined scope."}{status === "EXPERIMENTAL" && "Research-stage capability; not authoritative for production decisions."}{status === "PLANNED" && "Not currently implemented."}{status === "ADAPTER" && "Interoperability is provided through an adapter rather than a native vendor integration."}{status === "EXTERNAL-DEPENDENCY" && "Operation depends on an external provider or deployment boundary."}</p></TfPanel>)}</div>
      </section>
      <TfPanel className="mt-10 p-6 sm:p-8"><h2 className="text-xl font-semibold">What this page does not claim</h2><ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--tf-text-muted)] sm:grid-cols-2"><li>• No independent detection validation.</li><li>• No customer validation claim.</li><li>• No universal false-positive guarantee.</li><li>• No independently reproduced throughput claim.</li><li>• No SOC 2 / ISO certification claim.</li><li>• No third-party penetration-test claim.</li></ul></TfPanel>
    </PageShell>
  );
}
