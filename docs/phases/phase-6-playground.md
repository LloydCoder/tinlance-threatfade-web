# Phase 6 — Interactive Playground

## Purpose

The public playground demonstrates ThreatFade's behavioral-fade concepts without exposing the production detection engine to arbitrary public input.

## Security boundary

The playground is intentionally curated. Scenario selection is constrained to known demonstrations; it does not accept arbitrary PCAP uploads, URLs, commands, code, or unbounded arrays. This keeps the public interaction surface separate from the engine's hostile-input boundary.

## Evidence semantics

Playground visualizations are demonstrations of documented signal patterns. They are not live production detections and must not be represented as real customer telemetry or benchmark results.

## Scenarios

- C2 quieting
- LOTL gradual fade
- GNSS jamming
- normal transient dip
- mixed laboratory set

## Verification

Phase 6 was merged after CI, security, and CodeQL verification. The production implementation should remain synchronized with the engine repository and its documented assurance boundaries.
