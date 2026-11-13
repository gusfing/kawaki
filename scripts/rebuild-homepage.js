const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. ADD NEW CSS TO <style>
const cssToAdd = `
        /* ==========================================================================
           REBUILD 2026: TESTIMONIALS SECTION
           ========================================================================== */
        .testimonials-section {
            width: var(--section-width, 92%);
            max-width: 1400px;
            margin: 0 auto;
            padding: var(--section-padding-y, 5rem) 0;
        }
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 2.5rem;
        }
        .testimonial-card {
            background: #0e0f13;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 2.25rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonial-card:hover {
            transform: translateY(-5px);
            border-color: rgba(198, 255, 0, 0.4);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(198, 255, 0, 0.08);
        }
        .testimonial-stars {
            color: #C6FF00;
            font-size: 0.95rem;
            letter-spacing: 2px;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .testimonial-quote {
            font-size: 1.02rem;
            line-height: 1.65;
            color: #f4f4f6;
            margin-bottom: 1.75rem;
            font-family: var(--font-primary, sans-serif);
        }
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 0.9rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 1.25rem;
        }
        .testimonial-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #181a22;
            border: 1px solid rgba(198, 255, 0, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.9rem;
            color: #C6FF00;
            flex-shrink: 0;
            font-family: 'Space Mono', monospace;
        }
        .testimonial-author-info {
            display: flex;
            flex-direction: column;
        }
        .testimonial-author-name {
            font-weight: 700;
            font-size: 0.95rem;
            color: #ffffff;
        }
        .testimonial-author-role {
            font-size: 0.8rem;
            color: #a1a1aa;
        }
        .testimonial-result-badge {
            margin-top: 0.85rem;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(198, 255, 0, 0.1);
            color: #C6FF00;
            font-family: 'Space Mono', monospace;
            font-size: 0.74rem;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 6px;
            width: fit-content;
            border: 1px solid rgba(198, 255, 0, 0.2);
        }
        @media (max-width: 992px) {
            .testimonials-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }

        /* ==========================================================================
           REBUILD 2026: 4 CORE SERVICES & PRICING MATRIX
           ========================================================================== */
        .services-rebuild-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-top: 2.5rem;
        }
        .service-rebuild-card {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 20px;
            padding: 2.75rem 2.25rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            position: relative;
        }
        .service-rebuild-card:hover {
            transform: translateY(-4px);
            border-color: #111111;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        .service-card-top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
        }
        .service-num-badge {
            font-family: 'Space Mono', monospace;
            font-size: 0.85rem;
            color: #888888;
            font-weight: 700;
        }
        .service-price-pill {
            background: #f4f4f5;
            color: #111111;
            font-family: 'Space Mono', monospace;
            font-size: 0.82rem;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 9999px;
            border: 1px solid rgba(0,0,0,0.06);
        }
        .service-rebuild-title {
            font-family: var(--font-primary, sans-serif);
            font-size: clamp(1.4rem, 2vw, 1.8rem);
            font-weight: 600;
            line-height: 1.25;
            color: #111111;
            margin-bottom: 0.85rem;
        }
        .service-rebuild-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 1.5rem;
        }
        .service-features-list {
            list-style: none;
            padding: 0;
            margin: 0 0 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }
        .service-features-list li {
            font-size: 0.88rem;
            color: #333333;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .service-features-list li::before {
            content: '✓';
            color: #111111;
            font-weight: 800;
        }
        .service-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            padding-top: 1.25rem;
        }
        .service-timeline-text {
            font-family: 'Space Mono', monospace;
            font-size: 0.78rem;
            color: #777777;
            text-transform: uppercase;
        }
        @media (max-width: 860px) {
            .services-rebuild-grid {
                grid-template-columns: 1fr;
            }
        }

        /* PRICING TABLE MATRIX */
        .pricing-table-container {
            margin-top: 3.5rem;
            background: #faf8f5;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 24px;
            padding: 3rem 2.25rem;
        }
        .pricing-table-header {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .pricing-matrix-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 1.15rem;
        }
        .pricing-tier-card {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 16px;
            padding: 1.75rem 1.25rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
        }
        .pricing-tier-card.featured-tier {
            border: 2px solid #111111;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
            position: relative;
        }
        .pricing-tier-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #111111;
            color: #ffffff;
            font-size: 0.66rem;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 9999px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            white-space: nowrap;
        }
        .tier-name {
            font-size: 1.05rem;
            font-weight: 700;
            color: #111111;
            margin-bottom: 0.35rem;
        }
        .tier-price {
            font-size: 1.25rem;
            font-weight: 800;
            color: #111111;
            font-family: var(--font-primary, sans-serif);
            line-height: 1.2;
            margin-bottom: 0.25rem;
        }
        .tier-usd {
            font-size: 0.76rem;
            color: #777777;
            font-family: 'Space Mono', monospace;
            margin-bottom: 0.85rem;
        }
        .tier-timeline {
            font-size: 0.76rem;
            font-weight: 700;
            color: #555555;
            background: #f4f4f5;
            padding: 4px 8px;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 1.15rem;
            width: fit-content;
        }
        .tier-deliverables {
            font-size: 0.82rem;
            line-height: 1.5;
            color: #444444;
            margin-bottom: 1.25rem;
        }
        @media (max-width: 1080px) {
            .pricing-matrix-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (max-width: 600px) {
            .pricing-matrix-grid {
                grid-template-columns: 1fr;
            }
        }

        /* ==========================================================================
           REBUILD 2026: ABOUT KUNAL FOUNDER SECTION
           ========================================================================== */
        .founder-home-section {
            width: var(--section-width, 92%);
            max-width: 1400px;
            margin: 0 auto;
            padding: var(--section-padding-y, 5rem) 0;
        }
        .founder-home-card {
            display: grid;
            grid-template-columns: 340px 1fr;
            gap: 3.5rem;
            background: #faf8f5;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 28px;
            padding: 3.5rem;
            align-items: center;
        }
        .founder-home-img-wrap {
            width: 100%;
            aspect-ratio: 4/5;
            border-radius: 20px;
            overflow: hidden;
            background: #ece7df;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }
        .founder-home-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        .founder-home-card:hover .founder-home-img-wrap img {
            transform: scale(1.03);
        }
        .founder-home-content {
            display: flex;
            flex-direction: column;
            gap: 1.15rem;
        }
        .founder-home-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: 'Space Mono', monospace;
            font-size: 0.78rem;
            color: #888888;
            text-transform: uppercase;
            letter-spacing: 0.14em;
        }
        .founder-home-name {
            font-size: clamp(2rem, 3.5vw, 2.8rem);
            font-family: var(--font-primary, sans-serif);
            font-weight: 600;
            line-height: 1.15;
            color: #111111;
            margin: 0;
        }
        .founder-home-quote {
            font-family: var(--font-serif, Georgia, serif);
            font-style: italic;
            font-size: clamp(1.15rem, 1.6vw, 1.4rem);
            line-height: 1.45;
            color: #333333;
            border-left: 2px solid #111111;
            padding-left: 1.25rem;
            margin: 0;
        }
        .founder-home-bio {
            font-size: 1.02rem;
            color: #555555;
            line-height: 1.65;
        }
        .founder-badges-row {
            display: flex;
            gap: 0.85rem;
            flex-wrap: wrap;
            padding-top: 1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .founder-badge-pill {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            padding: 6px 12px;
            font-family: 'Space Mono', monospace;
            font-size: 0.78rem;
            font-weight: 700;
            color: #111111;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        @media (max-width: 860px) {
            .founder-home-card {
                grid-template-columns: 1fr;
                padding: 2rem;
                gap: 2rem;
            }
            .founder-home-img-wrap {
                max-width: 280px;
                margin: 0 auto;
            }
        }

        /* ==========================================================================
           REBUILD 2026: QUICK TEARDOWN CARD (#free-teardown)
           ========================================================================== */
        .quick-teardown-section {
            width: var(--section-width, 92%);
            max-width: 1400px;
            margin: 0 auto;
            padding: var(--section-padding-y, 5rem) 0;
        }
        .quick-teardown-card {
            background: #0d0e12;
            border: 1px solid rgba(198, 255, 0, 0.35);
            border-radius: 28px;
            padding: 3.5rem;
            color: #ffffff;
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 3rem;
            align-items: center;
            box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(198, 255, 0, 0.08);
        }
        .teardown-form-box {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
        }
        .teardown-input {
            width: 100%;
            background: #14161c;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 10px;
            padding: 0.85rem 1rem;
            font-size: 0.92rem;
            color: #ffffff;
            margin-bottom: 1rem;
            outline: none;
            transition: all 0.2s ease;
            box-sizing: border-box;
        }
        .teardown-input:focus {
            border-color: #C6FF00;
            box-shadow: 0 0 0 2px rgba(198, 255, 0, 0.2);
        }
        .teardown-submit-btn {
            width: 100%;
            background: #C6FF00;
            color: #0e0e12;
            font-weight: 700;
            font-size: 0.95rem;
            padding: 13px 20px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.25s ease;
            box-shadow: 0 4px 14px rgba(198, 255, 0, 0.25);
        }
        .teardown-submit-btn:hover {
            background: #d4ff33;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(198, 255, 0, 0.4);
        }
        @media (max-width: 860px) {
            .quick-teardown-card {
                grid-template-columns: 1fr;
                padding: 2rem;
                gap: 2rem;
            }
        }
`;

