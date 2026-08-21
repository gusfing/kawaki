# Kawaki Studios — Site Structure & URL Architecture

**Template:** Agency (`assets/agency.md`) · Flat-ish hierarchy, max 3 clicks to any page.

```
/                                   Home — Organization + ProfessionalService schema
├── /services                       Hub — OfferCatalog schema
│   ├── /web-development
│   ├── /ecommerce-shopify
│   ├── /web-app-development
│   ├── /wordpress-development
│   ├── /frontend-engineering
│   ├── /backend-development
│   └── /maintenance-support
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
