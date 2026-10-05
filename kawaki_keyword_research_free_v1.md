# Kawaki Keyword Research — FREE TIER V1

**Date:** 2026-10-04
**Domain:** https://www.kawaki.co.in/
**Account:** Ubersuggest free tier (`ks05460@gmail.com`) — authenticated, verified
**Method:** Ubersuggest MCP (`google_suggestions`, `keyword_overview`, `location_suggest`, `user_limits`) + repository inventory
**GSC:** NOT AVAILABLE — no access in this session

---

## READ THIS FIRST — DATA HONESTY STATEMENT

This document was produced under a hard constraint the user should understand before reading any number in it.

**Only 2 of 50 keywords have verified search volume, SEO difficulty and CPC.** The other 48 are marked `N/A — QUOTA`.

The free Ubersuggest tier allows **3 report calls per day**, shared across *every* data tool (`keyword_overview`, `match_keywords`, `domain_overview`, `competitors`, `serp_analysis`, …). Not 3 per tool — 3 total. The quota resets on **UTC**, not local time.

`google_suggestions` and `location_suggest` are **quota-exempt**. Those two produced the entire discovery layer below.

**What this document therefore is:** a verified map of *what people actually type* for Kawaki's 14 service clusters, with intent, ownership, cannibalization and content gaps derived from that evidence.

**What it is not:** a volume-ranked dataset. It cannot be. Ranking 50 keywords by demand requires 50 metrics calls = **~17 days** on the free tier.

Two Ubersuggest data-quality warnings, both observed directly:

1. **The `search_intent` field is unreliable.** `wordpress malware removal` returns `search_intent: "Informational"` alongside **CPC $34.30**. Nobody researches a service at $34.30 click intent. Intent in this document is classified from autocomplete behaviour, not from that field.
2. **Both verified metrics are US-market** (locId 2840), not India. The India locId (2356) was discovered *after* the quota was spent. Re-pull before acting on the absolute numbers.

---

## 1. SITE INVENTORY (verified from filesystem)

Source: `public/` directory listing, `public/sitemap.xml`, `content/`

### Core
| URL | Type | Notes |
|---|---|---|
| `/` | Homepage | 218.6K |
| `/about` | Brand | 88.4K |
| `/services` | Services hub | 48.9K |
| `/contact` | Utility | no SEO keyword forced |
| `/404` | Utility | — |
| `/case-studies` | Hub | 50.5K |
| `/case-studies/acme-headless-ecommerce` | Case study | Shopify/headless |
| `/case-studies/fintech-roi-calculator` | Case study | ROI/cost angle — **relevant to the #1 gap below** |
| `/blog` | Blog hub | 59.3K |

### Service pages (14)
`/services/custom-web-development` · `/services/web-application-development` · `/services/website-redesign` · `/services/website-performance-optimization` · `/services/wordpress-development` · `/services/shopify-development` · `/services/ai-automation` · `/services/ai-search-optimization` · `/services/wordpress-malware-removal` · `/services/malicious-redirect-removal` · `/services/wordpress-backdoor-removal` · `/services/seo-spam-removal` · `/services/website-security-hardening` · `/services/wordpress-security-audit`

### Blog (15 published)
`ai-agent-reliability-evaluation` · `ai-automation-architecture` · `ai-automation-vs-ai-agents` · `custom-web-development-vs-no-code` · `headless-shopify-development-guide` · `how-ai-search-engines-cite-sources` · `japanese-keyword-hack-wordpress` · `nextjs-performance-architecture` · `nextjs-server-vs-client-components` · `nextjs-state-management-api-boundaries` · `shopify-liquid-vs-headless` · `webflow-vs-custom-development` · `what-is-editorial-engineering` · `wordpress-backdoors-stealth-web-shells` · `wordpress-malicious-redirects-cleanup`

### Protocols — deliberately excluded from keyword targeting
`robots.txt` · `sitemap.xml` · `llms.txt` · `llms-full.txt`

### ⚠ Pipeline defect found (not a keyword issue — flag for engineering)
`content/` holds **7** `.md` files. `public/blog/` holds **15** `.html` files.

Eight blogs exist **only as generated HTML with no markdown source**:
`ai-automation-architecture` · `headless-shopify-development-guide` · `how-ai-search-engines-cite-sources` · `nextjs-performance-architecture` · `nextjs-server-vs-client-components` · `nextjs-state-management-api-boundaries` · `webflow-vs-custom-development` · `what-is-editorial-engineering`

Any future revision of those eight requires editing generated HTML directly, or restoring the missing source. This blocks safe content optimisation on more than half the blog.

