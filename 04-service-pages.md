# Prompt 04 — Service pages (all 8)

Read `design.md` first. This prompt builds all 8 service pages from one shared template plus
per-service content. Build the template once, then generate all 8 routes from it — don't hand-roll
each page independently or they'll drift apart visually.

## Shared template (applies to every service page below)

Route pattern: `app/services/{slug}/page.tsx`, one per service in `lib/data/services.ts`.

1. **Hero** — H1 = the service's `headline` (below, not the same as its nav name — headlines are
   written for conversion, nav names for scannability). Subhead = `dek` (below). Two CTAs: primary
   `Button` "Start a project" → `/contact/`, ghost `Button` "See our work in this area" →
   filtered `/case-studies/`.
2. **What's included** — the `included` list below, rendered as a real list (not vague icon
   tiles) — each item gets a short label and one supporting sentence.
3. **Tech & tools** (skip only if a service's brief says to) — `Tag` row of the technologies
   listed, mono style, from `design.md` §5. This is a legitimate SEO + credibility section for a
   dev agency; don't cut it to save space.
4. **Related case studies** — `CaseStudyGrid` filtered to this service (if none tagged yet, render
   the 3 featured case studies with a `[PLACEHOLDER — filter once tagged]` comment).
5. **FAQs** — the 3 Q&As below, in an `Accordion`. Real FAQ content targeting long-tail search
   intent, not filler.
6. **CTA band** — reuse `CTASection` with this service's name in the heading:
   "Ready to talk about your {name} project?"

Use `generateMetadata` per page with the `targetKeyword` below driving the title/description via
`lib/seo.ts`, plus `Service` JSON-LD (name, description, provider = Organization).

---

## Service 1 — `web-development`
**Nav name:** Web development · **Headline:** "Custom websites that hold up past launch day."
**Dek:** "We build fast, maintainable sites on modern frameworks — not page builders you'll
outgrow in a year."
**Target keyword framing:** "custom web development [services/company]"
**Included:**
- Discovery & information architecture — mapping the site before any design starts
- Custom design, not a theme — see `/process/` for how
- Built on modern frameworks (Next.js, or your CMS of choice) for real performance
- Launch support and a handoff you can actually maintain
**Tech tags:** Next.js, React, TypeScript, Tailwind CSS, Vercel
**FAQs:**
1. "How long does a custom site take?" → `[PLACEHOLDER — realistic range once you have data]`
2. "Do you work with an existing brand/design system, or start from scratch?" → both; explain
   briefly.
3. "What happens after launch?" → point to `maintenance-support`.

---

## Service 2 — `ecommerce-development`
**Nav name:** Ecommerce development · **Headline:** "Storefronts built to convert, not just load."
**Dek:** "Custom ecommerce builds and integrations for teams past the point where a template
checkout is good enough."
**Target keyword framing:** "ecommerce development agency / custom ecommerce build"
**Included:**
- Platform selection — matched to your catalog size and ops, not a default recommendation
- Custom storefront design and checkout optimization
- Payments, inventory, and fulfillment integrations
- Performance and Core Web Vitals tuning for product pages
**Tech tags:** Shopify, Next.js Commerce, Stripe, headless commerce
**FAQs:**
1. "Do you build on Shopify or fully custom?" → link to `shopify-development` for the Shopify-
   specific answer; explain when each makes sense here.
2. "Can you migrate our existing store without downtime?" → yes, describe briefly.
3. "Do you handle payment/tax integrations?" → yes, list a couple.

---

## Service 3 — `shopify-development`
**Nav name:** Shopify development · **Headline:** "Shopify, built the way Shopify's meant to be
built."
**Dek:** "Custom themes, apps, and integrations on Shopify and Shopify Plus — no bloated
third-party app stack held together with duct tape."
**Target keyword framing:** "Shopify development agency / Shopify Plus partner"
**Included:**
- Custom theme development (Online Store 2.0 / sections)
- Custom app development where the App Store doesn't cover it
- Shopify Plus / checkout extensibility work
- Migration to Shopify from another platform
**Tech tags:** Shopify, Liquid, Shopify Plus, Hydrogen
**FAQs:**
1. "Are you a Shopify Partner?" → `[PLACEHOLDER — confirm partner status before publishing]`
2. "Custom theme or existing theme customized?" → explain the tradeoff briefly.
3. "Do you support Shopify Plus checkout customization?" → yes/no, be specific.

---

## Service 4 — `wordpress-development`
**Nav name:** WordPress development · **Headline:** "WordPress that doesn't feel like 2012."
**Dek:** "Custom WordPress builds for teams who want an editor their content team will actually
enjoy using."
**Target keyword framing:** "custom WordPress development agency"
**Included:**
- Custom theme and block-editor (Gutenberg) development
- Headless WordPress where performance demands it
- Plugin audits and custom plugin development
- Editorial workflow setup for content/marketing teams
**Tech tags:** WordPress, Gutenberg, ACF, headless WP + Next.js
**FAQs:**
1. "Headless or traditional WordPress?" → explain the tradeoff briefly, don't default to hype.
2. "Can you fix/rebuild an existing slow WordPress site?" → yes, describe your audit approach.
3. "Do you provide ongoing WordPress maintenance?" → link to `maintenance-support`.

---

## Service 5 — `web-app-development`
**Nav name:** Web app development · **Headline:** "Internal tools and products, not just
marketing sites."
**Dek:** "Custom web applications — dashboards, portals, internal tools — built to handle real
business logic, not just display content."
**Target keyword framing:** "custom web app development"
**Included:**
- Product discovery and technical scoping
- Full-stack build (frontend, backend, database, auth)
- Third-party API and internal system integrations
- Ongoing iteration post-launch, not a one-time handoff
**Tech tags:** React, Next.js, Node.js, PostgreSQL, TypeScript
**FAQs:**
1. "Is this different from your web development service?" → yes — explain: marketing site vs.
   application with real logic/state/auth.
2. "Can you work with our existing backend/API?" → yes, describe.
3. "Do you do ongoing product development, or just launch and leave?" → be direct about your
   actual model here.

---

## Service 6 — `frontend-development`
**Nav name:** Frontend development · **Headline:** "Interfaces built by people who read the spec
twice."
**Dek:** "Frontend engineering for teams who already have a design system (or need one built) and
need it implemented precisely — pixel accuracy, accessibility, and performance included, not
optional."
**Target keyword framing:** "frontend development agency / React frontend engineers"
**Included:**
- Design-to-code implementation, including design systems and component libraries
- Accessibility built in from the start, not audited in after
- Performance budgets and Core Web Vitals as a deliverable, not an afterthought
- Works alongside your existing backend/API team
**Tech tags:** React, TypeScript, Tailwind CSS, Storybook
**FAQs:**
1. "Do you need our designs in Figma, or can you design too?" → both; explain briefly.
2. "Can you work inside our existing codebase?" → yes, describe your onboarding approach.
3. "Do you handle accessibility compliance (WCAG)?" → yes, be specific about the standard you
   target (matches `design.md` §9).

---

## Service 7 — `backend-development`
**Nav name:** Backend development · **Headline:** "The part of the site nobody sees, built to not
fall over."
**Dek:** "APIs, databases, and infrastructure for products that need to handle real traffic and
real data, not just a contact form."
**Target keyword framing:** "backend development agency / API development"
**Included:**
- API design and development (REST or GraphQL)
- Database architecture and data modeling
- Authentication, authorization, and third-party integrations
- Infrastructure and deployment setup (CI/CD included)
**Tech tags:** Node.js, PostgreSQL, GraphQL, AWS
**FAQs:**
1. "Can you build the backend for a frontend we already have?" → yes, describe.
2. "Do you handle hosting/infrastructure, or just code?" → be specific about what's included.
3. "What about scaling as we grow?" → describe your approach to architecture decisions honestly.

---

## Service 8 — `maintenance-support`
**Nav name:** Maintenance & support · **Headline:** "Your site, kept running after we ship it."
**Dek:** "Ongoing maintenance, monitoring, and small-scope development for sites and apps we've
built — or ones we haven't, after an audit."
**Target keyword framing:** "website maintenance and support plans"
**Included:**
- Uptime and performance monitoring
- Security patches and dependency updates
- Small feature requests and content updates, batched or on-demand
- A real point of contact, not a ticket queue into a void
**Tech tags:** (skip the tech-tag section for this one — it reads oddly for a support service;
use a "plans" comparison instead if you want a table: e.g. Essential / Standard / Priority, each
with `[PLACEHOLDER]` response-time SLAs)
**FAQs:**
1. "Do you only maintain sites you built?" → be honest — usually preceded by an audit if not.
2. "What's your response time?" → `[PLACEHOLDER — real SLA]`.
3. "Can we start with a one-time audit before committing to a plan?" → yes, describe.

## Acceptance check
All 8 pages share the same section order and component set (verify by diffing two pages'
structure), every FAQ answer is real content (not "Lorem ipsum" or "answer here"), and every page
has a unique `<title>`/meta description targeting its own keyword — not 8 near-duplicate tags.
