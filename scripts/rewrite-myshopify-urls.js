#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../public');
const INDEX_HTML = path.join(ROOT, 'index.html');

console.log('🔄 Rewriting protocol-relative URLs in index.html...\n');

let html = fs.readFileSync(INDEX_HTML, 'utf-8');

// Replace //editions-winter-2026.myshopify.com/ with /editions-winter-2026.myshopify.com/
const before = html.length;
html = html.replace(/\/\/editions-winter-2026\.myshopify\.com\//g, '/editions-winter-2026.myshopify.com/');
const after = html.length;
const replacements = (before - after) / 47; // Length of "//editions-winter-2026.myshopify.com/"

console.log(`✓ Replaced ${Math.round(replacements)} protocol-relative URLs`);

// Write back
fs.writeFileSync(INDEX_HTML, html);

console.log(`✓ Updated: ${INDEX_HTML}`);
console.log('\n✅ All myshopify.com URLs now use local paths!');
