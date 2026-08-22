import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/config/site";

export default function ChangelogPage() {
  return <PageShell eyebrow="Changelog" title="Track the system as it evolves." description="The public changelog will connect website releases to the engine's versioned implementation, validation and documentation changes."><div className="rounded-xl border border-white/8 bg-[#090c10] p-7"><div className="font-mono text-xs text-[#b8ff5a]">ThreatFade v{siteConfig.version}</div><h2 className="mt-4 text-xl font-semibold">Enterprise engineering baseline</h2><p className="mt-3 text-sm leading-7 text-white/45">The current source-of-truth repository identifies v0.4.0 as its enterprise engineering baseline. Future entries will be generated from verified release evidence rather than marketing claims.</p></div></PageShell>;
}