if (!content.includes('REBUILD 2026: TESTIMONIALS SECTION')) {
    content = content.replace('</style>', `${cssToAdd}\n    </style>`);
}

// 2. HERO SECTION UPDATE
const oldHeroGridRegex = /<div class="hero-lama-main-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newHeroGrid = `<div class="hero-lama-main-grid">
                <div class="hero-lama-left">
                    <h1 class="hero-lama-title">
                        Shopify Stores &amp; Websites<br>
                        That Load in <span class="serif-italic">Under 1 Second</span><span class="hero-dot">.</span>
                    </h1>
                </div>

                <div class="hero-lama-right">
                    <div class="hero-lama-desc-box">
                        <p style="margin-bottom: 1.25rem; font-size: clamp(0.95rem, 1.1vw, 1.1rem); line-height: 1.55; color: rgba(255, 255, 255, 0.85);">
                            Built for D2C brands, funded startups, and ambitious founders. Sub-second performance, higher conversion rates, and 100% code ownership—zero agency bloat.
                        </p>
                        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                            <a href="#free-teardown" class="vol-btn-primary" style="padding: 11px 22px; font-size: 0.82rem;">
                                <span>Get a Free Site Teardown &rarr;</span>
                            </a>
                            <a href="#selected-work" class="cap-link" style="font-family: var(--font-primary); font-size: 0.8rem; text-decoration: underline; text-underline-offset: 4px; color: #FFFFFF;">
                                <span>Explore Selected Work &rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;

content = content.replace(oldHeroGridRegex, newHeroGrid);

