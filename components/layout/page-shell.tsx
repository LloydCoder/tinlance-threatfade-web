import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { siteConfig } from "@/config/site";
import { TfLabel } from "@/components/ui/tf-primitives";

export function PageShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <main className="min-h-screen bg-[var(--tf-canvas)] text-[var(--tf-text)]"><SiteHeader /><header className="relative overflow-hidden border-b border-[var(--tf-line)]"><div className="grid-noise pointer-events-none absolute inset-0 opacity-35" /><div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28"><Link href="/" className="mb-12 inline-flex items-center gap-2 text-xs text-[var(--tf-text-subtle)] transition hover:text-[var(--tf-text)]"><ArrowLeft className="size-3.5" /> Home</Link><TfLabel>{eyebrow}</TfLabel><h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[var(--tf-text-muted)] sm:text-lg">{description}</p></div></header><section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">{children}</section><footer className="mx-auto flex max-w-7xl items-center justify-between border-t border-[var(--tf-line)] px-5 py-10 text-xs text-[var(--tf-text-subtle)] lg:px-8"><span className="font-mono">THREATFADE / TINLANCE LIMITED</span><a href={siteConfig.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition hover:text-[var(--tf-signal)]">Source on GitHub <ArrowUpRight className="size-3" /></a></footer></main>;
}
