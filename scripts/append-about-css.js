const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../public/assets/css/global.css');

const cssToAppend = `
/* --- ABOUT PAGE REDESIGN CLASSES --- */

/* Immersive Hero */
.about-immersive-hero {
    position: relative;
    width: 100vw;
    height: 100vh;
    min-height: 800px;
    background-image: url('../images/about_hero_bg.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
    margin-top: -80px; /* Offset the navbar */
    padding-top: 80px; /* Prevent content from hiding behind navbar */
}

.about-immersive-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%);
    z-index: 1;
}

.about-hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    padding: 0 2rem;
}

.about-hero-content h1 {
    font-size: clamp(3rem, 8vw, 7.5rem);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: 0.02em;
    margin-bottom: 2rem;
}

/* Transparent Navbar state */
.navbar-inner-page.transparent {
    background-color: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

/* Split Layout Section (Becoming Digital-Crafters) */
.about-split-section {
    padding: 10rem 4rem;
    background-color: #f9f4eb;
    color: var(--base-200);
}

.split-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1480px;
    margin: 0 auto;
}

.split-left h2 {
    font-size: clamp(3rem, 6vw, 5rem);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 0.95;
    position: sticky;
    top: 120px;
}

.split-right .about-text {
    font-size: 1.8rem;
    line-height: 1.5;
    margin-bottom: 2.5rem;
    font-family: 'Satoshi', sans-serif;
}

/* Services Grid (3 Columns) */
.about-services-section {
    padding: 8rem 4rem;
    background-color: #e6e2d6; /* Cream */
    color: var(--base-200);
}

.services-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1480px;
    margin: 0 auto;
}

.service-card-clean {
    border-top: 2px solid var(--base-200);
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.service-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.service-num {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
}

.service-icon {
    width: 40px;
    height: 40px;
    border: 1px solid var(--base-200);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.service-card-clean h3 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1;
    margin: 2rem 0;
}

.service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
}

.service-tags span {
    font-family: 'Satoshi', sans-serif;
    font-size: 0.85rem;
    padding: 0.4rem 1rem;
    border: 1px solid rgba(20,20,20,0.2);
    border-radius: 50px;
}

/* Core Team Section */
.team-section {
    padding: 10rem 4rem;
    background: #f9f4eb;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1480px;
    margin: 4rem auto 0;
}

.team-member img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}

.team-member:hover img {
    filter: grayscale(0%);
}

.team-member h4 {
    margin-top: 1.5rem;
    font-family: 'Satoshi', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
}

.team-member p {
    font-family: 'Satoshi', sans-serif;
    color: rgba(20,20,20,0.6);
    margin-top: 0.5rem;
}

/* FAQ Accordion */
.faq-section {
    padding: 8rem 4rem;
    background: var(--base-200);
    color: #f9f4eb;
}

.faq-container {
    max-width: 1000px;
    margin: 0 auto;
}

.faq-item {
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 2.5rem 0;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.faq-question h3 {
    font-family: 'Satoshi', sans-serif;
    font-size: 2rem;
    font-weight: 500;
}

.faq-toggle {
    width: 50px;
    height: 50px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: transform 0.3s ease, background 0.3s ease;
}

.faq-item.active .faq-toggle {
    transform: rotate(45deg);
    background: #fff;
    color: var(--base-200);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
}

.faq-answer p {
    padding-top: 2rem;
    font-family: 'Satoshi', sans-serif;
    font-size: 1.25rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.7);
    max-width: 800px;
}

/* Oval CTA Button */
.oval-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 3rem;
    background: #e85d45;
    color: #fff;
    font-family: 'Satoshi', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 100px; /* fully rounded oval */
    text-decoration: none;
    transition: transform 0.3s ease, background 0.3s ease;
}

.oval-btn:hover {
    background: #d44c35;
    transform: translateY(-5px);
}

/* Massive Pre-Footer CTA */
.pre-footer-cta {
    padding: 12rem 4rem;
    text-align: center;
    background: #f9f4eb;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.pre-footer-cta h2 {
    font-size: clamp(4rem, 10vw, 9rem);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.9;
    margin-bottom: 4rem;
    color: var(--base-200);
}

@media (max-width: 992px) {
    .split-grid, .services-grid-3, .team-grid {
        grid-template-columns: 1fr;
    }
    .split-left h2 {
        position: static;
        margin-bottom: 2rem;
    }
}
`;

fs.appendFileSync(cssPath, cssToAppend);
console.log('Appended About Page CSS to global.css');
