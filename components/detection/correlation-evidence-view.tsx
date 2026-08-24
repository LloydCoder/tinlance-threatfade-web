import { TfBadge, TfLabel, TfMetric, TfPanel } from "@/components/ui/tf-primitives";

const observations = [
  {
    domain: "GNSS",
    label: "signal disruption",
    offset: 32,
    width: 16,
    tone: "warning" as const,
  },
  {
    domain: "NETWORK",
    label: "C2 fade",
    offset: 39,
    width: 18,
    tone: "signal" as const,
  },
];

export function CorrelationEvidenceView() {
  return (
    <TfPanel className="overflow-hidden p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <TfLabel>Correlation evidence view</TfLabel>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
            Temporal corroboration
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--tf-text-muted)]">
            The view shows how independent signal domains can overlap inside an explicit correlation window.
            It describes observed temporal association; it does not infer causality.
          </p>
        </div>
        <TfBadge tone="info">Observed correlation only</TfBadge>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <TfMetric label="Window" value="30s" detail="policy maximum" />
        <TfMetric
          label="Clock tolerance"
          value="5s"
          detail="explicit policy bound"
        />
        <TfMetric
          label="Attribution"
          value="Non-causal"
          detail="causal attribution not established"
        />
      </div>

      <div className="mt-8 rounded-xl border border-[var(--tf-line)] bg-[var(--tf-panel)] p-5">
        <div className="mb-5 flex items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
          <span>Illustrative timeline</span>
          <span>relative time →</span>
        </div>
        <div className="space-y-5">
          {observations.map((item) => (
            <div
              key={item.domain}
              className="grid grid-cols-[5.5rem_1fr] items-center gap-4"
            >
              <div className="font-mono text-[10px] tracking-[0.12em] text-[var(--tf-text-muted)]">
                {item.domain}
              </div>
              <div className="relative h-10 rounded-md border border-[var(--tf-line)] bg-[var(--tf-bg)]">
                <div
                  className={`absolute top-1/2 h-6 -translate-y-1/2 rounded-md border px-3 py-1 text-[10px] font-mono ${
                    item.tone === "warning"
                      ? "border-[color-mix(in_srgb,var(--tf-warning)_30%,transparent)] bg-[color-mix(in_srgb,var(--tf-warning)_8%,transparent)] text-[var(--tf-warning)]"
                      : "border-[color-mix(in_srgb,var(--tf-signal)_30%,transparent)] bg-[var(--tf-signal-soft)] text-[var(--tf-signal)]"
                  }`}
                  style={{ left: `${item.offset}%`, width: `${item.width}%` }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs leading-6 text-[var(--tf-text-subtle)]">
        Illustration only. Production correlation records carry source event IDs, event digests, sensor
        confidence, uncertainty, temporal delta, duplicate/out-of-order indicators and evidence hashes.
      </p>
    </TfPanel>
  );
}
