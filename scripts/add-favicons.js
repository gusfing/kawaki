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

const faviconBlock = [
    '    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />',
    '    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    '    <link rel="shortcut icon" href="/favicon.ico" />',
    '    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
    '    <link rel="manifest" href="/site.webmanifest" />'
].join('\n');

const files = getHtmlFiles('public');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('favicon-96x96.png')) {
        content = content.replace(/<head[^>]*>/i, (match) => `${match}\n${faviconBlock}`);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Added favicon tags to:', file);
    } else {
        console.log('Favicon already present in:', file);
    }
});
