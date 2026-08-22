"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("ThreatFade web application error", error);
  }, [error]);

  return <main className="grid min-h-screen place-items-center px-6 py-24"><div className="max-w-xl text-center"><p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--tf-signal)]">500 / signal interrupted</p><h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">The application encountered an error.</h1><p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">Retry the operation. If the problem persists, use the project repository to report it.</p><button type="button" onClick={() => reset()} className="mt-8 rounded-md bg-[var(--tf-signal)] px-5 py-3 text-sm font-semibold text-[var(--tf-signal-text)]">Try again</button></div></main>;
}
