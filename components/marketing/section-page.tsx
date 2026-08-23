import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { TfBadge, TfLabel, TfPanel } from "@/components/ui/tf-primitives";

type SectionHref = Parameters<typeof Link>[0]["href"];

export function SectionPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--tf-canvas)] text-[var(--tf-text)]">
      <SiteHeader />
      <header className="border-b border-[var(--tf-line)]">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
          <TfLabel>{eyebrow}</TfLabel>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--tf-text-muted)]">{intro}</p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">{children}</div>
    </main>
  );
}

export function SectionGrid({
  items,
}: {
  ReadonlyArray: never;
}) {
  return null;
}
