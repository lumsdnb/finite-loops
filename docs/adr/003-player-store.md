# ADR-003: Music Player Store (Svelte 5 Runes)

**Date:** 2026-02-15
**Status:** Accepted

## Context

The site needs a global music player that persists across page navigation. Users can play any release from various pages.

## Decision

Created a Svelte 5 runes-based store at `src/lib/stores/player.svelte.ts`:

- Uses `$state` for reactive state (Svelte 5 pattern)
- Exports `getPlayer()` function returning an object with getters and methods
- State: `currentRelease`, `isPlaying`, `bandcampAlbumId`
- Methods: `play(release)`, `stop()`, `toggle()`

The player UI (`MusicPlayer.svelte`) is a fixed bar at the bottom, rendered in the root layout. It embeds a Bandcamp iframe when a release is playing.

## Consequences

- Player state persists across SvelteKit client-side navigation
- Any component can import `getPlayer()` to control playback
- Bandcamp iframe handles actual audio — no custom audio implementation needed
