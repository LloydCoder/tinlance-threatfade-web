import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfLabel, TfPanel } from "@/components/ui/tf-primitives";
import { researchArticles, researchCategories } from "@/content/research";

export const metadata = { title: "Research", description: "ThreatFade technical research, detection methodology, validation and evidence." };

export default function ResearchPage() {
  return <PageShell eyebrow="Research" title="Evidence, methodology and the limits of the evidence." description="A technical publication surface for detection science, validation, benchmarks and adversarial behavior. Research is labeled by evidence status so readers can distinguish what has been validated from what remains experimental or planned.">
    <div className="mb-8 flex flex-wrap gap-2" aria-label="Research taxonomy">{researchCategories.map((category) => <TfBadge key={category} tone={category === "All" ? "signal" : "neutral"}>{category}</TfBadge>)}</div>
    <div className="grid gap-5 lg:grid-cols-3">{researchArticles.map((article) => <article key={article.slug} className="tf-panel flex flex-col p-6 transition-colors hover:border-[var(--tf-line-strong)]">
      <div className="flex items-center justify-between gap-3"><TfLabel>{article.category}</TfLabel><TfBadge tone={article.status === "validated" ? "signal" : "warning"}>{article.status}</TfBadge></div>
      <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{article.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--tf-text-muted)]">{article.description}</p>
      <div className="mt-6 flex items-center gap-4 border-t border-[var(--tf-line)] pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]"><span>{article.readingTime}</span><span>{article.published}</span></div>
      <Link className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--tf-signal)]" href={`/research/${article.slug}`}>Read research <ArrowRight className="size-4" /></Link>
    </article>)}</div>
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      <TfPanel raised className="p-6"><BookOpen className="size-5 text-[var(--tf-signal)]" /><h2 className="mt-4 text-lg font-semibold">Evidence discipline</h2><p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">Validated project evidence, synthetic illustrations, experiments, hypotheses and planned work are explicitly separated. Passing repository tests is not represented as independent assurance.</p></TfPanel>
      <TfPanel raised className="p-6"><FlaskConical className="size-5 text-[var(--tf-signal)]" /><h2 className="mt-4 text-lg font-semibold">Research backlog</h2><p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">QUIC behavior, encrypted traffic, adversarial adaptation and broader independent validation belong here only when the underlying evidence exists.</p></TfPanel>
    </div>
  </PageShell>;
}
