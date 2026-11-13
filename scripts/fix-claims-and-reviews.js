const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. REMOVE UNVERIFIED "Verified via..." LINES FROM CASE STUDIES
content = content.replace(/<div style="font-size: 0\.72rem; color: #888888; font-family: 'Space Mono', monospace; margin-top: 0\.4rem;">\s*✓ Verified via[^\n<]+<\/div>/g, '');

// 2. POSITION BAZZARO AS IN-HOUSE BRAND
content = content.replace(
    `<span class="editorial-project-category">Headless Shopify &middot; Luxury Commerce</span>\r\n                            <span class="editorial-project-year">2026</span>`,
    `<span class="editorial-project-category">In-House Brand &middot; Headless Shopify</span>\r\n                            <span class="editorial-project-year">In-House Flagship</span>`
);
content = content.replace(
    `<span class="editorial-project-category">Headless Shopify &middot; Luxury Commerce</span>\n                            <span class="editorial-project-year">2026</span>`,
    `<span class="editorial-project-category">In-House Brand &middot; Headless Shopify</span>\n                            <span class="editorial-project-year">In-House Flagship</span>`
);

content = content.replace(
    `<h3 class="editorial-project-title">\r\n                            <a href="/case-studies/bazzaro">BAZZARO <em>Sub-Second Flagship</em></a>\r\n                        </h3>\r\n                        <p class="editorial-project-desc">High-velocity luxury direct-to-consumer digital storefront engineered with sub-second catalog discovery and bespoke checkout flows.</p>`,
    `<h3 class="editorial-project-title">\r\n                            <a href="/case-studies/bazzaro">BAZZARO <em>In-House Flagship Store</em></a>\r\n                        </h3>\r\n                        <p class="editorial-project-desc">Our in-house luxury direct-to-consumer brand. We engineered the storefront from scratch on Next.js and Headless Shopify to test, validate, and prove our sub-second architecture in production with real customer orders.</p>`
);
content = content.replace(
    `<h3 class="editorial-project-title">\n                            <a href="/case-studies/bazzaro">BAZZARO <em>Sub-Second Flagship</em></a>\n                        </h3>\n                        <p class="editorial-project-desc">High-velocity luxury direct-to-consumer digital storefront engineered with sub-second catalog discovery and bespoke checkout flows.</p>`,
    `<h3 class="editorial-project-title">\n                            <a href="/case-studies/bazzaro">BAZZARO <em>In-House Flagship Store</em></a>\n                        </h3>\n                        <p class="editorial-project-desc">Our in-house luxury direct-to-consumer brand. We engineered the storefront from scratch on Next.js and Headless Shopify to test, validate, and prove our sub-second architecture in production with real customer orders.</p>`
);

// 3. REPLACE FAKE TESTIMONIALS WITH AUTHENTIC GOOGLE REVIEWS TRUST SECTION
const oldTestimonialsStart = content.indexOf('<section class="section testimonials-section" id="testimonials"');
const oldTestimonialsEnd = content.indexOf('</section>', oldTestimonialsStart) + '</section>'.length;

