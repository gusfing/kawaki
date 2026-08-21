# Kawaki Studios — Design Reference

## Typography
The site uses three primary typefaces for different hierarchical elements to achieve an "Editorial Engineering" aesthetic.

1. **Satoshi** (`400, 500, 700, 900`)
   - **Role:** Body copy, standard text, `.about-text`.
   - **Feel:** Clean, modern, highly legible sans-serif.

2. **Barlow Condensed** (`100-900`, italics)
   - **Role:** Massive hero headlines (`.intro-content h1`), italicized emphasis (`em`), display text.
   - **Feel:** Tall, structured, impactful, editorial.

3. **Host Grotesk** (`300-800`)
   - **Role:** Secondary headers, sub-headlines, navigation links (`.navbar-center-text h2`, `.navbar-links a`).
   - **Feel:** Technical yet approachable, geometric.

*Fallback:* `"Helvetica Neue", Helvetica, Arial, sans-serif`

---

## Core Color Palette

### Base Theme
- **Background (Base 100):** `#f9f4eb` (Warm Off-White / Beige)
- **Foreground (Base 200):** `#141414` (Dark Ink / Near Black)
- **Brand Accent:** `#e85d45` (Vibrant Orange / Rust)
- **Cream / Section bg:** `#e6e2d6` (Used in About Section)
- **True Black:** `#000000` (Used for initial page bg)
- **Footer Black:** `#080808` (Deep, rich black)

### Thematic Sections (Scroll Reveal)
The site uses thematic color variables for different sections to match the artistic imagery:
- **Ink:** `bg: #12100e`, `fg: #fff4e8`
- **Porcelain:** `bg: #f3efe6`, `fg: #12141c`
- **Forest:** `bg: #e8d4c8`, `fg: #1a1412`
- **Ember:** `bg: #f2ebe2`, `fg: #16120f`
- **Steel:** `bg: #000000`, `fg: #f2f2f2`

---

## UI Components & Structural Patterns

### 1. Navigation & Hero (The "Awwwards" Card)
- **Structure:** Centralized nav bar that expands to 100vw on scroll.
- **Logo:** Absolute positioned at the bottom initially, pins to top on scroll.
- **Links:** Split into left and right clusters, `Host Grotesk`, `1.125rem`.

### 2. Typography Hierarchy
- **Hero Title:** Uppercase, `Barlow Condensed`, `clamp(3rem, 5vw, 7rem)`, weight 900, tight line-height (`0.8`).
- **Section Eyebrow (`.about-eyebrow`):** Brand Orange (`#e85d45`), small (`0.85rem`), uppercase, tracked out (`letter-spacing: 0.15em`), preceded by a 2.5rem line.
- **Section Heading (`.about-heading`):** Massive `clamp(4rem, 8.5vw, 8.5rem)`, weight 900, tight tracking (`-0.03em`), line-height `1.05`.
- **Serif Italic Accent (`.serif-italic`):** `Times New Roman`, italic, used to break up large typographic blocks.
- **Body Text (`.about-text`):** `1.4rem`, line-height `1.6`, dark grey (`#333`).

### 3. Buttons & CTAs
- **Pill Buttons (`.hero-btn`, `.about-btn`):**
  - Fully rounded (`border-radius: 50px`).
  - Solid Primary: Dark background (`#12100e`), white text. Hover: transparent bg, dark text.
  - Outlined Secondary: Transparent bg, dark border. Hover: Dark bg, white text.
- **Inline CTAs (`.footer-cta`):** Display block, `1.25rem`, weight 500, with an angled arrow `&nearr;`.

### 4. Backgrounds & Textures
- **Dotted Grid:** `linear-gradient` used to create a 4rem x 4rem subtle dot grid (`rgba(0,0,0,0.03)`).
- **Doodles:** Hand-drawn SVG doodles (`.doodle`), absolute positioned, some colored in Brand Orange.

### 5. Media & Cards
- **Media Cards (`.about-media-card`):** Aspect ratio `3/4`, border-radius `20px`, subtle drop shadow `0 20px 40px rgba(0, 0, 0, 0.08)`. Images are `object-fit: cover`.

### 6. Footer
- Dark background (`#080808`).
- Massive heading (`clamp(3rem, 7vw, 6rem)`).
- Multi-column grid for links, text muted (`rgba(255,255,255,0.6)`), turning white on hover.