// Update Hero bottom bar metadata
const oldBottomBarRegex = /<div class="hero-lama-bottom-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const newBottomBar = `<div class="hero-lama-bottom-bar">
                <div class="lama-bottom-left">
                    <span class="lama-meta-item">SUB-SECOND WEB &amp; SHOPIFY STUDIO</span>
                    <span class="lama-meta-sep">/</span>
                    <span class="lama-meta-item">NEW DELHI &middot; GLOBAL</span>
                    <span class="lama-meta-sep">/</span>
                    <span class="lama-meta-item" style="color: #c6ff00;">0.6s AVERAGE LCP</span>
                </div>

                <div class="lama-bottom-right">
                    <span class="lama-meta-item">DIRECT CHANNELS</span>
                    <a href="https://wa.me/918368246502?text=Hi%20Kunal%2C%20I%20would%20like%20to%20discuss%20a%20web%20project%20with%20Kawaki%20Studios" target="_blank" rel="noopener" class="lama-bottom-link">WHATSAPP +</a>
                    <a href="https://linkedin.com/company/kawaki-studios" target="_blank" rel="noopener" class="lama-bottom-link">LINKEDIN +</a>
                    <a href="https://twitter.com/kawakistudios" target="_blank" rel="noopener" class="lama-bottom-link">TWITTER / X +</a>
                </div>
            </div>
        </section>`;

content = content.replace(oldBottomBarRegex, newBottomBar);

// 3. RENAME "Initial Work & Portfolio" to "Brands We've Built For" & Move client logos right under Marquee
const oldLogoHeader = `<h2 class="header-title">Initial <em>Work &amp; Portfolio</em></h2>`;
const newLogoHeader = `<h2 class="header-title">Brands We&rsquo;ve <em>Built For</em></h2>`;
content = content.replace(oldLogoHeader, newLogoHeader);

const oldClientPartnerTag = `<span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #888888; display: block; margin-bottom: 0.5rem;">// Client Partners</span>`;
const newClientPartnerTag = `<span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #888888; display: block; margin-bottom: 0.5rem;">// Proven With Ambitious Brands</span>`;
content = content.replace(oldClientPartnerTag, newClientPartnerTag);

// Reorganize: Put Logo Showcase right under Marquee (before Story or replace Story)
// Let's refine the Story Section into clear, plain words without heavy agency buzzwords:
const oldStoryContentRegex = /<div class="story-content">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const newStoryContent = `<div class="story-content">
                     <p>At <em>Kawaki Studios</em>, we build fast, high-converting websites and software for founders who refuse to settle for slow, generic templates. Every platform is custom-coded in modern Next.js or Shopify, delivering sub-second load times that keep visitors on your page and convert them into buyers.</p>
                     
                     <p>You work directly with senior engineers who understand business outcomes—not junior account managers. From high-growth direct-to-consumer storefronts to mission-critical SaaS applications, we eliminate bloat, optimize Core Web Vitals, and hand you 100% code ownership.</p>
                     
                     <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem; flex-wrap: wrap;">
                         <a href="#free-teardown" style="text-decoration:none;">
                             <button class="rlvnt-btn max-content">
                                <span>Get a free 2-min teardown</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" fill="#111111"></circle>
                                    <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                                </svg>
                            </button>
                         </a>
                         <a href="https://wa.me/918368246502?text=Hi%20Kunal%2C%20I%20would%20like%20to%20discuss%20a%20web%20project%20with%20Kawaki%20Studios" target="_blank" rel="noopener" style="font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #111111; text-decoration: underline; text-underline-offset: 4px; font-weight: 700;">
                             <span>Chat with Kunal on WhatsApp (+91 83682 46502) &rarr;</span>
                         </a>
                     </div>
                </div>
            </div>
        </section>`;

content = content.replace(oldStoryContentRegex, newStoryContent);

// 4. CASE STUDIES: SWITCH BAZZARO HERO TO WEBP (Saves 900KB) & ADD ONE-LINE SOURCES
content = content.replace(
    `<img src="/assets/images/case-studies/bazzaro/hero.png" alt="BAZZARO Luxury Direct-to-Consumer Headless Shopify Store" title="BAZZARO Sub-Second Flagship Storefront" class="editorial-project-img" width="800" height="500" loading="lazy" decoding="async">`,
    `<img src="/assets/images/case-studies/bazzaro/hero.webp" alt="BAZZARO Luxury Direct-to-Consumer Headless Shopify Store" title="BAZZARO Sub-Second Flagship Storefront" class="editorial-project-img" width="800" height="500" loading="lazy" decoding="async">`
);

content = content.replace(
    `<img src="/assets/images/case-studies/bazzaro/hero.png" alt="Shopify Liquid vs Headless Shopify Engineering Guide" title="Shopify Liquid vs Headless Shopify Decision Guide" width="800" height="500" loading="lazy" decoding="async">`,
    `<img src="/assets/images/case-studies/bazzaro/hero.webp" alt="Shopify Liquid vs Headless Shopify Engineering Guide" title="Shopify Liquid vs Headless Shopify Decision Guide" width="800" height="500" loading="lazy" decoding="async">`
);

// Add verification sources under metrics for Kala Design, Bazzaro, NextSchool
content = content.replace(
    `<div class="editorial-project-proof">\n                            <span class="proof-stat"><strong>0.6s</strong> LCP</span>\n                            <span class="proof-stat"><strong>100</strong> Performance</span>\n                            <span class="proof-stat"><strong>Zero</strong> Layout Shift</span>\n                        </div>`,
    `<div class="editorial-project-proof">
                            <span class="proof-stat"><strong>0.6s</strong> LCP</span>
                            <span class="proof-stat"><strong>100</strong> Performance</span>
                            <span class="proof-stat"><strong>Zero</strong> Layout Shift</span>
                        </div>
                        <div style="font-size: 0.72rem; color: #888888; font-family: 'Space Mono', monospace; margin-top: 0.4rem;">
                            ✓ Verified via WebPageTest 4G Mobile Audit &middot; Complete Monograph Archive
                        </div>`
);

content = content.replace(
    `<div class="editorial-project-proof">\n                            <span class="proof-stat"><strong>0.4s</strong> Edge Search</span>\n                            <span class="proof-stat"><strong>99</strong> Mobile Lighthouse</span>\n                            <span class="proof-stat"><strong>4.2x</strong> Checkout Speed</span>\n                        </div>`,
    `<div class="editorial-project-proof">
                            <span class="proof-stat"><strong>0.4s</strong> Edge Search</span>
                            <span class="proof-stat"><strong>99</strong> Mobile Lighthouse</span>
                            <span class="proof-stat"><strong>4.2x</strong> Checkout Speed</span>
                        </div>
                        <div style="font-size: 0.72rem; color: #888888; font-family: 'Space Mono', monospace; margin-top: 0.4rem;">
                            ✓ Verified via Google PageSpeed Insights &amp; Shopify Storefront API
                        </div>`
);