---

## 2. FREE-TIER CONSTRAINT MAP (measured, not assumed)

Source: `user_limits` MCP call

| Limit | Value |
|---|---|
| **reports** | **3** (daily, shared across all data tools) |
| keywords_per_project | 25 |
| keywords (global) | 20 |
| competitors_per_project | 2 |
| projects | 1 |
| locations_per_project | 1 |
| pages_to_crawl | 150 |
| monthly_keyword_metrics_updates | 10 / month |
| brand_operations | 100 |
| prompts_per_brand | 10 |
| topics_per_brand | 10 |
| ranking_update_frequency | weekly |
| Add-on `2022_addon_domain` | competitors_per_project 3, keywords_per_project 125 |

**Quota-exempt (confirmed working):** `google_suggestions`, `location_suggest`, `auth_status`, `user_limits`
**Quota-bound (confirmed 403):** `keyword_overview`, `match_keywords`, `domain_overview`

`domain_overview kawaki.co.in` → `{"noData": true}` — no traffic, authority or backlink data for Kawaki's own domain. Authority-building strategy cannot be quantified on the free tier.

**India location ID: 2356** (verified via `location_suggest`).

---

## 3. VERIFIED METRICS (the only two)

Source: Ubersuggest MCP · locId **2840 (United States)** · English · date 2026-10-03

| Keyword | Volume | SD | CPC | PD | Competition | Ubersuggest intent | Monthly trend (May→Aug) |
|---|---|---|---|---|---|---|---|
| `custom web development` | **880** | **29** | **$23.13** | 7 | 0.07 | "Commercial" | 880 / 590 / 1000 / 880 |
| `wordpress malware removal` | **480** | **29** | **$34.30** | 23 | 0.23 | "Informational" ⚠ | 140 / 260 / 110 / 480 |

**Readings:**

- **SD 29 on both** is the single most useful verified fact in this study. Under 30 is the band where a young/low-authority domain can realistically reach page one. Both core commercial head terms sit *inside* that band.
- **`custom web development` is flat-to-rising** (590→1000→880). Stable demand, not a declining term.
- **`wordpress malware removal` is volatile and spiking** (110→480 in one month, 4.4×). Consistent with an active security-incident cycle. This is a live, rising demand signal — the strongest reason to hold that cluster.
- **CPC gap is the intent tell.** $34.30 vs $23.13, with PD 23 vs PD 7. Whoever pays $34 for a click is hiring an emergency remediation firm, not reading a tutorial. This *is* the correct intent signal, and it contradicts Ubersuggest's own label.

⚠ **Caveat:** both are US figures. Indian volumes will differ, plausibly lower. Re-pull at locId 2356 when quota allows — this is a 3-call job.

---

## 4. THE 50-KEYWORD DATABASE

**Evidence key:** `V` = Ubersuggest metric verified · `A` = Google autocomplete, query string verified to exist, volume unknown · `S` = intent classified from SERP/autocomplete behaviour · `G` = GSC NOT AVAILABLE

Volume/SD/CPC/PD = `N/A — QUOTA` for all 48 non-verified rows. This is not padding; it is the actual state of the data.

### Cluster 1 — Custom Web Development → owner: `/services/custom-web-development`
| # | Keyword | Vol | SD | CPC | Intent (classified) | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 1 | custom web development | **880** | **29** | **$23.13** | Commercial Investigation | V+S | VERY HIGH |
| 2 | custom web development services | N/A | N/A | N/A | Transactional | A+S | VERY HIGH |
| 3 | custom web development agency | N/A | N/A | N/A | Transactional | A+S | VERY HIGH |
| 4 | custom web development company | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 5 | custom web development india | N/A | N/A | N/A | Local/Commercial | A+S | HIGH |
| 6 | custom web development cost | N/A | N/A | N/A | Commercial Investigation | A+S | VERY HIGH |
| 7 | custom web development near me | N/A | N/A | N/A | Local/Transactional | A+S | MEDIUM |

### Cluster 2 — Web Application Development → owner: `/services/web-application-development`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 8 | web application development services | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 9 | web application development agency | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 10 | web application development company | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 11 | web app development company in india | N/A | N/A | N/A | Local/Transactional | A+S | HIGH |

### Cluster 3 — Website Redesign → owner: `/services/website-redesign`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 12 | website redesign services | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 13 | website redesign agency | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 14 | website redesign cost | N/A | N/A | N/A | Commercial Investigation | A+S | VERY HIGH |
| 15 | website redesign and development services | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 16 | website redesign company in india | N/A | N/A | N/A | Local/Transactional | A+S | HIGH |

