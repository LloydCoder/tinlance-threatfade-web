import { TfBadge, TfLabel, TfMetric, TfPanel } from "@/components/ui/tf-primitives";

const observations = [
  { domain: "GNSS", label: "signal disruption", offset: 32, width: 16 },
  { domain: "NETWORK", label: "C2 fade", offset: 39, width: 18 },
];

const timelineClass = "relative h-10 rounded-md border border-[var(--tf-line)] bg-[var(--tf-bg)]";
const eventClass =
  "absolute top-1/2 h-6 -translate-y-1/2 rounded-md border border-[var(--tf-signal)] bg-[var(--tf-signal-soft)] px-3 py-1 text-[10px] font-mono text-[var(--tf-signal)]";

export function CorrelationEvidenceView() {
  return (
    <TfPanel className="overflow-hidden p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <TfLabel>Correlation evidence view</TfLabel>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">Temporal corroboration</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--tf-text-muted)]">
            Independent domains can overlap inside an explicit correlation window. This view shows
            association, not causality.
          </p>
        </div>
        <TfBadge tone="info">Observed correlation</TfBadge>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <TfMetric label="Window" value="30s" detail="policy" />
        <TfMetric label="Clock tolerance" value="5s" detail="policy" />
        <TfMetric label="Attribution" value="Non-causal" detail="not established" />
      </div>

      <div className="mt-8 rounded-xl border border-[var(--tf-line)] bg-[var(--tf-panel)] p-5">
        <div className="mb-5 flex items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
          <span>Illustrative timeline</span>
          <span>relative time →</span>
        </div>
        <div className="space-y-5">
          {observations.map((item) => (
            <div key={item.domain} className="grid grid-cols-[5.5rem_1fr] items-center gap-4">
              <div className="font-mono text-[10px] tracking-[0.12em] text-[var(--tf-text-muted)]">
                {item.domain}
              </div>
              <div className={timelineClass}>
                <div
                  className={eventClass}
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
        Illustration only. Production records retain source IDs, digests, uncertainty, timing,
        duplicate and ordering provenance.
      </p>
    </TfPanel>
  );
}
