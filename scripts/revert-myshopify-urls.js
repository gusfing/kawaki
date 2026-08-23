#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const INDEX_HTML = path.join(__dirname, '../public/index.html');

console.log('🔄 Reverting myshopify URLs back to protocol-relative...\n');

let html = fs.readFileSync(INDEX_HTML, 'utf-8');

// Revert: /editions-winter-2026.myshopify.com/ → //editions-winter-2026.myshopify.com/
const before = html.length;
html = html.replace(/\/editions-winter-2026\.myshopify\.com\//g, '//editions-winter-2026.myshopify.com/');
const after = html.length;

console.log(`✓ Reverted myshopify URLs to protocol-relative`);
fs.writeFileSync(INDEX_HTML, html);
console.log(`✓ Updated: ${INDEX_HTML}\n✅ Hero should render now!`);
