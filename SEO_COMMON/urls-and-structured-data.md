# URLs and structured data

How you tell Google what your URLs mean. The two topics are inseparable —
URL structure determines what JSON-LD makes sense.

## URL structure

**Pick once and never change.** Every URL change costs link equity even with
perfect 301s. Decide on day one.

Good URL traits:
- **Lowercase**, kebab-case, ASCII (transliterate diacritics).
  `/ro/chisinau/buiucani/spalatorie-modem` not `/RO/Chișinău/Buiucani/Modem`.
- **Hierarchical** — depth reflects content hierarchy, max 4–5 segments.
  `/[locale]/[city]/[district]/[detail]` is a common, readable pattern.
- **Keyword in slug**, not just IDs. `/blog/how-to-wash-car` beats `/blog/12345`.
- **No query params for canonical** — `?id=42` is a smell. Query params are for
  filters/sorting, not addressing pages.
- **No trailing slashes inconsistency** — pick with or without and 301-redirect
  the other.
- **No `.html` or `.php`** — Google doesn't care, and they age badly.

```
/ro/chisinau                              # city listing
/ro/chisinau/buiucani                     # district listing
/ro/chisinau/buiucani/spalatorie-modem    # detail page
```

## Slug stability

- **Slugs are forever.** If a wash renames itself, **keep the old slug** and
  update the display name. Or 301-redirect old → new (never just change the
  URL — old links anywhere on the web break).
- **Generate slugs deterministically from initial input**, then store them.
  Don't regenerate slugs from current names on every build — names drift, slugs
  shouldn't.
- **Reserve a tiny set of paths** (`/admin`, `/api`, `/about`, `/sitemap.xml`)
  so a content slug never collides with infrastructure.

## Canonicals

- **Every page declares its canonical**, even if it's the page's own URL.
- **Use absolute URLs** with protocol and host.
- **One canonical per page**, in `<head>`.
- **Pages reachable at multiple URLs** (with/without `www`, `http`/`https`,
  trailing slash, query-param variations) all canonical to the same single URL.

## Internationalization (hreflang)

If your site has the same content in multiple languages, every page must
declare hreflang alternates pointing to its translations.

```html
<link rel="alternate" hreflang="ro" href="https://example.com/ro/path" />
<link rel="alternate" hreflang="ru" href="https://example.com/ru/path" />
<link rel="alternate" hreflang="x-default" href="https://example.com/ro/path" />
```

Rules:
- **Bidirectional**: if A links to B, B must link back to A. Asymmetric
  hreflang is ignored.
- **Use ISO 639-1 codes** (`ro`, `ru`, `en`), optionally with region (`en-US`,
  `pt-BR`).
- **`x-default`** is the language-agnostic fallback shown when Google can't
  match the user's language. Usually your default locale.
- **Self-reference required**: the page must include hreflang to itself, too.

In Next.js metadata API:
```ts
alternates: {
  canonical: path,
  languages: {
    ro: canonicalUrl(`/ro${restOfPath}`),
    ru: canonicalUrl(`/ru${restOfPath}`),
    "x-default": canonicalUrl(`/ro${restOfPath}`),
  },
}
```

## Sitemap

- **Auto-generate from your routes.** Manual sitemaps go stale.
- **Include `lastmod`** with real change dates (not build dates).
- **One URL per canonical page.** Don't list query-param variants.
- **Submit to Search Console + Bing Webmaster** after first deploy.
- **Reference from `robots.txt`**: `Sitemap: https://example.com/sitemap.xml`.
- **Split when over 50k URLs or 50 MB** into a sitemap index.

## robots.txt