### Cluster 4 — Website Performance Optimization → owner: `/services/website-performance-optimization`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 17 | website speed optimization | N/A | N/A | N/A | Informational/Commercial | A+S | VERY HIGH |
| 18 | website speed optimization services | N/A | N/A | N/A | Transactional | A+S | VERY HIGH |
| 19 | website speed optimization wordpress | N/A | N/A | N/A | Commercial Investigation | A+S | HIGH |
| 20 | website performance optimization services | N/A | N/A | N/A | Transactional | A+S | HIGH |

### Cluster 5 — WordPress Development → owner: `/services/wordpress-development`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 21 | wordpress development services | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 22 | wordpress development agency | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 23 | wordpress development company | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 24 | wordpress development company in india | N/A | N/A | N/A | Local/Transactional | A+S | HIGH |

### Cluster 6 — Shopify Development → owner: `/services/shopify-development`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 25 | shopify development services | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 26 | shopify development agency | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 27 | shopify development company | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 28 | shopify development cost | N/A | N/A | N/A | Commercial Investigation | A+S | VERY HIGH |

### Cluster 7 — AI Automation → owner: `/services/ai-automation`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 29 | ai automation agency | N/A | N/A | N/A | Transactional | A+S | HIGH |
| 30 | ai automation agency in india | N/A | N/A | N/A | Local/Transactional | A+S | HIGH |
| 31 | ai automation agency near me | N/A | N/A | N/A | Local/Transactional | A+S | MEDIUM |
| 32 | ai automation agency usa | N/A | N/A | N/A | Local/Transactional | A+S | LOW (off-market) |

### Cluster 8 — AI Search Optimization → owner: `/services/ai-search-optimization`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 33 | ai search optimization | N/A | N/A | N/A | Informational | A+S | MEDIUM |
| 34 | ai search optimization services | N/A | N/A | N/A | Transactional | A+S | MEDIUM |
| 35 | ai search optimization agency | N/A | N/A | N/A | Transactional | A+S | MEDIUM |

### Cluster 9 — WordPress Malware Removal → owner: `/services/wordpress-malware-removal`
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 36 | wordpress malware removal | **480** | **29** | **$34.30** | **Emergency/Transactional** | V+S | VERY HIGH |
| 37 | wordpress malware removal service | N/A | N/A | N/A | Transactional | A+S | VERY HIGH |
| 38 | wordpress hacked website recovery | N/A | N/A | N/A | Emergency | A+S | VERY HIGH |
| 39 | wordpress virus removal | N/A | N/A | N/A | Emergency/Transactional | A+S | HIGH |
| 40 | best wordpress malware removal | N/A | N/A | N/A | Commercial Investigation | A+S | HIGH |

### Cluster 10 — Backdoor / Redirect / SEO Spam → owners below
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Owner | Commercial value |
|---|---|---|---|---|---|---|---|---|
| 41 | wordpress backdoor removal | N/A | N/A | N/A | Commercial Investigation | A+S | `/services/wordpress-backdoor-removal` | HIGH |
| 42 | how to find backdoor wordpress | N/A | N/A | N/A | Informational | A+S | `/blog/wordpress-backdoors-stealth-web-shells` | MEDIUM |
| 43 | how to remove redirect malware wordpress | N/A | N/A | N/A | Informational/Emergency | A+S | `/blog/wordpress-malicious-redirects-cleanup` | MEDIUM |

### Cluster 11 — Security Audit / Hardening
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Owner | Commercial value |
|---|---|---|---|---|---|---|---|---|
| 44 | wordpress security audit | N/A | N/A | N/A | Commercial Investigation | A+S | `/services/wordpress-security-audit` | HIGH |
| 45 | website security hardening | N/A | N/A | N/A | Informational/Commercial | A+S | `/services/website-security-hardening` | MEDIUM |

### Cluster 12 — Cross-service COST cluster (see §7 — the #1 gap)
| # | Keyword | Vol | SD | CPC | Intent | Evidence | Commercial value |
|---|---|---|---|---|---|---|---|
| 46 | how much does it cost to build a custom website | N/A | N/A | N/A | Commercial Investigation | A+S | VERY HIGH |
| 47 | how much website development cost in india | N/A | N/A | N/A | Local/Commercial | A+S | VERY HIGH |
| 48 | average cost of website redesign | N/A | N/A | N/A | Commercial Investigation | A+S | VERY HIGH |
| 49 | how much does web app development cost | N/A | N/A | N/A | Commercial Investigation | A+S | HIGH |
| 50 | how much website developer charge | N/A | N/A | N/A | Commercial Investigation | A+S | HIGH |

