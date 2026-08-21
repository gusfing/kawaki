const fs = require('fs');
const htmlPath = 'c:/Users/ks209/Documents/kunal saas/kawaki website/files/public/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const styleRegex = /<style>([\s\S]*?)<\/style>/i;
const match = html.match(styleRegex);

if (match) {
    const cssContent = match[1];
    
    // Ensure dir exists
    const cssDir = 'c:/Users/ks209/Documents/kunal saas/kawaki website/files/public/assets/css';
    if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true });
    }
    
    fs.writeFileSync(cssDir + '/global.css', cssContent);
    
    const newHtml = html.replace(styleRegex, '<link rel="stylesheet" href="/assets/css/global.css" />');
    fs.writeFileSync(htmlPath, newHtml);
    console.log('Successfully extracted CSS and updated index.html');
} else {
    console.log('Could not find style block');
}
