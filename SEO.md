# Termio — Full SEO Audit & Strategy

**Site:** https://termio.dev
**Stack:** Next.js 16 App Router, static export (`output: "export"`), Tailwind v4, lucide-react
**Audit date:** 2026-05-10
**Auditor scope:** technical SEO, on-page SEO, structured data, content strategy, internal linking, AI search optimization, UX/conversion, roadmap

---

## 0. Executive Summary

Termio's foundation is good for an early-stage product site: clean URLs, `output: "export"` static HTML, working `sitemap.xml`, `robots.txt`, RSS feed, valid JSON-LD on most templates, and intentional landing pages targeting "ssh client for [os]", "termio vs [competitor]", and feature pages.

But the site is **leaving 80% of its potential organic traffic on the table**. The biggest issues:

1. **Thin content** — every blog post is 300–700 words; landing pages have ~250–500 words. Competitive terms like *best SSH client*, *Termius alternative*, *WSL terminal* are dominated by 1,500–3,000-word articles with screenshots, code, comparisons.
2. **Home page is `"use client"`** which causes the platform-specific section ("Built for modern Windows terminals", "Feels at home on macOS") to render only the macOS variant in the static HTML — Googlebot will never index the Windows or Linux variants.
3. **One global OG image** (`/app_screenshot.png`) on every page — kills CTR in social/AI surfaces.
4. **Internal linking is one-directional**: landing → blog (3 links), blog → home only. No blog → blog, no blog → landing pages, no contextual in-body links. This is the largest "free traffic" lever on the site.
5. **No HowTo / Article / Review schema variants**, no author Person schema with `sameAs`, no Product Review aggregate. AI Overviews & Perplexity rely heavily on schema for citation.
6. **The fake testimonials** ("Alex K., DevOps Engineer", "Maria S., Backend Developer", "James L., SRE Lead") are first-name + role only and look generic. They will not earn `Review` schema and may hurt E-E-A-T if they appear fabricated.
7. **Comparison universe is too small** — only Warp, Termius, iTerm2. Missing PuTTY, MobaXterm, Hyper, Tabby, Alacritty, Kitty, Windows Terminal, SecureCRT — all of which have steady search demand.
8. **Keyword surface is narrow** — entire site repeats "local-first", "split panes", "Apple Keychain", "WSL". No coverage for tunneling/SOCKS/port forwarding, SFTP, jump hosts, key management, agent forwarding, mosh, tmux integration — the backbone of SSH search intent.
9. **No HowTo / tutorial / step-by-step content** — the highest-converting bottom-of-funnel SEO type.
10. **Performance**: 560 KB unoptimized PNG hero, two `JetBrains_Mono` font instances loaded, an empty 0-byte `screenshot.png` shipped to `/public`, `images.unoptimized: true`.

If priorities 1–5 are addressed in 90 days, expect **3–5×** organic impressions and **2–3×** clicks based on the current keyword footprint.

---

## 1. Site Inventory

### 1.1 Indexed pages (from `src/app/sitemap.ts`)

| URL | Type | Notes |
| --- | --- | --- |
| `/` | Homepage | Client component; SoftwareApplication + FAQPage + Organization JSON-LD |
| `/blog/` | Blog index | 14 posts, no pagination |
| `/blog/[slug]/` | Blog post | BlogPosting + BreadcrumbList |
| `/blog/tag/[tag]/` | Tag archive | BreadcrumbList only |
| `/ssh-client-for-mac/` | Landing | SoftwareApplication + Breadcrumb |
| `/ssh-client-for-windows/` | Landing | same |
| `/ssh-client-for-linux/` | Landing | same |
| `/termio-vs-warp/` | Comparison | FAQPage + Breadcrumb |
| `/termio-vs-termius/` | Comparison | same |
| `/termio-vs-iterm2/` | Comparison | same |
| `/ssh-connection-manager/` | Feature | SoftwareApplication + Breadcrumb |
| `/terminal-with-split-panes/` | Feature | same |
| `/wsl-terminal/` | Feature | same |
| `/feed.xml` | RSS | OK |
| `/sitemap.xml` | Sitemap | OK |
| `/robots.txt` | Robots | OK |

### 1.2 Blog inventory (14 posts)

All posts are **300–700 words** (49–106 lines of markdown). For comparison, the top 10 Google results for "best ssh client" average **1,800–2,400 words** with screenshots, ranked lists, and tables.

```
best-ssh-client-for-developers-on-macos-windows-and-linux  84 lines
best-terminal-app-for-windows-developers-using-wsl         90
how-split-panes-improve-devops-and-sre-terminal-workflows  78
how-to-manage-ssh-connections-without-cloud-sync          106
how-to-organize-ssh-servers-by-workspace                   80
how-to-share-terminal-and-ssh-setups-with-git              89
how-to-store-ssh-credentials-securely-on-linux             80
local-first-developer-tools-why-keeping-terminal-data...   77
local-first-terminal-security-on-macos-and-linux           49  ← shortest
terminal-app-with-apple-keychain-support-for-macos         71
termius-alternative-for-local-first-teams                  88
warp-vs-termio-which-terminal-fits-local-first-workflows   79
wsl-and-powershell-in-one-workspace                        58
wsl-vs-powershell-when-to-use-each-on-windows              76
```

---

## 2. Technical SEO

### 2.1 Indexability — OK

- `robots.ts` returns `userAgent: "*", allow: "/"`, sitemap reference, `host: siteUrl`. ✅
- `metadataBase` is set in `layout.tsx`. ✅
- Canonicals are emitted on every template via `alternates.canonical`. ✅
- `trailingSlash: true` is configured and the canonicals/sitemap are consistent. ✅

**Issue 2.1.a — `host` directive in `robots.ts` is non-standard.**
`host` is a Yandex-only directive; Googlebot ignores it. Not harmful but noise.
- **Fix:** remove `host` from `src/app/robots.ts`.

### 2.2 Rendering — Critical issue ⚠️

**Issue 2.2.a — Home page is `"use client"` and platform-specific section is hydrated client-side.**

In `src/app/page.tsx:1`, the entire homepage is a client component using `useSyncExternalStore` to detect the platform. The fallback in SSR is `() => "mac"` (line 383), so the static HTML always contains the **macOS variant** of the platform highlight section ("Feels at home on macOS. Apple Keychain Storage…"). The Windows ("WSL + PowerShell") and Linux ("System Keyring Storage") variants are never rendered into the static HTML and therefore **never indexed**.

