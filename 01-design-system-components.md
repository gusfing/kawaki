# Prompt 01 — Design system components

Read `design.md` before doing anything else — every component below has an exact spec there.
Don't improvise colors, radii, or shadows outside of what's defined; if something isn't covered,
flag it instead of guessing.

## Task

Build the shared component library in `components/ui/` and `components/layout/` that every page
in this site will use. These are the only chrome/primitive components you should build — page-
specific sections come in later prompts.

### `components/ui/CornerFrame.tsx` — build this one first, it's the signature element
The inspector-style corner-bracket frame from `design.md` §4.1. Props: `children`, optional
`label` (renders a small mono meta label just outside the bottom-left corner, e.g.
`"IMG_04 — 1200×800"` or `"CASE 03/07"`), optional `alwaysVisible` (for the hero, where brackets
sit at 30% opacity at rest instead of hidden). Implement the draw-in as an SVG `stroke-dashoffset`
transition on `:hover` and `:focus-within`, 200ms. Must work fully on keyboard focus, not just
mouse hover.

### `components/ui/Button.tsx`
Three variants — `primary`, `secondary`, `ghost` — per `design.md` §5. Primary and secondary use
the hard-offset shadow hover behavior from §4.2 (implement as a reusable Tailwind class or a small
shared style object, not copy-pasted per variant). Must accept `href` (renders as `<Link>`) or
`onClick` (renders as `<button>`). Visible focus state required even where the hover shadow also
applies.

### `components/ui/Card.tsx`
Generic card per `design.md` §5, wraps `CornerFrame` internally for its hover state. Accepts
`eyebrow`, `title`, `description`, `href`, `meta` (optional mono label). Used for service cards,
industry cards, and case study cards — check that one component genuinely serves all three before
building variants.

### `components/ui/Tag.tsx`, `Eyebrow.tsx`, `StatBlock.tsx`, `Quote.tsx`
Per their specs in `design.md` §5. `Eyebrow` takes a `label` and optional `index` (renders
`SEC. 0{index}`).

### `components/ui/FormField.tsx` + `Accordion.tsx`
`FormField`: label, input/textarea, error state, per §5 and the focus-ring requirement in §9.
`Accordion`: keyboard-operable (arrow keys optional, Enter/Space required), used later on
`/faqs/`. Single-open or multi-open — your call, note which.

### `components/layout/Header.tsx`
Logo left (Space Grotesk wordmark, plain text is fine — no logo file exists yet), nav links right
per `design.md` §5, primary `Button` far right ("Start a project" → `/contact/`). Sticky; add a
hairline bottom border and `--color-paper` background once scrolled past ~40px (transparent
before that, assuming it sits over a hero — check it degrades gracefully on pages with no hero
image behind it). Build `components/layout/MobileNav.tsx` as the small-screen version — full
keyboard and screen-reader accessible, traps focus while open, closes on `Escape`.

Nav links (use this as the real nav, not a placeholder):
`Services` (→ /services/), `Industries` (→ /industries/), `Work` (→ /case-studies/),
`Resources` (→ /blog/), `About` (→ /about/) — plus the primary CTA button described above.

### `components/layout/Footer.tsx`
`--color-ink-900` background per §5. Columns: **Services** (all 8, linking to their pages),
**Company** (About, Process, Contact), **Resources** (Blog, Guides, FAQs), and a fourth column
with contact info. Bottom mono meta line: `© {year} [Agency Name]`. Include `Organization`
JSON-LD is already handled in `lib/seo.ts` from prompt 00 — don't duplicate it here.

### `components/layout/SkipLink.tsx`
"Skip to content" link per `design.md` §9, visually hidden until keyboard-focused. Wire it into
`app/layout.tsx` along with the Header and Footer now that they exist.

## Acceptance check
Tab through the entire header and footer with keyboard only — every interactive element gets a
visible focus state, mobile nav traps focus and closes on Escape, and nothing relies on hover
alone to be discoverable.
