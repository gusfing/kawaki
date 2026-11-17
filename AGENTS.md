# Kawaki Studios website: rules for every agent

Read this before changing anything. It applies to Antigravity, Claude, Codex and any other agent working in this folder. These rules override your defaults. If a request conflicts with them, say so and ask before going ahead.

This is a static HTML site deployed on Vercel (`outputDirectory: public`). It is **not** a Next.js or React app. Pages are built by Node scripts from templates and data files, then committed.

## 1. Look: colours, fonts, components

**Colours.** Use only these, through the CSS variables in `public/assets/css/site.css`:

| Token | Hex | Use |
|---|---|---|
| `--indigo` | `#23003F` | page background (every page is dark indigo) |
| `--yellow` (`--ink`) | `#FFFDB4` | main text, headings |
| `--lilac` (`--muted`) | `#BCACCE` | secondary text, panels, lines |
| `--red` | `#F94500` | the one accent: buttons, badges, focus rings, struck-through words |
| `--raised` `#2E0B4F`, `--deep` `#18002C` | | cards and wells |

Never: white or light page backgrounds, black, greys, lime or neon green, cyan, blue gradients, glassmorphism, drop-shadow "card" stacks, emoji as decoration.

**Fonts.** Self-hosted, already loaded by the site stylesheet. Never add Google Fonts, Inter, Poppins, Plus Jakarta Sans, Space Grotesk or any other family.
- Headings: `'Bricolage'` heavy and condensed (weight 680 to 800, `font-stretch` 78% to 92%), tight letter-spacing.
- Body: `'Bricolage'` weight 400 to 600.
- Labels, meta lines, captions: `'Geist Mono'`, uppercase, letter-spacing about 0.07em.

**Components.** Reuse what exists in `site.css`; do not invent parallel styles or write inline colours:
page hero `.phero` (with `.crumbs`, `.phero__title`, `.phero__lede`), keyword strip `.ticker--strip` (kept words, struck words in red), section head `.sec-head` + `.h2`, lists `.duo` / `.dash`, numbered `.cards`, process `.steps`, spec sheet `.spec`, rows `.rows` / `.row.svc`, browser-framed work `.cases` / `.case`, FAQ `.faq`, articles `.art` + `.prose`, blog cards `.bcards`, reviews slider `.slider`, closing red section `.finale`. The asterisk and spark glyph badges are the brand's ornaments; use them, not stock icons.

**Motion** is GSAP + Lenis in `public/assets/js/site.js`. Every block there runs only when its markup exists. Respect `prefers-reduced-motion`.

## 2. How pages are built (edit the source, not the output)

| Pages | Source | Build command |
|---|---|---|
| Homepage | `templates/home/home-body.html`, `head.html` | `python -I templates/home/assemble.py` |
| About, Contact, Pricing, Services hub, Solutions hub, legal, 404, custom-web-development | `templates/pages/**.html` | `node scripts/build-inner.js` |
| 14 main service pages `/services/*` | `data/services.json` | `node scripts/build-services.js` |
| Case studies and index | `data/case-studies.json` | `node scripts/build-case-studies.js` |
| SEO service, city, solution pages | `data/seo-pages.json` + `scripts/lib/service-copy.js`, `city-copy.js`, `solution-copy.js` | `node scripts/build-seo-pages.js` (runs on deploy) |
| Blog | `data.db` (blogs table) + `content/*.md` | `node scripts/build-blog.js` (runs on deploy) |
| Directory | generated | `node scripts/build-directory.js` |

The shared head, header, menu, closing section and footer come from `scripts/lib/shell.js` (cut from the homepage template). Edit them there or in `templates/home/home-body.html`, never page by page.

`public/assets/css/site.css` and `site.js` are the design system. `src-assets/` holds chatbot and popup sources; `npm run build` minifies them into `public/assets/`. Assets are cached for a year, so links carry `?v=<hash>`; `node scripts/stamp-assets.js` refreshes every page.

**Before you finish any change:** run `npm run build`. It must end with both audits passing and `check-writing` clean. Then look at the changed pages in a browser at desktop and phone width.

## 3. Writing: no AI text

Write like a careful person from the studio talking to a founder: short, specific, plain. Every page and post must pass `node scripts/check-writing.js` (rules in `data/writing-rules.json`).

