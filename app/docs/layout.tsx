import { DocsMobileNav } from "@/components/docs/docs-mobile-nav";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { SiteHeader } from "@/components/navigation/site-header";

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-screen bg-[var(--tf-canvas)] text-[var(--tf-text)]"><SiteHeader /><div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14"><DocsMobileNav /><div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]"><DocsSidebar />{children}</div></div></main>;
}
