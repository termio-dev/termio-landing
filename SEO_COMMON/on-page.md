# On-page SEO

Everything that lives in the rendered HTML of a page.

## Title tag

- **Length**: 50–60 characters. Google truncates around 580 px wide (varies by
  character width). Anything past that is invisible in SERPs.
- **Front-load the keyword**: the most important phrase goes first. `Spălătorii
  auto în Chișinău — prețuri | spalat.md`, not `spalat.md | Spălătorii auto …`.
- **Brand at the end**, separated by ` | ` or ` — `. Skip the brand on inner
  pages where space is tight.
- **Unique per page**. Two pages with the same title is the most common
  on-page SEO failure on CMS-driven sites.

```ts
// Good template pattern (function per page type)
metaCityTitle: (city) => `Spălătorii auto în ${city} — prețuri și locații | spalat.md`
metaDistrictTitle: (district, city) => `Spălătorii auto în ${district}, ${city} — prețuri actualizate`
metaWashTitle: (name, district) => `${name} — ${district}, Chișinău | spalat.md`
```

## Meta description

- **Length**: 150–160 characters. Longer gets truncated with "…".
- **Include the primary keyword and a secondary**. Don't keyword-stuff.
- **Include a call to action or differentiator** — Google often uses these
  verbatim as the SERP snippet. "Vezi prețuri actualizate", "Compară X locații
  în câteva secunde".
- **Generate from data when possible**. `${count} spălătorii … de la ${min} lei`
  produces unique descriptions per page automatically.

## Heading hierarchy

- **One H1 per page** describing what the page is about. Can be `sr-only` if
  visual design demands it — Google still reads it.
- **Sequential descent**: h1 → h2 → h3 → h4. Never skip levels.
  - h1 → h3 is a Lighthouse failure ("heading order non-sequential") and a
    real signal of broken document structure.
  - Common fix: insert an `sr-only` h2 before sections that contain h3s.
- **Keyword in H1**, ideally the same primary phrase from title.
- **H2s for major sections**, each with 1–2 keyword variations.
- **Don't use heading tags for visual styling** — wrap a `<p>` or `<span>`
  with the right CSS instead.

## Body content

- **Length**: aim for 300+ words on directory/category pages, 500+ on detail
  pages where the user might bounce. Empty pages with just a list don't rank.
- **Include the page's keyword phrase 4–8 times** across the body in natural
  prose. Use synonyms and variations, not keyword stuffing.
- **Surface secondary keywords** the page should also rank for. Look at top
  competitors' headings for ideas.
- **Avoid duplicate boilerplate text** across many pages. If every district
  page has the same intro paragraph, it's effectively duplicate content.
  Generate per-page copy from data, or write each by hand.

## The textContent gotcha (most-missed audit failure)

SEO auditors and many AI scrapers serialize DOM via `textContent`, which
ignores CSS layout and concatenates adjacent text nodes with **zero
whitespace**. This corrupts keyword extraction.

```jsx
// BAD — crawler reads "100 lei5 min"
<div>
  <span>{price}</span>      {/* "100 lei" */}
  <span>{driveTime}</span>  {/* "5 min" */}
</div>

// GOOD — crawler reads "100 lei 5 min" (or "100 lei\n5 min" on innerText)
<div>
  <div>{price}</div>
  {" "}
  <div>{driveTime}</div>
</div>
```

Two fixes that work together:
1. Use **block-level elements** (`<div>`, `<p>`) for distinct fields. They
   produce line breaks in `innerText`-based parsers.
2. Insert **`{" "}` text nodes** between siblings. They produce real spaces in
   `textContent`-based parsers.

Always check your DOM with `document.body.textContent` (or `JSON.stringify(...)`)
to see what crawlers actually see. If you spot glued-together tokens like
`km100 lei` or `washStrada` in audit reports, this is your bug.

## Image alt text

- **Every `<img>` needs an `alt`**. Missing alt = a11y failure + SEO loss
  (Google reads alt text for image search and as page-content signal).
- **Descriptive, not keyword-stuffed**. `alt="EHRLE car wash storefront on
  Decebal Boulevard"` beats `alt="car wash chisinau cheap fast"`.
- **Empty `alt=""` is correct for purely decorative images** — tells screen
  readers and crawlers to skip them.
- **Avoid filenames as alt** — `alt="IMG_1234.jpg"` is worse than no alt.

## Canonical link

- **Every page must declare its canonical URL.** Even if it's the page's own
  URL. Prevents accidental duplicate content from query params, trailing
  slashes, www variants.
- **Use absolute URLs** in canonical (`https://example.com/path`, not `/path`).
- **One canonical per page**, in `<head>`.

```html
<link rel="canonical" href="https://example.com/ro/chisinau/centru" />
```

## Open Graph & Twitter Cards

- Not direct ranking signals, but drive social click-through which drives
  traffic which drives ranking. Always add them.
- **`og:image` 1200×630**, under 1 MB, JPEG or PNG (not WebP — some crawlers
  don't support).
- **`og:title` and `og:description`** can differ from `<title>` and meta
  description for better social copy.
- **`twitter:card: summary_large_image`** is the modern default.

```ts
openGraph: {
  url: canonicalUrl(path),
  locale: "ro_MD",
  siteName: "spalat.md",
  title, description,
  type: "website",
  images: [{ url: ogCardUrl, width: 1200, height: 630, alt: title }],
},
twitter: { card: "summary_large_image", title, description, images: [ogCardUrl] }
```

## Internal linking

- **Anchor text matters.** "Click here" tells Google nothing. "Spălătorii în
  Centru" tells Google what the linked page is about.
- **Link from high-authority pages to deep pages.** Homepage → category → detail
  is the classic pattern.
- **Don't `nofollow` internal links** unless intentionally signaling (login,
  legal pages).
- **Breadcrumbs are internal-link gold** — every detail page should have one,
  with proper `BreadcrumbList` JSON-LD.

## Common on-page mistakes

- **Same H1 on every page** (e.g. site name) — wastes the most powerful
  on-page signal.
- **Title and H1 identical** — wastes the H1 layer; vary them.
- **Meta description over 160 chars** — gets truncated, looks unfinished.
- **Lazy-loading the LCP image** — kills perf and ranking. The first image
  above the fold should never have `loading="lazy"`. See [performance.md](./performance.md).
- **Hidden text via `display:none` or off-screen positioning for keywords** —
  Google penalizes this. Use `sr-only` (CSS-clipped) only for genuine screen-
  reader content.
- **Duplicate `<title>` because of forgotten `template`** — CMS/framework
  templates that default to site name should always be overridden per page.
