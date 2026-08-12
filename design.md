# Design System — Kawaki Studios
Version 3.0 — "Editorial Engineering". Source of truth for every page and component.
Any tool building for this site reads this file first.

---

## 0. Creative direction

**Who this is for:** founders, SaaS operators, and technical decision-makers choosing a
development partner. They judge the studio by the craft of its own site before reading a word.

**Thesis:** Kawaki builds precise, durable web systems — so the site reads like a piece of
Swiss engineering: near-monochrome, type-led, quietly cinematic, with motion that feels earned.

**References (target feel):** olivergareis.com and julienpianetti.com — near-monochrome Swiss
editorial, huge grotesk type, numbered indexing, coordinate/meta details, horizontal galleries,
brand marquees, GSAP-driven parallax and scroll.

**What this is NOT:** not the old dark "void" theme with the 3D letter-ring hero (deleted). Not
a cream-and-serif studio site. Not a neon-on-black SaaS site. The only saturated color in the
entire system is one warm ignition accent, spent sparingly.

---

## 1. Color

CSS custom properties in `app/globals.css` (`@theme`). Never hard-code hex in components.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#EDEAE3` | warm bone page ground |
| `--color-field` | `#E3E0D7` | raised card / alt-section surface |
| `--color-ink-900` | `#0D0D0F` | full-bleed dark sections, footer |
| `--color-ink` | `#17161A` | primary text; near-black on dark bands |
| `--color-slate` | `#63615A` | secondary text, captions, meta (AA on paper) |
| `--color-ink-inverse` | `#EDEAE3` | text on ink-900 / accent |
| `--color-line` | `#D5D2C7` | hairlines on paper/field |
| `--color-line-inverse` | `#2A2A2E` | hairlines on ink-900 |
| `--color-accent` | `#E8451D` | **the only saturated color** |
| `--color-accent-dim` | `#F6E3DB` | accent tint surface on light |
| `--color-accent-ink` | `#FFF1EC` | text on accent |

`--color-signal*` / `--color-build*` are kept as **aliases of the accent** so components not yet
migrated keep resolving. New work uses `accent`.

**Rules**
- Ignition accent is flat, **never a gradient**. It appears on: links/ghost hover, focus rings,
  one hero word, status/pulse dots, eyebrow ticks, marquee accents. Restraint keeps it a signal.
- `--color-ink-900` is reserved for full-bleed dark rhythm bands + footer. Overuse flattens it.
- Every text/background pair must hit WCAG AA (4.5:1 body, 3:1 large). On dark bands use
  `text-ink-inverse` with opacity steps (`/55`, `/40`) for hierarchy — keep body text ≥ `/70`.

---

## 2. Type

Loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS vars on `<html>`.

| Role | Family | Var | Used for |
|---|---|---|---|
| Display | **Archivo** (variable, 600–800, `wdth` axis) | `--font-display` | headlines, wordmark, big numbers |
| Body | **IBM Plex Sans** (400, 500) | `--font-body` | paragraphs, UI, buttons |
| Mono | **IBM Plex Mono** (400, 500) | `--font-mono` | eyebrows, indices, coordinates, meta |

One neutral grotesk does the display + body work; character comes from **scale, tight tracking,
and motion**, not a novelty face. No serif. Never Space Grotesk / Inter as display.

**Rules**
- Headlines: **sentence case**, always. Display tracking `-0.03em` to `-0.035em`,
  line-height `0.98`–`1.08`, Archivo 700/800.
- Hero headline scales with `clamp(2.6rem, 7vw, 6rem)`.
- Body: line-height 1.6, max measure ~44–68ch.
- Mono labels: uppercase, tracking `0.12em`–`0.16em`, `text-xs`/`11px`, paired with real data
  (an index `01 / 08`, a coordinate `28.61°N`, a count `142`) — never decorative uppercase.

---

## 3. Space, grid, radius, shadow

- Content max-width **1280px**; page margin 64px desktop / 20px mobile.
- Section rhythm: generous vertical padding (`py-20`–`py-32`). Whitespace is the point.
- **Radius:** ≤ 2px on interactive elements; 0 on cards/frames. Sharp corners are intentional.
- **Shadow:** no soft blur. The one shadow is the hard offset "blueprint" lift on hover/focus:
  element shifts `-2px/-2px` while a `4px 4px 0` hard shadow appears (accent on primary CTA,
  ink on secondary). This is a signature — don't add a second shadow language.

