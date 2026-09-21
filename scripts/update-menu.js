const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
    let res = [];
    fs.readdirSync(dir).forEach(f => {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            res = res.concat(getHtmlFiles(full));
        } else if (f.endsWith('.html')) {
            res.push(full);
        }
    });
    return res;
}

const newMenuHtml = `    <!-- FULLSCREEN OVERLAY MENU -->
    <div class="fullscreen-menu" id="fullscreenMenu">
        <div class="menu-overlay-layer"></div>
        <div class="menu-overlay-layer"></div>
        <div class="menu-content-wrapper">
            <span class="span-menu"><em>kawaki</em></span>
            <div class="menu-layout">
                <div class="menu-col menu-col-left">
                    <div class="main-menu-links">
                        <ul>
                            <li data-img="https://i.pinimg.com/736x/2d/46/b7/2d46b7b8aeb8cec7bdc78edeadefdfef.jpg" data-tag="Home — Studio Overview">
                                <a href="/index.html">
                                    <span class="menu-idx">01</span>
                                    <span class="menu-text">Home <em>Index</em></span>
                                </a>
                            </li>
                            <li data-img="https://i.pinimg.com/736x/4a/62/15/4a6215c4463f68dbabb3ac0f3996f289.jpg" data-tag="About Us — Editorial Manifesto">
                                <a href="/about.html">
                                    <span class="menu-idx">02</span>
                                    <span class="menu-text">About <em>Kawaki Studios</em></span>
                                </a>
                            </li>
                            <li data-img="https://i.pinimg.com/736x/65/74/af/6574af961dfe8754c28b377a6e047db2.jpg" data-tag="Capabilities &amp; Architecture">
                                <a href="/services.html">
                                    <span class="menu-idx">03</span>
                                    <span class="menu-text">Explore <em>Our Services</em></span>
                                </a>
                            </li>
                            <li data-img="https://i.pinimg.com/736x/ec/64/00/ec6400c4369a4732aa8c4c478e124b81.jpg" data-tag="Architectural Concepts">
                                <a href="/case-studies">
                                    <span class="menu-idx">04</span>
                                    <span class="menu-text">Selected <em>Concepts &amp; Blueprints</em></span>
                                </a>
                            </li>
                            <li data-img="https://i.pinimg.com/736x/07/7d/51/077d510bf4c86a3d6cb7f3fdf5d68d1b.jpg" data-tag="Engineering &amp; Design Notes">
                                <a href="/blog.html">
                                    <span class="menu-idx">05</span>
                                    <span class="menu-text">Blogs &amp; <em>Insights</em></span>
                                </a>
                            </li>
                            <li data-img="https://i.pinimg.com/736x/77/89/3e/77893ed6ca353e680a672625fe9f4fa7.jpg" data-tag="15-Min Strategy Session">
                                <a href="/contact.html">
                                    <span class="menu-idx">06</span>
                                    <span class="menu-text">Discovery <em>Call</em></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="menu-col menu-col-right">
                    <!-- Interactive Preview Card -->
                    <div class="menu-preview-card" id="menuPreviewCard">
                        <div class="menu-preview-img-box">
                            <img id="menuPreviewImg" src="https://i.pinimg.com/736x/4a/62/15/4a6215c4463f68dbabb3ac0f3996f289.jpg" alt="Preview" />
                        </div>
                        <div class="menu-preview-meta">
                            <span class="menu-preview-badge" id="menuPreviewTag">About Us — Editorial Manifesto</span>
                            <span class="menu-preview-desc">Editorial Engineering &amp; Design</span>
                        </div>
                    </div>

                    <!-- Info Block -->
                    <div class="menu-info-block">
                        <div class="menu-status-pill">
                            <span class="status-dot"></span>
                            <span>Available for Select Projects</span>
                        </div>
                        <a href="/contact.html" class="menu-cta-button">
                            <span>Schedule a Call</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" fill="#FC4625"></circle>
                                <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                            </svg>
                        </a>
                        <a href="mailto:hello@kawakistudios.com" class="menu-email-link">hello@kawakistudios.com</a>
                    </div>

                    <!-- Social Links -->
                    <div class="menu-socials-strip">
                        <span class="socials-title">Follow</span>
                        <div class="social-tags">
                            <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn ↗</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener">Twitter / X ↗</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram ↗</a>
                            <a href="https://behance.net" target="_blank" rel="noopener">Behance ↗</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

const files = getHtmlFiles('public');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const menuRegex = /<div class="fullscreen-menu" id="fullscreenMenu">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
    
    if (menuRegex.test(content)) {
        content = content.replace(menuRegex, newMenuHtml.trim());
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated fullscreen menu in:', file);
    } else {
        console.log('No fullscreen menu found in:', file);
    }
});
