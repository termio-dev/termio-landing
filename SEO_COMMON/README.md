# SEO_COMMON

Reusable SEO knowledge distilled from real projects. Reference these in any
new web project — none of the rules below are stack-specific (though many
examples use Next.js / React).

## Files

- **[on-page.md](./on-page.md)** — title, meta, headings, body content, keyword
  density, the textContent concatenation trap.
- **[urls-and-structured-data.md](./urls-and-structured-data.md)** — URL hierarchy,
  canonicals, hreflang, sitemaps, JSON-LD types and where to put them.
- **[performance.md](./performance.md)** — Core Web Vitals, LCP image priority,
  the prefetch trap, image formats, script loading, code splitting.
- **[accessibility-and-crawler-traps.md](./accessibility-and-crawler-traps.md)** —
  why a11y matters for SEO, heading order, landmarks, touch targets, DOM
  serialization gotchas.
- **[off-site.md](./off-site.md)** — backlinks, directories, lead magnets,
  what works and what doesn't.
- **[tooling-and-audits.md](./tooling-and-audits.md)** — PSI variance, Lighthouse
  vs. field data, what audit complaints to trust and what to ignore.

## Top-level principles

These compress 90% of practical SEO into seven rules. Internalize these and
most audit complaints become predictable.

1. **Crawlers serialize DOM with `textContent`, not `innerText`.** That means
   adjacent inline elements with no whitespace get glued together (`100 lei` +
   `5 km` becomes `100 lei5 km`). This pollutes keyword extraction and is the
   #1 cause of "keyword consistency" complaints. Insert `{" "}` text nodes or
   use block-level elements between distinct text fields. See
   [accessibility-and-crawler-traps.md](./accessibility-and-crawler-traps.md).

2. **Performance is a ranking signal.** Core Web Vitals (LCP, INP, CLS) feed
   directly into Google ranking. A 100 SEO score with LCP 4 s ranks worse than
   a 95 SEO score with LCP 1.5 s.

3. **Match keyword phrases across title, meta description, H1, H2, body.** Pick
   the 1–2 phrases the page should rank for and repeat them naturally in each
   layer. Auditors flag "keyword consistency" when the body's top tokens don't
   appear in title/meta — usually because the body's "top tokens" are garbage
   from rule #1, not because the title is wrong.

4. **Canonical URLs are forever.** Pick a URL structure on day one, write
   slugs that won't need to change, and use 301 redirects (never URL changes)
   when they must. Slug churn destroys link equity and confuses crawlers.

5. **Off-site signals (backlinks) still dominate domain authority.** A perfect
   on-page score with zero referring domains will lose to a worse-built page
   with 50 quality backlinks. New sites must spend time on directory listings,
   local citations, and lead-magnet content, not just on-page tweaks.

6. **Audit tools have variance. Trust median over best case.** A single PSI
   run can swing 30+ points based on cloud runner load. Run three times and
   take the median. Cross-reference with field data (Search Console, CrUX)
   before chasing synthetic numbers.

7. **Accessibility is SEO.** Google's crawler treats `<main>`, sequential
   headings, ARIA labels, and link text as ranking-relevant signals. Fixing
   accessibility audit failures usually fixes SEO concerns at the same time.

## How to use this knowledge in a new project

For a brand-new site:
1. Read **on-page.md** and **urls-and-structured-data.md** before writing your
   first page or route.
2. Read **performance.md** before building any list/grid view.
3. Use the JSON-LD examples in **urls-and-structured-data.md** as drop-in
   starting points.
4. Build a 30-minute backlink session into the launch checklist using
   **off-site.md**.

For an audit response:
1. Map every complaint to the relevant file here.
2. Use **tooling-and-audits.md** to identify which complaints are real and
   which are noise/false positives.
3. Fix the structural issues (DOM, URLs, performance) before adding more
   content — content density doesn't help if the page is unindexable.