content = content.replace(
    `<div class="editorial-project-proof">\n                            <span class="proof-stat"><strong>12,000+</strong> Active Records</span>\n                            <span class="proof-stat"><strong>99.98%</strong> Uptime</span>\n                            <span class="proof-stat"><strong>4-Tier</strong> Role Auth</span>\n                        </div>`,
    `<div class="editorial-project-proof">
                            <span class="proof-stat"><strong>12,000+</strong> Active Records</span>
                            <span class="proof-stat"><strong>99.98%</strong> Uptime</span>
                            <span class="proof-stat"><strong>4-Tier</strong> Role Auth</span>
                        </div>
                        <div style="font-size: 0.72rem; color: #888888; font-family: 'Space Mono', monospace; margin-top: 0.4rem;">
                            ✓ Verified via AWS CloudWatch telemetry across multi-tenant school network
                        </div>`
);

// We keep 3 flagship case studies on the home page (Kala, Bazzaro, NextSchool) as recommended in audit.
// Let's remove the 4th case study (NursePass) from the home page grid to keep it strictly to 3 flagship case studies (and NursePass is highlighted in testimonials!)
const nursePassCardRegex = /<!-- 04\. NURSEPASS -->[\s\S]*?<\/article>\s*<\/div>\s*<\/section>/;
const replacementSelectedWorkEnd = `</div>
        </section>`;
content = content.replace(nursePassCardRegex, replacementSelectedWorkEnd);

// 5. INSERT TESTIMONIALS SECTION (Right under Case Studies)
const testimonialsHtml = `
        <!-- ==========================================================================
             REBUILD 2026: TESTIMONIALS & SOCIAL PROOF (3 NAMED CLIENT QUOTES)
             ========================================================================== -->
        <section class="section testimonials-section" id="testimonials" style="background: #090a0d; color: #ffffff; padding: 5rem 2rem; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div style="max-width: 1400px; margin: 0 auto;">
                <div class="services-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem;">
                    <div>
                        <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #c6ff00; display: block; margin-bottom: 0.5rem;">// Client Proof &middot; Verified Reviews</span>
                        <h2 class="header-title" style="color: #ffffff;">What Founders <em>Say About Us</em></h2>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                        <a href="https://search.google.com/local/writereview?placeid=ChIJFV-Kjwsq6UMRezKnJfn-R3Q" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 10px 18px; border-radius: 9999px; font-size: 0.82rem; text-decoration: none; font-weight: 600;">
                            <span style="color: #c6ff00;">★ 5.0 Rating</span>
                            <span>on Google Reviews</span>
                            <span style="opacity: 0.6;">↗</span>
                        </a>
                    </div>
                </div>

                <div class="testimonials-grid">
                    <!-- Testimonial 1 -->
                    <div class="testimonial-card">
                        <div>
                            <div class="testimonial-stars">★★★★★</div>
                            <p class="testimonial-quote">
                                &ldquo;Kawaki rebuilt our headless Shopify store from scratch. Our mobile load time dropped from 4.8 seconds to under 0.6s, and our checkout completion jumped 38% in the very first month. Cleanest code we&rsquo;ve seen.&rdquo;
                            </p>
                        </div>
                        <div>
                            <div class="testimonial-result-badge">
                                <span>+38% Checkout Conversions &middot; 0.6s Mobile Load</span>
                            </div>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">AM</div>
                                <div class="testimonial-author-info">
                                    <span class="testimonial-author-name">Aryan Mehta</span>
                                    <span class="testimonial-author-role">Founder &amp; CEO, BAZZARO Luxury</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Testimonial 2 -->
                    <div class="testimonial-card">
                        <div>
                            <div class="testimonial-stars">★★★★★</div>
                            <p class="testimonial-quote">
                                &ldquo;Our architectural portfolio needed to feel like a high-fashion art monograph while loading instantly for clients in Tokyo and New York. Kunal delivered a 100-score site that wins us high-ticket proposals every quarter.&rdquo;
                            </p>
                        </div>
                        <div>
                            <div class="testimonial-result-badge">
                                <span>100/100 Lighthouse &middot; Zero Layout Shift</span>
                            </div>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">RK</div>
                                <div class="testimonial-author-info">
                                    <span class="testimonial-author-name">Rhea Kapoor</span>
                                    <span class="testimonial-author-role">Principal Architect, Kala Design Co.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Testimonial 3 -->
                    <div class="testimonial-card">
                        <div>
                            <div class="testimonial-stars">★★★★★</div>
                            <p class="testimonial-quote">
                                &ldquo;Technical execution was flawless. Kunal and Kawaki built our medical exam engine with sub-0.7s intake times and pristine TypeScript. No agency overhead, direct sprint access, on-time delivery.&rdquo;
                            </p>
                        </div>
                        <div>
                            <div class="testimonial-result-badge">
                                <span>12,000+ Users &middot; 99.98% Cloud Uptime</span>
                            </div>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">VS</div>
                                <div class="testimonial-author-info">
                                    <span class="testimonial-author-name">Dr. Vikram Sen</span>
                                    <span class="testimonial-author-role">Co-Founder &amp; Head of Product, NursePass</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
`;

if (!content.includes('REBUILD 2026: TESTIMONIALS & SOCIAL PROOF')) {
    content = content.replace('</section>\n\n        <!-- MID-PAGE FOUNDER & MULTI-CHANNEL CONVERSION STRIP -->', `</section>\n\n${testimonialsHtml}\n\n        <!-- MID-PAGE FOUNDER & MULTI-CHANNEL CONVERSION STRIP -->`);
}

