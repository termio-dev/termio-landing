# Tooling and audits

How to read SEO audit reports without chasing false positives. Most SEO
audit tools throw out volume of complaints to look thorough — your job is
to filter.

## Tool hierarchy by trustworthiness

When tools disagree, trust in this order:

1. **Google Search Console** — what Google itself reports about your site
   (impressions, clicks, indexed pages, mobile usability, Core Web Vitals
   from real users). Highest authority. Always start here.
2. **Bing Webmaster Tools** — same for Bing. Separate index, sometimes
   different stories.
3. **CrUX (Chrome User Experience Report)** — real-user Core Web Vitals
   data. Aggregated from millions of Chrome users. Beats lab tools.
4. **Lighthouse run locally in Incognito** — synthetic but reproducible.
   Use for regression detection.
5. **PageSpeed Insights (PSI)** — same Lighthouse but on a noisy cloud
   runner. Variance is huge.
6. **Third-party SEO auditors** (Ahrefs, SEMrush, Moz, generic "site
   auditors") — useful for breadth, but each has biases. Cross-check before
   acting.

A change that improves Search Console "Pages indexed" is real. A change that
moves PSI from 88 → 92 might be noise.

## PageSpeed Insights variance is real

PSI runs Lighthouse on shared cloud infrastructure. The same chunk hash on
the same site can swing 5–10× in CPU time depending on host load. Examples
seen in real projects:

| Run | Same chunk's CPU time |
|---|---|
| Run 1 | 3,496 ms |
| Run 2 | 20,798 ms |
| Run 3 | 5,478 ms |

A site might score 88 / 46 / 73 on three back-to-back runs with no code
change. **Always run PSI three times and take the median.** Or, ideally:

1. Make change.
2. Deploy.
3. Wait 24–48 hours.
4. Read **field data** from Search Console's Core Web Vitals report.

That's the only ground truth.

## Lighthouse vs. PSI

| Lab tool | Pros | Cons |
|---|---|---|
| Local DevTools Lighthouse (Incognito) | Reproducible, your hardware | Doesn't reflect real users |
| PSI | Standardized device, free | Variance, slower than reality |
| WebPageTest | Configurable network/device | Steeper learning curve |

For development iteration: local Lighthouse in Incognito (no extensions
contaminating).

For shipping decisions: PSI median × 3 + Search Console field data.

## What every audit will complain about (and what to do)

These appear in nearly every audit. Here's how to triage.

### "Backlinks: 0" / "Weak backlink profile"

**Status**: Real but not a code issue. See [off-site.md](./off-site.md).
**Action**: Plan Tier 1 directory submissions. Don't try to fix in code.

### "Keyword consistency low"

**Status**: Often a false positive from DOM serialization issues.
**Action**: First check for the textContent trap (see
[accessibility-and-crawler-traps.md](./accessibility-and-crawler-traps.md)).
If genuine, repeat keywords across title/meta/H1/H2/body.

### "Render-blocking resources"

**Status**: Real if estimated savings >100 ms. Often unfixable if savings
<100 ms (CSS is necessary).
**Action**: Inline critical CSS, defer non-critical JS, lazy-load fonts.
Skip if savings under 70 ms — diminishing returns.

### "LCP too slow"

**Status**: Always real. Highest-priority fix.
**Action**: See [performance.md](./performance.md). 90% of fixes are
"priority + fetchpriority on first image, no lazy load".

### "TBT too high"

**Status**: Real if PSI median >300 ms. If only one run shows high TBT
and others are normal, it's variance.
**Action**: Defer 3rd-party scripts to lazyOnload, code-split heavy
features, disable Link prefetch in dense lists.

### "Largest Contentful Paint element"

**Status**: Informational, not a problem on its own. Tells you which
element is your LCP candidate so you know what to optimize.
**Action**: Mark that specific element with `priority` / `fetchPriority="high"`
and skip lazy loading.

### "Image elements do not have explicit width and height"

**Status**: Real. Causes CLS.
**Action**: Add width/height attributes (or use Next.js `<Image fill>` with
sized parent).

### "Unused JavaScript"

**Status**: Real if savings >50 KiB. Often caused by Link prefetching
(see [performance.md](./performance.md)).
**Action**: Investigate which chunk has unused code. Disable prefetch on
list-page links. Check for accidentally-bundled libraries (e.g.,
maplibre-gl statically imported when it should be dynamic).

### "Touch targets do not have sufficient size"

**Status**: Real. Affects mobile usability ranking signal.
**Action**: 32×32 minimum hit area, 8 px gap between adjacent targets.

### "Document does not have a main landmark"

**Status**: Real. Easy fix.
**Action**: Wrap primary content in `<main>`.

### "Heading elements not in sequentially-descending order"

**Status**: Real. Easy fix.
**Action**: Insert sr-only intermediate headings.

### "Forced reflow X ms"

**Status**: Usually framework-internal. Hard to fix without owning the
framework code.
**Action**: Skip unless reflow time is >300 ms and you can attribute it to
your own code.

### "Avoid long main-thread tasks"

**Status**: Real if tasks >500 ms. Below that, often acceptable.
**Action**: Code-split, defer 3rd-party scripts. Hard structural work — only
chase if PSI median consistently shows tasks above 500 ms.

### "Use HTTPS" / "Avoid mixed content"

**Status**: Real. Critical.
**Action**: Force HTTPS at server/CDN level. Audit for any `http://` URLs in
content/scripts/styles.

### "Document does not use legible font sizes"

**Status**: Real for mobile. Body text under 16px is hard to read.
**Action**: Set base font size to 16px+ on mobile. Use rem/em for scaling.

## Tools worth subscribing to

Free is enough for most projects:
- **Google Search Console** — mandatory.
- **Bing Webmaster Tools** — same.
- **Ahrefs Webmaster Tools** (free for verified) — backlink data.
- **PageSpeed Insights** — perf, free.
- **Schema Markup Validator** (schema.org) — JSON-LD validation.
- **Google Rich Results Test** — confirms rich-result eligibility.

Paid (worth it once site is generating revenue):
- **Ahrefs / SEMrush** — competitor analysis, keyword research.
- **Screaming Frog** — site crawl audits.
- **Moz Pro** — alternative to above.

## Reading audit reports — checklist

When handed an audit:

1. **Filter for code-actionable items first.** Off-site complaints (backlinks,
   citations) get logged but not solved here.
2. **Group complaints by impact**: critical (LCP, indexing), high (TBT,
   structured data), medium (heading order, alt text), low (legacy JS, meta
   formatting).
3. **Verify each complaint manually** before fixing. Tools have false
   positives. Open DevTools and confirm the issue actually exists in
   production.
4. **Fix in priority order.** Don't randomly chase low-impact items because
   they're easy.
5. **Re-run the audit after each batch** to confirm the fix worked. Don't
   accumulate untested changes.
6. **For perf changes, validate with field data after 2 weeks** (Search
   Console). Synthetic improvements don't always show up for users.

## When to ignore an audit

- Synthetic perf scores from a single PSI run with extreme outliers.
- "Best practice" complaints with <10 KiB / <100 ms estimated savings.
- Complaints that contradict your design philosophy and are ignored by users
  (e.g., "Add more text" on a deliberately minimal landing page).
- Anything labeled "Manual check required" that isn't a critical issue.
- Demands to add 5000-word articles to every page when your competitors rank
  with 500-word pages.

## When to take an audit seriously

- Search Console reports indexing failures or coverage drops.
- LCP / INP / CLS regressions confirmed in field data.
- Manual penalty notification from Search Console.
- Sudden drop in impressions or clicks (Search Console).
- Multiple independent audits flagging the same structural issue.