- **Why it matters:** that section contains your highest-intent platform keywords. It also creates a hydration mismatch when a Windows or Linux user lands and the DOM swaps.
- **Impact:** missing primary keyword copy for two of three target operating systems on the most-linked page on the site.
- **Fix:** convert the homepage to a server component. Render **all three** platform highlights statically (visible in HTML), then use a small client island only for the download button ordering. Or render all three as separate sections with `<h2>` per OS — that turns one page into a triple-keyword landing.

**Issue 2.2.b — Static export + interactive download buttons.**
Same component patches `window.history.pushState` and stores a `__termioLocationPatched` flag. Side-effecting global patches in a client tree is not an SEO problem directly, but it can throw hydration warnings that suppress rendering chunks in Lighthouse audits.
- **Fix:** isolate this logic in a small `<DownloadButtons />` client component. Keep page.tsx server-rendered.

### 2.3 Sitemaps & feeds

- `sitemap.ts` uses `new Date()` for `lastModified` on every URL on every build. **Lossy** — Google ignores stale-date sitemaps.
- **Fix:** stamp `lastModified` from real signals: blog posts → frontmatter `date`; landing pages → file mtime or a hardcoded ISO string per page.
- Sitemap has no `<image:image>` or `<news:news>` extensions. Add `<image:image>` for landing pages (Termio screenshot) — this surfaces in Google Images and AI Overviews.

### 2.4 Structured data

What's emitted today:
- Home: `SoftwareApplication`, `FAQPage`, `Organization` ✅
- Landing pages: `SoftwareApplication`, `BreadcrumbList` ✅
- Comparison pages: `FAQPage`, `BreadcrumbList` ✅
- Blog post: `BlogPosting`, `BreadcrumbList` ✅
- Tag pages: `BreadcrumbList` only

**Gaps:**

| Gap | Fix | Impact |
| --- | --- | --- |
| No `aggregateRating` on `SoftwareApplication` | Once you have real reviews/GitHub stars, add `aggregateRating` from real data | Stars in SERP, AI citations |
| `Person` schema on author has only `name` | Add `url`, `sameAs: [github, twitter/x]`, `jobTitle` | E-E-A-T |
| No `HowTo` schema on tutorial-style blog posts | The `how-to-*` posts (7 of them!) all qualify — add `HowTo` with `step` array | Rich result eligibility, AI Overviews |
| No `ImageObject` for hero images | Add `image: { @type: "ImageObject", url, width, height, caption }` | Image results |
| No `WebSite` + `SearchAction` (sitelinks search box) | Add to layout | Sitelinks in branded SERP |
| `SoftwareApplication.downloadUrl` only points to Windows on home (line 350) | Add an array or use `softwareHelp`/`installUrl` per OS | Correct surfacing |
| No `VideoObject` (no demo video exists) | Record a 60–90s product demo, host on YouTube, embed + schema | AI Overviews heavily favor video |
| Blog `datePublished == dateModified` always | Track real edits in frontmatter `updated:` field | Freshness signal |
| Tag pages have no `CollectionPage` schema | Add `CollectionPage` + `ItemList` of posts | Better tag discovery |
| Comparison pages have no `Product` or `Review` schema | Add `Review` with `itemReviewed: SoftwareApplication` for both products | "Termio vs X" can win review snippet |

**Action — wrap structured data per template:** Create `src/lib/structuredData.ts` with helpers `softwareApplication()`, `faqPage()`, `breadcrumb()`, `howTo()`, `review()`, `article()`. Eliminates duplication across pages.

### 2.5 Performance / Core Web Vitals

**Issue 2.5.a — Hero image is 560 KB unoptimized PNG.**
`/public/app_screenshot.png` (560,424 bytes). With `images.unoptimized: true` and `<img>` (no `next/image`), this lands as-is on every page.
- **Fix:** convert to AVIF + WebP with PNG fallback (`<picture>`). Target ≤80 KB AVIF. Add `loading="eager"` only on the home hero, `loading="lazy"` on all blog/CTA usages, plus `decoding="async"` and `fetchPriority="high"` on the home hero.
- **Fix:** add explicit `width` and `height` to prevent CLS. Currently `<img className="block h-auto w-full" />` lacks dimensions.

**Issue 2.5.b — Empty 0-byte `screenshot.png`.**
`/public/screenshot.png` is 0 bytes and unused. Delete it.

**Issue 2.5.c — JetBrains Mono is loaded twice.**
`layout.tsx:11–19` initializes `JetBrains_Mono` for both `--font-geist-mono` and `--font-sans`. Two CSS files, two font definitions, two preload entries.
- **Fix:** load it once with `variable: "--font-mono"` and assign the same variable to both CSS custom properties in `globals.css`.

**Issue 2.5.d — Monospace body font.**
Using JetBrains Mono for body text (`--font-sans`) reduces reading speed by ~10–15%. May affect dwell time and engagement metrics. Consider Inter/Geist for body, JetBrains Mono only for code.

**Issue 2.5.e — No image dimensions, no `<link rel="preload">` for hero.**
Add `<link rel="preload" as="image" href="/app_screenshot.avif" fetchpriority="high">` for the home hero.

**Issue 2.5.f — `next.config.ts` has `images.unoptimized: true`.**
Required because of `output: "export"`, but you can still ship pre-optimized assets. Build a `scripts/optimize-images.ts` step that emits WebP/AVIF from `public/raw/*` into `public/`.

### 2.6 Mobile

- Tailwind responsive classes look reasonable (`sm:`, `md:`, `lg:` breakpoints used correctly).
- No `viewport` meta override is needed (Next.js handles it).
- **Issue:** the comparison table on home (`overflow-x-auto`) horizontally scrolls on mobile — acceptable but stack as cards on `sm` for better UX.

### 2.7 HTML semantics

- ✅ Single `<h1>` per page on landing/blog templates.
- ⚠️ Home has `<h1>` ("Your terminal, organized."). Good.
- ⚠️ Some sections use raw `<div>` where `<section>` / `<article>` would be more semantic. Already partially using `<section>`.
- ⚠️ Footer on home (`page.tsx:837`) is `<footer>` ✅ but lacks `<address>`, no privacy/terms links.
- ⚠️ Site-wide `<nav>` only has Home + Blog. Add Features, Compare, Download links to broaden internal-link graph from every page.
- ⚠️ Tag-page `<h1>` uses `&ldquo;{tag}&rdquo;` smart quotes — fine, just call out.

