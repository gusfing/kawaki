const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyDir = path.join(rootDir, 'shopify');
const publicDir = path.join(rootDir, 'public');

console.log('--- Migrating Shopify to Public Homepage ---');

// 1. Backup old public/index.html
const oldIndex = path.join(publicDir, 'index.html');
const backupIndex = path.join(publicDir, 'index-kawaki-card.html');
if (fs.existsSync(oldIndex) && !fs.existsSync(backupIndex)) {
  fs.copyFileSync(oldIndex, backupIndex);
  console.log('Backed up old index.html to index-kawaki-card.html');
}

// 2. Helper to copy folder recursively
function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      // If file doesn't exist or is different, copy
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

// 3. Copy shopify asset folders to public
['cdn.shopify.com', 'editions-winter-2026.myshopify.com', 'www.gstatic.com'].forEach(folder => {
  const src = path.join(shopifyDir, folder);
  const dest = path.join(publicDir, folder);
  if (fs.existsSync(src)) {
    console.log(`Copying ${folder} to public/...`);
    copyFolderSync(src, dest);
  }
});

// Copy shopify/assets files into public/assets without overwriting existing kawaki assets
const shopifyAssets = path.join(shopifyDir, 'assets');
const publicAssets = path.join(publicDir, 'assets');
if (fs.existsSync(shopifyAssets)) {
  console.log('Copying shopify/assets to public/assets...');
  copyFolderSync(shopifyAssets, publicAssets);
}

// 4. Normalize shopify/index.html
let html = fs.readFileSync(path.join(shopifyDir, 'index.html'), 'utf8');

// Replace relative ../../ and ../ prefixes for cdn and other assets
html = html.replace(/\.\.\/\.\.\/cdn\.shopify\.com/g, '/cdn.shopify.com');
html = html.replace(/\.\.\/cdn\.shopify\.com/g, '/cdn.shopify.com');

html = html.replace(/\.\.\/\.\.\/www\.gstatic\.com/g, '/www.gstatic.com');
html = html.replace(/\.\.\/www\.gstatic\.com/g, '/www.gstatic.com');

html = html.replace(/\.\.\/\.\.\/editions-winter-2026\.myshopify\.com/g, '/editions-winter-2026.myshopify.com');
html = html.replace(/\.\.\/editions-winter-2026\.myshopify\.com/g, '/editions-winter-2026.myshopify.com');

html = html.replace(/\.\.\/\.\.\/assets\//g, '/assets/');
html = html.replace(/\.\.\/assets\//g, '/assets/');

// Ensure title is Kawaki Studios
html = html.replace(/<title>.*?<\/title>/, '<title>Kawaki Studios — Editorial Engineering</title>');

// Save to public/index.html
fs.writeFileSync(path.join(publicDir, 'index.html'), html, 'utf8');
console.log('Updated public/index.html successfully with normalized asset URLs');
