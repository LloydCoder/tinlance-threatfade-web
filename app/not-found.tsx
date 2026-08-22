import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050608] px-6 text-white">
      <div className="max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#b8ff5a]">404 / signal lost</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">This path is not in the model.</h1>
        <p className="mt-4 text-sm leading-7 text-white/45">The requested resource could not be found. Return to the ThreatFade control surface.</p>
        <Link href="/" className="mt-8 inline-flex rounded-md bg-[#b8ff5a] px-5 py-3 text-sm font-semibold text-[#071000]">Return home</Link>
      </div>
    </main>
  );
}