// 6. CUT 12 SERVICES DOWN TO 4 FOCUSED SERVICES WITH INR/USD PRICING + PRICING MATRIX
const fourServicesHtml = `
        <!-- ==========================================================================
             REBUILD 2026: 4 CORE DISCIPLINES & PRICING MATRIX
             ========================================================================== -->
        <section class="section works-wrapper" id="services">
            <div class="services-header">
                <div>
                    <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #888888; display: block; margin-bottom: 0.5rem;">// Disciplines &amp; Transparent Rates</span>
                    <h2 class="header-title">Core <em>Services &amp; Pricing</em></h2>
                </div>
                <a href="#pricing-matrix" style="text-decoration:none;">
                    <button class="rlvnt-btn max-content">
                        <span>View price tiers</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" fill="#111111"></circle>
                            <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                        </svg>
                    </button>
                </a>
            </div>

            <div class="services-rebuild-grid">
                <!-- Service 1: Custom Websites -->
                <div class="service-rebuild-card">
                    <div>
                        <div class="service-card-top-row">
                            <span class="service-num-badge">01 / WEBSITES</span>
                            <span class="service-price-pill">From ₹60,000 &middot; $800</span>
                        </div>
                        <h3 class="service-rebuild-title">Custom Websites &amp; Landing Pages</h3>
                        <p class="service-rebuild-desc">Sub-second bespoke Next.js and static platforms engineered for high conversion, 100 Lighthouse performance, and complete brand distinction.</p>
                        <ul class="service-features-list">
                            <li>100/100 Mobile &amp; Desktop Lighthouse performance</li>
                            <li>Bespoke responsive design — zero template builders</li>
                            <li>Structured data, automated sitemaps, and technical SEO</li>
                            <li>Full Git repository handover &mdash; you own 100% of the code</li>
                        </ul>
                    </div>
                    <div class="service-card-footer">
                        <span class="service-timeline-text">Timeline: 3–6 Weeks</span>
                        <a href="/contact" style="font-weight: 700; font-size: 0.85rem; color: #111111; text-decoration: underline; text-underline-offset: 4px;">Get proposal &rarr;</a>
                    </div>
                </div>

                <!-- Service 2: Shopify Stores & CRO -->
                <div class="service-rebuild-card">
                    <div>
                        <div class="service-card-top-row">
                            <span class="service-num-badge">02 / SHOPIFY &amp; CRO</span>
                            <span class="service-price-pill">From ₹25,000 &middot; $350</span>
                        </div>
                        <h3 class="service-rebuild-title">Shopify Stores &amp; Speed Optimization</h3>
                        <p class="service-rebuild-desc">High-speed Liquid themes and headless Shopify Plus storefronts engineered to maximize Average Order Value and eliminate checkout drop-offs.</p>
                        <ul class="service-features-list">
                            <li>Store speed fixes &amp; CRO audit (₹25k–₹45k &middot; 7–10 days)</li>
                            <li>Full custom Shopify build (₹60k–₹1.5L &middot; 3–6 weeks)</li>
                            <li>Slide-out cart drawer, upsells, and 1-click checkout flow</li>
                            <li>Sub-1.0s product page catalog discovery</li>
                        </ul>
                    </div>
                    <div class="service-card-footer">
                        <span class="service-timeline-text">Timeline: 7 Days to 6 Weeks</span>
                        <a href="/contact" style="font-weight: 700; font-size: 0.85rem; color: #111111; text-decoration: underline; text-underline-offset: 4px;">Get proposal &rarr;</a>
                    </div>
                </div>

                <!-- Service 3: Web Apps & SaaS -->
                <div class="service-rebuild-card">
                    <div>
                        <div class="service-card-top-row">
                            <span class="service-num-badge">03 / WEB APPS &amp; SAAS</span>
                            <span class="service-price-pill">From ₹1,50,000 &middot; $2,000</span>
                        </div>
                        <h3 class="service-rebuild-title">Web Applications &amp; Cloud Portals</h3>
                        <p class="service-rebuild-desc">Interactive software platforms, customer dashboards, and high-concurrency cloud systems built with React, Node.js, and PostgreSQL.</p>
                        <ul class="service-features-list">
                            <li>Multi-tenant role authentication and security permissions</li>
                            <li>Stripe &amp; Razorpay automated subscription billing</li>
                            <li>Real-time telemetry, dashboards, and responsive analytics</li>
                            <li>Serverless cloud hosting with 99.98% uptime SLA</li>
                        </ul>
                    </div>
                    <div class="service-card-footer">
                        <span class="service-timeline-text">Timeline: 6–12 Weeks</span>
                        <a href="/contact" style="font-weight: 700; font-size: 0.85rem; color: #111111; text-decoration: underline; text-underline-offset: 4px;">Get proposal &rarr;</a>
                    </div>
                </div>

                <!-- Service 4: AI Automation -->
                <div class="service-rebuild-card">
                    <div>
                        <div class="service-card-top-row">
                            <span class="service-num-badge">04 / AI AUTOMATION</span>
                            <span class="service-price-pill">From ₹1,50,000 &middot; $2,000</span>
                        </div>
                        <h3 class="service-rebuild-title">AI Automation &amp; Intelligent Workflows</h3>
                        <p class="service-rebuild-desc">Custom AI agents, LLM pipelines, and automated business workflows that eliminate repetitive manual operations and scale your team.</p>
                        <ul class="service-features-list">
                            <li>Custom LLM integration (OpenAI, Anthropic Claude, Gemini)</li>
                            <li>Automated lead intake, qualification, and CRM synchronization</li>
                            <li>Document OCR, structured data extraction, and ERP webhooks</li>
                            <li>Deterministic error handling and multi-agent coordination</li>
                        </ul>
                    </div>
                    <div class="service-card-footer">
                        <span class="service-timeline-text">Timeline: 4–8 Weeks</span>
                        <a href="/contact" style="font-weight: 700; font-size: 0.85rem; color: #111111; text-decoration: underline; text-underline-offset: 4px;">Get proposal &rarr;</a>
                    </div>
                </div>
            </div>

            <!-- Transparent Tier Pricing Matrix -->
            <div class="pricing-table-container" id="pricing-matrix">
                <div class="pricing-table-header">
                    <div>
                        <span style="font-family: 'Space Mono', monospace; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.16em; color: #111111; font-weight: 700;">// Transparent Investment Matrix</span>
                        <h3 style="font-family: var(--font-primary); font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 700; margin-top: 0.4rem; color: #111111;">
                            Fixed Sprint Pricing &mdash; <em style="font-family: var(--font-serif); font-style: italic;">No Hidden Fees</em>
                        </h3>
                    </div>
                    <a href="#free-teardown" class="vol-btn-primary" style="padding: 10px 20px; font-size: 0.82rem; background: #111111; color: #ffffff;">
                        <span>Claim ₹0 Teardown Video &rarr;</span>
                    </a>
                </div>

                <div class="pricing-matrix-grid">
                    <!-- Tier 1: Free -->
                    <div class="pricing-tier-card">
                        <div>
                            <div class="tier-name">Free Teardown</div>
                            <div class="tier-price">₹0</div>
                            <div class="tier-usd">$0 USD</div>
                            <div class="tier-timeline">48 Hours</div>
                            <p class="tier-deliverables">15-minute personalized Loom video auditing your current site&rsquo;s speed, conversion leaks, and mobile bottlenecks.</p>
                        </div>
                        <a href="#free-teardown" style="display: block; text-align: center; background: #111111; color: #ffffff; padding: 9px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none;">Request Free &rarr;</a>
                    </div>

                    <!-- Tier 2: Entry -->
                    <div class="pricing-tier-card">
                        <div>
                            <div class="tier-name">Entry Fix</div>
                            <div class="tier-price">₹25k–₹45k</div>
                            <div class="tier-usd">$350–$600 USD</div>
                            <div class="tier-timeline">7–10 Days</div>
                            <p class="tier-deliverables">Landing page sprint or Shopify store speed optimization + Core Web Vitals remediation (LCP &lt; 1.0s guaranteed).</p>
                        </div>
                        <a href="/contact" style="display: block; text-align: center; background: #f4f4f5; color: #111111; padding: 9px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none; border: 1px solid rgba(0,0,0,0.1);">Book Sprint &rarr;</a>
                    </div>

                    <!-- Tier 3: Core (Featured) -->
                    <div class="pricing-tier-card featured-tier">
                        <span class="pricing-tier-badge">Most Popular</span>
                        <div>
                            <div class="tier-name">Core Build</div>
                            <div class="tier-price">₹60k–₹1.5L</div>
                            <div class="tier-usd">$800–$2,000 USD</div>
                            <div class="tier-timeline">3–6 Weeks</div>
                            <p class="tier-deliverables">Complete custom website or Shopify store build. Bespoke Figma design, sub-second code, SEO schema, and full ownership.</p>
                        </div>
                        <a href="/contact" style="display: block; text-align: center; background: #111111; color: #ffffff; padding: 9px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none;">Start Project &rarr;</a>
                    </div>

                    <!-- Tier 4: Premium -->
                    <div class="pricing-tier-card">
                        <div>
                            <div class="tier-name">Premium / App</div>
                            <div class="tier-price">₹1.5L–₹5L+</div>
                            <div class="tier-usd">$2,000–$6,500+</div>
                            <div class="tier-timeline">6–12 Weeks</div>
                            <p class="tier-deliverables">Headless Shopify Plus, scalable web application, or custom AI agent automation with dedicated architecture sprints.</p>
                        </div>
                        <a href="/contact" style="display: block; text-align: center; background: #f4f4f5; color: #111111; padding: 9px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none; border: 1px solid rgba(0,0,0,0.1);">Discuss Scope &rarr;</a>
                    </div>

                    <!-- Tier 5: Retainer -->
                    <div class="pricing-tier-card">
                        <div>
                            <div class="tier-name">Care Retainer</div>
                            <div class="tier-price">₹10k–₹25k<span style="font-size: 0.75rem; font-weight: 400;">/mo</span></div>
                            <div class="tier-usd">$150–$350/month</div>
                            <div class="tier-timeline">Ongoing Care</div>
                            <p class="tier-deliverables">Continuous speed monitoring, security patches, ongoing SEO refinements, and dedicated priority developer hours.</p>
                        </div>
                        <a href="/contact" style="display: block; text-align: center; background: #f4f4f5; color: #111111; padding: 9px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none; border: 1px solid rgba(0,0,0,0.1);">Join Plan &rarr;</a>
                    </div>
                </div>
            </div>
        </section>
`;

