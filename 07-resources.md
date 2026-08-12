# Prompt 07 — Resources: blog, guides, faqs

Read `design.md`. These pages exist to rank for informational queries and feed internal links back
to service pages (per your sitemap) — every post/guide should link to at least one relevant
service or industry page in-body, not just in a generic footer.

## Blog (`app/blog/`)

Content model: `.mdx` in `content/blog/` with frontmatter `title, excerpt, date, author, topic
(tag), relatedServices (array of slugs)`.

- `app/blog/page.tsx` — H1 "Notes on building things well." Paginated grid/list of posts (date,
  title, excerpt, `Tag` for topic). Filter by topic tag, client-side.
- `app/blog/[slug]/page.tsx` — MDX render, `Article` JSON-LD, author + date + reading time in a
  mono meta line under the H1 (per `design.md` §2 mono-label conventions), a "Related services"
  block at the end linking to `relatedServices`, and a `CTASection` ("Need help with this?" →
  `/contact/`).
- Create 3 example posts with realistic (not lorem-ipsum) placeholder titles/excerpts relevant to
  a dev agency's actual expertise — e.g. a post on choosing between Shopify and a custom build, a
  post on Core Web Vitals, a post on when to rebuild vs. redesign — marked `[PLACEHOLDER — draft]`
  in the body.

## Guides (`app/guides/`)

Same structure as blog but for longer-form, more evergreen content — `content/guides/` MDX with
frontmatter `title, excerpt, updatedDate, relatedServices`. Distinguish visually from blog only by
an eyebrow label ("Guide" vs. the post's topic tag) — don't rebuild a whole second page template
for a difference this small.

- `app/guides/page.tsx` — H1 "Guides." Grid of guide `Card`s.
- `app/guides/[slug]/page.tsx` — same shape as a blog post page, swap the eyebrow.
- One example guide: a longer, structured piece (e.g. "How to choose a web development partner")
  with real subheadings, marked `[PLACEHOLDER — draft]`.

## FAQs (`app/faqs/`)

H1: "Questions we get asked a lot."
Group into 3–4 categories using `Eyebrow` (e.g. "Working with us," "Pricing & process,"
"Technical") and render each group's questions in an `Accordion` (reuse from prompt 01 — don't
build a second accordion component).

Pull in the FAQ content already written per-service in prompt 04 (§FAQs for each of the 8
services) rather than inventing a fresh set from scratch — dedupe overlapping ones, and add a
handful of company-level questions (pricing model, typical timelines, how you scope a project) that
don't belong on any single service page.

Add `FAQPage` JSON-LD via `lib/seo.ts` (new helper if one doesn't exist) — this page is a strong
candidate for rich results.

## Acceptance check
Every blog post and guide links to at least one real internal page (service or industry) in its
body content, not only via the "related services" block, and the FAQ page's JSON-LD validates
against Google's Rich Results Test structure (question/answer pairs match the visible accordion
content exactly — don't let structured data drift from what's on-page).
