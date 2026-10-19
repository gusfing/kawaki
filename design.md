# Kawaki Studios — Awwwards Design System & Architecture (DESIGN.md)

Award-caliber Creative Direction and Creative Engineering Specification for Kawaki Studios ([kawaki.co.in](https://kawaki.co.in/)).

---

## Phase 0: Brief
- **Subject**: Kawaki Studios — New Delhi-based bespoke digital product and engineering studio.
- **Audience**: Venture-backed founders, luxury brands, international agency partners, enterprise CTOs.
- **The Site's Job**: Prove technical mastery and editorial design superiority in the first 3 seconds, converting high-value bespoke project inquiries.
- **Constraints**: 100% static HTML/JS edge performance, sub-500ms initial load, zero cumulative layout shift (CLS < 0.05), fully accessible (WCAG AA).

---

## Phase 1: Concept Selection

### Evaluated Concepts:
1. **Concept A: The Digital Foundry (Silicon & Lithography)**
   - *Territory*: Semiconductor physics and laser etching.
   - *Originality*: 4/5 | *Fit*: 3.5/5 | *Feasibility*: 4/5 | *Portability*: 3/5
2. **Concept B: The Obsidian Monolith (Editorial Engineering in Motion)** — **[SELECTED]**
   - *Territory*: High-fashion editorial typography meets deep-space aerospace instrumentation.
   - *Originality*: 4.5/5 | *Fit*: 5/5 | *Feasibility*: 5/5 | *Portability*: 1.5/5 (Bespoke to Kawaki's identity).
3. **Concept C: The Terminal Telemetry (Live Computational Grid)**
   - *Territory*: Deterministic edge computation, real-time latency monitors, ASCII telemetry.
   - *Originality*: 4/5 | *Fit*: 4/5 | *Feasibility*: 4.5/5 | *Portability*: 3/5

### Concept Card:
```
Idea:        Editorial Engineering — High-contrast architectural typography grounded in obsidian glass and electrified with lime telemetry.
Metaphor:    A luxury design publication printed on illuminated dark obsidian crystal.
Signature:   Floating Obsidian Island Nav with Electric Lime Radar Pulse + Kinetic Discovery Scope Drawer.
Emotion:     Authoritative, precise, immaculate, unapologetically high-end.
Motion verb: "Settle like heavy obsidian, snap like a shutter, breathe like radar."
Screenshot:  The Hero: Massive Barlow Condensed typography counterbalanced by razor-sharp Instrument Serif italics and the pulsing lime coordinate badge.
```

---

## Phase 2: Art Direction System

### 1. Palette
- **Ground (Deep Obsidian)**: `#08080C` / `#0C0D10`
- **Surface (Glass Cards)**: `#14161B` with `rgba(255, 255, 255, 0.08)` borders and 20px blur
- **Accent (Electric Lime)**: `#C6FF00` (Signal markers, live status dots, hover states)
- **Ink Primary**: `#FFFFFF` (High contrast headers)
- **Ink Secondary**: `#E2E8F0` (Body text)
- **Ink Muted**: `#94A3B8` (Telemetry, metadata, timestamps)
- **Line / Border**: `rgba(255, 255, 255, 0.09)`

### 2. Typographic Hierarchy
| Role | Family | Weights | Fluid Scale |
|---|---|---|---|
| **Display Headings** | `Barlow Condensed` | 700, 800, 900 | `clamp(3.2rem, 9vw, 8.5rem)` with letter-spacing `-0.02em` |
| **Editorial Emphasis** | `Instrument Serif` | 400 Italic | `clamp(1.4rem, 2.5vw, 2.6rem)` with font-style italic |
| **Interface & Subheaders**| `Host Grotesk` / `Plus Jakarta Sans` | 500, 600, 700 | `clamp(1.1rem, 1.8vw, 1.6rem)` |
| **Body Text** | `Plus Jakarta Sans` | 400, 500 | `clamp(0.95rem, 0.3vw + 0.85rem, 1.125rem)` |
| **Telemetry & Meta** | `JetBrains Mono` / Monospace | 400, 500 | `0.75rem - 0.85rem` uppercase with `0.1em` tracking |

### 3. Grid & Section Rhythm
- **Columns**: 12-column dynamic CSS grid with fluid gaps (`clamp(1rem, 2vw, 2.5rem)`).
- **Radius Rule**: Discrete hierarchy:
  - Micro (buttons, chips): `100px` (Pills).
  - Cards (case studies, services): `20px` to `24px`.
  - Drawers / Chat: `28px` top radius on mobile, `24px` on desktop.
- **Rhythm**: Varied section heights alternating between full-bleed typographic statements and structured asymmetric 2-column editorial splits.

---

## Phase 3: Motion Choreography & Kinetic Rules
1. **Continuous Transitions**: Zero abrupt layout jumps. Preloader gracefully fades out within 480ms with safety auto-dismiss.
2. **Magnetic Micro-Interactions**: Interactive buttons and pills react to pointer proximity with subtle spring dampening.
3. **Radar Pulse**: Live signal dots pulse with a concentric dual-ring radar keyframe at 2.4s intervals.
4. **Reduced Motion**: All kinetic loops and video backgrounds respect `prefers-reduced-motion: reduce`.
