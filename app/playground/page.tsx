import { PageShell } from "@/components/layout/page-shell";

export default function PlaygroundPage() {
  return (
    <PageShell
      eyebrow="Playground"
      title="See a fade become evidence."
      description="The public playground will begin with curated sample scenarios so visitors can understand the detection model without exposing production infrastructure to arbitrary hostile input."
    >
      <div className="rounded-2xl border border-[#b8ff5a]/15 bg-[#0a1008] p-8 sm:p-10">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#b8ff5a]">
          Safe demonstration boundary
        </div>
        <h2 className="mt-4 text-2xl font-semibold">Curated scenarios first.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/48">
          The initial experience will demonstrate C2 quieting, LOTL gradual fade, GNSS interference
          and normal-with-fade scenarios using repository-backed evidence. Arbitrary uploads require
          a separate security-reviewed processing boundary.
        </p>
      </div>
    </PageShell>
  );
}