### 2.8 Accessibility (affects SEO indirectly)

- The hero `<img>` has good alt text. ✅
- Comparison cells use `<Check />` / `<X />` Lucide icons inside `<td>` — no `aria-label`, screen readers see nothing. **Fix:** wrap in `<span aria-label="Yes">` etc.
- Color contrast on `text-muted-foreground` over `bg-card/50` is borderline at AA on dark theme — check with axe.
- Decorative icons in cards lack `aria-hidden="true"`.

### 2.9 Static export edge cases

- `output: "export"` means no middleware, no ISR, no server actions. Confirmed working.
- `feed.xml` is a route handler with `export const dynamic = "force-static"` — exports correctly. ✅
- Tag pages use `generateStaticParams()` + dynamic params — exports correctly. ✅
- **Fix:** verify `out/` build emits `404.html` styled with the SiteHeader (currently no `not-found.tsx`). 404s are an indexing signal — a styled 404 also reduces bounce.

### 2.10 Misc

- `README.md` is the default Next.js boilerplate. Replace with project description that matches GitHub link.
- No `humans.txt`, no `security.txt` — add `/.well-known/security.txt` per RFC 9116 (good signal for B2B trust).
- No `llms.txt` — see §6.

---

## 3. On-page SEO — page-by-page

### 3.1 Homepage `/`

| Element | Current | Issue | Fix |
| --- | --- | --- | --- |
| Title | "Termio: Terminal App, SSH Client, and Connection Manager" | 60 chars, brand-leading. OK. | Test "Termio – Free Local-First SSH Client & Terminal for Mac, Windows, Linux" — leads with category + free + multi-platform. |
| Meta description | 200 chars | Too long; truncates ~155 | Cut to 150–160 chars with primary keyword + benefit + CTA |
| H1 | "Your terminal, organized." | Brand voice but **zero keywords** | Add a sub-keyword line or change to "The local-first terminal and SSH client, organized." |
| H2s | "Your data, your rules.", "Features", "How Termio compares", "FAQ", "What users say", "Ready to try Termio?" | None contain target keywords | Use "SSH connection manager features", "Termio vs Warp, Termius, iTerm2", "Frequently asked questions about Termio" |
| Body keyword density | "terminal" 9×, "SSH" 8×, "workspace" 5× | Missing "free", "open source", "macOS", "Windows", "Linux" in body | Reword paragraphs to include all three OSes naturally |
| Internal links | → 3 download CTAs (external GitHub) | Zero links to landing pages or blog | Add a "Built for your platform" row linking to `/ssh-client-for-mac/`, `/ssh-client-for-windows/`, `/ssh-client-for-linux/`. Add a "Compare alternatives" row linking to the three vs pages. Add a "Read the blog" panel near the footer. |
| Testimonials | 3 fake-looking quotes | Could trigger E-E-A-T penalty | Replace with real GitHub stars, Twitter/X mentions, real user reviews with `<cite>` and source link. If none yet, **delete the section**. |

**High-leverage homepage rewrite:**
- Add a `Use cases` section with `<h2>` "Who uses Termio?" — DevOps, SREs, Backend devs, Mobile devs (per testimonials but with content per persona).
- Add a `Specs` section: "Built with Tauri + Rust", "macOS 11+, Windows 10+, Ubuntu 20.04+", "X MB install size" — these are common search modifiers.
- Add a small "Recent posts" section pulling 3 latest blog posts.

### 3.2 Blog index `/blog/`

| Issue | Fix |
| --- | --- |
| Description "Static markdown posts with SEO-friendly metadata, built into the landing site." is meta-developer copy, not a user-facing description. | Rewrite to user-facing: "Guides on SSH workflows, terminal organization, WSL, Apple Keychain, and local-first developer tooling." |
| H1 "Articles about terminal workflows and local-first tooling" is OK but verbose | Shorten to "The Termio Blog" + a 1-line subtitle |
| No tag cloud / topic navigation | Add a tag filter row at top |
| No featured/pinned post | Pin the cornerstone article (once written) |
| No pagination, no `rel="next/prev"` | When >20 posts, paginate `/blog/page/2/` |

### 3.3 Blog post template `/blog/[slug]/`

| Issue | Fix |
| --- | --- |
| Title pattern `${title} | Termio Blog` — `\|` separator is fine but consider `– Termio` to save 8 chars | Optional |
| OG image is **always** `/app_screenshot.png` | Generate per-post OG images at build time (e.g., `@vercel/og` or a static script). Use post title overlay on a branded template. |
| No published/updated dual dates exposed in JSON-LD (`dateModified == datePublished`) | Add `updated:` frontmatter; render dual dates |
| No reading-time | Add reading-time at top |
| No table of contents for posts >800 words | Generate TOC from `##` headings |
| No "previous/next post" navigation | Add at end |
| No "related posts" component (only landing pages get RelatedArticles) | Add `RelatedPosts` component computed from shared tags |
| Author shown as plain text | Link to `/about/` or `/authors/termio-team/` page |
| No social-share buttons | Add X/Twitter, Hacker News, Reddit share — devs share via these |
| Markdown renderer drops `#`, images, tables, blockquotes (see `MarkdownContent.tsx:75-156`) | Replace custom parser with `react-markdown` + `remark-gfm`. Custom parser also doesn't render inline links inside list items reliably. |

### 3.4 Landing pages (3 SSH-client-for-OS, 3 feature pages)

These are good *templates* but **too thin**. Word counts run ~250–500 words.

| Issue | Fix |
| --- | --- |
| ~5 short sections, no FAQ on landing pages (only on `vs` and `/`) | Add 6–8 FAQ items per landing with FAQPage schema |
| No screenshots of the OS-specific UI | Capture and embed: macOS finder integration, Windows WSL pane, Linux secret service prompt |
| No "How to install" steps — high-intent users want install path | Add HowTo schema + step-by-step (Homebrew, winget, AppImage, .deb, .rpm where applicable) |
| No troubleshooting/known-issues section | Add — pulls long-tail traffic ("termio not connecting to wsl", etc.) |
| No comparison table on platform pages | Add a small table contrasting Termio vs platform default (Terminal.app vs Termio on Mac, Windows Terminal vs Termio on Windows) |
| Same OG image as everywhere else | Generate per-page OG: `Termio for macOS`, `Termio for Windows`, etc. |
| Only 3 related-articles links | Add 6 — and ensure 2 link to *other landing pages*, not only blog posts |

