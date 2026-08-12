# Prompt 02 — Home page (/)

Read `design.md` and confirm `components/ui/` and `components/layout/` exist from prompt 01 before
starting — this page is built entirely from those primitives plus new section components in
`components/sections/`.

## Task

Build `app/page.tsx` and the section components it needs, in order:

### 1. Hero (`components/sections/Hero.tsx`)
Full-width, generous top padding to clear the sticky header. This is the one place `CornerFrame`
sits at `alwaysVisible` around a large visual — since there's no product screenshot yet, frame a
simple abstract composition (a grid of thin lines with 2–3 offset rectangles, in `--color-line`
and `--color-signal`) rather than leaving an empty box or dropping in a stock photo.

Headline (`--text-4xl`/`--text-5xl`, sentence case):
> Web platforms built like they'll actually need to last.

Subhead (`--text-lg`, `--color-slate`, max ~60ch):
> We design and build websites, storefronts, and web apps for teams who've outgrown their last
> agency's templates. Custom where it matters, fast everywhere else.

Two CTAs: primary `Button` "Start a project" → `/contact/`, ghost `Button` "See the work" →
`/case-studies/`.

Apply the page-load motion sequence from `design.md` §6: headline fades/rises first, corner
brackets draw in right after, CTAs stagger in last.

### 2. Logo strip (`components/sections/LogoStrip.tsx`)
Eyebrow: "Trusted by teams at". Row of `[PLACEHOLDER]` client wordmarks (plain text logotypes are
fine as a stand-in — build it to accept an array of `{ name, logoSrc }` so real logos drop in
later without touching layout).

### 3. Services overview
Eyebrow "01 — What we do". Section heading: "Eight services, one team." Use `ServiceGrid`
(`components/sections/ServiceGrid.tsx`) rendering all 8 services from `lib/data/services.ts` as
`Card`s (create this data file now if prompt 04 hasn't run yet — 8 objects: slug, name, one-line
description, matches the routes in `PROJECT-STRUCTURE.md`). Grid: 4 columns desktop, 2 tablet, 1
mobile.

### 4. Process teaser
Eyebrow "02 — How we work". Heading: "A process that doesn't surprise you." Three or four
condensed steps (Discover, Design, Build, Launch & support) as a horizontal sequence with
connecting hairlines — numbering here is legitimate since it's a real ordered sequence (see
`design.md` §"structure is information"). Link out: ghost button "See our full process" →
`/process/`. Full detail lives on `/process/`, built in prompt 08 — keep this teaser to one line
per step.

### 5. Case studies teaser
Eyebrow "03 — Recent work". `CaseStudyGrid` showing 3 featured case studies as `Card`s with
`CornerFrame` + mono meta label (`CASE 0X — [Client], [Year]`) per `design.md` §4.1. Use
`[PLACEHOLDER]` client names/results until real case studies exist (prompt 06). Link out: "See all
work" → `/case-studies/`.

### 6. Proof / stats band
On `--color-ink-900` (one of the two zones allowed to use it — see `design.md` §1). 3–4
`StatBlock`s. Every number must be `[PLACEHOLDER — replace with real metric]`, never invented —
e.g. `[PLACEHOLDER] projects shipped`, not a fabricated "500+".

### 7. Testimonials
`Testimonials` section using `Quote` components, 1–2 visible at a time. Copy marked
`[PLACEHOLDER — real client quote]` with a real-sounding but clearly fake attribution structure
(`Name, Title, Company — [PLACEHOLDER]`).

### 8. Industries teaser
Eyebrow "04 — Who we work with". Short `IndustryGrid` (icon/label cards only, no descriptions) for
the industries in `lib/data/industries.ts` (create with 3–5 entries matching
`PROJECT-STRUCTURE.md`, e.g. retail, healthcare, SaaS). Link out to `/industries/`.

### 9. Final CTA band
`components/sections/CTASection.tsx`, reusable — this page uses it, but so will most other pages,
so build it to accept `heading`, `subhead`, and CTA props rather than hardcoding home-page copy
inside it. On `--color-ink-900`. Heading for home:
> Have a project in mind?

Subhead: "Tell us what you're building — we'll tell you honestly whether we're the right fit."
Primary `Button` "Start a project" → `/contact/`.

Wrap sections 3 onward in the `fadeUp`/`staggerChildren` scroll-reveal variants from `lib/motion.ts`
— not the hero, which already has its own load sequence.

## Acceptance check
Confirm every section respects `prefers-reduced-motion`, the page has exactly one `<h1>` (the
hero headline), and every `[PLACEHOLDER]` string is easy to find with a single search before
launch.
