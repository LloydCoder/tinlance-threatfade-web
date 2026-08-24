import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfLabel } from "@/components/ui/tf-primitives";
import { seoTopics, type SeoTopicSlug } from "@/config/seo-topics";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, entityIds, jsonLdScript } from "@/lib/seo/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(seoTopics).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: SeoTopicSlug }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const page = seoTopics[topic];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/detection/${topic}` },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}/detection/${topic}`,
    },
  };
}

export default async function DetectionTopicPage({
  params,
}: {
  params: Promise<{ topic: SeoTopicSlug }>;
}) {
  const { topic } = await params;
  const page = seoTopics[topic];
  if (!page) notFound();
  const url = `${siteConfig.url}/detection/${topic}`;
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Detection", url: `${siteConfig.url}/detection` },
    { name: page.title, url },
  ]);
  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: page.title,
    description: page.description,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "ThreatFade detection concepts",
      url: `${siteConfig.url}/detection`,
    },
    subjectOf: { "@id": entityIds.product },
  };

  return (
    <PageShell eyebrow="Detection topic" title={page.title} description={page.description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(definedTerm)} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <TfLabel>Evidence status</TfLabel>
            <TfBadge tone="signal">{page.status}</TfBadge>
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
            What ThreatFade documents
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--tf-text-muted)]">{page.summary}</p>
          <div className="mt-8 tf-panel p-6">
            <h2 className="text-base font-semibold">Evidence boundary</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
              Project validation is presented with its scope. Repository tests and author-confirmed
              scenarios do not establish universal accuracy, independent assurance, customer-scale
              performance or certification.
            </p>
          </div>
        </article>
        <aside className="tf-panel h-fit p-5">
          <TfLabel>Continue</TfLabel>
          <nav aria-label="Related ThreatFade resources" className="mt-4 space-y-3 text-sm">
            {page.links.map((href) => (
              <Link
                key={href}
                href={href}
                className="block text-[var(--tf-text-muted)] hover:text-[var(--tf-signal)]"
              >
                {href.replace(/^\//, "").replaceAll("/", " / ")}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </PageShell>
  );
}
