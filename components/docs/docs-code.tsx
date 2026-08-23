"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node)
    return extractText((node as { props?: { children?: ReactNode } }).props?.children);
  return "";
}

export function DocsCode({
  children,
  ...props
}: { children: ReactNode } & React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const text = extractText(children);
  async function copy() {
    if (!text || !navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="group relative my-8">
      <pre
        {...props}
        className="overflow-x-auto rounded-lg border border-[var(--tf-line)] bg-[var(--tf-ink)] p-5 pr-14 font-mono text-xs leading-6 text-[var(--tf-text-muted)]"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        disabled={!text}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md border border-[var(--tf-line)] bg-[var(--tf-panel)] text-[var(--tf-text-subtle)] transition hover:text-[var(--tf-signal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tf-signal)]"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}
