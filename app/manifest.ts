import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ThreatFade",
    short_name: "ThreatFade",
    description:
      "Evidence-first detection and investigation for adversarial activity that becomes less observable.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#0B1220",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
