# Performance for SEO

Google uses Core Web Vitals as a ranking signal. A page that ranks #5 on
content can be pushed to #1 just by being faster than competitors.

## Core Web Vitals (the four numbers Google ranks on)

| Metric | What it measures | Good | Needs work | Poor |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | When the biggest above-fold element renders | <2.5 s | 2.5–4 s | >4 s |
| **INP** (Interaction to Next Paint) | Worst response time to user input | <200 ms | 200–500 ms | >500 ms |
| **CLS** (Cumulative Layout Shift) | Visual stability — how much things jump | <0.1 | 0.1–0.25 | >0.25 |
| **FCP** (First Contentful Paint) | When anything renders | <1.8 s | 1.8–3 s | >3 s |

INP replaced FID in 2024. TBT (Total Blocking Time) is the lab-only proxy
for INP that Lighthouse measures.

## LCP — the most-fixable problem

Lighthouse breaks LCP into four phases:
- **TTFB** (Time to first byte) — server response speed.
- **Resource load delay** — how long after page load until the LCP element
  starts loading.
- **Resource load duration** — how long it takes to download.
- **Element render delay** — how long after download until paint.

Most sites' LCP is dominated by **resource load delay** (image not requested
soon enough) and **element render delay** (main thread blocked from painting).

### Fix 1: Mark the LCP image as priority

The single highest-leverage perf fix on most sites. The first above-fold
image should never be lazy-loaded.

```jsx
// Bad — defaults to loading="lazy" on most frameworks
<Image src={photo} alt={name} fill sizes="96px" />

// Good — high-priority fetch, no lazy load
<Image
  src={photo}
  alt={name}
  fill
  sizes="96px"
  priority
  fetchPriority="high"
/>
```

Apply only to the **single LCP candidate**, not all images. Marking 50 images
as priority defeats the purpose (browser prioritizes them all = none are
prioritized).

### Fix 2: Preload critical resources

For LCP elements behind a CSS-loaded image or web font:
```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
<link rel="preload" as="font" type="font/woff2" href="/font.woff2" crossorigin />
```

### Fix 3: Avoid main-thread blocking before LCP paints

Element render delay >1 s usually means hydration / framework JS is blocking
paint. Move heavy client work after the page paints:
- **Defer analytics** (`strategy="lazyOnload"` in Next.js, or `defer` + load
  after `window.load`).
- **Code-split** non-critical features (modals, maps, dropdowns).
- **Memoize list items** so re-renders don't cascade — see the React.memo
  pattern below.

## The Next.js `<Link>` prefetch trap

Next.js prefetches every `<Link>` in the viewport in production. On a page
with a list of 50+ links to dynamic routes, this means the browser downloads
and parses 50× the destination page's JS bundle — even though the user might
visit none of them.

Symptoms:
- TBT explodes (3 s → 20 s+).
- "Reduce unused JavaScript" estimate spikes by hundreds of KiB.
- Element render delay stays high even with priority on the LCP image.

**Fix**: `prefetch={false}` on `<Link>` inside lists/grids/footers where the
visitor is statistically unlikely to follow most links.

```jsx
{items.map((item) => (
  <Link key={item.id} href={item.href} prefetch={false}>
    {item.label}
  </Link>
))}
```

Keep prefetch=true on:
- Primary nav links (likely click targets).
- Single CTAs.

Disable on:
- List/grid items.
- Footer link clusters.
- Breadcrumbs / "see also" / similar items.

## Images

| Issue | Fix |
|---|---|
| Wrong format | Serve AVIF, fall back to WebP, fall back to JPEG. Most CDNs and Next.js do this automatically when configured. |
| Wrong size | Set `sizes` on responsive images so the browser picks the right `srcset` candidate. `sizes="96px"` for thumbs, `sizes="100vw"` for hero. |
| Wrong quality | Default 75 quality. Card thumbs at 96 px display look identical at q=60. Hero images can stay at 80–85. |
| Missing dimensions | Set `width`/`height` (or `fill` + sized parent) so the browser reserves space — prevents CLS. |
| Loading the wrong image | The first above-fold image gets `priority`; everything else stays lazy. |

```ts
// Next.js config
images: {
  formats: ["image/avif", "image/webp"],
  // If you set custom qualities below default 75, you MUST whitelist
  // them — Next 16 returns 400 for non-whitelisted quality values.
  // qualities: [60, 75, 90],
}
```

