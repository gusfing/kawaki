# Kawaki Studios — Site Structure & URL Architecture

**Template:** Agency (`assets/agency.md`) · Flat-ish hierarchy, max 3 clicks to any page.

```
/                                   Home — Organization + ProfessionalService schema
├── /services                       Hub — OfferCatalog schema
│   ├── /custom-web-development     Pillar 1 Hub
│   │   ├── /web-application-development       (Batch 2 — Authenticated apps, portals, dashboards)
│   │   ├── /website-redesign                  (Batch 2 — Modernization, legacy rebuild, 301 migration)
│   │   ├── /website-performance-optimization  (Batch 2 — Core Web Vitals, runtime remediation)
│   │   └── /wordpress-development             (Batch 2 — Custom Gutenberg, headless WP, ACF)
│   │   *Note: SaaS Development and AI Website Development held back to prevent cannibalization
│   ├── /shopify-development        Pillar 2 Hub
│   ├── /ai-automation              Pillar 3 Hub
│   ├── /ai-search-optimization     Pillar 4 Hub
│   └── /wordpress-malware-removal  Pillar 5 Hub
│       ├── /malicious-redirect-removal        (Batch 1 — Script injection, redirect hijacking)
│       ├── /wordpress-backdoor-removal        (Batch 1 — Webshells, cron persistence)
│       ├── /seo-spam-removal                  (Batch 1 — Japanese/pharma keyword spam)
│       ├── /website-security-hardening        (Batch 1 — WAF, 2FA, file permissions)
│       └── /wordpress-security-audit          (Batch 1 — Diagnostic vulnerability assessment)
├── /industries                     Hub
│   ├── /architecture-design-studios
│   ├── /fintech
│   ├── /saas-startups
│   └── /dtc-ecommerce
├── /work                           Case study hub (existing page, expand)
│   ├── /headless-ecommerce-migration
│   ├── /fintech-roi-calculator
│   ├── /production-trust-scale
│   └── /[new-case-studies]
├── /about                          Existing — add team subsections
│   └── /team/[member]              Person + ProfilePage schema
├── /process                        Methodology ("Editorial Engineering" definitional page)
├── /insights                       Blog hub
│   ├── /guides/[slug]
│   ├── /comparisons/[slug]
│   └── /research/[slug]
├── /faq                            FAQPage schema
├── /contact                        Existing — ContactPage schema
├── /llms.txt                       AI-crawler page index
└── /sitemap.xml                    Auto-generated, quality-gated
```

## Architectural Rule & Strategy Ledger: Commercial Child Endpoints

> [!NOTE]
> **Architecture Ledger Update (2026-09-20):**
> The earlier constraint *"Five Pillars Remain the Sole Commercial Endpoints"* is officially **superseded** by the approved two-tier cluster architecture:
> 1. **Core Pillar Hubs (5):** Serve as broad thematic authorities (`custom-web-development`, `shopify-development`, `ai-automation`, `ai-search-optimization`, `wordpress-malware-removal`).
> 2. **Approved Child Commercial Endpoints (9):**
>    - **Batch 1 (WordPress Recovery Cluster — 5 pages):** `/services/malicious-redirect-removal`, `/services/wordpress-backdoor-removal`, `/services/seo-spam-removal`, `/services/website-security-hardening`, `/services/wordpress-security-audit`.
>    - **Batch 2 (Web Engineering Network — 4 pages):** `/services/web-application-development`, `/services/website-redesign`, `/services/website-performance-optimization`, `/services/wordpress-development`.
> 3. **Boundary Discipline:** New commercial child pages are only permitted when they target distinct user search intents and buying situations with zero query cannibalization. SaaS Development and AI Website Development remain strictly held back.


## Internal Linking Rules

1. Every service page links → 2 relevant case studies + 2 blog posts + sibling services
2. Every case study links → the service it demonstrates + industry page
3. Blog posts link → 1 primary service page (money page) + 1 related post
4. Industry pages link → matching case studies + services
5. Breadcrumbs on all pages below root (BreadcrumbList schema)
6. Footer: services + industries + top 3 case studies sitewide

## Sitemap Quality Gates

Include only pages that pass:
- ≥300 words unique content (service/blog/case-study pages)
- Unique title + meta description
- No thin/duplicate variants; canonical set clean
- Mobile renders all content without JS dependency for text

## Page Type → Schema Map

| Page | Schema |
|------|--------|
| Home | `Organization`, `ProfessionalService`, `WebSite` |
| Service | `Service` (+ `OfferCatalog` on hub), `ProfessionalService` ref |
| Case study | `Article` + `Organization` (client) + `Review`/`AggregateRating` if testimonial present |
| Team member | `Person`, `ProfilePage`, `sameAs[]` |
| Blog post | `BlogPosting`, `Person` author |
| FAQ | `FAQPage` |
| Contact | `ContactPage`, `ProfessionalService` |
| All | `BreadcrumbList` |

## User Journey Mapping

- **Ready-to-buy:** `/services/*` → case study proof → `/contact`
- **Comparing options:** comparison/guide content → service page → work → contact
- **Vetting credibility:** home → `/work` → `/about/team` → contact
- **AI/LLM referral:** research content → service page (llms.txt ensures discoverability)
