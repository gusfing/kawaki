# Master Case Study Index — Kawaki Studios Portfolio Architecture

**Architecture Status:** Phase 1 Research & Factual Inventory  
**Target Directory:** `/case-study-research/`  
**Governing Standard:** Absolute Factual Integrity. Zero fabricated metrics, zero invented client quotes, zero simulated conversion rates. Real evidence only.

---

## 1. Executive Portfolio Strategy

Kawaki Studios is transitioning its public case-study portfolio from illustrative proof-of-concept blueprints (`/case-studies/acme-headless-ecommerce` and `/case-studies/fintech-roi-calculator`) to a **production-verified portfolio of 11 real digital products, web platforms, and mobile ecosystems**.

### The Expanded Agency Narrative:
$$\text{Websites} + \text{E-Commerce} + \text{Web Applications} + \text{AI Products} + \text{Mobile Apps}$$

This portfolio architecture enforces clear boundaries between:
* **Custom Web Development:** Marketing flagships, corporate websites, editorial publications, and decoupled headless CMS platforms.
* **Web Application Development:** Authenticated SaaS products, interactive dashboards, multi-tenant portals, and complex operational workflows.
* **Commerce & B2B:** Direct-to-consumer storefronts and quote-driven B2B product catalogues.
* **Mobile Applications:** Role-based multi-app ecosystems, streaming entertainment, and service booking applications.

---

## 2. Master Project Inventory & Taxonomy

The 11 verified projects are organized by technical capability into four clear tiers:

```
+----------------------------------------------------------------------------------------------------+
|                                    KAWAKI STUDIOS PROJECT TAXONOMY                                 |
+-----------------------------------+-----------------------------------+----------------------------+
| Category                          | Project                           | Live URL / Primary Link    |
+-----------------------------------+-----------------------------------+----------------------------+
| AI & Digital Products (Flagship)  | Pixza (Zenith Image Generator)    | https://pixzaai.com/       |
|                                   | Kova (AI Website Canvas Builder)  | [Coming Soon / Disabled]   |
+-----------------------------------+-----------------------------------+----------------------------+
| Web Applications & Platforms      | NextSchool ERP                    | http://nextschoolerp.com/  |
|                                   | NursePass (German Nursing LMS)    | https://nursepass.de/      |
|                                   | LMS School Mobility Ecosystem     | Internal Multi-App Repo    |
+-----------------------------------+-----------------------------------+----------------------------+
| Commerce & B2B                    | Bazzaro (D2C Canvas Totes)        | https://www.bazzaro.in/    |
|                                   | Urbanland Products (B2B Catalog)  | https://urbanlandproducts.com/ |
+-----------------------------------+-----------------------------------+----------------------------+
| Brand & Marketing Websites        | Kala Design Co (Interior & Arch)  | https://kaladesignco.com/  |
|                                   | Decor Lab (33-Yr Parametric Studio| https://www.decorlabs.co.in/ |
+-----------------------------------+-----------------------------------+----------------------------+
| Mobile Applications               | Multi-Role LMS (Staff/Student/Bus)| Android / iOS Repos        |
|                                   | IPTV Mobile Streaming App         | Mobile Application Build   |
|                                   | Spa & Salon Management (Frezka)   | Flutter Mobile App         |
+-----------------------------------+-----------------------------------+----------------------------+
```

---

## 3. Evidence Classification Standards

Every claim, metric, and technical assertion across all 11 case studies must carry an internal evidence label:

| Label | Definition | Rule for Publishing |
| :--- | :--- | :--- |
| **`PUBLICLY VERIFIED`** | Confirmed directly via official live client domain, legal registry, or indexed source. | Publishable with citation. |
| **`KAWAKI-CONFIRMED`** | Confirmed by Kawaki's founder/engineering team as their direct deliverable. | Publishable. |
| **`REPOSITORY-VERIFIED`** | Confirmed by inspecting source code, dependencies, and configuration in the codebase. | Publishable. |
| **`CLIENT-PROVIDED`** | Delivered directly by the client during project onboarding or settlement. | Publishable. |
| **`NEEDS CONFIRMATION`** | Believed to be true but lacks documentation or technical proof. | **DO NOT PUBLISH** until verified. |
| **`DO NOT PUBLISH`** | Unsubstantiated estimates, vanity growth percentages, or speculative claims. | **STRICTLY EXCLUDED**. |

