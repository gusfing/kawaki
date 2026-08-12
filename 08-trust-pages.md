# Prompt 08 — Trust pages: about, process, contact

Read `design.md`. Note: per `PROJECT-STRUCTURE.md`, team and testimonials live as sections on
`/about/` rather than as their own routes — build them that way here.

## About (`app/about/page.tsx`)

1. **Hero** — H1: "The team behind the work." Short subhead on the agency's founding premise —
   write one real, specific paragraph (why this agency exists, what it does differently) rather
   than a generic "we're passionate about digital excellence" paragraph; if you don't have real
   founding detail, mark the paragraph `[PLACEHOLDER — replace with real founding story]` instead
   of inventing one.
2. **How we work** — 3–4 short principles (not the full process — that's `/process/`), each with
   a one-line explanation. These should be specific enough that a competitor's about page couldn't
   use the same three lines unchanged.
3. **Team section** — grid of team member cards: photo (plain, consistent crop per `design.md`
   §7), name, role, one-line bio. Use `[PLACEHOLDER]` entries (3–4) with realistic role titles
   matching the 8 services (e.g. a frontend lead, a backend engineer, a project lead) so the grid
   layout is real even before real headshots/bios exist.
4. **Testimonials section** — reuse the `Testimonials` component from prompt 02, different
   quotes than the home page pull (or the same, your call — note which).
5. **CTA band** — "Want to work with us?" → `/contact/`.

## Process (`app/process/page.tsx`)

This is the full version of the home page's process teaser — a genuinely ordered sequence, so
numbering is legitimate here (see `design.md` §"structure is information").

H1: "How a project actually goes."
4 stages, each as a full section (not a compressed card): **Discover** (scoping, technical
audit if needed), **Design** (what "custom design" concretely means at this agency), **Build**
(how frontend/backend work is split and communicated), **Launch & support** (handoff, and the link
to `maintenance-support`). For each stage: what happens, roughly how long it takes
(`[PLACEHOLDER — real range]`), and what the client is responsible for during it (be honest and
specific — this builds more trust than vague reassurance).

End with a `CTASection`: "Ready to start the first step?" → `/contact/`.

## Contact (`app/contact/page.tsx`)

H1: "Start a project."
Short subhead: one sentence on what happens after they submit (e.g. "We'll reply within
`[PLACEHOLDER]` business days with next steps.").

Form (`FormField` components from prompt 01): name, email, company (optional), which service
they're interested in (select, populated from `lib/data/services.ts` — real interlink, not a
generic dropdown), project budget range (optional select, `[PLACEHOLDER]` bands), message
(textarea). Submit via a server action (`app/contact/actions.ts`) — validate on both client and
server, show a clear success state (not just an alert), and a clear error state naming what went
wrong per `design.md` §8 ("errors don't apologize, and they are never vague").

Sidebar or secondary column: direct email, and social/company links, plus a short reassurance line
("No sales call required to get a straight answer" — or whatever's true for this agency).

Wire the email send via Resend (or note the provider you're using) in the server action — mark API
key setup clearly as an environment variable the user needs to add, don't hardcode a placeholder
key anywhere.

## Acceptance check
The contact form is fully keyboard-operable, shows validation errors inline per field (not just a
top-of-form banner), and the success state is announced to screen readers (e.g. via an
`aria-live` region) — not just a visual change.