- **Banned words and phrases** (full list in `data/writing-rules.json`): bespoke, seamless, leverage, elevate, unlock, unleash, empower, supercharge, revolutionise, synergy, delve, tapestry, world-class, best-in-class, state-of-the-art, cutting-edge, next-level, game-changing, ever-evolving, "in today's fast-paced/digital world", "navigate the complexities", high-velocity, high-conversion, mission-critical, digital flagship, sub-second, enterprise-grade, award-winning, 24/7, guaranteed rankings/results.
- **No em dashes or en dashes.** Use commas, colons, full stops, or "to" for ranges ("4 to 8 weeks").
- **Facts only from `data/kawaki-facts.json`.** Never claim anything in its `disallowedClaims` (no offices or teams outside New Delhi, no named tools the studio does not use, no invented client counts or metrics).
- **Prices:** most custom builds ₹1,50,000 to ₹5,00,000, or $2,500 to $10,000 abroad; web apps at the top of that or above; billed by milestone. Typical marketing site: 4 to 8 weeks. Do not state other prices or timelines.
- **Never invent** people, names, reviews, testimonials, quotes, statistics, client logos or case-study results. Reviews live in `data/reviews.json` and are added only when the client has approved the exact words.
- No filler sections, no keyword stuffing, no "As an AI" anything, no listicles padded to length. Headings in sentence case.

## 4. Blog posts

1. Pick the title from `data/blog-plan.json` (section 4b). Write the post as `content/<slug>.md` with frontmatter (`title`, `slug`, `primaryKeyword`, `excerpt`, `seoDescription`, `tags`, `featuredImage`, `status`). At least 1,500 words, three or more `##` sections, two or more internal links to real pages, an FAQ section.
2. Check it: `node scripts/check-writing.js --file content/<slug>.md`.
3. The daily bot (`.github/workflows/daily-blog-automation.yml`) only publishes drafts that already exist in `content/` and pass its quality gate. It never writes text itself.

## 4b. Keywords: use the research, do not guess

The keyword research (Semrush, India and US, Nov 2026) is saved in two committed files. Read them before you write or retitle anything:

- `data/keyword-map.json`: the primary keyword for each page, its volume and difficulty, and the city and service patterns. One primary keyword per page.
- `data/blog-plan.json`: the blog titles to write, in priority order, each with its keyword and the page it links to.

Rules:
- **Titles and headings:** a page's primary keyword goes in its title and H1, once, in plain words. Secondary keywords go in subheadings and FAQ questions only where they read naturally. Never stuff, never repeat a keyword to hit a count.
- **Blog posts:** write the next title from `blog-plan.json` unless the owner names another. Put the primary keyword in the title, the first paragraph and one `##` heading; add `primaryKeyword:` to the frontmatter; link to the page in `linkTo`; answer real questions in the FAQ. Titles under 60 characters. When a post is published, move its entry to `done`.
- **New pages:** only create a page if `keyword-map.json` or the owner says so, and add it to the map with a primary keyword no other page uses. City pages say the work runs remotely from New Delhi unless the city is in Delhi NCR.
- **Do not invent targets or volumes.** If you need a number that is not in these files, say it is unmeasured. The owner re-runs the research each quarter.
- **Still bound by section 3:** facts only from `data/kawaki-facts.json`, no banned phrases, no invented prices. A keyword never justifies a claim.

## 5. Blog images: never AI slop

**Do not generate cover images with AI image models.** Make every blog cover with the cover template, which uses the site's fonts and colours:

```
node scripts/make-blog-cover.js --slug <slug> --title "<short title>" --topic "<topic>" --words "Kept|cut:Struck|Kept"
```

It writes `public/assets/images/blog/<slug>-cover.jpg` (1376x768) plus `-cover.webp` and `-cover-720.webp`. Set `featuredImage: "/assets/images/blog/<slug>-cover.jpg"`. (Needs Playwright with Chromium and ffmpeg; set `PLAYWRIGHT_DIR` if Playwright is installed elsewhere.)

Diagrams inside a post: build them as HTML or SVG in the site palette (indigo background, yellow text, red and lilac accents, Bricolage and Geist Mono), then export to WebP. Real photographs (client work, screenshots of live sites) are welcome when they are genuine.

Never: 3D renders, robots or mascots, glossy laptops and floating UI, glass cubes, neon or lime, stock "futuristic" scenes, gibberish text in images, Unsplash or other hotlinked stock photos.

## 6. Things that need the owner

Ask before: deleting or redirecting pages, changing prices or legal pages, publishing reviews, committing or deploying.

## 7. Using the owner's Chrome

To read Search Console, Bing Webmaster Tools or any signed-in site, use the Kawaki Chrome Bridge (`tools/chrome-extension/README.md`). Start it with `npm run bridge:chrome` and drive it with `node tools/chrome-bridge/cli.js` (or `tools/chrome-bridge/client.js` from Node). Every request needs the token in `tools/chrome-bridge/.token`. Never commit that file or print the token.

- Read with `snap --i`, `find`, `table`, `text` and `links`. They cost far fewer tokens than screenshots or page HTML. Take a screenshot only when layout matters.
- Search Console, Bing and Google Business Profile are read-only unless the owner asks for a specific change in chat: no submitting, removing, requesting indexing or changing settings on your own.
- Never type passwords, card numbers or one-time codes. If a site asks you to sign in, stop and ask the owner to do it.
