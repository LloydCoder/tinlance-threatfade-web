import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FlaskConical, ShieldCheck, Trophy } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";
import { ConversionLink } from "@/components/analytics/conversion-link";

export const metadata: Metadata = {
  title: "Detection Challenge",
  description:
    "A reproducible public challenge for behavioral fade detection research, with explicit evidence and anti-leakage rules.",
  alternates: { canonical: "/research/challenge" },
};

const engineChallenge =
  "https://github.com/LloydCoder/tinlance-threatfade/blob/main/research/phase16/DETECTION-CHALLENGE-v1.md";
const dataset =
  "https://github.com/LloydCoder/tinlance-threatfade/blob/main/datasets/fixtures/ground_truth_v1.jsonl";

export default function DetectionChallengePage() {
  return (
    <PageShell
      eyebrow="Research challenge"
      title="Can you detect the fade without cheating the evidence?"
      description="ThreatFade Detection Challenge v1 is a versioned, reproducible research protocol for behavioral fade detection. It uses non-sensitive synthetic artifacts and keeps the leaderboard empty until submissions are actually evaluated."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <TfPanel raised className="p-6">
          <FlaskConical className="size-5 text-[var(--tf-signal)]" />
          <h2 className="mt-4 text-lg font-semibold">Track A — Reproduction</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">
            Reproduce the documented behavioral-fade approach against the public challenge fixture.
          </p>
        </TfPanel>
        <TfPanel raised className="p-6">
          <ShieldCheck className="size-5 text-[var(--tf-signal)]" />
          <h2 className="mt-4 text-lg font-semibold">Track B — Independent detector</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">
            Build an independent detector and disclose reused implementation, features and external
            data.
          </p>
        </TfPanel>
        <TfPanel raised className="p-6">
          <Trophy className="size-5 text-[var(--tf-signal)]" />
          <h2 className="mt-4 text-lg font-semibold">Track C — Robustness</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">
            Evaluate controlled timing, sparsity and benign-transient perturbations and report
            results per condition.
          </p>
        </TfPanel>
      </div>

      <TfPanel className="mt-8 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <TfBadge tone="warning">Protocol v1 · leaderboard not yet populated</TfBadge>
            <h2 className="mt-4 text-xl font-semibold">Submission contract</h2>
          </div>
          <ConversionLink
            href={engineChallenge}
            event="research_open"
            source="research-challenge"
            cta="challenge-protocol"
          >
            Read protocol <ArrowRight className="size-4" />
          </ConversionLink>
        </div>
        <ul className="mt-6 grid gap-3 text-sm text-[var(--tf-text-muted)] md:grid-cols-2">
          <li>• Pin detector version and challenge dataset digest.</li>
          <li>• Publish the exact execution command.</li>
          <li>• Preserve raw predictions and confusion-matrix counts.</li>
          <li>• Disclose external datasets/models.</li>
          <li>• Do not use hidden evaluation labels.</li>
          <li>• No unrestricted network access during evaluation.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <ConversionLink
            href={dataset}
            event="github_view"
            source="research-challenge"
            cta="challenge-dataset"
          >
            <Download className="size-4" />
            View challenge fixture
          </ConversionLink>
          <Link
            href="/research/behavioral-fade-detection-reproducibility-study-v1"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--tf-line)] px-4 py-2 text-sm"
          >
            Read flagship study <ArrowRight className="size-4" />
          </Link>
        </div>
      </TfPanel>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <TfPanel raised className="p-6">
          <h2 className="text-lg font-semibold">What the challenge can prove</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">
            It can establish reproducible benchmark performance on the specified dataset and
            protocol. It can expose methodological trade-offs and robustness gaps.
          </p>
        </TfPanel>
        <TfPanel raised className="p-6">
          <h2 className="text-lg font-semibold">What it cannot prove</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--tf-text-muted)]">
            It cannot establish universal detection accuracy, customer-scale performance,
            third-party assurance or production guarantees.
          </p>
        </TfPanel>
      </div>
    </PageShell>
  );
}