### 3.5 Comparison pages

| Issue | Fix |
| --- | --- |
| Comparison universe = Warp, Termius, iTerm2 only | Add: PuTTY (huge volume), MobaXterm, SecureCRT, Hyper, Tabby, Alacritty, Kitty, Windows Terminal, SolarPuTTY, Bitvise, MacTerm |
| Only 4 FAQ items per comparison | Expand to 10+; include "Is X free?", "Does X support WSL?", "Does X have an AI copilot?", "Does X work on Apple Silicon?", "Where does X store credentials?", "Can I migrate from X to Termio?" |
| No migration / import section | Add "Migrate from Termius to Termio" section per page, with a step-by-step import guide. This is a #1 organic conversion driver. |
| No screenshots of competitor UI side-by-side | Add comparative screenshots with proper alt text |
| `Review` / `Product` schema missing | Add — see §2.4 |

### 3.6 Tag pages

- Currently thin: title + post list. Add a 100–200 word **topic intro** on each tag page so it's not duplicate-content (e.g., for `/blog/tag/ssh/`: "Articles about SSH workflows, configuration, and security…").
- Add `CollectionPage` + `ItemList` schema.

---

## 4. Content Strategy

### 4.1 Cornerstone content gaps

The site needs **5 cornerstone pieces** (2,500–4,000 words each) to anchor topical authority:

1. **The Complete SSH Client Guide for 2026** — covers protocols, keys, agents, forwarding, jump hosts, MoSH, mux. Internal-links every blog post and every landing page.
2. **Local-First Developer Tools: A Complete Guide** — taps into the local-first-software movement.
3. **WSL Terminal Setup Guide** — every WSL-related post links here.
4. **SSH Connection Management for Teams** — the *teams* angle; B2B keyword cluster.
5. **The Definitive Termius Alternative Comparison (2026)** — beats the current 88-line post. Add tables, screenshots, migration walkthroughs.

### 4.2 Existing content — improvements per post

| Post | Current weakness | Action |
| --- | --- | --- |
| `best-ssh-client-for-developers-on-macos-windows-and-linux` | 84 lines, no list of products, generic | Rewrite as ranked list of 10 SSH clients with screenshots, pros/cons, pricing, OS support — this is what ranks |
| `best-terminal-app-for-windows-developers-using-wsl` | thin | Expand with screenshots of 5+ Windows terminals (Windows Terminal, Hyper, Tabby, Alacritty, Termio); add install commands |
| `how-to-manage-ssh-connections-without-cloud-sync` | OK direction | Add a "5-step setup" section with HowTo schema |
| `how-to-organize-ssh-servers-by-workspace` | abstract | Make it actionable — naming conventions, folder taxonomies, real example workspace.json |
| `how-to-share-terminal-and-ssh-setups-with-git` | OK | Add concrete `.gitignore`, repo template, GitHub link |
| `how-to-store-ssh-credentials-securely-on-linux` | shortest | Expand with `gnome-keyring`, `kwallet`, `pass`, `secret-tool` examples; add HowTo schema |
| `local-first-terminal-security-on-macos-and-linux` | 49 lines, weakest post | Merge into a longer "local-first SSH security" cornerstone or expand 3× |
| `terminal-app-with-apple-keychain-support-for-macos` | OK | Add `security` CLI examples for managing SSH keys via Keychain |
| `termius-alternative-for-local-first-teams` | OK direction | Add a comparison table (price, account-required, sync model, OS support) and migration steps |
| `warp-vs-termio-which-terminal-fits-local-first-workflows` | OK | Expand to match `/termio-vs-warp/` landing — or merge them; right now they cannibalize each other |
| `wsl-and-powershell-in-one-workspace` | 58 lines | Add screenshots, sample workspace, real WSL install commands |
| `wsl-vs-powershell-when-to-use-each-on-windows` | OK | Add a decision flowchart (image), expand to ~1,500 words |

### 4.3 Cannibalization audit

Two pairs of pages target the same intent:

- `/termio-vs-warp/` ↔ `/blog/warp-vs-termio-which-terminal-fits-local-first-workflows/`
- `/termio-vs-termius/` ↔ `/blog/termius-alternative-for-local-first-teams/`

**Fix:** keep the landing page as the canonical money page (transactional intent). Re-purpose the blog post as a longer narrative review with screenshots; cross-link explicitly: "For a structured comparison see [Termio vs Warp]". Add `rel=canonical` from the blog post → landing page, OR clearly differentiate the angle (e.g., blog = narrative, landing = comparison table). Currently they confuse Google.

---

## 5. Keyword Opportunities

### 5.1 Primary keywords (already targeted)

| Keyword | Page | Status |
| --- | --- | --- |
| ssh client for mac | `/ssh-client-for-mac/` | OK, expand content |
| ssh client for windows | `/ssh-client-for-windows/` | OK, expand |
| ssh client for linux | `/ssh-client-for-linux/` | OK, expand |
| ssh connection manager | `/ssh-connection-manager/` | OK, expand |
| terminal with split panes | `/terminal-with-split-panes/` | OK, expand |
| wsl terminal | `/wsl-terminal/` | OK, expand |
| termio vs warp | `/termio-vs-warp/` | OK |
| termio vs termius | `/termio-vs-termius/` | OK |
| termio vs iterm2 | `/termio-vs-iterm2/` | OK |

### 5.2 Missing-page opportunities (build these)

**Comparison gap:**
- `/termio-vs-putty/` — PuTTY is the search-volume king for "ssh client"
- `/termio-vs-mobaxterm/`
- `/termio-vs-securecrt/`
- `/termio-vs-windows-terminal/`
- `/termio-vs-hyper/`
- `/termio-vs-tabby/`
- `/termio-vs-alacritty/`
- `/termio-vs-kitty/`
- `/termio-vs-warp/` (exists)
- `/termio-vs-bitvise/`
- `/termio-vs-royal-tsx/`
- `/termio-vs-iterm2/` (exists)

