import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getResearchArticle, researchArticles } from "@/content/research";
import { getResearchSource } from "@/lib/research";
import { PageShell } from "@/components/layout/page-shell";
import { ResearchCallout, ResearchCode, ResearchMeta, ResearchStatus, ResearchToc, ResearchArtifacts } from "@/components/research/research-components";
import { articleJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return researchArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/research/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, url: `${siteConfig.url}/research/${article.slug}`, publishedTime: article.published, modifiedTime: article.updated, authors: [article.author], tags: article.tags },
  };
}

export default async function ResearchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) notFound();
  const source = await getResearchSource(slug);
  const { content } = await compileMDX({ source: source.content, components: { ResearchStatus, ResearchCallout, ResearchCode } });
  const url = `${siteConfig.url}/research/${article.slug}`;
  const structuredData = articleJsonLd({ title: article.title, description: article.description, url, published: article.published, updated: article.updated, author: article.author, type: "TechArticle" });
  const breadcrumbs = breadcrumbJsonLd([{ name: "Research", url: `${siteConfig.url}/research` }, { name: article.title, url }]);

  return (
    <PageShell eyebrow={article.category} title={article.title} description={article.description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(structuredData)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <ResearchMeta author={article.author} published={article.published} updated={article.updated} readingTime={article.readingTime} evidence={article.evidence} />
      <ResearchArtifacts artifacts={article.artifacts} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:text-[var(--tf-text-muted)] prose-p:leading-8 prose-a:text-[var(--tf-signal)] prose-code:text-[var(--tf-signal)] prose-pre:bg-transparent">
          <div className="mb-6"><ResearchStatus status={article.status} /></div>
          {content}
          <footer className="mt-12 border-t border-[var(--tf-line)] pt-6">
            <h2 className="text-sm font-semibold">References</h2>
            <ol className="mt-4 space-y-2 text-sm text-[var(--tf-text-muted)]">{article.references.map((reference) => <li key={reference}>{reference}</li>)}</ol>
          </footer>
        </article>
        <aside className="lg:sticky lg:top-24 lg:self-start"><ResearchToc headings={[{ id: "research-question", title: "Research question" }, { id: "detection-model", title: "Detection model" }, { id: "evidence-boundary", title: "Evidence boundary" }]} /></aside>
      </div>
    </PageShell>
  );
}
