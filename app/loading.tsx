export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading ThreatFade" className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="h-12 max-w-2xl rounded bg-white/10" />
        <div className="h-5 max-w-xl rounded bg-white/10" />
      </div>
    </main>
  );
}
