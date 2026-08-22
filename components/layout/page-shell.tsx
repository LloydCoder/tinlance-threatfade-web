import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { siteConfig } from "@/config/site";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="grid-noise pointer-events-none absolute inset-0 opacity-35" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-xs text-white/35 hover:text-white">
            <ArrowLeft className="size-3.5" /> Home
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff5a]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">{description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">{children}</section>
      <footer className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/6 px-5 py-10 text-xs text-white/30 lg:px-8">
        <span className="font-mono">THREATFADE / TINLANCE LIMITED</span>
        <Link href={siteConfig.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#b8ff5a]">Source on GitHub <ArrowUpRight className="size-3" /></Link>
      </footer>
    </main>
  );
}