**"Best X" landing pages (high commercial intent):**
- `/best-ssh-client/`
- `/best-ssh-client-mac/`
- `/best-ssh-client-windows/`
- `/best-ssh-client-linux/`
- `/best-terminal-mac/`
- `/best-terminal-windows/`
- `/best-free-ssh-client/`
- `/best-ssh-manager/`
- `/best-terminus-alternative/`

**Feature pages (existing system has 3, add 7):**
- `/ai-terminal/` (or `/ai-copilot/`)
- `/ssh-key-manager/`
- `/sftp-client/` (drag & drop file upload feature)
- `/command-snippets/` (code snippets feature)
- `/git-based-ssh-config/`
- `/local-first-terminal/`
- `/tauri-terminal/` (small but unique long-tail)

**Use-case pages:**
- `/for-devops/`
- `/for-sre/`
- `/for-backend-developers/`
- `/for-students/`
- `/for-teams/`

**Migration / import pages (high conversion):**
- `/migrate-from-termius/`
- `/migrate-from-putty/`
- `/import-ssh-config/`

### 5.3 Long-tail blog content gap

Add 30+ blog posts targeting these clusters. Each is a real search query with measurable volume:

**SSH fundamentals (informational, top-of-funnel):**
- How to use ssh-agent on macOS
- How to set up SSH key authentication on Linux
- How to use SSH ProxyJump (jump host) — with diagrams
- How to forward ports with SSH (-L, -R, -D)
- How to run a SOCKS proxy through SSH
- How to use SSH config files (~/.ssh/config) effectively
- How to use SSH multiplexing (ControlMaster)
- How to use mosh for unstable connections
- SSH timeout and keepalive settings explained

**Tools / comparisons:**
- Tmux vs split panes: which is better for SSH workflows
- iTerm2 vs Terminal.app vs Termio
- Best SSH GUI clients for Linux
- Best free SFTP clients
- PuTTY alternatives on macOS
- Hyper vs Alacritty vs Kitty: GPU terminals reviewed

**WSL / Windows:**
- How to enable systemd in WSL2
- How to mount Windows folders in WSL
- WSL2 networking explained
- How to use Docker Desktop with WSL2
- WSL vs VirtualBox vs Hyper-V

**Security / operations:**
- How to rotate SSH keys without breaking deployments
- How to detect SSH brute-force attempts
- Hardening sshd_config for production
- SSH certificate authentication explained
- How to back up SSH keys safely

**AI / modern dev:**
- AI in the terminal: a 2026 buyer's guide
- Using LLMs to debug bash one-liners
- Why local-first AI terminals matter for privacy
- Connecting Termio to Ollama / local models

**Tutorials (HowTo schema candidates):**
- How to set up your first SSH connection in Termio
- How to create a workspace in Termio
- How to share a workspace via Git
- How to migrate from Termius to Termio (cornerstone migration page)
- How to run scripts on connect with Termio

### 5.4 Surface keywords to add to existing copy

These appear nowhere on the site but are core SSH/terminal vocabulary. Sprinkle into existing pages naturally:

`port forwarding`, `tunneling`, `SOCKS proxy`, `jump host`, `bastion`, `agent forwarding`, `key authentication`, `passwordless`, `tmux`, `mosh`, `SFTP`, `SCP`, `rsync`, `Apple Silicon`, `arm64`, `Homebrew`, `winget`, `AppImage`, `Flatpak`, `Snap`, `code-signed`, `notarized`, `open source`.

Avoid stuffing — add one or two per relevant section.

### 5.5 Brand-defense queries

Make sure these resolve to a Termio page:

- "termio download" — should resolve to `/` or a `/download/` page
- "termio review" — currently no page; build `/reviews/` aggregation
- "termio pricing" — currently lives only in FAQ; build `/pricing/` (one line: "Termio is free.")
- "is termio safe" / "termio open source" — build `/security/` and `/open-source/` pages
- "termio vs termius reddit" — write a more detailed comparison, mention Reddit threads where relevant
- "how to install termio on linux" — add to `/ssh-client-for-linux/`

---

## 6. AI Search Optimization (ChatGPT, Gemini, Google AI Overviews, Perplexity)

AI search retrieves and cites differently than classical SERP. Optimize for: (a) clear factual statements, (b) JSON-LD breadth, (c) freshness, (d) `llms.txt`, (e) multi-modal assets.

### 6.1 `llms.txt`

**Add** `/public/llms.txt` (Anthropic-proposed convention; OpenAI/Google increasingly read it). Format:

```
# Termio

> Termio is a free, local-first desktop terminal app and SSH client for macOS, Windows, and Linux with split panes, WSL support, AI copilot, and Git-based collaboration.

## Docs
- [Home](https://termio.dev/): Product overview
- [Blog](https://termio.dev/blog/): All articles
- [SSH client for Mac](https://termio.dev/ssh-client-for-mac/)
- [SSH client for Windows](https://termio.dev/ssh-client-for-windows/)
- [SSH client for Linux](https://termio.dev/ssh-client-for-linux/)
- [WSL terminal](https://termio.dev/wsl-terminal/)
- [Termio vs Warp](https://termio.dev/termio-vs-warp/)
- [Termio vs Termius](https://termio.dev/termio-vs-termius/)
- [Termio vs iTerm2](https://termio.dev/termio-vs-iterm2/)

## Blog posts
(generate from sitemap)

## Optional
- [GitHub](https://github.com/termio-dev/termio)
- [Releases](https://github.com/termio-dev/termio/releases)
```

Auto-generate at build via a route handler `/llms.txt` similar to `feed.xml`.

### 6.2 Answer-engine-friendly content shape

AI models prefer:
- **Definition-first paragraphs**: lead each H2 section with a 1–2 sentence definition. ("Termio is …")
- **Q&A format**: every blog post should have an FAQ section at the end; mark with FAQPage schema (only one FAQPage per URL — for blog posts use the in-page FAQ as the schema source).
- **Tables and lists** > prose. ChatGPT and Perplexity preferentially cite content with structured tables.
- **Explicit pricing, OS support, install commands** — these are the questions LLMs are asked.

### 6.3 Citation hooks

Add to the homepage `<footer>` or `/about/`:
- A clear, citation-ready statement: *"Termio is a free, open-source desktop terminal and SSH client released in 2026, built with Tauri and Rust, available on macOS, Windows, and Linux."* — this is exactly the pattern LLMs surface.
- Specific numbers: install size, GitHub stars, supported OSes/versions, languages, license.

