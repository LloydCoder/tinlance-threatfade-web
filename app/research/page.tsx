import Link from "next/link";
import { BookOpen, FlaskConical, Trophy } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { TfPanel } from "@/components/ui/tf-primitives";
import { researchArticles, researchCategories } from "@/content/research";
import { ResearchIndex } from "@/components/research/research-index";

export const metadata = { title: "Research", description: "ThreatFade technical research, reproducibility protocols, detection methodology, benchmarks and evidence." };

export default function ResearchPage() {
  return <PageShell eyebrow="Research" title="Evidence, methodology and the limits of the evidence." description="A technical publication surface for detection science, reproducibility, benchmarks and adversarial behavior. Every publication carries an explicit evidence class so readers can distinguish validated project evidence from synthetic, experimental and planned work.">
    <ResearchIndex articles={researchArticles} categories={researchCategories} />
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      <TfPanel raised className="p-6"><BookOpen className="size-5 text-[var(--tf-signal)]" /><h2 className="mt-4 text-lg font-semibold">Evidence discipline</h2><p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">Repository validation, synthetic fixtures, independent evaluation and planned research remain separate evidence classes. Passing tests is not represented as universal detection accuracy.</p></TfPanel>
      <TfPanel raised className="p-6"><FlaskConical className="size-5 text-[var(--tf-signal)]" /><h2 className="mt-4 text-lg font-semibold">Flagship reproducibility study</h2><p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">The first Phase 16 study pins the dataset, engine commit, configuration and metrics before any results are published.</p><Link href="/research/behavioral-fade-detection-reproducibility-study-v1" className="mt-4 inline-flex text-sm text-[var(--tf-signal)]">Read protocol →</Link></TfPanel>
      <TfPanel raised className="p-6"><Trophy className="size-5 text-[var(--tf-signal)]" /><h2 className="mt-4 text-lg font-semibold">Detection Challenge</h2><p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">A public, versioned challenge for reproducible fade-detection experiments. The leaderboard stays empty until submissions are actually evaluated.</p><Link href="/research/challenge" className="mt-4 inline-flex text-sm text-[var(--tf-signal)]">View challenge →</Link></TfPanel>
    </div>
  </PageShell>;
}
