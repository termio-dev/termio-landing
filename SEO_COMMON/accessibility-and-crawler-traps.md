# Accessibility and crawler traps

Accessibility is treated by Google as a quality signal — `<main>` landmarks,
heading order, ARIA labels, and link text all influence rankings. Plus the
same DOM patterns that confuse screen readers also confuse crawlers.

## The textContent trap (revisit)

Already covered in [on-page.md](./on-page.md), but worth restating because
it's the most-missed audit failure.

SEO crawlers commonly serialize the DOM via `textContent`, which:
- Ignores `display`/CSS layout entirely.
- Concatenates adjacent text nodes with **zero whitespace**.
- Does not insert separators between sibling block-level elements.

So `<span>100 lei</span><span>5 km</span>` becomes `"100 lei5 km"` in the
crawler's keyword index. Multiply across 50 list cards and your "top phrases"
report fills up with garbage like `km100 lei` and `washStrada`.

**Always test with**: `JSON.stringify(document.body.textContent)` in the
browser console. If you see glued tokens, fix them.

Two-part defense:
1. Use **block elements** (`<div>`, `<p>`) for distinct text fields.
2. Insert **`{" "}` text nodes** between siblings.

## Sequential heading hierarchy

Lighthouse audit: "Heading elements are not in a sequentially-descending order".

Rules:
- Page has exactly **one `<h1>`**.
- Headings descend without skipping: `h1 → h2 → h3`. Never `h1 → h3`.
- You can return to a higher level (`h3 → h2`) — that's fine, it indicates
  a new section.
- **`sr-only` headings count** — they're in the DOM, screen readers and
  crawlers see them. Use them to insert missing levels invisibly.

Common fix when a page has h1 then h3 (because h3 is in card components):
```jsx
<h1 className="sr-only">{pageTitle}</h1>
{/* ... filters / chrome ... */}
<h2 className="sr-only">List of items</h2>
<ul>
  {items.map((item) => (
    <Card>
      <h3>{item.name}</h3>
    </Card>
  ))}
</ul>
```

## Document landmarks

Lighthouse audit: "Document does not have a main landmark".

Every page needs:
- `<header>` for site/page header
- `<nav>` for primary navigation (ARIA: `role="navigation"`)
- `<main>` for the main content (exactly one per page)
- `<footer>` for site footer

`<main>` is the most-missed. Wrap your primary content area:
```jsx
<>
  <Header />
  <main>{children}</main>
  <Footer />
</>
```

For SPA-style apps with split layouts (list + detail panel), pick the
"primary" content area and wrap it. Aside content can use `<aside>`.

## Touch targets

Lighthouse audit: "Touch targets do not have sufficient size or spacing".

Rule: every interactive element (link, button, input) must have:
- **Minimum 24×24 CSS px hit area**, OR
- **48×48 hit area with 8 px gap** to other targets (Material guidance), OR
- **32×32 with 8 px gap** (acceptable middle ground).

Common violators:
- Inline link clusters (footers, breadcrumbs, language switchers).
- Tightly-packed icon buttons in tables.
- Pagination numbers with default link styling.

Quick fixes that don't change visuals:
```jsx
// Before — small target
<a href="...">RU</a>

// After — invisible padding extends hit area
<a href="..." className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center">
  RU
</a>
```

For lists of links where each link is short text:
```jsx
<ul className="flex flex-wrap gap-x-3 gap-y-2 leading-[1.8]">
  {/* leading-[1.8] gives ~24px line height */}
</ul>
```

## ARIA labels for non-text controls

Buttons/links with only an icon need `aria-label`:
```jsx
<button onClick={close} aria-label="Close">
  <X />
</button>
```

Links to pages where the link text doesn't describe the destination:
```jsx
<a href="/wash/123" aria-label={`View details for ${name}`}>
  <img src={photo} alt="" />
  <h3>{name}</h3>
</a>
```

(Note `alt=""` because the image is decorative — the heading describes the
content.)

## Image alt text

- **Every meaningful image needs alt**: descriptive but not keyword-stuffed.
- **Decorative images get `alt=""`** (empty string, not omitted).
- **Functional images** (icon-as-button) get alt describing the function:
  `alt="Search"` not `alt="magnifying glass"`.

Crawlers index alt text. So for image SEO, alt is your title tag.

## Color contrast

- **Text against background**: minimum 4.5:1 ratio (3:1 for ≥18pt or ≥14pt
  bold).
- **UI controls and graphics**: minimum 3:1 against adjacent colors.
- **Use a contrast checker**, not eyeballing. Lighthouse flags failures
  automatically.

Common failures:
- Light gray placeholder text on white inputs.
- "Disabled" states that are too dim.
- Links that lose color difference vs. body text.

## Keyboard navigation

Often missed in design-heavy projects:
- Every interactive element must be focusable via Tab.
- Focus order must be logical (matches visual order).
- Focus state must be visible (don't `outline: none` without replacement).
- Custom widgets (modals, dropdowns) need keyboard handling (Esc, arrow
  keys).

Skip-link pattern for keyboard users:
```jsx
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

## Form labels

- Every input needs a `<label>` (or aria-label for icon-only inputs).
- Labels must be programmatically associated (`<label for="x">` + `<input
  id="x">`, or wrap input in label).
- Placeholders are not labels. They disappear when the user starts typing.

## Other crawler traps

### Text in CSS pseudo-elements

```css
.button::before { content: "Buy now — "; }
```

Crawlers don't read this. Put critical text in actual DOM.

### Text in images

Images of text don't get indexed (alt does, image content does not). Use
real HTML for headlines, prices, anything you want to rank for.

### Content behind tabs/accordions

Google sometimes (not always) indexes hidden content. To be safe:
- **Use `<details>`/`<summary>`** for expandable sections — these are
  guaranteed indexed.
- **Render all content in DOM**, hide via CSS (`display: none` is OK), don't
  load via JS click handler.

### Infinite scroll

Crawlers struggle with content that requires scrolling. Provide:
- A paginated alternative (`/page/2`, `/page/3`) that's linked from a `<nav>`.
- `rel="next"` / `rel="prev"` link headers (less critical post-2019 but still
  helps Bing).

### Single-page apps with no SSR

A SPA that loads a JS bundle and renders content client-side gets indexed
poorly. Modern Google can render JS but:
- Crawl budget is wasted on rendering.
- Indexing is delayed (often by days vs. minutes for SSR).
- Some crawlers (Bing, social media unfurlers, AI scrapers) can't render JS at
  all.

Always SSR or SSG content you want to rank.

### Modal/dialog SEO leak

Modal content rendered into a portal at `<body>` end can confuse crawlers
about which page it belongs to. If the modal has SEO-critical text, render
it in DOM order on the actual page, not in a portal.

## Common a11y/crawler mistakes summary

- **Missing `<main>`** — instant Lighthouse fail.
- **`<div onClick>` instead of `<button>`** — not keyboard-accessible.
- **Removing focus outlines without replacement** — keyboard users see no focus.
- **Tap targets <24px** — fingers miss them, Lighthouse flags.
- **Heading levels skipping** — h1 → h3 without h2.
- **`<a href="#">` for buttons** — breaks back navigation, confuses crawlers.
- **Adjacent inline elements without whitespace** — see textContent trap.
- **Lazy-loaded above-fold content** — see [performance.md](./performance.md).
