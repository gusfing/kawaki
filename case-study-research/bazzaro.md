# Case Study Research Dossier: BAZZARO

**Project Slug:** `bazzaro`  
**Target Route:** `/case-studies/bazzaro`  
**Client / Brand:** BAZZARO  
**Public Website:** `https://www.bazzaro.in/`  
**Industry:** D2C E-Commerce / Fashion & Lifestyle Accessories  
**Primary Discipline:** Custom E-Commerce & Next.js Storefront Engineering  

---

## 1. Project Summary & Background
BAZZARO is an independent direct-to-consumer lifestyle brand focused on functional, sustainable everyday accessories ("Art You Carry"). Built with a transparent single-tier pricing model (100% heavyweight cotton canvas art-print totes at ₹600 flat with pan-India delivery), the brand requires a high-converting digital storefront combining editorial art direction with frictionless checkout flows.

Kawaki Studios architected and engineered the custom Next.js e-commerce platform for BAZZARO, featuring a slide-out cart drawer, persistent client wishlist state, multi-collection filtering, and sub-second page transitions.

---

## 2. Public Sources & Reference Links
* **Official Website:** `https://www.bazzaro.in/`
* **Official Support Email:** `hello@bazzaro.com`
* **Verified Brand Statement:** "100% heavyweight cotton canvas art-print totes. Cut, stitched, and screen-printed in small batches for effortless everyday utility."

---

## 3. Verified Business & Product Facts (Official Domain Evidence)
* **Product Catalog:** Heavyweight 100% cotton canvas tote bags with archival pigment printing and fade-resistant screenprints.
* **Collection Taxonomy:**
  * *Canvas Totes* (Core everyday essentials)
  * *Botanical & Floral* (Vintage flora and plant motifs)
  * *Anime & Manga* (Illustrated pop-culture and graphic series)
  * *Graphic & Art* (Abstract, typography, and contemporary street art prints)
* **Commercial Model:** Flat pricing (₹600), pan-India dispatch, complimentary delivery on orders over ₹2,999, and newsletter incentive (15% off first order).
* **Key Storefront Features on Live Domain:**
  * Persistent announcement bar with free shipping incentives
  * Slide-out slide-over cart drawer with real-time item count and cart empty states
  * Integrated dual-tab Wishlist & Cart drawer (`drawer-tab-cart` / `drawer-tab-wishlist`)
  * Full-screen responsive slide-out mobile drawer menu with high-contrast typography
  * Product quick-view and hover state interactions (`aspect-[3/4]` responsive card grids)
  * Newsletter subscription lead generation form with validation

---

## 4. Kawaki-Confirmed Technical Facts & Role
* **Role:** Full-Lifecycle E-Commerce Design & Technical Engineering.
* **Technology Stack (DOM & Asset Verified):**
  * `Next.js App Router` with Turbopack bundler architecture
  * `React` with client-side reactive state (Cart drawer, Wishlist toggle)
  * `Tailwind CSS` with custom luxury editorial styling tokens (`bg-cream`, `text-ink`, `text-red`)
  * `Lucide React` iconography
  * `View Transitions API` (`view-transition-name: product-*`) for app-like page morphs
  * `Next.js Image Optimization` (`/_next/image`) with multi-resolution WebP delivery
  * `Schema.org Structured Data` (`Organization`, `WebSite` with `SearchAction` search box)

---

## 5. Unknowns & "Needs Confirmation"
* [NEEDS CONFIRMATION] Total volume of totes shipped or GMV numbers (strictly avoid publishing unverified sales revenue or growth multipliers).
* [NEEDS CONFIRMATION] Specific payment gateway provider integrated in production checkout (Stripe vs Razorpay vs Cashfree).

---

## 6. Internal Evidence Table

| Claim / Detail | Source | Evidence Label | Publish Status |
| :--- | :--- | :--- | :--- |
| D2C heavyweight cotton canvas tote brand | bazzaro.in | `PUBLICLY VERIFIED` | **YES** |
| ₹600 flat pricing with pan-India delivery | bazzaro.in | `PUBLICLY VERIFIED` | **YES** |
| Next.js App Router with Turbopack | bazzaro.in network scripts | `PUBLICLY VERIFIED` | **YES** |
| Dual-tab Cart & Wishlist drawer UX | bazzaro.in DOM | `PUBLICLY VERIFIED` | **YES** |
| Collections: Botanical, Anime, Graphic Art | bazzaro.in navigation | `PUBLICLY VERIFIED` | **YES** |
| Kawaki built brand & custom storefront | Kawaki engineering team | `KAWAKI-CONFIRMED` | **YES** |
| "Achieved 34% checkout conversion rate" | Speculative guess | `DO NOT PUBLISH` | **NO** |

---

## 7. Recommended Case Study Narrative
1. **The Brand Challenge:** In a crowded fashion accessories market dominated by low-quality polyester totes and generic marketplaces, BAZZARO needed an editorial digital flagship that feels like a boutique gallery while driving high-volume D2C conversions.
2. **Next.js Storefront Solution:** Engineered a custom headless-grade Next.js storefront eliminating the third-party plugin bloat of traditional e-commerce templates. Implemented an instantaneous slide-over cart drawer and view transitions for frictionless browsing.
3. **Editorial Commerce Experience:** Designed custom typography (Bodoni Moda + Libre Franklin) and high-density product grids highlighting material weight, stitch quality, and print durability.

---

## 8. Recommended Visual Assets & Branding
* **Official Brand Logo:** `https://bazzaro.in/_next/image?url=%2Fimages%2Flogos%2Fbazzaro-dark.png&w=1200&q=75` (Verified brand mark).
* **Hero Image:** Real product photography of the atelier tote editorial (`/images/hero/hero-atelier.jpg`).
* **UI Screen Captures:**
  * Product grid showing Botanical Blush and Rosa Floral totes
  * Slide-out slide-over Cart and Wishlist drawer
  * Mobile navigation menu with high-contrast serif typography

---

## 9. SEO & Metadata Specifications
* **Slug:** `bazzaro`
* **Canonical URL:** `https://www.kawaki.co.in/case-studies/bazzaro`
* **SEO Title:** `BAZZARO — Custom Next.js D2C E-Commerce Storefront | Kawaki Studios`
* **Meta Description:** `How Kawaki Studios engineered a high-performance Next.js D2C storefront for BAZZARO, combining editorial lifestyle branding with sub-second commerce UX.`
* **Schema.org:** `@type: CreativeWork` with `creator: Kawaki Studios` and `about: D2C E-Commerce Brand`.
* **Internal Linking:**
  * Inbound: `/services/custom-web-development` (Featured in Selected Work), `/services/shopify-development`
  * Outbound: `/services/custom-web-development`, `/contact`
