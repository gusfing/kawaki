# Kawaki Studios: homepage design system

Replaces the earlier "Obsidian Monolith" spec (obsidian + lime), which the owner rejected.
Scope so far: the homepage (`public/index.html`, `public/assets/css/home.css`, `public/assets/js/home.js`).
Other pages still use `global.css` until they are migrated one at a time.

## Phase 0: Brief

- **Subject:** Kawaki Studios LLP, a New Delhi engineering studio led by Kunal Sharma. Builds custom
  websites, web apps, Shopify stores, mobile apps, AI automations; also cleans hacked WordPress sites.
- **Audience:** founders and small product teams in India and abroad, choosing who builds their site or app.
- **Job:** get a project brief (WhatsApp, email, or a 15 minute call).
- **Constraints:** static HTML on Vercel; shared nav menu (`main.js`), chat widget (`chatbot.js`);
  copy limited to `data/kawaki-facts.json` (the build audit fails on its disallowed claims);
  palette fixed by the owner: Indigo #23003F, Red #F94500, Light yellow #FFFDB4, Light purple #BCACCE.
  No white.
- **Assumptions:** project years (2026) and pricing come from the previous homepage. Per-project
  metrics from the old page (LCP 0.6 s, "4.2x checkout", "12,000+ records", "99.98% uptime") are not in
  the facts file, so they are left out until verified.

## Phase 1: Concept

| | A. The critical path (material) | B. UTC+05:30 (place) | C. Spec sheet (formal) |
|---|---|---|---|
| Idea | The page is a performance trace: only what is on the critical path survives, and the homepage measures its own load in front of you | India's half-hour time zone: the site shows studio time against yours and plans the handoff across it | Every project as a printed spec sheet, numbers set like a timing board |
| Anchor | The studio's stated philosophy: no bloated dependencies, brittle themes or black-box builders | Studio in New Delhi serving London, New York, Tokyo clients | Case studies with measurable builds |
| Signature | Hero axis drawn from the visitor's real load events, replayed in real time | Dual clock that maps a reply window | Numbers flip into place |
| O / F / Fe / P | 4 / 5 / 4 / 2 | 4 / 3 / 4 / 2 | 3 / 3 / 5 / 3 |

Picked **A**: it is the studio's actual philosophy, it needs no unverified claim, and it gives a rule
for every section. Revised November 2026: the on-page timing readouts (hero trace, per-image load
captions, footer request receipt) were cut at the owner's request as gimmicks. The proof is now the
work itself, shown live and at its real size. Stolen from B for the finale:
live studio time in New Delhi, UTC+05:30, next to the studio hours.

```
Idea:        Kawaki builds only what is on the critical path, and shows it with live sites rather than claims.
Metaphor:    A browser performance trace: one red line through what blocks a page, everything else muted.
Signature:   The hero scene. A lilac panel that opens from the margins to full width, holding our live work at
             native resolution: a browser window playing the reel (its address chip follows the site on screen),
             a second window with a web app, a phone with a mobile site, and the red asterisk and indigo spark
             badges. Each layer drifts at its own depth while the scene passes.
Emotion:     Calm proof. "They didn't tell me it was quick, they showed me."
Motion verb: Trace. Things enter and answer by drawing left to right along a line, quick and exact.
Screenshot:  Two lines of heavy condensed yellow type on indigo above a lilac panel of real, crisp client sites.
```

## Phase 2: System

### Palette (roles)
| Role | Hex | Use |
|---|---|---|
| ground | #23003F indigo | page |
| ink | #FFFDB4 light yellow | text, logo (17.5:1 on ground) |
| muted | #BCACCE light purple | secondary text, struck items (8.7:1) |
| line | #BCACCE at 24% | hairlines |
| accent / path | #F94500 red | the critical path only: primary buttons, focus ring, struck words, progress (5.1:1 on ground) |
| curtain / finale | #F94500 field with indigo ink (5.1:1) | contact finale, menu wipe |

Red never decorates. If something is red, it is on the path a visitor should take or it is a measurement.

### Type
- **Bricolage Grotesque**, self-hosted, subset to the page's characters and split in two variable cuts:
  display (opsz 96, wght 640 to 800, wdth 75 to 92, 39 KB) and text (opsz 18, wght 400 to 639, wdth 88 to 100, 39 KB).
  Display at wght 800, wdth 75, tracking -0.035em, leading 0.86. Headings wght 700, wdth 85. Text wght 400, wdth 100.
  Chosen because its heavy condensed cut carries the logo's chunky geometry into type.
- **Geist Mono** 400 to 500 only for measurements: milliseconds, dates, read times, step numbers, time zone.
- Scale: mega clamp(3.1rem, 0.6rem + 9.6vw, 10.5rem); xl clamp(2.4rem, 1.2rem + 4.6vw, 6rem);
  l clamp(1.6rem, 1.1rem + 1.9vw, 2.9rem); m clamp(1.2rem, 1.05rem + 0.6vw, 1.55rem); body 16 to 18 px; small 14 px.

