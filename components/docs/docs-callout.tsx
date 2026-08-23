import type { ReactNode } from "react";
import { TfLabel, TfPanel } from "@/components/ui/tf-primitives";

export function DocsCallout({ title = "Note", tone = "info", children }: { title?: string; tone?: "info" | "warning" | "security"; children: ReactNode }) {
  const label = tone === "security" ? "Security" : tone === "warning" ? "Caution" : title;
  return <TfPanel raised className="my-8 p-5"><TfLabel>{label}</TfLabel><div className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{children}</div></TfPanel>;
}
