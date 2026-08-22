import { PageShell } from "@/components/layout/page-shell";

export default function DetectionPage() {
  return (
    <PageShell
      eyebrow="Detection"
      title="Detect behavioral fade, not just loud indicators."
      description="ThreatFade's current detection baseline combines rolling Shannon entropy, z-score anomaly detection, detection rules, confidence scoring and an optional Isolation Forest layer."
    >
      <div className="rounded-2xl border border-white/8 bg-[#090c10] p-7 sm:p-10">
        <div className="grid gap-8 md:grid-cols-5">
          {["Signal", "Entropy", "Deviation", "Evidence", "Disposition"].map((label, index) => (
            <div key={label}>
              <div className="font-mono text-[10px] text-white/25">0{index + 1}</div>
              <div className="mt-3 font-semibold">{label}</div>
              {index < 4 && (
                <p className="mt-2 text-xs leading-6 text-white/40">
                  {
                    [
                      "PCAP or supported signal input",
                      "Rolling behavioral measurement",
                      "Statistical and rule-based change",
                      "Structured confidence and context",
                    ][index]
                  }
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
