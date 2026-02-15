# ADR-002: Static Data Architecture

**Date:** 2026-02-15
**Status:** Accepted

## Context

The site needs to display releases, artists, and blog posts. The data set is small and changes infrequently.

## Decision

Use static TypeScript data files in `src/lib/` instead of a database or CMS:

- **`releases.ts`** — `Release[]` with tracks, contributors, Bandcamp IDs, SHA256 hashes, images
- **`artists.ts`** — `Artist[]` with bios and release slug references
- **`blog.ts`** — `BlogPost[]` with full content as template literal strings

Each file exports:
1. A typed array of records
2. A `getBySlug()` helper function for detail page lookups

## Consequences

- Zero runtime dependencies for data — everything is compiled into the bundle
- Adding content means editing TypeScript files and redeploying
- Type safety enforced via exported interfaces (`Release`, `Artist`, `BlogPost`)
- Cross-references between data (e.g., artist.releases pointing to release slugs) are manual
