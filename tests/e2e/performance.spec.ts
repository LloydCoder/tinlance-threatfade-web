import { expect, test } from "@playwright/test";

test("lab performance metrics are measurable on the homepage", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));

  const before = await page.evaluate(() => ({
    lcp: 0,
    cls: 0,
    inp: 0,
    ttfb: 0,
  }));
  void before;

  const metrics = await page.evaluate(async () => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let lcp = 0;
    let cls = 0;
    let inp = 0;
    let lcpObserver: PerformanceObserver | undefined;
    let clsObserver: PerformanceObserver | undefined;
    let inpObserver: PerformanceObserver | undefined;

    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry | undefined;
        if (last) lcp = last.startTime;
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
    try {
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEntry[]) {
          const value = (entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number });
          if (!value.hadRecentInput) cls += value.value ?? 0;
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {}
    try {
      inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEntry[]) {
          const duration = entry.duration;
          if (duration > inp) inp = duration;
        }
      });
      inpObserver.observe({ type: "event", buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
    } catch {}

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    await wait(250);
    const interactive = document.querySelector("a[href='/validation']") as HTMLElement | null;
    interactive?.click();
    await wait(250);
    lcpObserver?.disconnect();
    clsObserver?.disconnect();
    inpObserver?.disconnect();

    return {
      lcpMs: Math.round(lcp),
      cls: Number(cls.toFixed(4)),
      inpMs: Math.round(inp),
      ttfbMs: Math.round(nav?.responseStart ?? 0),
      viewport: { width: window.innerWidth, height: window.innerHeight },
      route: location.pathname,
    };
  });

  expect(metrics.lcpMs).toBeGreaterThan(0);
  expect(metrics.ttfbMs).toBeGreaterThanOrEqual(0);
  expect(metrics.lcpMs).toBeLessThan(10_000);
  expect(metrics.cls).toBeLessThan(1);

  await testInfo.attach("performance.json", {
    body: JSON.stringify(metrics, null, 2),
    contentType: "application/json",
  });
  console.log(`LAB_PERFORMANCE ${JSON.stringify(metrics)}`);
});
