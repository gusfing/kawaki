# Prompt 00 — Project setup

Read `design.md` and `PROJECT-STRUCTURE.md` in this repo before doing anything else. They are the
source of truth for every visual and structural decision below.

## Task

Scaffold a new Next.js project for a web development agency's marketing site.

1. Initialize Next.js 15 (App Router, TypeScript, ESLint) with Tailwind CSS.
2. Set up the file tree exactly as laid out in `PROJECT-STRUCTURE.md` — create every route folder
   listed with a placeholder `page.tsx` that renders just an `<h1>` with the route name for now.
   We'll fill each one in with later prompts.
3. Configure `next/font/google` for the three fonts in `design.md` §2 (Space Grotesk, IBM Plex
   Sans, IBM Plex Mono), exposed as CSS variables `--font-display`, `--font-body`, `--font-mono` on
   the `<html>` element in `app/layout.tsx`.
4. In `app/globals.css`, define every CSS custom property from `design.md` §1 (color) and §3
   (space) under `:root`.
5. In `tailwind.config.ts`, extend the theme so `--color-*` tokens are usable as Tailwind color
   classes (e.g. `bg-paper`, `text-ink`, `border-line`, `text-signal`), extend `fontFamily` to
   reference the font CSS variables, and extend `spacing` with the `--space-*` scale. Set default
   border radius per `design.md` §3 (2px, with 0 available as an explicit option).
6. Install and configure Framer Motion. Create `lib/motion.ts` with two exported variants:
   `fadeUp` (opacity 0→1, y 16→0, 500ms ease-out — for scroll reveals) and `staggerChildren`
   (60ms stagger) — matching `design.md` §6 exactly. Every later prompt will import from this file
   instead of writing its own motion values.
7. Create `lib/seo.ts` with a `buildMetadata()` helper that takes `{ title, description, path }`
   and returns a Next.js `Metadata` object with sensible OG/Twitter defaults, and a
   `organizationJsonLd()` helper returning the JSON-LD `Organization` schema block (leave company
   name, logo URL, and social links as clearly marked placeholders).
8. Set up `content/blog/`, `content/guides/`, `content/case-studies/` as empty folders with one
   example `.mdx` file each (clearly marked as an example, safe to delete), and wire up MDX
   rendering (`next-mdx-remote` or Contentlayer — pick whichever has better Next.js 15 App Router
   support at the time of building, and note which you picked).
9. Create `app/sitemap.ts` and `app/robots.ts` as Next.js metadata routes covering every static
   route from `PROJECT-STRUCTURE.md`.
10. Do not build the Header, Footer, or CornerFrame component yet — that's prompt 01. The root
    layout can render `{children}` with no chrome for now.

## Acceptance check

Run the dev server and confirm: every route in `PROJECT-STRUCTURE.md` resolves without a 404, the
three fonts are loading (check computed styles, not just no console errors), and the Tailwind
color/spacing utilities from `design.md` are usable in a scratch test page.