**Quality whitelist gotcha**: in Next.js 15.4+, the image optimizer rejects
`q=` values not listed in `images.qualities`. If you use `quality={60}` on a
component, you must add `60` to the config or images return HTTP 400 in
production (works in dev, fails in prod). Easiest path: stick with the default
quality and let format upgrades (AVIF) do the savings work.

## Script loading

| Strategy | When to use |
|---|---|
| `defer` | Most scripts. Runs after HTML parses, before `DOMContentLoaded`. |
| `async` | Standalone scripts that don't depend on DOM ordering (fire-and-forget). |
| `lazyOnload` (Next.js) / load on `window.load` | Analytics, chat widgets, social embeds. Anything non-essential. |
| `afterInteractive` (Next.js default) | Genuinely needed during/right after hydration. Most things don't qualify — verify before defaulting here. |

**Most analytics scripts (Plausible, GA4, Hotjar) should be `lazyOnload`.**
They don't need to fire before LCP. Switching from `afterInteractive` to
`lazyOnload` typically drops element render delay by 200–500 ms.

## Code splitting

- **Dynamic-import heavy features** that aren't needed for the first paint.
  Map components, rich text editors, charting libraries, modals.
- **`ssr: false` for client-only libraries** (anything that touches `window`
  on import). Otherwise build breaks.

```ts
// Next.js dynamic import
const MapView = dynamic(
  () => import("./map-view").then((m) => m.MapView),
  { ssr: false, loading: () => <Skeleton /> },
);
```

- **Verify code-splitting actually worked**: build and `grep -l "library-name"
  .next/static/chunks/*.js`. If the library appears in your main bundle, the
  dynamic import didn't split (usually because of an accidental top-level
  `import`).

## React.memo for list items

When a parent state change re-renders the entire list:
```jsx
function ListItem({ item, selected, onClick }) { /* ... */ }

export default React.memo(ListItem, (prev, next) =>
  prev.item === next.item &&
  prev.selected === next.selected
  // Intentionally ignore onClick identity — parent re-creates inline arrows
  // every render, but the closure does the same thing.
);
```

Without the custom comparator, memo doesn't help — parent's inline
`onClick={() => fn(id)}` is a new function every render. Custom comparators
that ignore callback identity are safe as long as the callbacks don't capture
stale-critical state.

## preconnect / preload hints

- **Use `preconnect` for origins your page WILL fetch from on first paint**
  (font CDN, image CDN, primary API).
- **Don't preconnect to origins that load post-hydration** — Lighthouse flags
  these as "Unused preconnect" and they waste a connection slot.
- **Cap at 3–4 preconnect hints** total. More hurts.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## Polyfills

Modern browsers (Chrome 109+, Safari 16+, Firefox 115+) support the entire
2022+ JavaScript baseline (`Array.prototype.at`, `Object.fromEntries`, etc.).
You don't need core-js for these. Set a `browserslist` config to skip
transpilation:

```
# .browserslistrc
last 2 chrome versions
last 2 edge versions
last 2 firefox versions
last 2 safari versions
last 2 ios versions
not dead
```

Lighthouse's "Legacy JavaScript" insight estimates 10–20 KiB savings here.
Real-world impact is small but free.

## CSS

- **Critical CSS inlining** is overrated for most sites. Modern CSS bundles are
  small and cache well.
- **Avoid render-blocking external CSS from third parties** (fonts, icon kits).
- **Use `font-display: swap`** so text renders before fonts load.
- **Tailwind / utility CSS works well** with modern bundlers — don't fight it.

## What to ignore in performance audits

- **"Reduce unused CSS"** under 15 KiB savings — chasing it costs more time
  than it saves users.
- **"Avoid enormous network payloads"** if the payload is one large WebP
  (genuinely needed) — accept it.
- **"Document uses legacy HTTP"** when you're on HTTP/2 — auditor noise.
- **"Forced reflow" under 100 ms** — usually framework-internal, hard to fix
  without owning the framework.

## What to actually fix

In rough priority order for most sites:
1. LCP image not priority/lazy → instant 1–2 s LCP win.
2. Render-blocking analytics with `afterInteractive` → 200–500 ms TBT win.
3. `<Link prefetch>` in dense lists → can be 5–10 s TBT in extreme cases.
4. Wrong image format → 30–50 % image bytes saved by enabling AVIF.
5. Missing image dimensions → fixes CLS.
6. Heavy client component without dynamic import → 100s of KiB.
