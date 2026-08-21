# Kawaki Studios — SEO Strategy

**Business:** Boutique web development studio ("Editorial Engineering" positioning)
**Domain:** `kawaki.co.in` — .in TLD signals India; decide targeting: **(a)** India-market keywords ("web development company India"), **(b)** global keywords with .in as brand home, or **(c)** hybrid (global English terms + a few India pages). Default until confirmed: hybrid.
**Site status:** New domain, zero search authority
**Goals:** Organic traffic, keyword rankings, leads/conversions, brand authority
**Timeline:** Aggressive — daily publishing, case-study library engine
**Template:** Agency/Consultancy (`assets/agency.md`)

**Current state audit:** 6 HTML files exist (index, about, services, case-studies, contact + blog stub). Nav already links to ~19 pages that don't exist yet (/services/* ×7, /industries/* ×5, process.html, faqs.html, guides.html) → **live 404s, top priority fix**. No canonical tags, bare metas, no schema sitewide.

---

## Positioning & Keyword Thesis

Kawaki competes on craft + engineering depth, not price. Keyword strategy targets **long-tail, high-intent service terms** where boutique studios can outrank big agencies:

| Tier | Intent | Example keywords | Priority |
|------|--------|------------------|----------|
| 1 | Transactional | "headless commerce development agency", "Shopify Plus development partner", "custom web app development studio" | Build first |
| 2 | Comparison | "Webflow vs custom development", "WordPress vs headless CMS", "agency vs freelance developer" | Months 2–4 |
| 3 | Informational | "how much does a custom website cost", "website redesign process", "Core Web Vitals checklist" | Ongoing blog |
| 4 | Branded/niche | "editorial web design", "award-winning web development studio", "boutique web agency [city]" | Authority layer |

**Avoid:** head terms like "web development" or "SEO agency" — unwinnable at DA 0.

## Content Pillars

1. **Services** (money pages) — 7 existing services each get a dedicated page
2. **Work / Case Studies** — proof engine; every case study targets "[service] case study" + industry terms
3. **Industries** — vertical expertise pages (architecture, fintech, SaaS, DTC ecommerce)
4. **Insights/Blog** — thought leadership feeding service pages via internal links
5. **Process/About** — E-E-A-T layer: team credentials, methodology, FAQ

## E-E-A-T Plan

- Team member pages with Person schema + `sameAs` links (LinkedIn, GitHub, Dribbble)
- Named authors on all blog posts with credential bios
- Case studies with real metrics (%, $, timelines) — citable by AI engines
- Client testimonials with attribution
- Original research angle: publish one "State of [niche] Websites" performance study (Lighthouse benchmarks of 100 sites in a niche) — link magnet + GEO asset

## GEO (AI Search) Requirements

- Specific, quotable metrics in every case study ("cut LCP from 4.2s to 1.1s")
- Clear H2/H3 question-format headings AI can extract
- `llms.txt` at root listing key pages
- Monitor ChatGPT/Perplexity/AI Overviews citations monthly for "Kawaki Studios" + service terms

## KPI Targets

**Pace:** Daily publishing (1 page/post per day, 7/wk) + large case-study library from day 1.

| Metric | Baseline | 3 Month | 6 Month | 12 Month |
|--------|----------|---------|---------|----------|
| Organic sessions/mo | 0 | 800 | 3,500 | 10,000+ |
| Keywords in top 20 | 0 | 60 | 200 | 500+ |
| Keywords in top 3 | 0 | 8 | 35 | 100+ |
| Domain Rating (Ahrefs) | 0 | 10–15 | 25 | 40+ |
| Indexed pages | ~5 | 90 | 200 | 350+ |
| Organic leads/mo | 0 | 5–8 | 20–30 | 60+ |
| LCP (mobile) | TBD | <2.5s | <2.0s | <1.5s |

## Success Criteria per Phase

- **Phase 1:** Site technically flawless (GSC clean, CWV green, schema valid), core pages indexed
- **Phase 2:** 20+ pages live, first top-20 rankings, DR 10 via foundational links
- **Phase 3:** 50+ pages, 3+ page-1 rankings, organic leads flowing, DR 20
- **Phase 4:** Authority content earning links passively, AI citations appearing

## Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| New-domain sandbox delay | Aggressive digital PR + guest posts months 1–2 to seed authority |
| JS-heavy design hurts crawl/index | Ensure critical content server-rendered in static HTML (current stack ✓); test with GSC URL Inspection |
| Thin case studies (placeholder clients) | Replace Acme/Curology placeholders with real client work before scaling links to them |
| Single-author bottleneck | Batch-write content calendar quarterly; repurpose across formats |

See also: [COMPETITOR-ANALYSIS.md](COMPETITOR-ANALYSIS.md) · [SITE-STRUCTURE.md](SITE-STRUCTURE.md) · [CONTENT-CALENDAR.md](CONTENT-CALENDAR.md) · [IMPLEMENTATION-ROADMAP.md](IMPLEMENTATION-ROADMAP.md)
