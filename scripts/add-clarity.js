const fs = require('fs');
const path = require('path');

const claritySnippet = `    <!-- Clarity tracking code for https://kawaki.co.in/ -->
    <script>
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "yyqy7vt939");
    </script>`;

function getHtmlFiles(dir) {
    let res = [];
    fs.readdirSync(dir).forEach(f => {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
                res = res.concat(getHtmlFiles(full));
            }
        } else if (f.endsWith('.html')) {
            res.push(full);
        }
    });
    return res;
}

// 1. Process all HTML files in public/
const publicDir = path.resolve(__dirname, '..', 'public');
const publicFiles = getHtmlFiles(publicDir);
let updatedCount = 0;
let alreadyCount = 0;

publicFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('yyqy7vt939')) {
        const isCrlf = content.includes('\r\n');
        const formattedSnippet = isCrlf ? claritySnippet.replace(/\n/g, '\r\n') : claritySnippet;
        const newline = isCrlf ? '\r\n' : '\n';
        
        content = content.replace(/(<head[^>]*>)/i, `$1${newline}${formattedSnippet}`);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    } else {
        alreadyCount++;
    }
});

console.log(`✓ Added Clarity tracking code to ${updatedCount} HTML files in public/ (already present in ${alreadyCount})`);

// 2. Process admin dashboard template
const adminHtmlPath = path.resolve(__dirname, '..', 'admin-dashboard', 'frontend', 'index.html');
if (fs.existsSync(adminHtmlPath)) {
    let adminContent = fs.readFileSync(adminHtmlPath, 'utf8');
    if (!adminContent.includes('yyqy7vt939')) {
        const isCrlf = adminContent.includes('\r\n');
        const formattedSnippet = isCrlf ? claritySnippet.replace(/\n/g, '\r\n') : claritySnippet;
        const newline = isCrlf ? '\r\n' : '\n';
        adminContent = adminContent.replace(/(<head[^>]*>)/i, `$1${newline}${formattedSnippet}`);
        fs.writeFileSync(adminHtmlPath, adminContent, 'utf8');
        console.log('✓ Added Clarity tracking code to admin-dashboard/frontend/index.html');
    }
}

// 3. Process scripts/build-blog.js
const blogScriptPath = path.resolve(__dirname, 'build-blog.js');
if (fs.existsSync(blogScriptPath)) {
    let blogContent = fs.readFileSync(blogScriptPath, 'utf8');
    if (!blogContent.includes('yyqy7vt939')) {
        const isCrlf = blogContent.includes('\r\n');
        const formattedSnippet = isCrlf ? claritySnippet.replace(/\n/g, '\r\n') : claritySnippet;
        const newline = isCrlf ? '\r\n' : '\n';
        blogContent = blogContent.replace(/(<head>)/i, `$1${newline}${formattedSnippet}`);
        fs.writeFileSync(blogScriptPath, blogContent, 'utf8');
        console.log('✓ Added Clarity tracking code to scripts/build-blog.js');
    }
}

// 4. Process scripts/generate-mobile-app-regional.js
const mobileScriptPath = path.resolve(__dirname, 'generate-mobile-app-regional.js');
if (fs.existsSync(mobileScriptPath)) {
    let mobileContent = fs.readFileSync(mobileScriptPath, 'utf8');
    if (!mobileContent.includes('yyqy7vt939')) {
        const isCrlf = mobileContent.includes('\r\n');
        const formattedSnippet = isCrlf ? claritySnippet.replace(/\n/g, '\r\n') : claritySnippet;
        const newline = isCrlf ? '\r\n' : '\n';
        mobileContent = mobileContent.replace(/(<head>)/i, `$1${newline}${formattedSnippet}`);
        fs.writeFileSync(mobileScriptPath, mobileContent, 'utf8');
        console.log('✓ Added Clarity tracking code to scripts/generate-mobile-app-regional.js');
    }
}