---

## 4. Signature motifs

- **Numbered indexing** — `01`, `01 / 08` on nav, services, work. Only where order/count is real.
- **Coordinate throughline** — Delhi `28.6139° N / 77.2090° E`, `Est. 2019`, `142 projects` in
  the hero meta rail, mobile nav footer, and site footer. This is the identity detail (it
  replaced the old giant faded wordmark).
- **Full-bleed dark bands** (`.dark-section`) — near-black sections for cinematic rhythm + footer.
- **Marquee** (`.animate-marquee`) — seamless client/tech strip (duplicate content in markup,
  pauses on hover, disabled under reduced motion).

---

## 5. Motion

Two engines, one language. **GSAP + ScrollTrigger** for scroll-driven work (parallax, reveals,
horizontal scroll, marquee); **Framer Motion** for simple component mount/hover.

- Central GSAP entry: `lib/gsap.ts` (registers ScrollTrigger + `useGSAP`, exports
  `prefersReducedMotion`). ScrollTrigger is synced to **Lenis** smooth scroll in
  `components/layout/SmoothScroll.tsx` via the GSAP ticker — one clock, no jitter.
- **Progressive enhancement:** content is visible by default. GSAP sets the hidden start state
  and animates in; it never relies on CSS to pre-hide content. Every effect early-returns under
  `prefersReducedMotion()`, and `SmoothScroll` disables Lenis under reduced motion.
- Signatures so far: hero **masked line-reveal** (`.reveal-mask` / `.reveal-line`) on load, and a
  **scroll parallax** drift on the oversized hero index. Deferred (next phase): horizontal-scroll
  pinned work gallery, deep case-study parallax, number roll-up counters.
- Easings: `--ease-glide` (large moves) and `--ease-spring` (pops), mirrored in `lib/motion.ts`.

---

## 6. Core components (spec)

- **Button — primary:** `ink` bg, `ink-inverse` text, 2px radius, hard offset shadow in `accent`
  on hover/focus. **secondary:** transparent, 1px `ink` border, offset shadow in `ink`.
  **ghost:** no border, `ink` → `accent` on hover.
- **Eyebrow:** mono uppercase label with a short `accent` tick to its left + optional two-digit
  index (`components/ui/Eyebrow.tsx`).
- **Nav:** wordmark `Kawaki*` (asterisk in accent) left; numbered links (`01 Services`) with the
  index turning accent on hover; primary CTA right; hairline border; sticky, fades from
  transparent to `paper/80` + blur after 40px scroll.
- **Footer:** `.dark-section`; coordinate/meta signature block + big CTA line, 4-col sitemap,
  bottom meta line.
- Cards / tags / stat blocks / quotes / form fields: **restyled in the next phase** to these
  tokens; until then they inherit tokens via the `signal→accent` alias.

---

## 7. Accessibility floor (non-negotiable, every page)

- Contrast per §1 (AA). Visible `:focus-visible` on every interactive element: 2px `accent` ring.
- Full keyboard operability (nav, mobile-nav focus trap + Esc, forms, accordions).
- Semantic HTML first; exactly one `<h1>` per page; skip-to-content link.
- Real descriptive `alt` text — never a filename.
- Respect `prefers-reduced-motion`: no Lenis, no GSAP reveals/parallax, no marquee; content
  simply appears. Never disable focus rings.

---

## 8. Technical conventions

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind **v4** (CSS-first
  `@theme`, no `tailwind.config.ts`). ⚠️ This Next.js has breaking changes vs. older docs — check
  `node_modules/next/dist/docs/` before touching Next APIs (see `AGENTS.md`).
- **Fonts:** `next/font/google` (Archivo, IBM Plex Sans, IBM Plex Mono) as CSS vars on `<html>`.
- **Motion:** GSAP via `lib/gsap.ts`; Framer variants in `lib/motion.ts`; Lenis in `SmoothScroll`.
- **Content:** service/industry/case-study data as typed objects in `lib/data/*`; long-form as
  MDX in `content/*`. IA and routing are frozen — this redesign only changes the visual layer.
- **SEO:** `generateMetadata` per route; JSON-LD via `lib/seo.ts`.
