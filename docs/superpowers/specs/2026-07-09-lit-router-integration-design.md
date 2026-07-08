# Lit Labs Router Integration

Replace hash-based routing in `<finite-loops>` with `@lit-labs/router` path-based routing. URL reflects current region and optional sub-page overlay.

## Route Structure

```
/                       → redirect to /city
/:regionId              → world scrolled to region, no overlay
/:regionId/:itemId      → world scrolled to region, full-width overlay for item
```

**Region IDs:** `city`, `record-shop`, `broadcast`, `ancient-relic`, `board`, `soundsystem`

**Example item routes:**
- `/record-shop/fntlps1` — release detail expanded
- `/board/some-post-slug` — blog post expanded
- `/ancient-relic/sp-404` — artifact page expanded

## Router Setup

`Router` from `@lit-labs/router` instantiated as a `ReactiveController` on `<finite-loops>` in the class body:

```ts
private _router = new Router(this, [
  { path: '/', enter: () => { this._router.goto('/city'); return false; } },
  { path: '/:regionId', render: ({ regionId }) => this._onRegionRoute(regionId!) },
  { path: '/:regionId/:itemId', render: ({ regionId, itemId }) => this._onItemRoute(regionId!, itemId!) },
]);
```

Route `render()` callbacks don't return template content for the outlet. They update component state and return `nothing`. The world viewport handles all rendering.

## State Changes

### Kept
- `activeRegionIndex: number` — which region the viewport shows
- `isDetailOpen: boolean` — small dialog toggle (scene object click), purely UI state, no URL

### Added
- `_overlayItemId: string | null` — when non-null, full-width overlay is visible with this item's content

### Removed
- `_syncHash()` — replaced by `router.goto()`
- `_hydrateFromHash()` — router handles initial URL match and popstate

### Modified Methods
- `_handleScroll()` — when region changes, calls `this._router.goto('/' + regionId)` with `replaceState` semantics instead of `_syncHash()`
- `_goToRegion()` — calls `this._router.goto('/' + regionId)` instead of `_syncHash()`
- `_scrollToRegion()` — unchanged (scroll-only, no URL update)
- `_toggleDetail()` — unchanged (small dialog, no URL)
- Links inside the small dialog — become `<a href="/:regionId/:itemId">` anchor tags. The Router intercepts clicks and navigates without page reload.

## Route Handlers

### `_onRegionRoute(regionId: string)`
1. Find index of `regionId` in `this.regions`
2. If not found, redirect to `/city`
3. Set `this.activeRegionIndex = index`
4. Set `this._overlayItemId = null` (close any overlay)
5. Set `this.isDetailOpen = false` (close small dialog)
6. Scroll viewport to region (instant on initial load, smooth on navigation)

### `_onItemRoute(regionId: string, itemId: string)`
1. Find index of `regionId` in `this.regions`
2. If not found, redirect to `/city`
3. Set `this.activeRegionIndex = index`
4. Set `this._overlayItemId = itemId`
5. Set `this.isDetailOpen = false` (small dialog hidden when overlay active)
6. Scroll viewport to region

## Scroll-to-URL Sync

When the user swipes/scrolls the viewport and `_handleScroll()` detects a new region:
1. Update `activeRegionIndex` as currently done
2. Call `this._router.goto('/' + this.regions[nextIndex].id)` to update the URL
3. Do NOT open any overlay — just URL sync

Guard: Skip the `goto` call if the current pathname already matches to avoid loops with the router re-triggering `render()`.

## Full-Width Overlay

### Layout
- Positioned absolutely, filling from below `top-nav` to the bottom of the viewport
- Same `z-index: 10` as current detail-region but with `inset: 0; top: var(--lums-top-nav-height)`
- Background: `rgba(0, 0, 0, 0.85)` (darker than current small dialog backdrop)
- Content area scrollable, styled consistently with current detail card aesthetics

### Content Resolution
Determine what to render based on `_overlayItemId` + current region:
- **record-shop:** Look up release by slug from `releases` array
- **board:** Look up post by slug from `posts` array
- **ancient-relic:** Match against known artifact IDs (`sp-404`, `stems`, `sample-library`)
- **broadcast:** Stream detail (if applicable)
- **city, soundsystem:** Generic content or redirect back to region

### Close/Back
- Close button (X) in the overlay navigates to `/:regionId` (removes item from URL)
- Pressing Escape also closes the overlay
- Browser back button works via popstate (router handles this)

## Nav Button Behavior

Left/right caret buttons get a transition for hiding when overlay is active:

```css
.nav-left, .nav-right {
  transition: opacity 0.3s ease;
}
```

In the template, add `.hidden` class when `_overlayItemId` is set:

```ts
class="nav-left ${this._overlayItemId ? 'hidden' : ''} ${atStart ? 'disabled' : ''}"
```

```css
.nav-left.hidden, .nav-right.hidden {
  opacity: 0;
  pointer-events: none;
}
```

Existing `.disabled` class for edge regions stays unchanged.

## Vite / Hosting

Vite dev server default `appType: 'spa'` already serves `index.html` for all routes (history API fallback). No config change needed for dev.

For production hosting, a fallback rule is needed to serve `index.html` for all paths. This is a deployment concern, not a code change.

## Files Modified

1. **`src/finite-loops.ts`** — Main changes: Router setup, route handlers, state changes, overlay rendering, nav button classes, remove hash routing methods
2. **`src/components/top-nav.ts`** — No changes needed (already uses CustomEvent, not URL-based)

## Files NOT Modified

- `main.ts` — no changes
- `index.html` — no changes
- `src/sp-app.ts` — separate component, unaffected
- `src/audio/` — unaffected
- `src/lib/` — data files stay the same
- `vite.config.ts` — SPA fallback is default behavior
