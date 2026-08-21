const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '../public/about.html');
let html = fs.readFileSync(aboutPath, 'utf8');

const newMain = `<main>
    <section class="about-immersive-hero">
        <div class="about-hero-content">
            <h1>We are Kawaki <span class="serif-italic" style="text-transform:lowercase; font-weight:normal;">Studios</span></h1>
        </div>
    </section>

    <section class="about-split-section">
        <div class="split-grid">
            <div class="split-left">
                <h2>Becoming<br><span class="serif-italic" style="text-transform:lowercase; font-weight:normal; color:#e85d45;">Digital-Crafters</span></h2>
            </div>
            <div class="split-right">
                <p class="about-text">
                    Kawaki is a development studio in Delhi. We don't use page templates &mdash; every site is designed from your positioning, built on modern frameworks, and handed over with a codebase your own team can actually maintain.
                </p>
                <p class="about-text">
                    Our approach bridges the gap between high-end editorial design and rigorous software engineering. We believe that a website should not only look stunning but perform flawlessly across all devices and network conditions.
                </p>
            </div>
        </div>
    </section>

    <section class="about-services-section">
        <div class="services-grid-3">
            <div class="service-card-clean">
                <div class="service-card-top">
                    <span class="service-num">01</span>
                    <div class="service-icon">&nearr;</div>
                </div>
                <h3>Brand<br>Strategy</h3>
                <div class="service-tags">
                    <span>Positioning</span>
                    <span>Identity</span>
                </div>
            </div>
            <div class="service-card-clean">
                <div class="service-card-top">
                    <span class="service-num">02</span>
                    <div class="service-icon">&nearr;</div>
                </div>
                <h3>Web<br>Development</h3>
                <div class="service-tags">
                    <span>Engineering</span>
                    <span>Performance</span>
                </div>
            </div>
            <div class="service-card-clean">
                <div class="service-card-top">
                    <span class="service-num">03</span>
                    <div class="service-icon">&nearr;</div>
                </div>
                <h3>Digital<br>Products</h3>
                <div class="service-tags">
                    <span>SaaS</span>
                    <span>E-Commerce</span>
                </div>
            </div>
        </div>
    </section>

    <section class="team-section">
        <h2 style="font-size: clamp(3rem, 6vw, 5rem); font-family: 'Barlow Condensed'; font-weight:800; text-transform:uppercase; text-align:center; color: var(--base-200);">Core <span class="serif-italic" style="text-transform:lowercase; font-weight:normal;">Team</span></h2>
        <div class="team-grid">
            <div class="team-member">
                <img src="/assets/images/team_placeholder.jpg" alt="Team Member">
                <h4>Kunal Sharma</h4>
                <p>Founder & Technical Lead</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/team_placeholder.jpg" alt="Team Member">
                <h4>Jane Doe</h4>
                <p>Design Director</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/team_placeholder.jpg" alt="Team Member">
                <h4>John Smith</h4>
                <p>Senior Engineer</p>
            </div>
        </div>
    </section>

    <section class="faq-section">
        <div class="faq-container">
            <h2 style="font-size: clamp(3rem, 6vw, 5rem); font-family: 'Barlow Condensed'; font-weight:800; text-transform:uppercase; margin-bottom: 3rem;">Frequently <span class="serif-italic" style="text-transform:lowercase; font-weight:normal; color:#e85d45;">Asked</span></h2>
            
            <div class="faq-item">
                <div class="faq-question">
                    <h3>Do you work with startups?</h3>
                    <div class="faq-toggle">+</div>
                </div>
                <div class="faq-answer">
                    <p>Yes. We love partnering with early-stage founders to build scalable MVPs and striking landing pages that convert.</p>
                </div>
            </div>
            <div class="faq-item">
                <div class="faq-question">
                    <h3>What technologies do you use?</h3>
                    <div class="faq-toggle">+</div>
                </div>
                <div class="faq-answer">
                    <p>We specialize in modern web stacks including React, Next.js, Node, GSAP for animations, and headless CMS solutions to give you full control.</p>
                </div>
            </div>
            <div class="faq-item">
                <div class="faq-question">
                    <h3>How long does a typical project take?</h3>
                    <div class="faq-toggle">+</div>
                </div>
                <div class="faq-answer">
                    <p>Depending on the scope, most of our web development projects range from 4 to 12 weeks from strategy to deployment.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="pre-footer-cta">
        <h2>Crafting Relevance<br><span class="serif-italic" style="text-transform:lowercase; font-weight:normal; color:#e85d45;">One Brand At A Time</span></h2>
        <a href="/contact" class="oval-btn">Start a project &nearr;</a>
    </section>

    <!-- Standard Footer -->`;

// Replace <main>...</main> excluding the footer
const mainRegex = /<main>([\s\S]*?)<!-- Standard Footer -->/i;
html = html.replace(mainRegex, newMain + '\n\n    <!-- Standard Footer -->');

// Make navbar transparent
html = html.replace('<nav class="navbar-inner-page">', '<nav class="navbar-inner-page transparent">');

// Add GSAP scripts for accordion and navbar
const scriptRegex = /<script>([\s\S]*?)<\/script>/i;
const newScript = `<script>
        gsap.registerPlugin(ScrollTrigger);

        document.addEventListener("DOMContentLoaded", () => {
            const lenis = new Lenis();
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((t) => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);

            // Intro Tagline Reveal for inner hero
            const introH1 = document.querySelector(".inner-hero-content h1, .about-hero-content h1");
            if (introH1) {
                gsap.fromTo(introH1, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
            }

            // Navbar transparency toggle on scroll
            const navbar = document.querySelector('.navbar-inner-page');
            window.addEventListener('scroll', () => {
                if(window.scrollY > 50) {
                    navbar.classList.remove('transparent');
                } else {
                    navbar.classList.add('transparent');
                }
            });

            // FAQ Accordion Logic
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all
                    faqItems.forEach(faq => {
                        faq.classList.remove('active');
                        faq.querySelector('.faq-answer').style.maxHeight = null;
                    });
                    
                    // If it wasn't active, open it
                    if(!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            });
        });
    </script>`;
html = html.replace(scriptRegex, newScript);

fs.writeFileSync(aboutPath, html);
console.log('Rewrote about.html with new structure and animations.');
