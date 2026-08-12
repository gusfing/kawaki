# Kawaki Studios — Redesign: "How we work" (Process) Sections

## Context

The user requested a redesign of the "How we work" (Process) section of the website. The current layout is functional but generic (simple grid and accordions). To match the "Editorial Engineering" guidelines (Swiss typography, coordinate Meta, GSAP-driven scroll choreography, monochrome + ignition accent), we will implement a motion-led interactive layout for both the homepage teaser and the full process page.

## Proposed Design

### 1. Homepage Process Teaser (`components/sections/ProcessTeaser.tsx`)
- **Structure:** Replace the circular step timeline with a **Swiss editorial card grid** (4 columns on desktop, 1 on mobile) separated by sharp hairlines (`border-line`).
- **Typography:** Giant index numbers (`01`, `02`, etc.) in Archivo display font, uppercase eyebrow labels, phase names, and a clean support sentence.
- **Interactivity:** A hover effect where the text shifts and the index number highlights in `--color-accent` (ignition orange).
- **Motion:** A ScrollTrigger entrance that staggers the card columns into view with a subtle y-offset and fade-in.

### 2. Full Process Page (`app/process/page.tsx`)
- **Structure:** Implement a **GSAP ScrollTrigger-pinned split layout** for desktop viewports:
  - **Left Rail (4 columns):** Pins the main section heading, DELHI coordinate rail, and a vertical index tracker of the four phases: `01 / DISCOVER`, `02 / DESIGN`, `03 / BUILD`, `04 / LAUNCH`.
  - **Right Column (8 columns):** A scrollable stack of generous phase details (each card occupying significant height).
- **Interactivity:** As the user scrolls and a phase card enters the viewport, the corresponding index on the left pins and turns into the **ignition accent color** (`--color-accent`), while the others fade to slate.
- **Graceful Degradation:** On mobile, the layout stacks naturally with clean hairline dividers and top indexing. Lenis smooth scroll ensures jitter-free ScrollTrigger tracking.

## Critical Files to Modify
- `components/sections/ProcessTeaser.tsx` — Rebuild the teaser layout and hover states.
- `app/process/page.tsx` — Rebuild page with GSAP scroll pinning and active phase highlights.

## Verification Plan
1. Start dev server and verify visual styling on desktop/mobile viewports.
2. Verify GSAP scroll pinning triggers smoothly without layout jumps.
3. Test keyboard navigability of the scrollable sections and link anchors.
4. Verify `prefers-reduced-motion` support (pins lock static, cards load cleanly).
5. Compile production build (`npm run build`) to ensure zero errors.
