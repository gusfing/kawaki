# Project structure — [Agency Name] website

This maps your sitemap to an actual Next.js App Router file tree. Use this as the target
structure when running the prompts in `/prompts`. One note on your sitemap first:

> Your two sitemap drafts disagreed slightly — the leveled table nested sub-services under
> `/services/web-development/`, but your "best site structure" flattened everything to
> `/services/{slug}/`, and dropped `/team/` and `/testimonials/` as standalone pages. **This kit
> follows the flat version** (shorter URLs, less depth, better for a service business with 8
> services). Team and testimonials become sections on `/about/` instead of their own pages —
> flag it if you actually want them standalone.

---

## Tech stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS, tokens mapped from `design.md`
- **Motion:** Framer Motion
- **Content:** MDX for blog/guides/case studies (`next-mdx-remote` or Contentlayer — pick one in
  the setup prompt)
- **Forms:** API route + Resend (or your preferred email provider) for contact/quote forms
- **Deployment:** Vercel

---

## File tree

```
app/
  layout.tsx                          — root layout: fonts, <html>, header, footer, JSON-LD (Organization)
  page.tsx                            — / (home)
  globals.css                         — Tailwind + design tokens as CSS variables
  sitemap.ts                          — Next.js metadata route, auto-generates sitemap.xml
  robots.ts

  services/
    page.tsx                          — /services/ (hub)
    web-development/page.tsx
    ecommerce-development/page.tsx
    shopify-development/page.tsx
    wordpress-development/page.tsx
    web-app-development/page.tsx
    frontend-development/page.tsx
    backend-development/page.tsx
    maintenance-support/page.tsx

  industries/
    page.tsx                          — /industries/ (hub)
    [industry]/page.tsx               — /industries/retail/, /industries/healthcare/, etc.
                                         (dynamic route, data-driven from lib/data/industries.ts)

  case-studies/
    page.tsx                          — /case-studies/ (hub)
    [project]/page.tsx                — /case-studies/{project}/ (MDX-driven)

  blog/
    page.tsx                          — /blog/ (index + pagination)
    [slug]/page.tsx                   — MDX-driven post

  guides/
    page.tsx                          — /guides/ (index)
    [slug]/page.tsx                   — MDX-driven guide

  faqs/
    page.tsx                          — /faqs/

  about/
    page.tsx                          — includes team + testimonials sections

  process/
    page.tsx

  contact/
    page.tsx
    actions.ts                        — server action for form submission

components/
  layout/
    Header.tsx
    Footer.tsx
    MobileNav.tsx
    SkipLink.tsx

  ui/
    Button.tsx
    Card.tsx
    Tag.tsx
    CornerFrame.tsx                   — the signature inspector-bracket component
    Eyebrow.tsx
    StatBlock.tsx
    Quote.tsx
    FormField.tsx
    SectionHeading.tsx
    Accordion.tsx                     — used on /faqs/

  sections/
    Hero.tsx
    ServiceGrid.tsx
    IndustryGrid.tsx
    CaseStudyGrid.tsx
    CTASection.tsx
    Testimonials.tsx
    ProcessSteps.tsx
    LogoStrip.tsx

lib/
  data/
    services.ts                       — 8 services: slug, name, summary, icon, related industries
    industries.ts
    testimonials.ts
  motion.ts                           — shared Framer Motion variants (see design.md §6)
  seo.ts                              — generateMetadata + JSON-LD helpers
  utils.ts

content/
  blog/*.mdx
  guides/*.mdx
  case-studies/*.mdx

public/
  images/
  favicon, og-image, etc.

tailwind.config.ts                    — tokens from design.md §1–3
```

---

## Build order

Follow the prompts in `/prompts` in this order — later prompts assume earlier ones exist:

1. `00-project-setup.md` — scaffold, tokens, fonts, Tailwind config
2. `01-design-system-components.md` — Header, Footer, Button, Card, CornerFrame, etc.
3. `02-home.md`
4. `03-services-hub.md`
5. `04-service-pages.md` — all 8 service pages, one prompt with per-page content briefs
6. `05-industries.md`
7. `06-case-studies.md`
8. `07-resources.md` — blog, guides, faqs
9. `08-trust-pages.md` — about, process, contact
