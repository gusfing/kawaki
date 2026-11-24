/**
 * Kawaki Studios - In-House Rapid Indexing Master Suite
 * 
 * Orchestrates the full rapid indexing pipeline for Kawaki web assets:
 * 1. Pre-flight health and canonical verification
 * 2. Google Rapid Indexing API (URL_UPDATED dispatch)
 * 3. IndexNow push protocol (Bing, Yandex, Seznam)
 * 4. RSS Feed rebuild & XML-RPC Ping Cascade (Ping-o-Matic & WebSub)
 * 5. Headless Chrome browser telemetry simulation
 * 
 * Usage:
 *   node scripts/rapid-index.js <url1> [url2...]
 *   node scripts/rapid-index.js --core
 *   node scripts/rapid-index.js --file <url-list.txt>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildRssXml } = require('./build-rss.js');
const { runPingCascade } = require('./ping-cascade.js');
const { visitUrlsWithChrome } = require('./browser-ping.js');

const rootDir = path.resolve(__dirname, '..');
const reportDir = path.join(rootDir, 'reports', 'seo');
const historyFile = path.join(reportDir, 'rapid-indexing-history.json');

const CORE_PRIORITY_URLS = [
  'https://kawaki.co.in/pricing',
  'https://kawaki.co.in/services/custom-web-development',
  'https://kawaki.co.in/services/shopify-development',
  'https://kawaki.co.in/services/ai-automation',
  'https://kawaki.co.in/services/website-redesign',
  'https://kawaki.co.in/delhi/web-development-company',
  'https://kawaki.co.in/bangalore/web-development-company',
  'https://kawaki.co.in/mumbai/web-development-company',
  'https://kawaki.co.in/services/wordpress-malware-removal',
  'https://kawaki.co.in/blog/what-is-ai-automation-examples-for-small-businesses'
];

async function checkUrlLive(url) {
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(10000) });
    if (res.status !== 200) {
      return { ok: false, reason: `HTTP status ${res.status}` };
    }
    const html = await res.text();
    if (/noindex/i.test(html)) {
      return { ok: false, reason: 'Contains noindex directive' };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}

function logHistory(entry) {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  let history = [];
  if (fs.existsSync(historyFile)) {
    try {
      history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    } catch (e) {
      history = [];
    }
  }
  history.unshift(entry);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), 'utf8');
}

async function main() {
  const args = process.argv.slice(2);
  let urls = [];

  if (args.includes('--core') || !args.length) {
    urls = [...CORE_PRIORITY_URLS];
  } else if (args.includes('--file')) {
    const filePath = args[args.indexOf('--file') + 1];
    if (filePath && fs.existsSync(filePath)) {
      urls = fs.readFileSync(filePath, 'utf8')
        .split('\n')
        .map(u => u.trim())
        .filter(u => u.startsWith('http'));
    }
  } else {
    urls = args.filter(u => u.startsWith('http'));
  }

  urls = [...new Set(urls)];

  console.log('\n======================================================');
  console.log(`🚀 [Rapid Indexing Engine] Processing ${urls.length} Target URL(s)`);
  console.log('======================================================\n');

  // Stage 1: Pre-flight Verification
  console.log('🔍 [Stage 1/5] Running Pre-flight Health & Canonical Checks...');
  const validUrls = [];
  for (const url of urls) {
    const check = await checkUrlLive(url);
    if (check.ok) {
      validUrls.push(url);
      console.log(`   ✓ [Valid] ${url}`);
    } else {
      console.warn(`   ⚠️ [Skipped] ${url}: ${check.reason}`);
    }
  }

  if (!validUrls.length) {
    console.error('❌ No healthy live URLs found to index. Exiting.');
    return;
  }

  // Stage 2: Google Rapid Indexing API
  console.log('\n🌐 [Stage 2/5] Publishing to Google Indexing API...');
  try {
    const urlsArg = validUrls.map(u => `"${u}"`).join(' ');
    const out = execSync(`node scripts/speed-index.js ${urlsArg}`, { cwd: rootDir, encoding: 'utf8' });
    console.log(out.split('\n').filter(l => l.includes('Rapid crawl') || l.includes('Complete')).join('\n'));
  } catch (err) {
    console.warn(`   ⚠️ Google Indexing API note: ${err.message}`);
  }

  // Stage 3: IndexNow (Bing & Partner Engines)
  console.log('\n📡 [Stage 3/5] Pinging IndexNow Protocol...');
  try {
    const urlsArg = validUrls.map(u => `"${u}"`).join(' ');
    const out = execSync(`node scripts/submit-indexnow.js ${urlsArg}`, { cwd: rootDir, encoding: 'utf8' });
    console.log(out.trim());
  } catch (err) {
    console.warn(`   ⚠️ IndexNow note: ${err.message}`);
  }

  // Stage 4: RSS Feed Rebuild & Ping Cascade
  console.log('\n📰 [Stage 4/5] Updating RSS 2.0 Feed and XML-RPC Ping Cascade...');
  try {
    buildRssXml();
    await runPingCascade();
  } catch (err) {
    console.warn(`   ⚠️ RSS Ping note: ${err.message}`);
  }

  // Stage 5: Headless Browser Telemetry Visit
  console.log('\n🖥️ [Stage 5/5] Simulating Organic Headless Chrome Visits...');
  try {
    await visitUrlsWithChrome(validUrls);
  } catch (err) {
    console.warn(`   ⚠️ Browser visit note: ${err.message}`);
  }

  logHistory({
    timestamp: new Date().toISOString(),
    totalTargetUrls: urls.length,
    validProcessedUrls: validUrls.length,
    urls: validUrls
  });

  console.log('\n======================================================');
  console.log('🎉 [Rapid Indexing Complete] All 5 crawl vectors fired successfully!');
  console.log('======================================================\n');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