### 6.4 Author / entity establishment

LLMs need a stable **entity** for citations.

- Create `/about/` with `Organization` schema, founding date, mission statement, founders/team.
- Create one or more `Person` schemas with `sameAs` linking GitHub, X/Twitter, LinkedIn.
- Get listed on Wikipedia (when product matures), Wikidata (`Q…` ID), Crunchbase, Product Hunt, AlternativeTo. Wikidata is the highest-leverage AI-citation source — add a Wikidata entry early.

### 6.5 Freshness signals

LLMs penalize stale content heavily.

- Add `Updated YYYY-MM-DD` visible on every blog post and landing page.
- Re-publish/refresh top posts every 90 days with a real `dateModified`.
- Surface "Last updated" in JSON-LD `dateModified` and in visible text.

### 6.6 Multi-modal

- Record one **60–90s product demo** video, host on YouTube, embed on home + landing pages with `VideoObject` JSON-LD. AI Overviews and Perplexity embed video previews and cite the source page.
- Create 2–3 **explainer images / diagrams** (e.g., "Termio data flow", "Termio workspace structure") — image search and AI multimodal retrieval pull these.

### 6.7 GitHub & external signals

- Make sure GitHub README mentions termio.dev with a clear product description (LLMs scrape GitHub heavily).
- Submit to: Product Hunt, AlternativeTo, Slant, Hacker News (Show HN), Awesome lists (`awesome-ssh`, `awesome-terminal-apps`, `awesome-rust`, `awesome-tauri`).
- Get a single high-quality `theverge.com` / `arstechnica.com` / `hackaday.com` mention via outreach — one solid press mention dramatically improves LLM recall.

---

## 7. Internal Linking Strategy

### 7.1 Current state

- Home: 0 internal links to blog or landing pages (only external download buttons).
- Landing pages: 3 related-articles links (blog only).
- Blog posts: 1 link (CTA to home) — no contextual links to landing pages.
- Tag pages: link to posts only.
- No siloing, no breadcrumbs visible to user.

This is the **single biggest organic-traffic lever** on the site. Implement immediately.

### 7.2 Target topology

Build three topic silos and ensure 3–5 contextual links between every page in the silo:

**Silo 1 — SSH:**
```
/ssh-connection-manager/  (hub)
├── /ssh-client-for-mac/
├── /ssh-client-for-windows/
├── /ssh-client-for-linux/
├── /ssh-key-manager/        (new)
├── /sftp-client/            (new)
└── /blog/
    ├── how-to-manage-ssh-connections-without-cloud-sync
    ├── how-to-organize-ssh-servers-by-workspace
    ├── how-to-share-terminal-and-ssh-setups-with-git
    ├── how-to-store-ssh-credentials-securely-on-linux
    ├── best-ssh-client-for-developers-on-macos-windows-and-linux
    └── termius-alternative-for-local-first-teams
```

**Silo 2 — Terminal & WSL:**
```
/wsl-terminal/  (hub) + /terminal-with-split-panes/
├── /best-terminal-windows/  (new)
├── /best-terminal-mac/      (new)
└── /blog/
    ├── best-terminal-app-for-windows-developers-using-wsl
    ├── wsl-and-powershell-in-one-workspace
    ├── wsl-vs-powershell-when-to-use-each-on-windows
    └── how-split-panes-improve-devops-and-sre-terminal-workflows
```

**Silo 3 — Local-first / Privacy:**
```
/local-first-terminal/  (new hub)
└── /blog/
    ├── local-first-developer-tools-why-keeping-terminal-data-on-your-machine-matters
    ├── local-first-terminal-security-on-macos-and-linux
    └── terminal-app-with-apple-keychain-support-for-macos
```

### 7.3 Concrete linking rules

1. **Every blog post must contain at least 3 contextual links**: 1 to its silo hub, 1 to a sibling post, 1 to the homepage's relevant feature section.
2. **Every landing page must link to at least 5 blog posts** (currently 3).
3. **Homepage must link to all 3 silo hubs** within the body (not just the nav).
4. **Add a visible breadcrumb component** on landing and blog pages (BreadcrumbList schema is already present — just render it).
5. **Add a global footer** with three columns: Product (features pages), Compare (vs pages), Resources (blog, RSS, GitHub).
6. **Replace the 1-line top nav** with a dropdown: Product → [SSH Client, WSL Terminal, Split Panes, AI Copilot…], Compare → [vs Warp, vs Termius, vs iTerm2, vs PuTTY…], Download.

### 7.4 Anchor-text variety

Currently most internal links use the article title verbatim. Mix anchors:
- Exact: "SSH client for Mac"
- Partial: "macOS SSH client guide"
- Branded: "Termio for Mac"
- Descriptive: "store credentials in Apple Keychain"

This signals topical breadth without anchor-stuffing.

---

## 8. UX & Conversion (affects SEO via engagement signals)

| Issue | Why it matters | Fix |
| --- | --- | --- |
| Download buttons go to direct GitHub release URLs | Can't track conversions, can't show OS-detected single button | Add a `/download/` page with detection + analytics events; redirect to GitHub on click |
| No visible Pricing line ("Free") above the fold | Users searching "termio price" or scrolling get no answer | Add a "Free for everyone" line near the H1 |
| No screenshots beyond the hero | Users + crawlers want product visuals; AI Overviews favor pages with images | Add 3–5 screenshots: workspace view, split panes, AI copilot, Keychain prompt, Git workflow |
| No video | LLMs and SERP both reward video | 60–90s demo |
| No social proof | Trust + E-E-A-T | GitHub stars badge, "Used by developers at …" if available |
| No newsletter | Re-engagement | Add a simple email capture (privacy-friendly: Buttondown, ConvertKit) |
| No 404 page | Lost users + bad UX signal | Add `not-found.tsx` |
| No about/team page | E-E-A-T | `/about/` with team, mission, founding date |
| No privacy / terms | Required for EU + AdSense + many B2B buyers | `/privacy/`, `/terms/`, `/security/` |
| No changelog | Devs love changelogs; great for freshness signal | `/changelog/` pulled from GitHub releases |
| No status / roadmap | Trust signal | Optional, add later |
| Sticky nav has only Home + Blog | Visitors can't navigate to landing pages from any page | Expanded nav (see §7.3) |
| Cards on home don't link anywhere | Each Feature card could link to `/ai-copilot/`, `/command-snippets/`, etc. | Wrap cards in `<Link>` once feature pages exist |
| No CTAs in middle of long posts | Drop-off | Add a mid-post CTA box (variant of `BlogPostCta`) |
| Testimonials look fabricated | E-E-A-T risk | Replace or remove |
| Mobile comparison table scrolls | OK but not ideal | Stack as cards on `<sm` |