---

## 5. SERP-SHAPE FINDINGS (from autocomplete, per cluster)

These are the observations that actually change strategy.

### ⚠ `malicious redirect removal` — near-zero demand. A service page with almost no organic market.
Autocomplete for this exact seed returned Windows software, not WordPress:
```
malicious removal tool windows 11 · malicious removal tool command
malicious software removal tool x64 v5 115 · how to remove redirect malware wordpress
```
Google has **no strong association** between "malicious redirect removal" and website remediation. Only 2 of ~11 returned queries were on-topic. A dedicated service page targets a term the market does not search.

**Recommendation:** keep the page (it supports the cluster and converts brand traffic), but stop treating it as an organic acquisition target. Its realistic function is navigational support for the malware-removal cluster.

### ⚠ `seo spam removal` — intent mismatch. SERP wants a *metric*, not a *service*.
```
seo spam score · seo spam checker · seo spam full form · why spam score is high
how much spam score is good · how to remove spam score of website
```
The SERP is SEO-metrics and definition intent. `/services/seo-spam-removal` targets remediation-service intent. `/blog/japanese-keyword-hack-wordpress` (already published, 100K+, targeting exactly "SEO spam" language) is the better-matched asset. **The blog should own this term; the service page should support it.**

### ⚠ `website performance optimization` — targeting the weaker of two terms.
Autocomplete shows the market overwhelmingly searches **`website speed optimization`** (speed, not performance; plus `checker`, `test`, `plugin`, `tools`, `services`). "performance optimization" additionally collides with academic noise (`udacity`, `course`, `by google`, `meaning`).

**Recommendation:** the service page's primary term should be **website speed optimization**. Keep "performance optimization" as a secondary. No new page needed.

### ✓ `wordpress malware removal` — strongest commercial cluster, and it is *rising*
```
wordpress malware removal service · wordpress malware removal & hacked website recovery
wordpress malware removal & security masterclass · wordpress hacked website recovery
wordpress malware removal bangalore · best wordpress malware removal
wordpress redirect malware removal · malware removal from wordpress site
```
India-local (`bangalore`) and recovery-intent variants both present. Combined with the verified **$34.30 CPC / PD 23 / 4.4× month-over-month spike**, this is the highest-value cluster Kawaki owns. Note the collision: `plugins`, `plugin free`, `tool`, `free`, `upwork` all appear — the DIY plugin market is loud in this SERP, which is why SD 29 is a *winnable* rather than easy fight.

### ⚠ `web application development` — education-polluted in India
```
gtu syllabus · bca 1st year · nptel · ktu s5 · vtu question papers · sppu
17-437 · mis 333k · geo g 863 · cis 2336 · 3004ict · web 3 application development
web application development salary · web application development jobs
```
The **head term is an academic course query in India.** The commercial tail (`services`, `agency`, `company in india`) is real but secondary. Ranking for the bare head term is realistically impossible and not worth targeting.

**Recommendation:** do not chase `web application development` bare. Target only the `+ services / + agency / + company` variants. This is also the strongest argument for separating it from custom web development (§8).

### ✓ `custom web development` — healthy, India-rich, SD winnable
```
custom web development company in india · custom web development kolkata
custom web development company in bangalore · custom web app development india
custom web development company in mumbai · custom website development in delhi
custom web development company in noida · custom web development india
```
Dense Indian city modifiers (Delhi, Bangalore, Mumbai, Kolkata, Noida, Hyderabad, Kochi, Coimbatore, Bhubaneswar, Indore, Thirunelveli, Navi Mumbai) plus verified **SD 29 / CPC $23.13 / flat-to-rising volume**. Strongest organic opportunity Kawaki holds.

### `ai search optimization` — term-definition stage, not a demand stage
```
ai search optimization acronym · aeo · aio · aiso · aso · a i search optimization companies
ai search optimization geo · ai search optimization masterclass · ai search optimization course
```
A dense cluster of *acronym-disambiguation* queries is the signature of a term Google has not yet settled. Real commercial queries (`services`, `agency`, `audit`, `checklist`) exist underneath.

**Recommendation:** this cluster is an **emerging bet**, not a revenue play. `/blog/how-ai-search-engines-cite-sources` (published 2026-10-02) is well-timed. Do not build a large content programme here yet; revisit once the acronym settles.

### `website security hardening` — head term collides with server/Windows hardening
```
what is security hardening · security hardening meaning · web server hardening checklist
website hardening checklist · website security headers · website security header checker
```
Plus Windows and Hostgator pollution. "Hardening" reads as sysadmin/IT-ops language to Google, not "hire an agency". `/services/website-security-hardening` will struggle on the bare term.

