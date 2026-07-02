# Finite Loops

Music collective platform combining an SP-404-inspired beat machine with an interactive world navigator. Built with Lit web components, TypeScript, and Vite.

## Tech Stack

- **Lit 3** - Web components framework
- **TypeScript** (strict, ES2020 target)
- **Vite** - Dev server and bundler (`pnpm dev`, `pnpm build`)
- **pnpm** - Package manager
- **WebMidi** - Hardware MIDI controller support
- **WaveSurfer.js** - Audio waveform visualization
- **Web Audio API** - Audio playback and processing

There is also a secondary SvelteKit app in `src/routes/` and `src/lib/` (website with releases, artists, blog pages) that shares the same repo but is separate from the primary Lit application.

## Project Structure

```
main.ts                  # Entry point, imports both top-level components
src/
  finite-loops.ts        # <finite-loops> - World navigator (5 scrollable regions)
  sp-app.ts              # <sp-app> - Beat machine (16-pad drum machine)
  audio/
    AudioPlaybackManager.ts  # Singleton managing Web Audio API context
  components/
    top-nav.ts           # Fixed header, horizontally scrollable region links
    pad-grid.ts          # 4x4 pad layout, keyboard/MIDI trigger feedback
    drum-pad.ts          # Single pad wrapper (key binding + sample name)
    sp-button.ts         # Base button component (square/round, sizes)
    sp-pad.ts            # Extends sp-button with sample name + pad index
    control-panel.ts     # FX buttons, waveform display, sequencer controls
    sample-waveform.ts   # Canvas waveform with playhead
    release-panel.ts     # Album cover gallery
  constants/
    samples.ts           # 16-sample drum kit definitions
  lib/
    releases.ts          # Album metadata (tracks, contributors, Bandcamp links)
    artists.ts           # Artist data
    blog.ts              # Blog content
    index.ts             # Library barrel export
public/
  regions/               # SVGs for world panorama and region scenes
  samples/drum_kit/      # WAV drum samples
style.css                # Global CSS variables
src/app.css              # App-wide styles (Jet Set Radio aesthetic)
```

## Architecture

### Two Main Components

1. **`<finite-loops>`** (`src/finite-loops.ts`) - Horizontal region navigator with scroll-snap sections, hash-based routing, keyboard nav (arrows/A/D/Space), wheel scrolling, and a detail card overlay.

2. **`<sp-app>`** (`src/sp-app.ts`) - 16-pad drum machine with keyboard mapping (1-4/Q-R/A-F/Z-V), MIDI input, BPM control (60-200), and performance/sequencer modes.

### Data Flow

- Parent-child communication via `CustomEvent` (bubbles + composed to cross shadow DOM)
- `AudioPlaybackManager` is a singleton — one audio context for all playback
- Viewport scroll position drives active region (via `@scroll` handler with `Math.round`)
- Programmatic scrolls set `_isNavigating` flag to prevent the scroll handler from overriding the target index mid-animation

### Styling Patterns

- CSS-in-JS via Lit's `css` tagged template literals (shadow DOM scoped)
- CSS custom properties for theming (`--lums-*`, `--sp-*`, `--bg`, `--accent`)
- Container queries in `top-nav` for responsive behavior
- Global styles in `style.css` and `src/app.css`

## Build & Dev

```sh
pnpm dev       # Vite dev server
pnpm build     # tsc (types only → ./types/) then vite build (→ ./dist/)
pnpm preview   # Preview production build
```

## Conventions

- Arrow function class fields for event handlers (auto-bound `this`)
- `@state()` for internal reactive state, `@property()` for public component API
- `@query()` for cached DOM element references
- Hash-based routing (`#region-id`) — no router library
- Strict TypeScript: no unused locals/params, no implicit returns, no fallthrough
- Formatting: tabs, single quotes, 100 char width (Prettier + ESLint)
