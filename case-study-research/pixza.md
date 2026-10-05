# Case Study Research Dossier: Pixza (Zenith Image Generator)

**Project Slug:** `pixza`  
**Target Route:** `/case-studies/pixza`  
**Product Name:** Pixza (Zenith Image Generator)  
**Public Website:** `https://pixzaai.com/` (Staging/Demo: `https://zenith-image-generator.pages.dev`)  
**Industry:** Artificial Intelligence / Creative SaaS / Generative Image Platform  
**Primary Discipline:** AI & Digital Products (Flagship Kawaki-Built Web Application)  

---

## 1. Project Summary & Background
Pixza is a flagship generative AI web application engineered by Kawaki Studios. Designed for digital artists, content creators, and growth marketing teams, Pixza eliminates the fragmented tooling and high subscription barriers of traditional AI image studios. It combines a sleek, editorial dark-mode interface with multi-provider model orchestration, an innovative personal ChatGPT OAuth proxy, intelligent API token rotation, and "Flow Mode"—a visual canvas for batch generation and node-based prompt chaining.

As a self-engineered product, Pixza serves as concrete proof of Kawaki Studios' capability to design, architect, and deploy production-grade AI software with resilient edge infrastructure.

---

## 2. Public Sources & Verified Repository Documentation
* **Primary Domain:** `https://pixzaai.com/`
* **Live Deployment / Cloudflare Pages Demo:** `https://zenith-image-generator.pages.dev`
* **Internal Architecture Documentation:** Verified from production codebase README and package manifests (`c:\Users\ks209\Downloads\pixza backend\README.md`).

---

## 3. Verified Technical Architecture & Product Capabilities (Repository Verified)
* **Core Technology Stack:**
  * `Frontend Framework:` React 19 with contemporary component state management
  * `API & Serverless Routing:` Hono 4 running on Cloudflare Workers edge runtime
  * `Deployment Platform:` Cloudflare Pages with global edge distribution
  * `Design System:` Pixza Studio dark-mode aesthetic, frosted glass status badges, responsive viewport controls
* **Multi-Provider AI Orchestration:**
  * *HuggingFace Spaces:* Z-Image Turbo, Qwen Image Fast, and FLUX Schnell
  * *Cloudflare Workers AI:* Serverless inference leveraging free edge neuron allocations
  * *OpenAI / ChatGPT OAuth:* Direct personal ChatGPT account integration (Free, Plus, Team) allowing users to run `gpt-image-2` and `dall-e-3`, alongside prompt optimization powered by `gpt-4o` and `gpt-4o-mini` without consuming third-party API credits
  * *Third-Party Providers:* Gitee AI, ModelScope, and A4F (`imagen-3.5`)
* **Enterprise-Grade Token Rotation Engine:**
  * Multi-key input per provider with automatic failover upon receiving HTTP 429 (rate limit) responses
  * Real-time UI metrics displaying active, exhausted, and total tokens with automated daily resets at UTC 00:00
* **Flow Mode (Visual Canvas):**
  * Node-based visual graph interface for chaining prompts, comparing model outputs, and batching generations
  * Lightweight remote URL state persistence in localStorage (no heavy client-side blob caching)
* **Security & Privacy:**
  * User-provided API keys encrypted locally using AES-256-GCM before storage
  * Zero permanent server-side retention of user image metadata

---

## 4. Kawaki-Confirmed Technical Facts & Role
* **Role:** Proprietary Kawaki-Built Flagship AI SaaS Product (Concept, UI/UX, Frontend, Backend, AI Pipeline, and Deployment).
* **Engineering Principles:** Zero runtime dependencies on bloated heavy libraries, instant cold starts on Cloudflare edge infrastructure, and deterministic failover handling.

---

## 5. Unknowns & "Needs Confirmation"
* [NEEDS CONFIRMATION] Total registered active user count or total images generated across production clusters (omit vanity user numbers; focus strictly on verified architecture).
* [NEEDS CONFIRMATION] Public monetization launch date for commercial credit tiers.

---

## 6. Internal Evidence Table

| Claim / Detail | Source | Evidence Label | Publish Status |
| :--- | :--- | :--- | :--- |
| React 19 & Hono 4 on Cloudflare Pages | pixza backend repository | `REPOSITORY-VERIFIED` | **YES** |
| Multi-model: FLUX Schnell, Qwen Fast, DALL-E-3 | pixza backend README | `REPOSITORY-VERIFIED` | **YES** |
| ChatGPT OAuth proxy for personal accounts | pixza backend package | `REPOSITORY-VERIFIED` | **YES** |
| Automatic token rotation with 429 failover | pixza backend source | `REPOSITORY-VERIFIED` | **YES** |
| Flow Mode: visual canvas for batch chaining | pixza backend README | `REPOSITORY-VERIFIED` | **YES** |
| AES-256-GCM local API key encryption | pixza backend security | `REPOSITORY-VERIFIED` | **YES** |
| "Over 500,000 images generated in first week" | Speculative guess | `DO NOT PUBLISH` | **NO** |

---

## 7. Recommended Case Study Narrative
1. **The Product Vision:** Why rely on expensive single-model subscriptions when edge computing allows unified model orchestration? Kawaki engineered Pixza to give creators access to the world’s best open-weight and proprietary image models in one canvas.
2. **Resilient AI Pipelines & Failover:** Detailed explanation of the token rotation engine and model failover protocol—ensuring that if a provider rate-limits, generations seamlessly pivot without disrupting user creative flow.
3. **Flow Mode & Creative UX:** Showcasing the node-based visual workspace that enables batch image generation, side-by-side prompt tuning, and non-destructive experimentation.

---

## 8. Recommended Visual Assets & Branding
* **Product Identity:** Official Pixza brand mark / dark-mode studio icon.
* **Hero Visual:** Real high-resolution screenshot of the dark-mode generation workspace (`zenith-*.png` from project files).
* **UI Screen Captures:**
  * Multi-provider model selection dropdown and aspect ratio controls
  * Flow Mode node-chaining visual canvas
  * Token rotation statistics block showing live provider health

---

## 9. SEO & Metadata Specifications
* **Slug:** `pixza`
* **Canonical URL:** `https://www.kawaki.co.in/case-studies/pixza`
* **SEO Title:** `Pixza — Multi-Model AI Image Generation Studio | Kawaki Studios Case Study`
* **Meta Description:** `How Kawaki Studios engineered Pixza, an edge-native AI creative studio featuring React 19, Hono, token rotation, and node-based canvas workflows.`
* **Schema.org:** `@type: SoftwareApplication` and `@type: CreativeWork` with `applicationCategory: MultimediaApplication` and `creator: Kawaki Studios`.
* **Internal Linking:**
  * Inbound: `/services/web-application-development` (Featured Flagship Product), `/services/ai-automation`
  * Outbound: `/services/web-application-development`, `/services/ai-automation`, `/contact`