### `website redesign` — commercially strong but AI-polluted
Commercial tail is solid (`services`, `agency`, `cost`, `company in bangalore/delhi/chennai`). But the SERP now carries heavy AI-tool noise: `website redesign ai`, `website redesign ai free`, `website redesign ai tool`, `redesign website with claude`, `website redesign from url`, plus brand case-study queries (Domino's, IRCTC, Nike, Netflix, Walmart, Zara, GoDaddy, Guardian, Debian, Goodreads) and job/RFP noise.

**Strategic read:** AI-redesign tool queries are a *rising competitor set*. The defensible angle is the SEO-safety angle (`does website redesign affect seo`, `how to redesign website without losing seo`) — a question a design tool cannot answer.

---

## 6. CANNIBALIZATION MATRIX

| # | Keyword cluster | Page A | Page B | Risk | Recommended owner | Why |
|---|---|---|---|---|---|---|
| C1 | custom web development / custom web app development | `/services/custom-web-development` | `/services/web-application-development` | **HIGH** | Custom Web Development | Autocomplete shows near-identical tails: `custom web application development services`, `custom web app development india`, `custom web app development agency`. Two pages chasing one SERP. Collapse web-app into custom, or differentiate hard on app-vs-site. |
| C2 | custom web development (commercial) | `/services/custom-web-development` | `/blog/custom-web-development-vs-no-code` | **HIGH** | Service page (commercial) | The blog is an *architectural explainer*; the SERP for `custom web development agency` wants a service page. Blog must stay informational and link up, not compete head-on. |
| C3 | custom vs template builders | `/blog/custom-web-development-vs-no-code` | `/blog/webflow-vs-custom-development` | **MEDIUM** | Keep separate | `webflow` vs `no-code` are distinct SERPs — verified as separate comparison clusters in autocomplete. Real overlap is low. |
| C4 | website performance / speed | `/services/website-performance-optimization` | `/blog/nextjs-performance-architecture` | **MEDIUM** | Service page (speed); blog stays architectural | Blog is Next.js-specific engineering; service page is buyer-facing speed. Different SERPs, but both mention Core Web Vitals. Keep blog technical. |
| C5 | Shopify development | `/services/shopify-development` | `/blog/shopify-liquid-vs-headless` + `/blog/headless-shopify-development-guide` | **MEDIUM** | Service page | Two headless blogs is one too many. `shopify-liquid-vs-headless` is decision-intent; `headless-shopify-development-guide` is implementation-intent. Consider merging. |
| C6 | AI automation | `/services/ai-automation` | `/blog/ai-automation-architecture` + `/blog/ai-automation-vs-ai-agents` | **MEDIUM** | Service page | Three AI-automation assets. Architecture and vs-agents blogs are informational and interlink; service page owns commercial. |
| C7 | AI search optimization | `/services/ai-search-optimization` | `/blog/how-ai-search-engines-cite-sources` | **LOW** | Service page (commercial); blog owns AI-citation mechanics | Clean split today — keep it. |
| C8 | WordPress security — the big one | `/services/wordpress-malware-removal` | `/services/wordpress-backdoor-removal` + `/services/malicious-redirect-removal` + `/services/seo-spam-removal` | **HIGH** | Malware Removal (hub) + 3 supporting | Six service pages + three blogs target one buyer in crisis. Autocomplete shows `wordpress malware removal` absorbing `redirect`, `backdoor`, `virus`, `recovery` into itself. **Malware Removal is the hub; the other three are sub-procedures.** |
| C9 | WordPress security blogs vs services | `/blog/japanese-keyword-hack-wordpress` | `/services/seo-spam-removal` | **HIGH** | Blog owns `seo spam` | Per §5: SERP for `seo spam` wants the hack explainer. Blog is better matched and already 100K+. Service page supports. |
| C10 | security audit vs hardening | `/services/wordpress-security-audit` | `/services/website-security-hardening` | **MEDIUM** | Audit = assessment; Hardening = remediation | Serial, not competing — but titles read alike. Differentiate explicitly (audit *finds*, hardening *fixes*). |

**Highest-risk clusters: C1, C2, C8, C9.** C8 is the most commercially expensive: six pages and three blogs chasing the one keyword where Kawaki has verified **$34.30 CPC**.

---

## 7. CONTENT GAPS

### Commercial gaps
| Gap | Evidence | Target | Priority |
|---|---|---|---|
| **G1 — No pricing content anywhere** | 15+ distinct cost queries observed across FOUR clusters (see below) | New blog + service-page pricing sections | **CRITICAL** |
| **G2 — `website speed optimization` unowned as a primary term** | Service page targets the weaker "performance" variant | `/services/website-performance-optimization` | HIGH |
| **G3 — `shopify development cost` unowned** | Observed in Shopify autocomplete; no cost content | `/services/shopify-development` | MEDIUM |

### Informational gaps
| Gap | Evidence | Target | Priority |
|---|---|---|---|
| **G4 — Redesign-without-losing-SEO** | `how to redesign website without losing seo`, `does website redesign affect seo`, `website redesign vs refresh`, `website redesign vs new website` — all observed, none served | New blog | HIGH |
| **G5 — `how to find backdoor wordpress`** | Observed as an explicit question query; blog covers detection but under this phrasing | `/blog/wordpress-backdoors-stealth-web-shells` | MEDIUM |

### Comparison gaps
| Gap | Evidence | Target | Priority |
|---|---|---|---|
| **G6 — `custom website vs wordpress`** | Observed in comparisons; partially covered by existing no-code blog | `/blog/custom-web-development-vs-no-code` | MEDIUM |
| **G7 — `website maintenance vs redesign`** | Observed; nobody serves it | New blog | LOW |

### Problem-solving gaps
| Gap | Evidence | Target | Priority |
|---|---|---|---|
| **G8 — Hacked-site emergency path** | `wordpress hacked website recovery`, `malware removal & hacked website recovery`, `best wordpress malware removal`; volume spiking 4.4× MoM | `/services/wordpress-malware-removal` | **CRITICAL** |

### ⚠ THE #1 GAP — pricing (G1)
Observed cost queries, verbatim from autocomplete:

**Custom web development:** `how much does it cost to build a custom website` · `custom web development cost` · `custom web development pricing` · `custom web development packages` · `how much web development cost` · `how much website development cost` · `how much website developer charge` · `custom website design cost` · `website design price in india`

**Website redesign:** `average cost of website redesign` · `website redesign cost` · `website redesign charges` · `what does a website redesign cost` · `how much should a website redesign cost` · `how much does a full website redesign cost` · `website redesign cost in india` · `website design price in india`

**Web app / Shopify:** `how much does web app development cost` · `web app development cost` · `web application development cost` · `shopify development cost`

**Why this is the top gap:**
1. **Volume is unverified but breadth is verified.** These appeared as *questions* in Google's own autocomplete across four separate service clusters. Whatever the volumes, the intent is unambiguously pre-purchase.
2. **Kawaki has zero pricing content.** No page, no section, no blog. Fourteen service pages, no rates, no bands, no "what does this cost" answer.
3. **It maps to a verified-converting asset.** `/case-studies/fintech-roi-calculator` already exists — a cost/ROI case study. The gap is a *bridge* to it, not a cold start.
4. **It serves all four clusters at once.** One well-built pricing article feeds custom web, redesign, web app and Shopify.
5. **CPC corroborates.** $23.13 on `custom web development` — advertisers are bidding on exactly the pre-purchase moment a pricing page addresses.

**ponytail:** publishing rates has a business decision attached (Kawaki may not want to publish prices). Publishing *ranges and what drives cost* captures most of the search intent without publishing a rate card. Confirm with the business before writing.

---

## 8. KEYWORD OWNERSHIP — one owner per keyword

| Owner | Keywords |
|---|---|
| Homepage | *(none — no head term should sit on `/` against 14 service pages)* |
| `/services` hub | `custom web development near me`, `web app development company in india` *(cross-service navigational)* |
| Custom Web Development | 1, 2, 3, 4, 5, 6 |
| Web Application Development | 8, 9, 10, 11 |
| Website Redesign | 12, 13, 14, 15, 16 |
| Website Performance Optimization | 17, 18, 19, 20 |
| WordPress Development | 21, 22, 23, 24 |
| Shopify Development | 25, 26, 27, 28 |
| AI Automation | 29, 30, 31, 32 |
| AI Search Optimization | 33, 34, 35 |
| WordPress Malware Removal | 36, 37, 38, 39, 40 |
| WordPress Backdoor Removal | 41 |
| Malicious Redirect Removal | **none — see §5.** Keep as cluster support; do not target |
| SEO Spam Removal | **none — blog owns it.** See C9 |
| Website Security Hardening | 45 |
| WordPress Security Audit | 44 |
| Existing blogs | 42 (`wordpress-backdoors-stealth-web-shells`), 43 (`wordpress-malicious-redirects-cleanup`), G4/G6 owners |
| **Future blog (Blog #16)** | **46, 47, 48, 49, 50 — the pricing cluster** |

**Homepage gets no primary keyword.** With 14 service pages, the homepage's job is brand + routing. Forcing a head term there would compete with every service page simultaneously. Recommend leaving it brand-led.

---

## 9. BLOG #16 — RECOMMENDATION

### ✅ #1 — RECOMMENDED

**Working title:** *How Much Does Custom Web Development Cost in India? A Realistic Breakdown for 2026*

| Field | Value | Source |
|---|---|---|
| Primary keyword | `how much does it cost to build a custom website` | Autocomplete (verified query) |
| Secondary cluster | `custom web development cost` · `how much website development cost in india` · `custom web development pricing` · `website design price in india` | Autocomplete (verified) |
| Volume | **N/A — QUOTA** | Honest gap |
| SD | **N/A — QUOTA** | Honest gap |
| CPC | **N/A — QUOTA** (adjacent: `custom web development` = $23.13) | Partial proxy only |
| Intent | Commercial Investigation — pre-purchase | Classified |
| SERP type | Comparison/listicle + service pages expected | Inferred from autocomplete shape, **not observed live** |
| Target service | `/services/custom-web-development` |
| Current coverage | **NONE** |
| Content gap | G1 — the largest verified gap in this study |
| Competitive difficulty | Unknown. Likely HIGH on the bare head term, MEDIUM on India-qualified long-tail |

**Why this is Blog #16:**

1. **Only gap in this study supported by breadth of verified evidence rather than a single metric.** 15+ cost queries observed across 4 independent clusters. Everything else here rests on 2 verified numbers; this rests on the *shape* of real query data.
2. **Closes the widest gap.** Fourteen service pages, zero pricing content. No other candidate addresses that.
3. **Highest intent density.** Every observed query is a buyer asking what to pay. No informational drift.
4. **Internal-link hub.** One article can link out to all four relevant service pages *and* to `/case-studies/fintech-roi-calculator` — which already exists and speaks directly to cost justification. It converts orphaned service pages into an interlinked commercial cluster.
5. **Timing.** `custom web development` volume is flat-to-rising (590→1000→880) with SD 29 — winnable. Writing the pricing article now competes in a SERP Kawaki can realistically enter.
6. **Compounding.** Cost content attracts evaluators *before* they contact; it also gives every service page a natural internal-link target for "what does this cost".

**Honest weakness:** ranked without volume. If `how much does it cost to build a custom website` has low volume and Kawaki's real money terms are elsewhere, this is still defensible — pricing content serves every cluster and converts traffic from all of them. But it is a **breadth-of-evidence bet, not a volume-proven bet**, and I am labelling it as such.

### #2 — Redesign Without Losing SEO

**Title:** *Website Redesign Without Losing SEO: A Migration Checklist That Protects Your Rankings*
- Primary: `how to redesign website without losing seo` (autocomplete-verified)
- Secondary: `does website redesign affect seo` · `website redesign vs refresh` · `website redesign vs new website` · `website redesign and seo`
- Target: `/services/website-redesign`
- Gap: G4. None served.
- Volume/SD/CPC: **N/A — QUOTA**
- **Why #2:** directly supports a service page that exists, and its angle is structurally defensible — an AI redesign tool cannot answer "will this cost me rankings", which is exactly how the SERP is now polluted (§5). Strong second.

### #3 — Hacked Site Emergency Guide

**Title:** *My WordPress Site Is Hacked: What To Do First (And What Not To Do)*
- Primary: `wordpress hacked website recovery` (autocomplete-verified)
- Secondary: `wordpress malware removal & hacked website recovery` · `best wordpress malware removal` · `malware removal from wordpress site`
- Target: `/services/wordpress-malware-removal`
- Gap: G8
- Volume/SD/CPC: **N/A — QUOTA** (adjacent `wordpress malware removal` = 480, SD 29, **CPC $34.30 — highest CPC in the study**)
- **Why #3:** highest verified CPC in the entire dataset, and volume spiking 4.4× month-over-month. Ranks below #1/#2 only because it overlaps an existing blog (`japanese-keyword-hack-wordpress`) and therefore carries more cannibalization risk — see C9. **If GSC later shows the malware cluster converting, promote this to #1.**

---

## 10. PRIORITY RANKING — top 10

Priority is **not volume-ranked** (48/50 volumes unavailable). Composite of: verified commercial signal, SERP fit, coverage gap, internal-linking leverage, cannibalization cost.

| # | Keyword | Vol | SD | CPC | Intent | Owner | Commercial value | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|---|
| 1 | wordpress malware removal | **480** | **29** | **$34.30** | Emergency/Transactional | WordPress Malware Removal | VERY HIGH | V+S | **P0** |
| 2 | custom web development | **880** | **29** | **$23.13** | Commercial Investigation | Custom Web Development | VERY HIGH | V+S | **P0** |
| 3 | how much does it cost to build a custom website | N/A | N/A | N/A | Commercial Investigation | Future Blog #16 | VERY HIGH | A+S | **P0** |
| 4 | how much website development cost in india | N/A | N/A | N/A | Local/Commercial | Future Blog #16 | VERY HIGH | A+S | **P0** |
| 5 | website speed optimization | N/A | N/A | N/A | Informational/Commercial | Website Performance Optimization | VERY HIGH | A+S | **P1** |
| 6 | website redesign cost | N/A | N/A | N/A | Commercial Investigation | Website Redesign | VERY HIGH | A+S | **P1** |
| 7 | website speed optimization services | N/A | N/A | N/A | Transactional | Website Performance Optimization | VERY HIGH | A+S | **P1** |
| 8 | custom web development services | N/A | N/A | N/A | Transactional | Custom Web Development | VERY HIGH | A+S | **P1** |
| 9 | shopify development cost | N/A | N/A | N/A | Commercial Investigation | Shopify Development | VERY HIGH | A+S | **P1** |
| 10 | wordpress hacked website recovery | N/A | N/A | N/A | Emergency | WordPress Malware Removal | VERY HIGH | A+S | **P1** |

**#1 and #2 are the only two rows in this entire document backed by a verified Ubersuggest metric.** Both have SD 29 — the winnable band. Both have CPC above $23. Those are the two clusters to build around.

---

## 11. WHAT THIS STUDY CANNOT ANSWER

Stated plainly, because these gaps are load-bearing:

1. **Absolute demand for 48 of 50 keywords.** Needs ~16 more UTC days on free, or a paid plan.
2. **India-specific metrics.** Both verified numbers are US (locId 2840). Re-pull at **locId 2356** = 3 calls.
3. **All current rankings, impressions, clicks, CTR, positions.** GSC inaccessible. **No claim is made anywhere in this document about where Kawaki currently ranks.**
4. **Competitor landscape.** `domain_overview kawaki.co.in` → `noData: true`; `competitors` quota-bound; free tier caps competitors_per_project at 2.
5. **Backlink profile.** No domain data returned.
6. **Live SERP composition.** SERP-shape statements in §5 are inferred from autocomplete co-occurrence, **not** from observed result pages. No SERP was directly inspected this session.
7. **Blog #16 ranked by volume.** It is ranked by breadth of verified query evidence. That is a real signal, but it is not the signal the original brief asked for.

---

## 12. RECOMMENDED SEQUENCE

**Free, this week:**
1. Restore the 8 missing blog markdown sources (§1) — blocks all blog optimisation
2. Re-title `/services/website-performance-optimization` around **website speed optimization** (G2)
3. Resolve C8: make `/services/wordpress-malware-removal` the explicit hub; demote redirect + seo-spam pages to supporting
4. Write Blog #16 (pricing)
5. Spend 3 `keyword_overview` calls/day at **locId 2356** to backfill India metrics for rows 1, 2, 36

**Free, needs 10 minutes of yours — highest value available:**
6. **Export GSC.** Free, and it is the real answer to "what should Kawaki target next". Ubersuggest describes the market; GSC shows what Kawaki *already gets impressions for* — including position 4–20 strikes worth cents to capture and wrong-page matches feeding the cannibalization findings in §6. This inverts the research order for the better: find what already matters to you, then spend scarce quota on exactly those keywords.

**Only then consider paid Ubersuggest.** The case for paying is bulk volume at scale, competitor data and domain metrics — not the core workflow, which is now proven working.

---

## APPENDIX — Quota cheat sheet for future sessions

| Need | Calls | Cost |
|---|---|---|
| Location ID for India | — | **FREE** (`location_suggest`) → `2356` |
| Discover what people search | — | **FREE** (`google_suggestions`, 10 seeds/call) |
| One keyword's volume + SD + CPC | 1 | 1 of 3/day |
| 50 keywords' metrics | 50 | **~17 days** |
| Re-pull rows 1, 2, 36 at India | 3 | **1 day** |
| Domain authority / traffic | 1 | 1 of 3/day — Kawaki returns `noData` |
| Competitor research | 1 | 1 of 3/day, max 2 competitors on free |

**Quota resets 00:00 UTC**, not local midnight.