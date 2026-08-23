import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { docsSections, docsVersion } from "@/config/docs";
import { TfLabel } from "@/components/ui/tf-primitives";

export function DocsSidebar({ active }: { active?: string }) {
  return <aside aria-label="Documentation navigation" className="lg:sticky lg:top-24 lg:self-start"><div className="tf-panel p-4"><div className="flex items-center justify-between"><TfLabel>Docs</TfLabel><span className="font-mono text-[10px] text-[var(--tf-text-subtle)]">{docsVersion}</span></div><nav className="mt-4 space-y-1">{docsSections.map((item) => <Link key={item.slug} href={`/docs/${item.slug}`} aria-current={active === item.slug ? "page" : undefined} className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition ${active === item.slug ? "bg-[var(--tf-signal-soft)] text-[var(--tf-text)]" : "text-[var(--tf-text-muted)] hover:bg-[var(--tf-panel-raised)] hover:text-[var(--tf-text)]"}`}><span>{item.title}</span>{active === item.slug ? <ChevronRight className="size-3.5 text-[var(--tf-signal)]" /> : null}</Link>)}</nav></div></aside>;
}
