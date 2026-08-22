import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TfPanel({ children, className, raised = false }: { children: ReactNode; className?: string; raised?: boolean }) {
  return <div className={cn(raised ? "tf-panel-raised" : "tf-panel", className)}>{children}</div>;
}

export function TfLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("tf-mono-label text-[var(--tf-signal)]", className)}>{children}</span>;
}

export function TfBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "signal" | "warning" | "danger" | "info" }) {
  const tones = {
    neutral: "border-[var(--tf-line)] bg-[var(--tf-panel)] text-[var(--tf-text-muted)]",
    signal: "border-[color-mix(in_srgb,var(--tf-signal)_28%,transparent)] bg-[var(--tf-signal-soft)] text-[var(--tf-signal)]",
    warning: "border-[color-mix(in_srgb,var(--tf-warning)_28%,transparent)] bg-[color-mix(in_srgb,var(--tf-warning)_8%,transparent)] text-[var(--tf-warning)]",
    danger: "border-[color-mix(in_srgb,var(--tf-danger)_28%,transparent)] bg-[color-mix(in_srgb,var(--tf-danger)_8%,transparent)] text-[var(--tf-danger)]",
    info: "border-[color-mix(in_srgb,var(--tf-info)_28%,transparent)] bg-[color-mix(in_srgb,var(--tf-info)_8%,transparent)] text-[var(--tf-info)]",
  };
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]", tones[tone])}>{children}</span>;
}

export function TfMetric({ label, value, detail }: { label: string; value: ReactNode; detail?: ReactNode }) {
  return <div className="min-w-0 border-l border-[var(--tf-line)] pl-4 first:border-l-0 first:pl-0">
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--tf-text-subtle)]">{label}</div>
    <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--tf-text)]">{value}</div>
    {detail ? <div className="mt-1 text-xs text-[var(--tf-text-subtle)]">{detail}</div> : null}
  </div>;
}

export function TfSignalDot({ active = true }: { active?: boolean }) {
  return <span aria-hidden="true" className={cn("inline-block size-1.5 rounded-full bg-[var(--tf-signal)]", active && "tf-signal-pulse")} />;
}
