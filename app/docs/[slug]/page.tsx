import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { docsMdxComponents } from "@/components/docs/mdx-components";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { docsVersion, getDocNavigation } from "@/config/docs";
import { getDoc, getDocSlugs } from "@/lib/docs";
import { TfBadge, TfLabel } from "@/components/ui/tf-primitives";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getDocSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) return {};
  return { title: doc.frontmatter.title, description: doc.frontmatter.description, alternates: { canonical: `/docs/${slug}` }, openGraph: { type: "article", title: doc.frontmatter.title, description: doc.frontmatter.description } };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) notFound();
  const { content } = await compileMDX({ source: doc.source, options: { parseFrontmatter: true, blockJS: true, blockDangerousJS: true }, components: docsMdxComponents });
  const navigation = getDocNavigation(slug);
  const structuredData = { "@context": "https://schema.org", "@type": "TechArticle", headline: doc.frontmatter.title, description: doc.frontmatter.description, dateModified: doc.frontmatter.updated, version: docsVersion, url: `/docs/${slug}` };
  return <article className="min-w-0"><DocsBreadcrumbs slug={slug} /><header className="border-b border-[var(--tf-line)] pb-8"><div className="flex flex-wrap items-center gap-3"><TfLabel>{doc.frontmatter.category}</TfLabel><TfBadge tone="neutral">{doc.frontmatter.version}</TfBadge><TfBadge tone={doc.frontmatter.status === "implemented" ? "signal" : "warning"}>{doc.frontmatter.status}</TfBadge></div><h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{doc.frontmatter.title}</h1><p className="mt-4 max-w-3xl text-base leading-8 text-[var(--tf-text-muted)]">{doc.frontmatter.description}</p><time dateTime={doc.frontmatter.updated} className="mt-5 block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">Updated {doc.frontmatter.updated}</time></header><div className="prose-threatfade max-w-3xl pt-8">{content}</div><DocsPagination {...navigation} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></article>;
}
