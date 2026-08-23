import type { MDXComponents } from "mdx/types";
import { DocsCode } from "@/components/docs/docs-code";
import { DocsCallout } from "@/components/docs/docs-callout";

export const docsMdxComponents: MDXComponents = {
  pre: ({ children, ...props }) => <DocsCode {...props}>{children}</DocsCode>,
  Callout: DocsCallout,
  a: ({ href, children, ...props }) => <a href={href} {...props} className="text-[var(--tf-signal)] underline decoration-[var(--tf-line-strong)] underline-offset-4 hover:decoration-[var(--tf-signal)]">{children}</a>,
  h2: ({ children, id, ...props }) => <h2 id={id} {...props} className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-[-0.03em]">{children}</h2>,
  h3: ({ children, id, ...props }) => <h3 id={id} {...props} className="mt-9 scroll-mt-24 text-lg font-semibold">{children}</h3>,
  p: ({ children, ...props }) => <p {...props} className="mt-5 leading-8 text-[var(--tf-text-muted)]">{children}</p>,
  ul: ({ children, ...props }) => <ul {...props} className="mt-5 list-disc space-y-2 pl-6 leading-7 text-[var(--tf-text-muted)]">{children}</ul>,
  ol: ({ children, ...props }) => <ol {...props} className="mt-5 list-decimal space-y-2 pl-6 leading-7 text-[var(--tf-text-muted)]">{children}</ol>,
  table: ({ children, ...props }) => <div className="my-8 overflow-x-auto rounded-lg border border-[var(--tf-line)]"><table {...props} className="min-w-full text-left text-sm">{children}</table></div>,
  th: ({ children, ...props }) => <th {...props} className="border-b border-[var(--tf-line)] bg-[var(--tf-panel)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">{children}</th>,
  td: ({ children, ...props }) => <td {...props} className="border-b border-[var(--tf-line)] px-4 py-3 text-[var(--tf-text-muted)]">{children}</td>,
};