### Grid and rhythm
12 columns, gutter clamp(16px, 2.2vw, 32px), outer margin = gutter. Text hangs from column 1 and column 7.
Spacing moods: tight (process rows), normal, airy (statement), full viewport (hero).

### Shape and motion
- Radius: square everything; only buttons are full capsules (a marker on a timeline).
- Eases: power3.out for feedback (0.35 to 0.5 s), expo.out for reveals (0.9 to 1.2 s). Scene parallax is scrubbed and linear.
- Trace treatments: buttons and contact rows flood left to right and exit to the right (scaleX with origin swap);
  list rows draw a red line under themselves and the arrow travels; headings reveal with a clip from the left;
  the process line scrubs through six nodes.
- Idle: the reel plays in its window, the asterisk badge turns slowly and the ticker drifts. All stop off screen and under reduced motion.
- No loader. A studio selling fast pages should not make you wait.
- Showreel: loads after the load event on desktop and on first scroll or tap on phones (or after 7 s), so it is never
  the largest paint. The side screenshots also wait for the load event. Reduced motion gets a Play button instead.

### Composition plan
```
HERO (after the owner's uwwa reference)
                      Custom websites                     KAWAKI STUDIOS DESIGNS AND BUILDS ... (mono caps)
                      ↝ and web apps (✳ red badge, slow spin)   [Start a project] See the work ↘
                      strip: CUSTOM WEBSITES ✳ ~~PAGE BUILDERS~~ ───→ WEB APPLICATIONS ... (struck = left out)
                      lilac scene: reel window + web-app window + phone, asterisk and spark badges;
                      opens from the margins to full width on scroll; caption "Live sites we built"

MANIFESTO (2nd)       ✳ Only ↝ what's on ✦ the critical path:   one giant line, held while it slides
                      sideways; each word lights as it reaches the reading point ("critical path" in red)

TICKER (strip)        ~~page builders~~ semantic HTML ~~brittle themes~~ Next.js ...   [pause]

STATEMENT (statement) Only what's on the critical path.        (xl, cols 1-10)
                      paragraph at t-l, cols 1-9               founder note, cols 9-12

WORK (asymmetric)     [image 1-8        ] title/text 9-12
                      title/text 1-4  [image 5-12       ]   x2

MORE (index list)     Name ............ category ........ ↗   (cursor preview on desktop, thumbs on phone)

SERVICES (sticky)     sticky title 1-4 | list of nine services 6-12

PROCESS (data/path)   ●─────●─────●─────●─────●─────●   six verified stages, red line scrubs through

JOURNAL (pair)        featured post with image 1-7 | two text entries 8-12

FAQ (split)           sticky heading + direct links 1-4 | accordion 6-12

FINALE (field, red)   Tell us what you're building.   WhatsApp / Email / Call rows; hours + live IST time

FOOTER (finale)       links | contact | social ; giant wordmark ; legal
```

### Genericness test (what changed)
- Generic answer: dark hero over a video, glass cards, lime glow cursor, eyebrow on every heading. Removed all of it.
- Mono only where the content is a measurement, not as label decoration.
- Proof is the live work itself, never unverified percentages or on-page performance telemetry.
- The ticker says what the studio leaves out (struck through) next to what it builds with.

## Accessibility and states
- Skip link first; menu button is a real button with aria-expanded; focus moves into the menu and is trapped; Escape closes.
- Focus ring: 2px red on indigo, 2px indigo on the red finale.
- Reduced motion: no smooth scroll, no parallax, reel waits for Play, badges still, ticker static, process line full.
- FAQ answers are visible without JavaScript; JS collapses all but the first.

## Inner pages and shared system (November 2026)

Every page now uses the homepage system: one stylesheet (`public/assets/css/site.css`), one script (`public/assets/js/site.js`), and one shell (header, menu, red closing section, footer) from `scripts/lib/shell.js`. The working rules for anyone editing, human or agent, are in `AGENTS.md`; this section records the design decisions behind them.

- **Page hero** (`.phero`): mono breadcrumb, heavy condensed title with the red asterisk badge, mono-caps lede on the right, then the struck/kept keyword strip. The strip says what a page's work includes and what it leaves out.
- **Sections** open with `.sec-head`: a large condensed heading left, a short muted aside right. Content below uses one of a few patterns: two columns of dash lists (`.duo`), numbered cards on hairlines (`.cards`), the six- or five-stage red path (`.steps`), the spec sheet (`.spec`: mono label, the choice, the reason), browser-framed live work (`.cases`), rows that draw a red line on hover (`.rows`), and the FAQ.
- **Articles** (`.art`, `.prose`): a sticky contents list on the left, text column of about 74 characters, red dash bullets, mono captions. Covers are typographic, rendered from `templates/blog-cover/cover.html`; in-article diagrams use the indigo, red and lilac palette.
- **Proof**: live sites in browser frames, real project photography, client quotes only when the client approved the words (`data/reviews.json`). No telemetry gimmicks, no invented numbers.
- **Copy**: plain, specific and checked by `scripts/check-writing.js` on every build. No em dashes.
