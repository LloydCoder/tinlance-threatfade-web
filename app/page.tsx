import Link from "next/link";
import { ArrowRight, GithubIcon, ShieldCheck } from "lucide-react";
import { BehavioralLab } from "@/components/marketing/behavioral-lab";
import { AudienceCards, DetectionPipeline, TrustBoundary } from "@/components/marketing/core-experience";
import { SiteHeader } from "@/components/navigation/site-header";
import { TfBadge, TfLabel } from "@/components/ui/tf-primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
  return <main className="min-h-screen bg-[var(--tf-canvas)] text-[var(--tf-text)]">
    <SiteHeader />
    <section className="relative overflow-hidden border-b border-[var(--tf-line)]">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-45" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-28 lg:pt-28">
        <div className="flex flex-col justify-center">
          <div className="mb-7 flex flex-wrap items-center gap-2"><TfBadge tone="signal">Evidence-first detection</TfBadge><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--tf-text-subtle)]">v{siteConfig.version}</span></div>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">Detect when attackers <span className="text-[var(--tf-signal)]">go quiet.</span></h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--tf-text-muted)] sm:text-xl">ThreatFade is an evidence-first detection and investigation platform for adversarial activity that becomes intentionally less observable.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--tf-signal)] px-5 py-3 text-sm font-semibold text-[var(--tf-signal-text)] transition hover:brightness-105"><GithubIcon className="size-4" /> View on GitHub <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
            <Link href="/detection" className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--tf-line-strong)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--tf-signal)] hover:text-[var(--tf-signal)]">Understand detection</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--tf-text-subtle)]"><span>Apache 2.0</span><span>Open source</span><span>Python / FastAPI</span><span>Evidence + ATT&CK</span></div>
        </div>
        <div className="relative lg:pt-8"><BehavioralLab /></div>
      </div>
    </section>

    <section className="border-b border-[var(--tf-line)] bg-[var(--tf-panel)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><TfLabel>The problem</TfLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Reduced observability can itself be worth investigating.</h2></div><div className="max-w-3xl space-y-5 text-base leading-8 text-[var(--tf-text-muted)] sm:text-lg"><p>ThreatFade is built around a specific detection thesis: adversarial activity can become less observable on purpose. The system models changes in network or signal behavior instead of treating a reduction in activity as automatically benign.</p><p>That produces an investigation path rather than a black-box verdict: prioritize the deviation, inspect structured evidence, pivot through context, disposition the case and hand off to existing security operations.</p></div></div>
      </div>
    </section>

    <section className="border-b border-[var(--tf-line)]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-12 max-w-2xl"><TfLabel>Detection pipeline</TfLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">From observable traffic to operational evidence.</h2></div><DetectionPipeline /><div className="mt-8"><Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--tf-signal)]">See the architecture <ArrowRight className="size-4" /></Link></div></div></section>

    <section className="border-b border-[var(--tf-line)] bg-[var(--tf-panel)]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-12 max-w-2xl"><TfLabel>Choose your path</TfLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">One engine. Different reasons to evaluate it.</h2></div><AudienceCards /></div></section>

    <section className="border-b border-[var(--tf-line)]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-10 flex items-center gap-2"><ShieldCheck className="size-4 text-[var(--tf-signal)]" /><TfLabel>Why trust it</TfLabel></div><TrustBoundary /></div></section>

    <section><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="rounded-2xl border border-[color-mix(in_srgb,var(--tf-signal)_20%,var(--tf-line))] bg-[var(--tf-signal-soft)] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between"><div><TfLabel>Start with the source</TfLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Inspect it. Run it. Challenge it.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--tf-text-muted)]">The engine repository contains the detection engine, API, analyst console, validation framework and interoperability layer.</p></div><a href={siteConfig.github} target="_blank" rel="noreferrer" className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--tf-signal)] px-5 py-3 text-sm font-semibold text-[var(--tf-signal-text)] lg:mt-0">View engine <ArrowRight className="size-4" /></a></div></div></section>
  </main>;
}