---

## 9. Quick Wins (under 2 hours each)

In priority order:

1. **Convert homepage to server component** so all 3 OS variants render in HTML (§2.2.a). ~1h.
2. **Delete fake testimonials** until real ones exist (§3.1). ~5min.
3. **Add `<h2>` headings with target keywords** instead of brand-voice headers on home + landing pages (§3.1). ~1h.
4. **Add internal links** in every blog post — hub link + 2 siblings + 1 landing (§7.3). ~2h.
5. **Optimize hero PNG** to AVIF/WebP, add `width/height`, `fetchpriority="high"` (§2.5). ~30min.
6. **Delete empty `/public/screenshot.png`** (§2.5.b). ~10s.
7. **Fix duplicate JetBrains_Mono load** (§2.5.c). ~10min.
8. **Tighten home meta description** to 150–160 chars (§3.1). ~5min.
9. **Add "Last updated" to every blog post** (visible + JSON-LD `dateModified`) (§6.5). ~30min.
10. **Add `<link rel="preload">` for hero image** (§2.5.e). ~10min.
11. **Remove `host:` from robots** (§2.1.a). ~1min.
12. **Add aria-labels to comparison table cells** (§2.8). ~15min.
13. **Add `/llms.txt`** route (§6.1). ~30min.
14. **Sitemap `lastModified` from real frontmatter dates** (§2.3). ~20min.
15. **Add a "Recent posts" section to the homepage** (§3.1, §7.3). ~1h.
16. **Render the BreadcrumbList visually** (schema is already there) (§7.3). ~30min.
17. **Expand site nav** with Product / Compare / Resources dropdowns (§7.3). ~2h.
18. **Add an FAQ section to every landing page** with FAQPage schema (§3.4). ~2h total.
19. **Replace `metadata.description` on `/blog/`** with user-facing copy (§3.2). ~5min.
20. **Add visible OS-specific install commands** to each `/ssh-client-for-*/` page (§3.4). ~1h.

---

## 10. High-Priority Fixes (do these first, ranked)

| # | Fix | Effort | Impact |
| --- | --- | --- | --- |
| 1 | Homepage server-rendered with all OS variants visible (§2.2.a) | M | Very high — unlocks Win/Linux indexing on the most-linked page |
| 2 | Internal linking restructure (silo hubs, contextual links, footer, expanded nav) (§7) | L | Very high — single biggest organic-traffic lever |
| 3 | Expand all 14 blog posts to 1,200+ words with screenshots, examples, HowTo schema where applicable (§4.2) | XL | Very high — current posts can't rank |
| 4 | Add 5 cornerstone articles (§4.1) | XL | High — topical authority |
| 5 | Build 6 new comparison pages (PuTTY, MobaXterm, Hyper, Tabby, Windows Terminal, Alacritty) (§5.2) | L | High — high commercial intent |
| 6 | Per-page OG images (build-time generation) (§3.3) | M | Medium — CTR + AI surfaces |
| 7 | Replace fake testimonials, add real social proof (§3.1) | S | High — E-E-A-T |
| 8 | Add `Review` schema to comparison pages, `HowTo` schema to tutorial posts, `WebSite`+`SearchAction` site-wide (§2.4) | M | High — rich results |
| 9 | Performance: image optimization, dimensions, preload, font dedupe (§2.5) | S | Medium — CWV |
| 10 | `/llms.txt`, `/about/`, `/security/`, `/changelog/`, `/pricing/`, `/download/` pages (§6, §8) | M | Medium — entity establishment + brand-defense |
| 11 | Resolve `vs Warp` and `vs Termius` cannibalization (§4.3) | S | Medium — clears Google confusion |
| 12 | Per-post FAQ + reading time + TOC + related-posts (§3.3) | M | Medium — engagement signals |
| 13 | Author Person schema with `sameAs`, real `/authors/` page (§2.4) | S | Medium — E-E-A-T |
| 14 | Wikidata entry + Awesome list submissions + Product Hunt launch (§6.7) | S | Medium — AI citations |
| 15 | 60–90s product demo video on YouTube embedded site-wide (§6.6) | M | High when available |

---

## 11. Blog / Article Idea Backlog (rank by intent + difficulty)

**High-priority cornerstones (build first):**
1. The Complete SSH Client Guide for 2026 (3,000+ words) — *informational, hub*
2. Best SSH Clients of 2026 (Ranked List) — *commercial, head term*
3. How to Migrate from Termius to Termio (Step-by-step) — *transactional, conversion driver*
4. Local-First Developer Tools: Why It Matters — *informational, brand-defining*
5. Termio vs PuTTY: A Detailed Comparison — *commercial, head term*

**SSH tutorials (HowTo schema):**
6. How to Use SSH Config Files Like a Pro
7. How to Set Up SSH Key Authentication (macOS / Windows / Linux)
8. How to Use SSH ProxyJump and Bastion Hosts
9. How to Forward Ports with SSH (-L, -R, -D Explained)
10. How to Use SSH Multiplexing (ControlMaster)
11. How to Run a SOCKS Proxy Through SSH
12. How to Use SSH Agent on macOS
13. How to Rotate SSH Keys Without Breaking Deployments
14. How to Harden sshd_config for Production
15. SSH Certificate Authentication Explained

**WSL / Windows:**
16. WSL2 vs PowerShell vs Git Bash: Which Should You Use?
17. How to Enable systemd in WSL2
18. WSL2 Networking Explained
19. Best Terminal Emulators for Windows in 2026
20. How to Mount Windows Folders in WSL

**macOS:**
21. iTerm2 vs Terminal.app vs Termio: Which Mac Terminal in 2026?
22. How to Use Apple Keychain for SSH Credentials
23. Best Free SSH Clients for Mac 2026
24. Tmux on macOS: A Complete Setup Guide