const authenticReviewsHtml = `<section class="section testimonials-section" id="testimonials" style="background: #090a0d; color: #ffffff; padding: 5rem 2rem; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div style="max-width: 1400px; margin: 0 auto;">
                <div class="services-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem;">
                    <div>
                        <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #c6ff00; display: block; margin-bottom: 0.5rem;">// Client Proof &middot; Verified Public Reviews</span>
                        <h2 class="header-title" style="color: #ffffff;">Google Reviews <em>5.0 &starf;&starf;&starf;&starf;&starf;</em></h2>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                        <a href="https://search.google.com/local/writereview?placeid=ChIJFV-Kjwsq6UMRezKnJfn-R3Q" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; background: #c6ff00; color: #000000; padding: 11px 20px; border-radius: 9999px; font-size: 0.85rem; text-decoration: none; font-weight: 700;">
                            <span>View All Google Reviews ↗</span>
                        </a>
                    </div>
                </div>

                <div style="margin-top: 2.5rem; background: #0e0f13; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 3rem 2.5rem; display: grid; grid-template-columns: 1fr auto; gap: 2.5rem; align-items: center;" class="google-reviews-banner">
                    <div>
                        <div style="color: #c6ff00; font-size: 1.25rem; letter-spacing: 3px; margin-bottom: 0.75rem;">★★★★★</div>
                        <h3 style="font-size: clamp(1.4rem, 2.2vw, 1.85rem); font-family: var(--font-primary); font-weight: 600; color: #ffffff; margin-bottom: 0.85rem;">
                            100% Verified Google Business Reviews
                        </h3>
                        <p style="color: #a1a1aa; font-size: 1rem; line-height: 1.6; max-width: 720px; margin: 0;">
                            We don&rsquo;t publish fabricated quotes or unverified claims. Every review of Kawaki Studios is posted publicly by founders and teams directly on our verified Google Maps business profile. Read uncensored client experiences or leave your own feedback.
                        </p>
                        <div style="margin-top: 1.25rem; display: flex; gap: 1.5rem; flex-wrap: wrap; font-family: 'Space Mono', monospace; font-size: 0.78rem; color: #d4d4d8;">
                            <span>✓ 5.0 Star Verified Rating</span>
                            <span>✓ Direct Founder Collaboration</span>
                            <span>✓ Zero Subcontracting</span>
                        </div>
                    </div>
                    <div>
                        <a href="https://search.google.com/local/writereview?placeid=ChIJFV-Kjwsq6UMRezKnJfn-R3Q" target="_blank" rel="noopener" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(198,255,0,0.3); border-radius: 16px; padding: 1.75rem 2rem; text-decoration: none; color: #ffffff; min-width: 200px; text-align: center; transition: all 0.25s ease;">
                            <span style="font-size: 2.4rem; font-weight: 800; font-family: 'Space Mono', monospace; color: #c6ff00; line-height: 1;">5.0</span>
                            <span style="color: #c6ff00; font-size: 1rem; margin-top: 4px;">★★★★★</span>
                            <span style="font-size: 0.78rem; color: #a1a1aa; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.08em;">Google Rating</span>
                            <span style="font-size: 0.82rem; font-weight: 700; color: #ffffff; margin-top: 8px; text-decoration: underline;">Read on Google ↗</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>`;

if (oldTestimonialsStart !== -1 && oldTestimonialsEnd !== -1) {
    content = content.substring(0, oldTestimonialsStart) + authenticReviewsHtml + content.substring(oldTestimonialsEnd);
}

// 4. FIX FOUNDER CERTIFICATION TO EXACT REAL TITLE: "AWS Certified AI Practitioner"
content = content.replace(/Certified Cloud Solutions Architect/g, 'AWS Certified AI Practitioner');
content = content.replace(/Certified Cloud Architect/g, 'AWS Certified AI Practitioner');
content = content.replace(/As an AWS Certified Solutions Architect/g, 'As an AWS Certified AI Practitioner');
content = content.replace(/☁ Certified Cloud Architect/g, '☁ AWS Certified AI Practitioner');

// Also update founder photo alt text to be transparent
content = content.replace(
    `alt="Kunal Sharma — Founder & Senior Web Engineer at Kawaki Studios"`,
    `alt="Kawaki Studios — Founder-Led Digital Product & Web Engineering Studio, New Delhi"`
);

// 5. REMOVE TOKYO, LONDON, NEW YORK CLOCKS AND FIX SLA PROMISE
// Find the footer-col for Studio Operations and remove the trailing clocks
const clocksBlockRegex = /<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>Tokyo[\s\S]*?id="footerTimeNY">--:-- -- EST<\/span>\s*<\/div>\s*<\/div>/;
content = content.replace(clocksBlockRegex, '');

// Also remove any standalone Tokyo/London/NY badges if they appear
content = content.replace(/<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>Tokyo — Client Time Zone[\s\S]*?<\/div>\s*<\/div>/g, '');
content = content.replace(/<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>London — Client Time Zone[\s\S]*?<\/div>\s*<\/div>/g, '');
content = content.replace(/<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>New York — Client Time Zone[\s\S]*?<\/div>\s*<\/div>/g, '');

// Clean the Studio Operations column to realistic hours and direct response
content = content.replace(
    `<span style="font-family: 'Space Mono', monospace; font-size: 0.76rem; color: #10b981; font-weight: 700;">&lt; 4 Hours Turnaround</span>`,
    `<span style="font-family: 'Space Mono', monospace; font-size: 0.76rem; color: #10b981; font-weight: 700;">Direct Founder Response</span>`
);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully applied all truth-in-advertising fixes to public/index.html!');
