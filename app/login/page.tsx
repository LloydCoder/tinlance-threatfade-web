"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg items-center px-6 py-16">
      <section className="w-full rounded-2xl border border-[var(--tf-border)] p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--tf-text-muted)]">
          ThreatFade Platform
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Sign in securely</h1>
        <p className="mt-3 text-sm text-[var(--tf-text-muted)]">
          Use your organization&apos;s OpenID Connect identity provider. ThreatFade does not store
          your SSO password.
        </p>
        {error && (
          <p role="alert" className="mt-5 rounded-lg border border-red-400/40 px-4 py-3 text-sm">
            Authentication could not be completed. Please try again.
          </p>
        )}
        <button
          type="button"
          onClick={() => void signIn("threatfade-oidc", { callbackUrl: "/soc" })}
          className="mt-7 w-full rounded-lg border px-4 py-3 text-sm font-medium hover:bg-[var(--tf-surface-muted)]"
        >
          Continue with SSO
        </button>
      </section>
    </main>
  );
}
