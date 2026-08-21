# Kawaki Studios — Implementation Roadmap

**Mode:** Aggressive (3–6 mo to traction). Phases overlap; content runs continuously per CONTENT-CALENDAR.md.

## Phase 1: Foundation (Weeks 1–4)

**Technical**
- [ ] Deploy to `kawaki.co.in`, HTTPS, www→apex 301 redirect
- [ ] **Kill live 404s:** nav links point at ~19 missing pages (/services/* ×7, /industries/* ×5, process.html, faqs.html, guides.html) — build or stub them day 1
- [ ] GSC + Bing Webmaster verified; sitemap submitted
- [ ] GA4 + conversion events (contact form, calculator use)
- [ ] Schema rollout: Organization, ProfessionalService, Service, BreadcrumbList, FAQPage
- [ ] Canonical tags sitewide (`https://kawaki.co.in/...`)
- [ ] `robots.txt` + `llms.txt` published
- [ ] CWV audit; fix LCP/CLS (preload Satoshi/Barlow, font-display swap)
- [ ] Meta titles/descriptions rewritten all pages (currently bare: "Services — Kawaki Studios")
- [ ] OG/Twitter cards sitewide

**Pages**
- [ ] 7 service pages live (800w+ each) — paths already linked in nav
- [ ] 5 industry pages live — paths already linked in nav
- [ ] /process ("Editorial Engineering" methodology)
- [ ] /faqs + /guides hubs (nav links exist)
- [ ] Team bios with Person schema

**Off-site**
- [ ] Clutch + GoodFirms profiles created
- [ ] Google Business Profile (India targeting decision pending)
- [ ] Foundational links: directories, partner sites, founder LinkedIn articles

## Phase 2: Expansion (Weeks 5–12)

- [ ] Daily publishing per CONTENT-CALENDAR.md (7/wk)
- [ ] Case-study library: batch intake from client work, 30+ published by week 12
- [ ] Internal linking per SITE-STRUCTURE rules; breadcrumbs live
- [ ] /industries hub + all 4 industry pages
- [ ] Comparison clusters shipped (Webflow vs custom, WP vs headless, headless stack)
- [ ] Newsletter launch (owned audience hedge)
- [ ] Guest posts: 4–6 placements on dev/design publications
- [ ] Weekly GSC review: index coverage, query report → tune titles
- [ ] Index-bloat watch: daily publishing risks thin-page dilution — audit weekly, noindex/merge weak pages

## Phase 3: Scale (Weeks 13–24)

- [ ] Original research #1 published + promoted (Lighthouse benchmark study)
- [ ] Digital PR: pitch research to dev newsletters (JavaScript Weekly, CSS-Tricks community etc.)
- [ ] Remaining industry pages live
- [ ] Link building: 8–12 quality links/mo (guest posts, resource-page outreach, HARO/Connectively)
- [ ] GEO monitoring: ChatGPT/Perplexity/AI Overviews citation check monthly
- [ ] Performance re-audit; image pipeline optimization
- [ ] Conversion optimization on top landing pages (heatmaps, form A/B)

## Phase 4: Authority (Months 7–12)

- [ ] Quarterly original research cadence
- [ ] Speaking/podcast circuit for founder entity authority
- [ ] Advanced schema: Review/AggregateRating as testimonials accumulate
- [ ] Content refresh program (top 20 pages quarterly)
- [ ] Expand to adjacent keyword clusters based on GSC data
- [ ] Target DR 30+, 200+ ranking keywords

## Resource Requirements

| Role | Load |
|------|------|
| Content writer (dev-literate) | 2 pieces/wk weeks 1–12 |
| Founder/SME | 2h/wk interviews, editing, LinkedIn |
| Dev (you) | Schema, performance, tooling — front-loaded Phase 1 |
| Link outreach (VA or agency) | Starts month 2 |

## Dependencies & Blockers

1. **Real case studies block Phase 3 link building** — get client permissions now
2. Team photos/bios needed before Person schema ships
3. Domain decision (final TLD/name) blocks everything technical

## Risk Mitigation

- Sandbox delay → digital PR starts month 1, not month 3
- JS-heavy animations hurting crawl → all text server-rendered in static HTML (current stack ✓); verify via GSC URL Inspection each new template
- Algorithm volatility → owned channels (newsletter) from week 6
