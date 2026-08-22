# ThreatFade Web Agent Guidance

## Non-negotiable boundaries

- Treat `https://github.com/LloydCoder/tinlance-threatfade` as the source of truth for product capabilities.
- Never invent detection results, customers, certifications, integrations, benchmarks or guarantees.
- Do not modify the ThreatFade engine from this repository.
- Keep Server Components as the default.
- Treat public playground inputs as hostile.
- Keep dependencies minimal and review security impact before adding them.
- Preserve accessibility and reduced-motion behavior.
- Run lint, typecheck, tests and production build after substantive changes.

## Product language

ThreatFade is an evidence-first detection and investigation platform for adversarial activity that becomes intentionally less observable.

The core public thesis is behavioral: a reduction in observable activity can itself be worth investigating when it deviates from the modeled baseline.

## UX direction

Prefer research-lab precision over cyberpunk decoration. Use signal, entropy, timing, evidence, confidence and investigation concepts as visual language.
