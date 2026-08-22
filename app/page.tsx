import Link from "next/link";
import { ArrowRight, Github, Radar, ShieldCheck } from "lucide-react";
import { SignalVisualization } from "@/components/marketing/signal-visualization";
import { SiteHeader } from "@/components/navigation/site-header";
import { siteConfig } from "@/config/site";

const capabilities = [
  ["Signal extraction", "Turn packet and signal behavior into measurable observations."],
  [
    "Behavioral deviation",
    "Model changes in observable activity instead of assuming silence is benign.",
  ],
  [
    "Evidence-first detection",
    "Preserve structured evidence, confidence and context for analyst review.",
  ],
  ["Operational handoff", "Map detections to ATT&CK and export into existing security workflows."],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="grid-noise pointer-events-none absolute inset-0 opacity-45" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-28 lg:pt-28">
          <div className="relative flex flex-col justify-center">
            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#b8ff5a]/20 bg-[#b8ff5a]/6 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff5a]">
              <span className="size-1.5 rounded-full bg-[#b8ff5a] shadow-[0_0_12px_#b8ff5a]" />
              Evidence-first detection
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Detect when attackers <span className="text-[#b8ff5a]">go quiet.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/55 sm:text-xl">
              ThreatFade detects adversarial behavior that becomes intentionally less
              observable—using entropy analysis, statistical deviation, heuristic detection,
              confidence scoring and structured evidence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#b8ff5a] px-5 py-3 text-sm font-semibold text-[#071000] transition hover:bg-[#c8ff7d]"
              >
                <Github className="size-4" />
                View the engine
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/playground"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/4"
              >
                Explore the signal
                <Radar className="size-4 text-white/55" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/32">
              <span>Open source</span>
              <span>Apache 2.0</span>
              <span>v{siteConfig.version}</span>
              <span>Python / FastAPI</span>
            </div>
          </div>
          <div className="relative lg:pt-8">
            <SignalVisualization />
          </div>
        </div>
      </section>

      <section className="border-b border-white/6 bg-[#080b0e]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff5a]">
                The problem
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Silence can be a signal.
              </h2>
            </div>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-white/55 sm:text-lg">
              <p>
                Attackers do not need to disappear completely to become harder to see. A C2 channel
                can quiet. Living-off-the-land activity can taper. A signal can change shape while
                the underlying operation continues.
              </p>
              <p>
                ThreatFade treats a reduction in observability as a measurable behavioral event—then
                preserves the evidence needed to decide what it means.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/6">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff5a]">
              Detection pipeline
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              From fading signal to analyst evidence.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-2">
            {capabilities.map(([title, body], index) => (
              <article key={title} className="bg-[#090c10] p-7 sm:p-9">
                <div className="font-mono text-xs text-white/25">0{index + 1}</div>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/48">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/6">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="rounded-2xl border border-white/8 bg-[#090c10] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:p-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff5a]">
                <ShieldCheck className="size-3.5" /> Open source by design
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">
                Inspect the implementation. Challenge the evidence.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/48 sm:text-base">
                ThreatFade is built to be examined: detection packs, benchmarks, security controls
                and interoperability are part of the public engineering surface.
              </p>
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-md border border-white/12 px-5 py-3 text-sm font-semibold transition hover:border-[#b8ff5a]/40 hover:text-[#b8ff5a] lg:mt-0"
            >
              Explore GitHub <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span className="font-mono">THREATFADE / TINLANCE LIMITED</span>
        <span>Evidence first. Claims last.</span>
      </footer>
    </main>
  );
}