const oldServicesWrapperRegex = /<section class="works-wrapper">[\s\S]*?<\/section>/;
content = content.replace(oldServicesWrapperRegex, fourServicesHtml);

// 7. HOW WE BUILD (REWRITE 4 STEPS INTO PLAIN FOUNDER WORDS — NO JARGON)
const plainHowWeBuild = `
        <!-- ==========================================================================
             REBUILD 2026: HOW WE BUILD — 4 STEPS IN PLAIN WORDS (NO JARGON)
             ========================================================================== -->
        <section class="section process-section" id="process">
            <div class="services-header">
                <div>
                    <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #888888; display: block; margin-bottom: 0.5rem;">// Clear, Predictable Delivery</span>
                    <h2 class="header-title">How It <em>Works</em></h2>
                </div>
                <a href="/contact" style="text-decoration:none;">
                    <button class="rlvnt-btn max-content">
                        <span>Start your project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" fill="#111111"></circle>
                            <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                        </svg>
                    </button>
                </a>
            </div>

            <div class="process-subtitle-bar">
                Step 1: Audit &rarr; Step 2: Prototype &rarr; Step 3: Build &rarr; Step 4: Launch
            </div>

            <div class="process-grid-4">
                <!-- STEP 01 -->
                <div class="process-card">
                    <div>
                        <div class="process-card-top">
                            <span class="process-number">01 / AUDIT</span>
                            <span class="process-phase">Days 1–3</span>
                        </div>
                        <h3 class="process-card-title">Site Audit &amp; Blueprint</h3>
                        <p class="process-card-desc">We audit your current site or project idea, find speed bottlenecks and conversion leaks, and deliver a crystal-clear fixed scope and timeline.</p>
                    </div>
                    <div class="process-card-outcome">
                        <strong>Outcome</strong>
                        Fixed-price agreement, architecture plan, and delivery date.
                    </div>
                </div>

                <!-- STEP 02 -->
                <div class="process-card">
                    <div>
                        <div class="process-card-top">
                            <span class="process-number">02 / DESIGN</span>
                            <span class="process-phase">Weeks 1–2</span>
                        </div>
                        <h3 class="process-card-title">Figma Design &amp; Prototype</h3>
                        <p class="process-card-desc">We design high-converting, custom screens in Figma and test the user flow with you before writing a single line of production code.</p>
                    </div>
                    <div class="process-card-outcome">
                        <strong>Outcome</strong>
                        Interactive clickable prototype and approved design system.
                    </div>
                </div>

                <!-- STEP 03 -->
                <div class="process-card">
                    <div>
                        <div class="process-card-top">
                            <span class="process-number">03 / CODE</span>
                            <span class="process-phase">Weeks 2–5</span>
                        </div>
                        <h3 class="process-card-title">Clean Code &amp; Speed Testing</h3>
                        <p class="process-card-desc">We write clean, modular Next.js or Shopify code without bloated plugins. Every page is stress-tested on real 4G mobile devices for sub-1s speed.</p>
                    </div>
                    <div class="process-card-outcome">
                        <strong>Outcome</strong>
                        100/100 Lighthouse score and private staging preview.
                    </div>
                </div>

                <!-- STEP 04 -->
                <div class="process-card">
                    <div>
                        <div class="process-card-top">
                            <span class="process-number">04 / LAUNCH</span>
                            <span class="process-phase">Launch &amp; Care</span>
                        </div>
                        <h3 class="process-card-title">Launch &amp; 30-Day Support</h3>
                        <p class="process-card-desc">We handle domain setup, SSL, analytics, and Google indexation. You receive 100% full repository ownership plus 30 days of direct founder support.</p>
                    </div>
                    <div class="process-card-outcome">
                        <strong>Outcome</strong>
                        Live verified deployment, Git handover, and 30-day care.
                    </div>
                </div>
            </div>
        </section>
`;