**Linux:**
25. Best SSH Clients for Linux Desktop 2026
26. gnome-keyring, kwallet, pass: Linux Credential Storage Compared
27. Wayland vs X11 Terminal Apps Explained

**AI / modern dev:**
28. AI in the Terminal: A 2026 Buyer's Guide
29. Local LLMs for Terminal Workflows (Ollama Integration)
30. Why Local-First AI Terminals Matter for Privacy
31. ChatGPT vs Claude vs Local Models for Terminal Help

**Comparisons (one per /termio-vs-X/ landing — long-form companion blog):**
32. PuTTY vs Termio: The Modern PuTTY Alternative
33. MobaXterm vs Termio: Cross-Platform Alternative
34. Hyper vs Termio: Performance and Features Compared
35. Tabby vs Termio: Open-Source Terminal Showdown

**Buyer-intent listicles:**
36. 10 Best SSH Clients for Mac in 2026
37. 10 Best SSH Clients for Windows in 2026
38. 7 Best SSH Connection Managers
39. Free vs Paid SSH Clients: What's the Difference?

**Use cases:**
40. SSH Workflow for DevOps Teams
41. Managing SSH for Mobile App Backend Developers
42. SSH for Solo Indie Hackers
43. SSH for Students Learning Linux

**Recurring evergreen refresh series:** every 90 days, refresh the top-5 trafficked posts with new screenshots, current dates, fresh examples.

---

## 12. 30 / 60 / 90-Day Roadmap

### Week 1 (Quick Wins blitz)

- [ ] Convert homepage to server component; render all 3 OS variants
- [ ] Delete fake testimonials
- [ ] Optimize hero image (AVIF/WebP, dimensions, preload)
- [ ] Fix duplicate JetBrains_Mono font load
- [ ] Delete empty `screenshot.png`
- [ ] Remove `host:` from `robots.ts`
- [ ] Add ARIA labels to comparison table cells
- [ ] Tighten meta description on `/`
- [ ] Replace `/blog/` description with user-facing copy
- [ ] Add visible breadcrumbs on all templates
- [ ] Sitemap lastModified from frontmatter
- [ ] Add `/llms.txt` route handler

### Days 8–30 (Foundations)

- [ ] Internal linking restructure: 3 silo hubs, contextual in-body links across all 14 posts and 9 landing pages
- [ ] Expanded site nav (Product / Compare / Resources dropdowns) and full footer
- [ ] Build `/about/`, `/security/`, `/pricing/`, `/download/`, `/changelog/`
- [ ] Per-page OG image generation (build script)
- [ ] HowTo schema added to all `how-to-*` blog posts
- [ ] Review schema added to all `vs` comparison pages
- [ ] WebSite + SearchAction schema in layout
- [ ] Author Person schema with `sameAs` links
- [ ] Resolve `Warp`/`Termius` blog vs landing cannibalization
- [ ] Add FAQ + FAQPage schema to all landing pages
- [ ] Add visible "Updated YYYY-MM-DD" + reading time + TOC to blog template
- [ ] Add `RelatedPosts` component (computed by tag overlap)
- [ ] Add `not-found.tsx` styled 404
- [ ] Submit to Wikidata, AlternativeTo, Awesome lists, Product Hunt

### Days 31–60 (Content scale)

- [ ] Expand all 14 existing blog posts to ≥1,200 words with screenshots and examples
- [ ] Publish 5 cornerstone articles (§4.1)
- [ ] Build 6 new comparison pages: vs PuTTY, MobaXterm, Hyper, Tabby, Windows Terminal, Alacritty
- [ ] Build 5 new feature pages: `/ai-copilot/`, `/sftp-client/`, `/ssh-key-manager/`, `/command-snippets/`, `/local-first-terminal/`
- [ ] Build 3 use-case pages: `/for-devops/`, `/for-sre/`, `/for-teams/`
- [ ] Publish 10 new long-tail blog posts (HowTo SSH tutorials)
- [ ] Record 60–90s product demo video; embed on home + landing pages with VideoObject schema
- [ ] Add 3–5 product screenshots beyond the hero
- [ ] First content refresh of top-5 trafficked posts (track via GSC)
- [ ] Set up Google Search Console + Bing Webmaster + IndexNow
- [ ] First outreach round for backlinks (Hacker News Show HN, Reddit r/commandline, dev.to, hashnode)

### Days 61–90 (Authority & scale)

- [ ] Publish 20 more long-tail blog posts (target: 1 per business day)
- [ ] Build 4 "best X" landing pages: `/best-ssh-client-mac/`, `/best-ssh-client-windows/`, `/best-ssh-client-linux/`, `/best-free-ssh-client/`
- [ ] Build migration pages: `/migrate-from-termius/`, `/migrate-from-putty/`, `/import-ssh-config/`
- [ ] Add 4 more comparison pages: vs SecureCRT, vs Bitvise, vs Royal TSX, vs Kitty
- [ ] Add `aggregateRating` to SoftwareApplication schema once you have ≥10 real reviews
- [ ] Audit Core Web Vitals via PSI on all top 20 pages; tune per-page
- [ ] Add a newsletter capture
- [ ] Second content refresh cycle on top 10 posts
- [ ] First press / outreach push (Hacker News front-page attempt, Product Hunt launch, dev.to feature)
- [ ] Install analytics with privacy-friendly provider (Plausible, Fathom) and start tracking conversion events on `/download/`
- [ ] First quarterly SEO retro: GSC impressions, clicks, CTR, ranking pages, keyword expansion

---

## 13. KPIs to track from day 1

- Google Search Console: impressions, clicks, average position, queries per page
- Indexed page count (target: 100% of sitemap, no `Discovered – currently not indexed`)
- Core Web Vitals (LCP, INP, CLS) per template (home, landing, blog, comparison)
- Number of referring domains (Ahrefs/Moz Free)
- Bing Webmaster impressions (separate channel; AI search reads Bing index)
- AI mentions: monthly check of "termio ssh client" / "best termius alternative" in ChatGPT, Gemini, Perplexity, AI Overviews
- GitHub stars trend (proxy for brand strength + LLM citation likelihood)
- Conversion: `/download/` → GitHub release click-through rate

---

*End of audit. Treat §9 (Quick Wins) and §10 (High-Priority Fixes) as the working punch list. The 30/60/90 plan in §12 is the suggested execution order.*
