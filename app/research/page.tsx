import { PageShell } from "@/components/layout/page-shell";

export default function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="The evidence behind the detector."
      description="A research-grade publication surface for detection methodology, validation, benchmarks, experiments and the boundaries of what ThreatFade can currently claim."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-white/8 bg-[#090c10] p-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b8ff5a]">
            Detection science
          </div>
          <h2 className="mt-5 text-xl font-semibold">Behavioral fade as a detection signal</h2>
          <p className="mt-3 text-sm leading-7 text-white/45">
            The canonical research series will explain the hypothesis, measurement model,
            limitations and validation methodology.
          </p>
        </article>
        <article className="rounded-xl border border-white/8 bg-[#090c10] p-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b8ff5a]">
            Validation
          </div>
          <h2 className="mt-5 text-xl font-semibold">
            From deterministic benchmarks to real-PCAP evidence
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/45">
            Repository validation will be separated clearly from independent assurance and universal
            performance claims.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
