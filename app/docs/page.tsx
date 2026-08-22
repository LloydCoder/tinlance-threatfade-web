import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

const docs = [
  "getting-started",
  "installation",
  "configuration",
  "detection-packs",
  "api",
  "integrations",
  "deployment",
  "security",
  "reference",
] as const;

export default function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title="Build with the actual ThreatFade system."
      description="Technical documentation will mirror the engine repository and stay explicit about implemented, experimental and deployment-dependent capabilities."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((slug) => (
          <Link
            key={slug}
            href={`/docs/${slug}` as Route}
            className="group rounded-xl border border-white/8 bg-[#090c10] p-6 transition hover:border-[#b8ff5a]/25"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-white/75">{slug}</span>
              <ArrowRight className="size-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-[#b8ff5a]" />
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
