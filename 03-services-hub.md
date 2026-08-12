# Prompt 03 — Services hub (/services/)

Read `design.md`. Confirm `lib/data/services.ts` exists (created in prompt 02, or create it now if
you're running this before the home page) with all 8 services:

`web-development`, `ecommerce-development`, `shopify-development`, `wordpress-development`,
`web-app-development`, `frontend-development`, `backend-development`, `maintenance-support`.

Each object needs: `slug`, `name`, `oneLiner` (used on cards), `summary` (2–3 sentences, used on
this hub page), `startingFrom` (optional, `[PLACEHOLDER]` price/timeline framing — omit if you'd
rather not show pricing signals at all, note the decision).

## Task

Build `app/services/page.tsx`. This is the main authority page for every service — treat it as a
real landing page, not a thin link list.

**H1** (sentence case): "Services built around what you're actually trying to ship."

**Intro paragraph** (`--text-lg`, max 60ch): one paragraph explaining how the 8 services relate —
e.g. that some are full builds (web dev, ecommerce, Shopify, WordPress) and some are
narrower/specialized engagements (frontend, backend, web apps, ongoing maintenance) — so a visitor
can self-select instead of reading all 8 blindly.

**Service grid:** all 8 as `Card`s (reuse from `components/ui/Card.tsx`), 2 columns desktop, 1
mobile — bigger cards than the home page teaser, each showing `name`, `summary` (not just the one-
liner), and a text link "See the service →" instead of the whole card being the only click target
(the whole card should still be clickable, but include an explicit link for screen reader/scan
clarity).

**Group the 8 into two labeled clusters** using `Eyebrow` components, since this is genuinely
informative structure, not decoration:
- `Eyebrow` "Full builds": web-development, ecommerce-development, shopify-development,
  wordpress-development
- `Eyebrow` "Specialized engagements": web-app-development, frontend-development,
  backend-development, maintenance-support

**Below the grid — a short "not sure which one?" block:** a `Quote`-style or bordered callout
pointing to `/contact/` with a `Button` "Not sure where to start? Talk to us" — this hub's real job
is routing, so make the escape hatch obvious.

**Cross-link to industries:** one short section — "See how these services apply to your industry"
— linking to `/industries/`, since services and industries should interlink for topical authority
(this is explicitly part of the SEO purpose of this page per your sitemap).

Use `generateMetadata` (via `lib/seo.ts`) with a title/description that targets "web development
services" style intent broadly — this page should rank for the category, individual service pages
rank for their specific keyword.

## Acceptance check
Every one of the 8 services is linked at least once with real anchor text (not just "click here"),
and the page has exactly one `<h1>`.