Minimum useful content:
```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

- **Don't block CSS or JS** — Google needs to render the page.
- **Block real noise**: `/admin/`, `/api/internal/`, search result pages with
  infinite combinations.
- **`noindex` via meta tag is more reliable than robots.txt `Disallow`** for
  removing pages from index. `Disallow` only prevents crawling, not indexing.

## JSON-LD structured data

Add `application/ld+json` script tags to mark up entities for rich results,
knowledge panels, and richer SERP listings. Google's docs at
schema.org and developers.google.com/search are authoritative.

### Where to put it

- In `<head>` or end of `<body>`, both work.
- **Multiple `<script type="application/ld+json">` tags is fine** — one per
  entity type is cleaner than one mega-blob.
- **Validate with**: schema.org Markup Validator + Google's Rich Results Test.

### Site-wide types

Always emit on every page (in the root layout):

**Organization** — your business as an entity.
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "spalat.md",
  "url": "https://spalat.md",
  "logo": "https://spalat.md/logo.png",
  "sameAs": [
    "https://www.facebook.com/yourpage",
    "https://www.instagram.com/yourpage"
  ]
}
```

**WebSite** with `SearchAction` — enables sitelinks search box in SERP.
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://spalat.md",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://spalat.md/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Page-level types (pick by page kind)

**BreadcrumbList** — on every page that's deeper than home. Required for
breadcrumb display in SERP.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Moldova", "item": "https://spalat.md/ro" },
    { "@type": "ListItem", "position": 2, "name": "Chișinău", "item": "https://spalat.md/ro/chisinau" }
  ]
}
```

**ItemList** — on category/listing pages. Helps Google understand the page
is an aggregator.
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://spalat.md/ro/chisinau/buiucani/modem" },
    { "@type": "ListItem", "position": 2, "url": "https://spalat.md/ro/chisinau/centru/luxwash" }
  ]
}
```

**LocalBusiness** (or specific subtype like `AutoRepair`, `Restaurant`,
`Dentist`, `AutoWash`) — on every detail page for a real-world business.
Powers the rich knowledge card.
```json
{
  "@context": "https://schema.org",
  "@type": "AutoWash",
  "name": "EHRLE Spălătorie",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Decebal Blvd 1",
    "addressLocality": "Chișinău",
    "postalCode": "MD-2001",
    "addressCountry": "MD"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 47.01, "longitude": 28.86 },
  "telephone": "+373 22 123 456",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "08:00", "closes": "21:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.6, "reviewCount": 41 }
}
```

**FAQPage** — on pages with a real FAQ section. Powers expandable Q&A in
SERP.
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Care este prețul mediu al unei spălătorii în Chișinău?",
      "acceptedAnswer": { "@type": "Answer", "text": "Între 70 și 100 lei pentru un sedan." }
    }
  ]
}
```

**Article / BlogPosting** — on blog posts. Enables author byline, publish
date, and image in SERP.

### JSON-LD principles

- **Use real data, not placeholders.** Google penalizes fake reviews and
  fake aggregateRating.
- **Match the visible content.** Schema markup that contradicts what users see
  on the page is a quality violation.
- **Include all required fields per type.** Check `developers.google.com/search`
  for current required fields per rich result.
- **Don't mark up content that's not on the page.** Hidden FAQ Schema for
  questions not in the visible page = manual penalty risk.

## Redirects

- **301 (permanent)** for URL changes that you intend to keep. Passes ~95% of
  link equity.
- **302 (temporary)** for A/B tests, geo-redirects, login flows. Doesn't pass
  link equity.
- **308** is the modern method-preserving 301. Same SEO effect.
- **Redirect chains** (A→B→C) lose link equity at each hop and slow crawls.
  Always redirect directly to the final URL.
- **Avoid client-side redirects** (meta refresh, JS) — they're slower and less
  reliable for SEO than HTTP redirects.

## Common URL/structured-data mistakes

- **Changing slugs after launch** without 301s — destroys backlinks.
- **Using IDs in URLs when slugs would work** — `/wash/12345` ranks worse
  than `/wash/modem-buiucani`.
- **Same JSON-LD on every page** with templated data — Google sees through it.
  Make sure the data per page is genuinely different.
- **Forgetting `lastmod` in sitemap** or setting it to the build date — set it
  to the actual content's last update.
- **Hreflang to non-canonical URLs** — every hreflang must point to a
  canonical URL of that language version.
- **`noindex` + canonical to a different page** — Google may ignore the
  canonical entirely. Use one or the other.
