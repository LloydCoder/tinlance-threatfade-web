import Link from "next/link";
import { notFound } from "next/navigation";
import {
  demandLandingPages,
  type DemandLandingSlug,
} from "@/lib/demand-intelligence/landing-pages";

type Props = { params: Promise<{ problem: string }> };

export function generateStaticParams() {
  return Object.keys(demandLandingPages).map((problem) => ({ problem }));
}

export default async function DemandProblemPage({ params }: Props) {
  const { problem } = await params;
  if (!(problem in demandLandingPages)) notFound();
  const page = demandLandingPages[problem as DemandLandingSlug];

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        {page.eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
        {page.title}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        {page.description}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {page.evidence.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="font-medium text-slate-950">{item}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Evidence and implementation status are documented rather than implied.
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/assessment"
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          {page.cta}
        </Link>
        <Link
          href="/research"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900"
        >
          Read the research
        </Link>
      </div>
      <p className="mt-8 max-w-2xl text-xs leading-5 text-slate-500">
        This page is problem-focused, not an assertion that your organization has any
        specific security condition. Account research should be independently verified
        before outreach.
      </p>
    </main>
  );
}
