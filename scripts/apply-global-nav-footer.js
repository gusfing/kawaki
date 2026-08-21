const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'about.html', 
    'blog.html', 
    'case-studies.html', 
    'case-studies/acme-headless-ecommerce.html',
    'contact.html',
    'index.html',
    'services.html'
];

const newNav = `
    <div class="nav-wrapper scrolled" id="globalNav">
        <nav>
            <a href="/index.html" class="nav-left">
                <span class="nav-logo">Kawaki Studios</span>
            </a>
            <a class="nav-center" href="mailto:hello@kawakistudios.com">hello@kawakistudios.com <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"></path></svg></a>
            <div class="nav-right" id="menuToggleBtn">
                <span id="menu-toggle-text">MENU</span>
                <div id="menu-toggle-icon">
                    <div class="bar bar-top"></div>
                    <div class="bar bar-bottom"></div>
                </div>
            </div>
        </nav>
    </div>

    <div class="fullscreen-menu" id="fullscreenMenu">
        <div class="menu-overlay-layer"></div>
        <div class="menu-overlay-layer"></div>
        <div class="menu-content-wrapper">
            <span class="span-menu"><em>kawaki</em></span>
            <div class="menu-layout">
                <div class="menu-col-left">
                    <div class="main-menu-links">
                        <ul>
                            <li><a href="/about.html"><span>About </span><span class="font-serif-italic">Kawaki Studios</span></a></li>
                            <li><a href="/case-studies.html"><span>Selected </span><span class="font-serif-italic">Work</span></a></li>
                            <li><a href="/services.html"><span>Explore </span><span class="font-serif-italic">Our Services</span></a></li>
                            <li><a href="/blog.html"><span>Blogs and </span><span class="font-serif-italic">Insights</span></a></li>
                            <li><a href="/contact.html"><span>Schedule free </span><span class="font-serif-italic">Discovery Call</span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="menu-col-right">
                    <div class="menu-info">
                        <a href="/contact.html" style="text-decoration:none;">
                            <button class="rlvnt-btn max-content">
                                <span>connect now</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" fill="#FC4625"></circle>
                                    <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                                </svg>
                            </button>
                        </a>
                        <div class="socials-trigger-rlvnt">
                            <span class="socials-label-rlvnt">Socials</span>
                            <div class="socials-row-rlvnt">
                                <a href="https://linkedin.com" target="_blank">LinkedIn.</a>
                                <a href="https://twitter.com" target="_blank">Twitter.</a>
                                <a href="https://instagram.com" target="_blank">Instagram.</a>
                                <a href="https://behance.net" target="_blank">Behance.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const newFooter = `
    <footer class="sections global-site-footer">
        <div class="services-header-2">
            <h3 class="left services-title-2">Ready to talk?</h3>
            <div class="svg-container"> 
                <img src="/assets/images/Hello.png" alt="Hello" class="hello-image wave-hover" onerror="this.src='https://ik.imagekit.io/rlvntstudios/rlvntsite/others/Hello.png';"> 
            </div>
            <h3 class="right services-title-2"><em>let's connect</em></h3>
        </div>
        <div class="footer-content">
            <div class="new-options">
                <a href="mailto:hello@kawakistudios.com">hello@kawakistudios.com 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"> 
                        <circle cx="8" cy="8" r="8" fill="#FC4625"></circle> 
                        <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path> 
                    </svg>
                </a>
                <a href="/contact.html">connect on a call with founder 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"> 
                        <circle cx="8" cy="8" r="8" fill="#FC4625"></circle> 
                        <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path> 
                    </svg> 
                </a>
                <a href="/about.html">curious? find us 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"> 
                        <circle cx="8" cy="8" r="8" fill="#FC4625"></circle> 
                        <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path> 
                    </svg> 
                </a>
            </div>
            <a href="/contact.html" style="text-decoration:none;">
                <button class="rlvnt-btn max-content">
                    <span>connect now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"> 
                        <circle cx="8" cy="8" r="8" fill="#FC4625"></circle> 
                        <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path> 
                    </svg>
                </button>
            </a>
        </div>
        <div class="footer-bottom">
            <div class="links">
                <button id="backToTop" aria-label="Go to top" class="btn-top" title="Go to top">↑ Top</button>
                <a href="/about.html">Privacy Policy</a>
                <div class="socials-trigger-rlvnt">
                    <span class="socials-label-rlvnt">Socials</span>
                    <div class="socials-row-rlvnt">
                        <a href="https://linkedin.com" target="_blank" class="social-icon-rlvnt" title="LinkedIn">Lin.</a>
                        <a href="https://twitter.com" target="_blank" class="social-icon-rlvnt" title="Twitter">Twi.</a>
                        <a href="https://instagram.com" target="_blank" class="social-icon-rlvnt" title="Instagram">Ins.</a>
                        <a href="https://behance.net" target="_blank" class="social-icon-rlvnt" title="Behance">Beh.</a>
                    </div>
                </div>
            </div>
            <div class="copyright">&copy; 2026 Kawaki Studios. All rights reserved.</div>
        </div>
    </footer>
`;

filesToProcess.forEach(file => {
    const filePath = path.join(__dirname, '../public', file);
    if (!fs.existsSync(filePath)) {
        console.log("File not found: " + file);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // 1. Top Nav
    if (file === 'index.html') {
        // Ensure index.html has the newNav right after the hero navbar-items if not already there
        if (!html.includes('id="globalNav"')) {
            html = html.replace(/<div class="mobile-menu-overlay"[\s\S]*?<\/script>/, newNav);
        }
    } else if (file === 'contact.html') {
        // In contact.html replace pill-nav-container or navbar-inner-page
        const contactNavRegex = /<div class="pill-nav-container">[\s\S]*?<\/script>\s*<main>/i;
        if (contactNavRegex.test(html)) {
            html = html.replace(contactNavRegex, newNav + '\n\n<main>');
            console.log("Replaced nav in contact.html");
        }
    } else if (file !== 'services.html') {
        // Replace existing globalNav/fullscreenMenu or old navs
        if (html.includes('class="nav-wrapper')) {
            const existingNavRegex = /<div class="nav-wrapper[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i;
            if (existingNavRegex.test(html)) {
                html = html.replace(existingNavRegex, newNav.trim());
                console.log("Updated global nav in " + file);
            }
        }
    }

    // 2. Replace Footer
    // Matches any footer or marquee+footer
    const footerRegex = /<footer[\s\S]*?<\/footer>/i;
    if (footerRegex.test(html)) {
        html = html.replace(footerRegex, newFooter.trim());
        console.log("Replaced footer in " + file);
    }

    // 3. Ensure main.js script before closing body
    if (!html.includes('/assets/js/main.js')) {
        html = html.replace('</body>', '<script src="/assets/js/main.js"></script>\n</body>');
    }

    fs.writeFileSync(filePath, html);
    console.log("Saved " + file);
});
