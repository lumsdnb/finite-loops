# ADR-005: Route Pages Implementation

**Date:** 2026-02-15
**Status:** Accepted

## Context

The home page, data files, components, and layout were completed. The site needed the actual route pages for releases, artists, and blog — both index listings and detail views.

## Decision

Created six route pages using SvelteKit's file-based routing:

### Index pages (`+page.svelte`)
- `/releases` — Grid of release cards (image + title + date), links to detail pages
- `/artists` — List of artist cards (name + bio), links to detail pages
- `/blog` — Chronological list of post cards (date + title + excerpt), links to detail pages

### Detail pages (`[slug]/+page.svelte`)
- `/releases/[slug]` — Full release view with cover art, tracklist, contributors, play button, Bandcamp link
- `/artists/[slug]` — Artist bio, list of their releases with links
- `/blog/[slug]` — Full post content with date and author

All pages use the `.page` > `.container` > `.section` pattern from `app.css`. Data is loaded client-side from the static TS modules using `$page.params.slug` and the `getBySlug()` helpers.

## Consequences

- All navigation links in Nav and home page now resolve to real pages
- Detail pages use SvelteKit's `$page.params` for slug-based routing
- No server-side data loading needed — everything is imported statically
