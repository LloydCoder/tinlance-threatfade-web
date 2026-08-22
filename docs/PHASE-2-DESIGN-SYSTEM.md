# ThreatFade Web — Phase 2 Design System

## Design thesis

ThreatFade uses an evidence-first visual language: restrained dark surfaces, precise typography, telemetry-inspired geometry, and a single high-salience signal color. The interface should feel like a security research instrument rather than a cyberpunk dashboard.

## Visual language

- Canvas: near-black graphite, not pure black.
- Panels: small tonal steps rather than gradients.
- Signal: lime is reserved for verified/active signal states and primary emphasis.
- Semantic states: amber = warning, red = danger, blue = informational context.
- Typography: Geist for product prose and Geist Mono for telemetry, labels, identifiers and technical values.
- Geometry: compact controls, restrained panel radius, thin borders and deliberate spacing.
- Motion: signal drift/pulse communicates live telemetry; UI motion remains short and functional.

## Accessibility

- Dark-only mode is intentional for the research-instrument aesthetic; semantic contrast is preserved without relying on color alone.
- Global `:focus-visible` uses a high-contrast focus ring.
- Reduced-motion users receive effectively static visualizations.
- Forced-colors mode receives a system-visible focus outline.
- Disabled controls communicate state through opacity/cursor in addition to color.

## Tokens

Canonical tokens live in `config/design-system.ts` and are exposed to CSS in `app/globals.css`.

## Domain primitives

`components/ui/tf-primitives.tsx` provides deliberately small ThreatFade-specific primitives: `TfPanel`, `TfLabel`, `TfBadge`, `TfMetric`, and `TfSignalDot`.

These are composition primitives, not a second component framework. Future shadcn primitives should remain composable with them.

## Domain visualization vocabulary

The design system reserves visual grammar for entropy, signal decay, packet timing, behavioral deviation, confidence, evidence, C2 and ATT&CK. Visualizations must communicate data relationships and provenance. Decorative charts and fabricated metrics are prohibited.

## Responsive strategy

- Mobile-first layouts.
- Tailwind default breakpoints unless a component has a demonstrated need for a local breakpoint.
- Technical prose remains constrained for readability.
- Instrument/telemetry surfaces may use the full content width.
- Dense navigation and telemetry components degrade to readable stacks on narrow screens.

## Component rules

1. Prefer semantic HTML.
2. Use shadcn/Radix primitives for interaction-heavy components.
3. Keep client components limited to actual interaction.
4. Do not encode brand styling independently in each page.
5. Use tokens before one-off colors, shadows or radii.
6. Motion needs a functional explanation and reduced-motion path.
7. Charts need meaningful labels or supporting text.

## Phase 2 exit criteria

- Design tokens are centralized.
- Global accessibility states exist.
- Motion respects reduced motion.
- ThreatFade-specific primitives exist.
- Domain visual language is documented.
- Existing homepage remains compatible with the system.
- No generic cybersecurity visual conventions are introduced.
