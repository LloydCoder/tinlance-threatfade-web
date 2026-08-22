import Link from "next/link";
import { ArrowRight, BookOpen, Github, Layers3, ShieldCheck } from "lucide-react";
import { TfBadge, TfLabel, TfPanel } from "@/components/ui/tf-primitives";
import { siteConfig } from "@/config/site";

const steps = [
  ["01", "Traffic", "PCAP, live signals and supported telemetry sources enter the detection boundary."],
  ["02", "Signal extraction", "ThreatFade extracts observable signal features, including rolling entropy and statistical behavior."],
  ["03", "Behavioral analysis", "Detection rules evaluate changes such as C2 quieting, LOTL fade and GNSS signal disruption."],
  ["04", "Anomaly", "Deviation and optional ML anomaly analysis help prioritize behavior that warrants inspection."],
  ["05", "Evidence", "Structured evidence, confidence and context are preserved for analyst review."],
  ["06", "ATT&CK", "Detections can carry MITRE ATT&CK context before operational handoff."],
  ["07", "Integration", "Results can move through JSON, Sigma-compatible, STIX 2.1-compatible and SIEM/FusionOps paths."],
] as const;

export function DetectionPipeline() {
  return <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--tf-line)] bg-[var(--tf-line)] lg:grid-cols-7">
    {steps.map(([number, title, body]) => <article key={number} className="bg-[var(--tf-panel)] p-5 sm:p-6">
      <div className="font-mono text-[10px] text-[var(--tf-text-subtle)]">{number}</div>
      <h3 className="mt-7 text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-[var(--tf-text-muted)]">{body}</p>
    </article>)}
  </div>;
}

export function AudienceCards() {
  const audiences = [
    { title: "Developers", label: "Run / inspect / contribute", body: "Start with the open-source engine, understand the detection surface and contribute against real implementation.", href: siteConfig.github, external: true, icon: Github },
    { title: "Researchers", label: "Methodology / evidence", body: "Follow the detection methodology, deterministic validation and research boundary without confusing project evidence with independent assurance.", href: "/research", icon: BookOpen },
    { title: "SOC teams", label: "Detect / investigate / handoff", body: "Evaluate evidence-backed detections, analyst workflow, ATT&CK context and operational interoperability.", href: "/detection", icon: Layers3 },
    { title: "Enterprise", label: "Architecture / security", body: "Review identity, tenancy, audit, deployment boundaries and the evidence-versus-assurance distinction.", href: "/security", icon: ShieldCheck },
  ] as const;

  return <div className="grid gap-4 md:grid-cols-2">
    {audiences.map(({ title, label, body, href, external, icon: Icon }) => <TfPanel key={title} className="group p-6 transition hover:border-[color-mix(in_srgb,var(--tf-signal)_30%,var(--tf-line))]">
      <div className="flex items-center justify-between"><TfBadge tone="neutral">{label}</TfBadge><Icon className="size-4 text-[var(--tf-text-subtle)] transition group-hover:text-[var(--tf-signal)]" /></div>
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p>
      {external ? <a href={href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--tf-signal)]">Open GitHub <ArrowRight className="size-4" /></a> : <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--tf-signal)]">Explore path <ArrowRight className="size-4" /></Link>}
    </TfPanel>)}
  </div>;
}

export function TrustBoundary() {
  return <TfPanel className="p-6 sm:p-8">
    <TfLabel>Trust boundary</TfLabel>
    <div className="mt-5 grid gap-6 md:grid-cols-3">
      <div><h3 className="font-semibold">Repository evidence</h3><p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">Tests, benchmarks, controls and documented validation are inspectable in the source repository.</p></div>
      <div><h3 className="font-semibold">Project validation</h3><p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">Published validation is explicitly scoped; it is not presented as a universal accuracy guarantee.</p></div>
      <div><h3 className="font-semibold">External assurance</h3><p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">Certifications, independent testing, contractual SLAs and customer-scale guarantees require separate evidence.</p></div>
    </div>
  </TfPanel>;
}
