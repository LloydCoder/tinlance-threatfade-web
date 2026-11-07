/**
 * Vitest-only replacement for Next.js's server-only marker package.
 * Next.js enforces this boundary during application compilation; unit tests
 * must be able to import server modules without loading the marker's runtime guard.
 */
export {};
