import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";

const known = new Set([
  "getting-started",
  "installation",
  "configuration",
  "detection-packs",
  "api",
  "integrations",
  "deployment",
  "security",
  "reference",
]);

export function generateStaticParams() {
  return [...known].map((slug) => ({ slug }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!known.has(slug)) notFound();
  return (
    <PageShell
      eyebrow="Documentation"
      title={slug.replaceAll("-", " ")}
      description="This documentation surface is intentionally tied to the source-of-truth engine. Content will be populated from verified implementation and deployment evidence."
    >
      <div className="prose prose-invert max-w-3xl">
        <p className="text-white/50">
          Documentation content is being established from the current ThreatFade repository. No
          capability is represented here until it has been reconciled against the implementation.
        </p>
      </div>
    </PageShell>
  );
}
