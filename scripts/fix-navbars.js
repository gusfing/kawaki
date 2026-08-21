const fs = require('fs');
const path = require('path');

const files = ['about.html', 'services.html', 'contact.html', 'case-studies.html'];
const newNavbar = `<div class="pill-nav-container">
    <div class="pill-nav">
        <span class="pill-nav-logo">Kawaki</span>
        <div class="pill-nav-hamburger" onclick="togglePillMenu()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
        </div>
    </div>
    <div class="pill-popover" id="pillPopover">
        <a href="/index.html" class="active">Home</a>
        <a href="/case-studies.html">Work</a>
        <a href="/about.html">About Us</a>
        <a href="/contact.html">Contact Us</a>
    </div>
</div>

<script>
    function togglePillMenu() {
        const popover = document.getElementById('pillPopover');
        popover.classList.toggle('active');
    }
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        const container = document.querySelector('.pill-nav-container');
        if (container && !container.contains(e.target)) {
            document.getElementById('pillPopover').classList.remove('active');
        }
    });
</script>`;

files.forEach(file => {
    const filePath = path.join(__dirname, '../public', file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Everything from <body> to <main> gets replaced by the new navbar
    // since the navbar is the only thing there.
    const regex = /<body[^>]*>([\s\S]*?)<main>/i;
    
    if(regex.test(html)) {
        // We need to keep the matched body tag since we matched `<body...>`
        html = html.replace(regex, (match) => {
            const bodyTag = match.match(/<body[^>]*>/i)[0];
            return bodyTag + '\n    ' + newNavbar + '\n\n    <main>';
        });
        fs.writeFileSync(filePath, html);
        console.log(`Fixed navbar in ${file}`);
    } else {
        console.log(`Could not find <body...>...<main> block in ${file}`);
    }
});
