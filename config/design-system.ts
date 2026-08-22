export const designSystem = {
  brand: {
    name: "ThreatFade",
    principle: "Evidence before decoration.",
    accent: "signal-lime",
  },
  color: {
    ink: "#06080a",
    canvas: "#0a0d10",
    panel: "#0e1216",
    panelRaised: "#13181d",
    line: "#222a31",
    lineStrong: "#303a43",
    text: "#f3f6f7",
    textMuted: "#a1abb3",
    textSubtle: "#6f7a83",
    signal: "#b8ff5a",
    signalSoft: "#19300c",
    signalText: "#0a1304",
    warning: "#f3c969",
    danger: "#ff7373",
    info: "#7cc7ff",
  },
  typography: {
    display: "Geist Sans",
    body: "Geist Sans",
    mono: "Geist Mono",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    panel: "1rem",
  },
  spacing: {
    section: "clamp(5rem, 9vw, 8rem)",
    container: "80rem",
  },
  motion: {
    fast: "120ms",
    normal: "180ms",
    slow: "320ms",
    signal: "7s",
  },
} as const;

export const threatfadeVisuals = {
  entropy: "entropy",
  signalDecay: "signal-decay",
  packetTiming: "packet-timing",
  behavioralDeviation: "behavioral-deviation",
  confidence: "confidence",
  evidence: "evidence",
  c2: "c2",
  attack: "attack",
} as const;