---

## 4. Service Page Allocation Matrix

To prevent cannibalization and reinforce Kawaki's strict separation between marketing websites and authenticated web applications:

### Featured on `/services/custom-web-development`:
1. **Kala Design Co:** Contemporary editorial architecture and interior design flagship.
2. **Decor Lab:** Next.js fluid and parametric architecture platform with custom video hero and horizontal gallery (Explicit footer citation: *"Site by Kawaki Studios"*).
3. **Urbanland Products:** Complex B2B architectural furniture catalogue and quote-driven specification platform.
4. **Bazzaro:** Next.js brand editorial storytelling and high-fidelity art tote digital flagship.

*Rule:* Pixza, Kova, and LMS ERP platforms must **never** appear in the primary Custom Web Development grid.

### Featured on `/services/web-application-development`:
1. **Pixza:** Production AI image generation studio with multi-model failover, ChatGPT OAuth proxy, and node-based visual Flow Mode.
2. **Kova:** AI website generation platform with interactive visual canvas.
3. **NextSchool ERP:** Multi-module cloud school management enterprise software.
4. **NursePass:** Healthcare LMS and examination preparation platform for international nurses in Germany.
5. **Multi-Role LMS Ecosystem:** Unified school mobility and academic management platform.

### Featured on Dedicated Mobile Application Surfaces:
1. **Multi-Role LMS Ecosystem:** Teacher & Staff App, Student & Parent App, and Driver GPS Transport App.
2. **IPTV Mobile App:** Live content streaming and media playback mobile experience.
3. **Spa & Salon Management App:** Flutter-powered appointment booking and staff scheduling interface.

---

## 5. Master File Manifest (`/case-study-research/`)

Detailed factual dossiers for each project:

| File Name | Project Name | Primary Discipline |
| :--- | :--- | :--- |
| `kala-design.md` | Kala Design Co | Custom Web Development / Editorial Architecture |
| `decor-lab.md` | Decor Lab | Custom Web Development / Next.js Parametric Studio |
| `bazzaro.md` | Bazzaro | Custom E-Commerce / Next.js Storefront |
| `urbanland.md` | Urbanland Products | B2B Product Catalogue / RFP E-Commerce |
| `nursepass.md` | NursePass | Healthcare EdTech / Multilingual LMS |
| `nextschool-erp.md` | NextSchool ERP | Cloud Education ERP / Multi-Tenant Platform |
| `pixza.md` | Pixza (Zenith) | AI Creative SaaS / Image Generation Studio |
| `kova.md` | Kova | AI Website Builder / Visual Canvas Platform |
| `lms-ecosystem.md` | LMS School Mobility Ecosystem | Multi-Role Mobile Apps / Education Fleet |
| `iptv-mobile.md` | IPTV Mobile App | Mobile Media / Entertainment Streaming |
| `spa-salon.md` | Spa & Salon Booking App | Flutter Mobile / Service Operations |

---

## 6. Case Study Route & Data Architecture

To ensure centralized maintenance without editing dozens of static HTML files manually, all projects are registered through an internal data schema:

```javascript
{
  slug: "project-slug",
  name: "Project Name",
  client: "Client Legal Name",
  industry: "Industry Category",
  projectType: "Custom Website | Web Application | Mobile App",
  liveUrl: "https://...", // or null for Coming Soon
  hasLiveUrl: true,
  category: "AI & Digital Products | Web Applications | Commerce & B2B | Brand & Marketing | Mobile Apps",
  caseStudyUrl: "/case-studies/project-slug",
  logoAsset: "/assets/images/case-studies/project-slug/logo.png",
  heroAsset: "/assets/images/case-studies/project-slug/hero.webp",
  techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  servicesLinked: ["/services/custom-web-development"]
}
```

---

*Directory initialized on October 6, 2026. Review individual project files for complete verified facts.*
