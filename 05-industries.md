# Prompt 05 — Industry pages (/industries/ + /industries/{industry}/)

Read `design.md`. These pages exist for topical/vertical authority (per your sitemap) — their job
is to show pattern-matched expertise, not repeat the services pages with a different label pasted
on top.

## Data

Expand `lib/data/industries.ts` to at least these three (add more later the same shape):
`retail`, `healthcare`, `saas`. Each needs: `slug`, `name`, `challenge` (1–2 sentences on what's
actually different about building for this industry), `relevantServices` (array of service slugs
from `lib/data/services.ts`), `considerations` (3–4 bullets — real, industry-specific technical or
compliance points, not generic "we understand your business" filler).

## Task — hub page (`app/industries/page.tsx`)

H1: "Built for how your industry actually works."
Intro paragraph: one paragraph on why industry context changes technical decisions (e.g. retail
cares about checkout performance and peak-load traffic, healthcare cares about compliance and data
handling, SaaS cares about onboarding flows and integration depth) — make this genuinely specific
per industry, not a single generic sentence copy-pasted with the industry name swapped in.

Grid of industry `Card`s (one per entry in `lib/data/industries.ts`), each showing `name` +
`challenge` as the card description.

## Task — individual industry page (`app/industries/[industry]/page.tsx`, dynamic route)

Use `generateStaticParams` from `lib/data/industries.ts`.

1. **Hero** — H1: "{Industry} teams build with us for {one specific reason from `challenge`}."
   Don't reuse one template sentence with only the industry name swapped — the reason clause
   should differ per industry (a retail hero and a healthcare hero should not scan as the same
   sentence).
2. **The challenge** — expand `challenge` into 2–3 real sentences on what's different about this
   industry's technical needs.
3. **What we bring** — render `considerations` as a real list, each with a one-line explanation,
   not just a bare bullet.
4. **Relevant services** — `ServiceGrid` filtered to `relevantServices`, so this page interlinks
   back to services pages (the cross-linking your sitemap calls for) — each card should feel
   chosen for this industry, not the generic 8-service grid repeated on every industry page.
5. **Case studies in this industry** — filtered `CaseStudyGrid`; if none exist yet for a given
   industry, fall back to featured case studies with a visible `[PLACEHOLDER — filter once
   tagged]` comment, same pattern as prompt 04.
6. **CTA band** — "Have a {industry} project?" → `/contact/`.

`generateMetadata` per industry targeting "{industry} web development" style intent.

## Acceptance check
No two industry pages share an identical paragraph anywhere except the CTA band boilerplate — if
you can copy a sentence from `/industries/retail/` and paste it unchanged into
`/industries/healthcare/` and it still reads fine, it's too generic; make it specific to the
industry instead.
