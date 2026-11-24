/**
 * Kawaki Studios - Headless Browser Telemetry Visit Simulator
 * Loads specified URLs in a real headless Chrome instance to fire client-side
 * analytics, resource queries, and browser telemetry signals.
 */

const path = require('path');

function getPlaywright() {
  const candidates = [
    path.resolve(__dirname, '..'),
    process.env.PLAYWRIGHT_DIR,
    'C:\\Users\\ks209\\mcp-servers\\google-flow-browser-mcp'
  ].filter(Boolean);

  for (const dir of candidates) {
    try {
      return require(require.resolve('playwright', { paths: [dir] }));
    } catch (e) {}
  }
  return null;
}

async function visitUrlsWithChrome(urls = []) {
  if (!urls.length) {
    console.log('[Browser Ping] No URLs provided to visit.');
    return;
  }

  const pw = getPlaywright();
  if (!pw) {
    console.warn('[Browser Ping] Playwright module not detected; skipping browser visit simulation.');
    return;
  }

  const { chromium } = pw;
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (err) {
    try {
      browser = await chromium.launch({ headless: true });
    } catch (err2) {
      console.warn('[Browser Ping] Could not launch Chrome headless:', err2.message);
      return;
    }
  }

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 768 }
  });

  const page = await context.newPage();

  console.log(`⚡ [Browser Ping] Simulating organic browser visits for ${urls.length} URL(s)...`);

  for (const url of urls) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      // Allow scripts, analytics and background network requests to dispatch
      await page.waitForTimeout(3000);
      const status = response ? response.status() : 'Unknown';
      console.log(`   ✓ [Visited] ${url} (HTTP ${status})`);
    } catch (err) {
      console.warn(`   ⚠️ [Visit Warning] ${url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('🎉 [Browser Ping] Completed all browser visit simulations.');
}

if (require.main === module) {
  const args = process.argv.slice(2).filter(a => a.startsWith('http'));
  const targetUrls = args.length ? args : [
    'https://kawaki.co.in/services/custom-web-development',
    'https://kawaki.co.in/pricing'
  ];
  visitUrlsWithChrome(targetUrls);
}

module.exports = { visitUrlsWithChrome };
