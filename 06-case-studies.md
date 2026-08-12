# Prompt 06 — Case studies (/case-studies/ + /case-studies/{project}/)

Read `design.md`. This is the E-E-A-T / trust section of the site — treat the corner-bracket +
mono meta-label motif (§4.1) as central here, not decorative, since these pages exist to prove
real work happened.

## Content model

Each case study is an `.mdx` file in `content/case-studies/` with frontmatter:
```
title, client (or "[PLACEHOLDER]" if anonymized), industry (slug, links to lib/data/industries.ts),
services (array of service slugs), summary, year, results (array of { metric, label } — every
metric must be real or explicitly [PLACEHOLDER], never invented), heroImage, featured (boolean)
```
Create 3 example `.mdx` case studies now with `[PLACEHOLDER]` content clearly marked, matching one
industry/service combination each, so the grids and filters in prompts 02/04/05 have real data to
render against.

## Task — hub page (`app/case-studies/page.tsx`)

H1: "Recent work." (plain, not oversold — let the work carry it)
Filter bar: by industry and by service (client-side filter over the MDX frontmatter, no page
reload needed).
Grid of `Card`s with `CornerFrame`, each showing the case study's hero image, client, one-line
summary, and 1–2 `StatBlock` results pulled from frontmatter.

## Task — individual case study page (`app/case-studies/[project]/page.tsx`)

Render MDX content, plus a structured header above the prose:
1. **Header** — client, industry, services involved (as `Tag`s linking back to their pages —
   this is real interlinking, not decoration), year.
2. **Results band** — `StatBlock`s from frontmatter `results`, on `--color-field` background.
3. **Body** — the MDX prose: challenge, approach, outcome. Keep the example placeholder content
   structured this way (three real subheadings) so it's obvious what real case studies should
   cover.
4. **Related case studies** — 2 more, filtered by shared industry or service.
5. **CTA band** — "Want results like this?" → `/contact/`.

`generateMetadata` per case study; include `Article`-style JSON-LD via `lib/seo.ts` (reuse the
Article helper — Case studies are close enough to Article schema to share it; note this decision
rather than building a third schema helper).

## Acceptance check
The industry and service filters both actually work against real frontmatter data (not
hardcoded), and every stat on every card and page traces back to a `results` field in that case
study's frontmatter — no stat should exist only in the component, disconnected from data.
