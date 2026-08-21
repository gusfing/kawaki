const fs = require('fs');
const path = require('path');

const helloBase64 = fs.readFileSync('public/assets/images/Hello.png').toString('base64');
const dataUri = `data:image/png;base64,${helloBase64}`;

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

const files = getHtmlFiles('public');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace any hello-image img tag with inline data URI
    const helloImgRegex = /<img[^>]*class="[^"]*hello-image[^"]*"[^>]*>/gi;
    
    if (helloImgRegex.test(content)) {
        content = content.replace(helloImgRegex, `<img src="${dataUri}" alt="Hello" class="hello-image wave-hover" />`);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Embedded Hello.png data URI in:', file);
    } else {
        console.log('No hello-image found in:', file);
    }
});
