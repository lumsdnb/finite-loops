# ADR-004: Navigation and Layout Structure

**Date:** 2026-02-15
**Status:** Accepted

## Context

The site needs consistent navigation and a persistent music player across all pages.

## Decision

- **Nav component** (`src/lib/Nav.svelte`): Fixed top bar with logo and links (Home, Releases, Artists, Blog). Includes mobile hamburger menu with slide-in overlay.
- **Root layout** (`src/routes/+layout.svelte`): Imports global CSS, renders Nav, page slot, MusicPlayer, and noise overlay.
- **Page wrapper**: All pages use `.page` class with padding to account for fixed nav (top) and player (bottom).

Routes:
- `/` — Home (hero, featured release, recent posts, discography grid)
- `/releases` — All releases list
- `/releases/[slug]` — Release detail
- `/artists` — All artists list
- `/artists/[slug]` — Artist detail
- `/blog` — All blog posts
- `/blog/[slug]` — Blog post detail

## Consequences

- Nav and player are always visible
- Active link styling via `$app/stores` page URL
- SvelteKit file-based routing with `[slug]` dynamic segments
