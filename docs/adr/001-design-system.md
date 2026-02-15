# ADR-001: Design System and Theme

**Date:** 2026-02-15
**Status:** Accepted

## Context

The finite loops site needed a visual identity matching the collective's aesthetic — experimental electronics, lo-fi, gritty.

## Decision

Adopted a Jet Set Radio-inspired dark theme with these core choices:

- **Color palette:** Dark backgrounds (#0a0a0a–#1a1a1a) with neon accents — cyan (#00e5ff) as primary, lime (#b5ff00), pink (#ff2d7b), orange (#ff6b2b)
- **Typography:** Monospace only (`Courier New`) for both body and display text. All headings uppercase with letter-spacing
- **Card style:** Hard-edged cards (no border-radius) with 2px borders, hover accent borders
- **Decorative elements:** Noise overlay (SVG fractal noise at 3% opacity), spray-paint gradient line
- **Layout:** Max-width 960px container, generous section padding (60px)
- **Scrollbar:** Custom dark scrollbar styling

Global styles live in `src/app.css` using CSS custom properties on `:root`.

## Consequences

- Consistent grungy/minimal look across all pages
- All components inherit theme via CSS custom properties
- No external CSS framework dependency
