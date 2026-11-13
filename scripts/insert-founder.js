const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Ensure CRLF safe replacements
// Let's define the Founder section HTML:
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

// Insert Founder Section right before Editorial Blog section
const blogSectionMarker = `<!-- ==========================================================================\r\n             EDITORIAL JOURNAL / BLOGS SECTION`;
const blogSectionMarkerLF = `<!-- ==========================================================================\n             EDITORIAL JOURNAL / BLOGS SECTION`;

if (!content.includes('id="about-founder"')) {
    if (content.includes(blogSectionMarker)) {
        content = content.replace(blogSectionMarker, `${founderSectionHtml}\r\n\r\n        ${blogSectionMarker}`);
    } else if (content.includes(blogSectionMarkerLF)) {
        content = content.replace(blogSectionMarkerLF, `${founderSectionHtml}\n\n        ${blogSectionMarkerLF}`);
    } else {
        // Fallback: insert before id="editorial-notes"
        content = content.replace('<section class="section home-blogs-section" id="editorial-notes">', `${founderSectionHtml}\n\n        <section class="section home-blogs-section" id="editorial-notes">`);
    }
}

// Now let's adjust the order between Services and Process:
// The audit suggested order:
// 1. Hero
// 2. Client Logos
// 3. 3 Case Studies
// 4. Testimonials (3)
// 5. 4 Services + Starting price in INR
// 6. How it works (4 steps, plain words)
// 7. About Kunal (photo + 3 lines)
// 8. FAQ & Blogs
// 9. Final call to action: WhatsApp + book a call (and quick teardown)

// Let's swap the Services section and Process section so Services comes right after Testimonials (or mid-conversion-strip), followed by How it works!
// Let's check if mid-conversion-strip is between testimonials and process:
// We can let Services appear right after Testimonials, then How It Works, then About Kunal!

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Founder section inserted successfully!');