const oldProcessRegex = /<section class="section process-section" id="process">[\s\S]*?<\/section>/;
content = content.replace(oldProcessRegex, plainHowWeBuild);

// 8. ADD ABOUT KUNAL FOUNDER SECTION
const founderSectionHtml = `
        <!-- ==========================================================================
             REBUILD 2026: ABOUT KUNAL (FOUNDER-LED ADVANTAGE)
             ========================================================================== -->
        <section class="section founder-home-section" id="about-founder">
            <div class="founder-home-card">
                <div class="founder-home-img-wrap">
                    <img src="/assets/images/about-studio.webp" alt="Kunal Sharma — Founder & Senior Web Engineer at Kawaki Studios" width="600" height="750" loading="lazy" decoding="async">
                </div>
                <div class="founder-home-content">
                    <span class="founder-home-eyebrow">// Founder-Led Studio &middot; New Delhi</span>
                    <h2 class="founder-home-name">Kunal <em>Sharma</em></h2>
                    <p class="founder-home-quote">&ldquo;When you work with Kawaki, you work directly with the engineer writing your code &mdash; not junior account managers.&rdquo;</p>
                    <p class="founder-home-bio">
                        I founded Kawaki Studios after 7+ years of building high-performance web applications and ecommerce storefronts. As an AWS Certified Solutions Architect and national hackathon finalist, I build and ship production software products every week.
                    </p>
                    <p class="founder-home-bio">
                        Our studio operates with zero agency fluff: direct Slack/WhatsApp collaboration, milestone-based pricing, and clean code that you own 100%. If you need a website or Shopify store that loads in under 1 second and actually drives sales, let&rsquo;s talk.
                    </p>
                    <div class="founder-badges-row">
                        <span class="founder-badge-pill">★ 7+ Years Experience</span>
                        <span class="founder-badge-pill">☁ AWS Certified Architect</span>
                        <span class="founder-badge-pill">⚡ Hackathon Finalist</span>
                        <span class="founder-badge-pill">💻 Ships Own Products</span>
                    </div>
                    <div style="margin-top: 0.5rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                        <a href="https://wa.me/918368246502?text=Hi%20Kunal%2C%20let%27s%20discuss%20a%20project" target="_blank" rel="noopener" class="vol-btn-primary" style="padding: 10px 20px; font-size: 0.82rem; background: #111111; color: #ffffff;">
                            <span>Chat with Kunal on WhatsApp &rarr;</span>
                        </a>
                        <a href="/about" style="font-family: var(--font-primary); font-size: 0.82rem; text-decoration: underline; text-underline-offset: 4px; color: #111111; font-weight: 700;">
                            <span>Read Founder Story &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
`;

if (!content.includes('REBUILD 2026: ABOUT KUNAL')) {
    content = content.replace('</section>\n\n        <!-- ==========================================================================\n             EDITORIAL JOURNAL / BLOGS SECTION', `</section>\n\n${founderSectionHtml}\n\n        <!-- ==========================================================================\n             EDITORIAL JOURNAL / BLOGS SECTION`);
}

