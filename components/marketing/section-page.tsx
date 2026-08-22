import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { TfBadge, TfLabel, TfPanel } from "@/components/ui/tf-primitives";

export function SectionPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-[var(--tf-canvas)] text-[var(--tf-text)]"><SiteHeader /><header className="border-b border-[var(--tf-line)]"><div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28"><TfLabel>{eyebrow}</TfLabel><h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--tf-text-muted)]">{intro}</p></div></header><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">{children}</div></main>;
}

export function SectionGrid({ items }: { items: ReadonlyArray<{ label: string; title: string; body: string; href?: string }> }) {
  return <div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <TfPanel key={item.title} className="p-6 sm:p-8"><div className="flex items-center justify-between"><TfBadge tone="neutral">0{index + 1}</TfBadge><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--tf-text-subtle)]">{item.label}</span></div><h2 className="mt-7 text-xl font-semibold tracking-[-0.02em]">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{item.body}</p>{item.href ? <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--tf-signal)]">Explore <ArrowRight className="size-4" /></Link> : null}</TfPanel>)}</div>;
}
