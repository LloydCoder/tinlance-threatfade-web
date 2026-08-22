import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[#050608]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="ThreatFade home">
          <span className="flex size-8 items-center justify-center rounded-md border border-[#b8ff5a]/35 bg-[#b8ff5a]/8 font-mono text-sm font-bold text-[#b8ff5a] transition group-hover:border-[#b8ff5a]/70">
            TF
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight">THREATFADE</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/58 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-md border border-white/12 px-3.5 py-2 text-xs font-medium text-white transition hover:border-[#b8ff5a]/45 hover:text-[#b8ff5a]"
        >
          GitHub
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}