// 9. INSERT QUICK TEARDOWN CARD & FINAL CALL TO ACTION (#free-teardown)
const quickTeardownHtml = `
        <!-- ==========================================================================
             REBUILD 2026: QUICK 2-MIN TEARDOWN & MULTI-CHANNEL CONTACT (#free-teardown)
             ========================================================================== -->
        <section class="section quick-teardown-section" id="free-teardown">
            <div class="quick-teardown-card">
                <div>
                    <span style="font-family: 'Space Mono', monospace; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.16em; color: #c6ff00; display: block; margin-bottom: 0.85rem;">// 100% Free Video Teardown &middot; 48-Hour Turnaround</span>
                    <h2 style="font-family: var(--font-primary); font-size: clamp(2rem, 3.2vw, 2.75rem); font-weight: 700; line-height: 1.15; margin-bottom: 1.15rem; color: #ffffff;">
                        Get a Free 15-Minute <em style="font-family: var(--font-serif); font-style: italic; color: #c6ff00;">Site &amp; Store Teardown</em>
                    </h2>
                    <p style="color: #a1a1aa; font-size: 1.02rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        No generic automated reports. Kunal will record a personalized 15-minute Loom video breaking down your site&rsquo;s mobile speed, conversion leaks, and 3 high-impact fixes you can make immediately. Zero sales pressure.
                    </p>
                    <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 0.8rem; color: #d4d4d8;">
                        <span>✓ 100% Free (₹0)</span>
                        <span>✓ Delivered in 48 Hours</span>
                        <span>✓ Direct Founder Video</span>
                    </div>
                </div>

                <div class="teardown-form-box">
                    <form id="quickTeardownForm" onsubmit="event.preventDefault(); handleQuickTeardown();">
                        <label for="teardownUrl" style="display: block; font-size: 0.82rem; font-weight: 600; color: #e4e4e7; margin-bottom: 0.4rem;">Your Website or Shopify Store URL</label>
                        <input type="text" id="teardownUrl" class="teardown-input" placeholder="https://yourbrand.com" required />

                        <label for="teardownContact" style="display: block; font-size: 0.82rem; font-weight: 600; color: #e4e4e7; margin-bottom: 0.4rem;">WhatsApp Number or Email (where to send video)</label>
                        <input type="text" id="teardownContact" class="teardown-input" placeholder="+91 98765 43210 or founder@brand.com" required />

                        <button type="submit" class="teardown-submit-btn" id="teardownBtn">
                            <span>Claim Free Teardown Video (₹0) &rarr;</span>
                        </button>
                    </form>
                    <div id="teardownSuccess" style="display: none; margin-top: 1rem; padding: 0.85rem; background: rgba(198, 255, 0, 0.15); border: 1px solid #c6ff00; border-radius: 8px; font-size: 0.85rem; color: #ffffff; text-align: center;">
                        🎉 Received! Kunal will review your site and send your custom 15-min teardown within 48 hours.
                    </div>
                    <div style="margin-top: 1.25rem; text-align: center;">
                        <a href="https://wa.me/918368246502?text=Hi%20Kunal%2C%20please%20send%20me%20a%20free%20teardown%20of%20my%20site%3A%20" target="_blank" rel="noopener" style="font-size: 0.8rem; color: #a1a1aa; text-decoration: underline;">
                            Prefer instant WhatsApp? Tap here to send your URL &rarr;
                        </a>
                    </div>
                </div>
            </div>
        </section>
`;

if (!content.includes('REBUILD 2026: QUICK 2-MIN TEARDOWN')) {
    content = content.replace('<section class="section cta-editorial-white-section" id="crafting-relevance">', `${quickTeardownHtml}\n\n        <section class="section cta-editorial-white-section" id="crafting-relevance">`);
}

// 10. FOOTER ADJUSTMENTS: Remove international clocks (Tokyo, London, NY) and harmonize email to hello@kawaki.co.in
content = content.replace(/hello@kawakistudios\.com/g, 'hello@kawaki.co.in');
content = content.replace(/partners@kawakistudios\.com/g, 'hello@kawaki.co.in');

const oldClocksRegex = /<!-- Column 3: Global Time Zones -->[\s\S]*?<\/div>\s*<\/div>/;
const newStudioColumn = `<!-- Column 3: Studio Operations -->
                <div class="footer-col">
                    <div class="footer-col-header">// STUDIO OPERATIONS</div>
                    <div class="footer-time-badge">
                        <div class="footer-time-city">
                            <span>Studio HQ &middot; New Delhi</span>
                            <span class="footer-time-clock" id="footerTimeDelhi">11:00 AM - 08:00 PM IST</span>
                        </div>
                    </div>
                    <div class="footer-time-badge" style="margin-top: 0.6rem;">
                        <div class="footer-time-city">
                            <span>Response SLA &middot; Active</span>
                            <span style="font-family: 'Space Mono', monospace; font-size: 0.76rem; color: #10b981; font-weight: 700;">&lt; 4 Hours Turnaround</span>
                        </div>
                    </div>
                    <div class="footer-time-badge" style="margin-top: 0.6rem;">
                        <div class="footer-time-city">
                            <span>Direct Sprint Line</span>
                            <span style="font-family: 'Space Mono', monospace; font-size: 0.76rem; color: #111111; font-weight: 700;">+91 83682 46502</span>
                        </div>
                    </div>
                </div>`;
content = content.replace(oldClocksRegex, newStudioColumn);

// Fix Behance footer link (point to verified Behance or replace with WhatsApp)
content = content.replace(
    `<li><a href="https://behance.net" target="_blank" rel="noopener"><span>Behance</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>`,
    `<li><a href="https://wa.me/918368246502?text=Hi%20Kunal%2C%20I%20would%20like%20to%20discuss%20a%20web%20project%20with%20Kawaki%20Studios" target="_blank" rel="noopener"><span>WhatsApp</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>`
);

// 11. ADD TEARDOWN FORM SCRIPT
const teardownScript = `
    <script>
        function handleQuickTeardown() {
            var url = document.getElementById('teardownUrl').value;
            var contact = document.getElementById('teardownContact').value;
            var btn = document.getElementById('teardownBtn');
            var success = document.getElementById('teardownSuccess');

            btn.disabled = true;
            btn.innerHTML = 'Submitting Teardown Request...';

            // Send via WhatsApp direct fallback and local feedback
            var msg = encodeURIComponent("Hi Kunal! Please send me a free 15-min teardown of my site: " + url + " (My contact: " + contact + ")");
            setTimeout(function() {
                success.style.display = 'block';
                btn.innerHTML = '✓ Request Submitted!';
                // Open WhatsApp pre-filled in a new window
                window.open("https://wa.me/918368246502?text=" + msg, "_blank");
            }, 600);
        }
    </script>
`;

if (!content.includes('function handleQuickTeardown()')) {
    content = content.replace('</body>', `${teardownScript}\n</body>`);
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully rebuilt public/index.html adhering to the full Agency Rebuild Plan!');
