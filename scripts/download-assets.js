#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../public');
const MANIFEST_PATH = path.join(__dirname, 'asset-manifest.json');
const FAILURES_PATH = path.join(__dirname, 'asset-download-failures.json');
const CONCURRENCY = 6;

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('❌ asset-manifest.json not found. Run collect-asset-urls.js first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
console.log(`📦 Starting bulk download of ${manifest.length} assets (concurrency: ${CONCURRENCY})...\n`);

const results = {
  alreadyCached: 0,
  downloaded: 0,
  failed: [],
  m3u8Nested: []
};

const m3u8Queue = [];

function fetchAndCache(domain, urlPath, search = '') {
  return new Promise((resolve) => {
    const localPath = path.join(ROOT, domain, urlPath);

    // Check if already exists
    if (fs.existsSync(localPath)) {
      results.alreadyCached++;
      resolve(true);
      return;
    }

    // Ensure directory exists
    const dir = path.dirname(localPath);
    fs.mkdirSync(dir, { recursive: true });

    const targetUrl = `https://${domain}${urlPath}${search}`;
    let redirectCount = 0;

    const fetchWithRedirects = (url) => {
      if (redirectCount > 5) {
        results.failed.push({ url: targetUrl, localPath, error: 'Too many redirects' });
        results.failed.sort();
        resolve(false);
        return;
      }

      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://kawaki.co.in/',
          'Accept': '*/*'
        }
      }, (res) => {
        // Handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          redirectCount++;
          const nextUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).toString();
          fetchWithRedirects(nextUrl);
          return;
        }

        if (res.statusCode !== 200) {
          results.failed.push({ url: targetUrl, localPath, statusCode: res.statusCode });
          res.resume(); // Drain the response
          resolve(false);
          return;
        }

        const writeStream = fs.createWriteStream(localPath);
        res.pipe(writeStream);

        writeStream.on('finish', () => {
          // Check if it's an m3u8 file — parse for nested assets
          if (urlPath.endsWith('.m3u8')) {
            try {
              const content = fs.readFileSync(localPath, 'utf-8');
              const m3u8Refs = content.match(/^[^#\n].*\.(?:m3u8|ts|m4s)$/gm);
              if (m3u8Refs) {
                for (const ref of m3u8Refs) {
                  if (!ref.startsWith('http')) {
                    const resolved = new URL(ref, targetUrl).pathname;
                    m3u8Queue.push({ domain, path: resolved, search: '' });
                  }
                }
              }
            } catch (e) {
              // Ignore parse errors, file is still cached
            }
          }
          results.downloaded++;
          resolve(true);
        });

        writeStream.on('error', (err) => {
          results.failed.push({ url: targetUrl, localPath, error: err.message });
          resolve(false);
        });
      }).on('error', (err) => {
        results.failed.push({ url: targetUrl, localPath, error: err.message });
        resolve(false);
      });
    };

    fetchWithRedirects(targetUrl);
  });
}

async function processQueue(queue) {
  let processed = 0;
  let active = 0;

  return new Promise((resolve) => {
    const process = async () => {
      if (queue.length === 0 && active === 0) {
        resolve();
        return;
      }

      while (active < CONCURRENCY && queue.length > 0) {
        active++;
        const asset = queue.shift();

        (async () => {
          await fetchAndCache(asset.domain, asset.path, asset.search);
          processed++;

          if (processed % 50 === 0) {
            const pct = Math.round((processed / (processed + queue.length)) * 100);
            console.log(`  ⏳ Progress: ${processed} / ${manifest.length} (${pct}%)`);
          }

          active--;
          process();
        })();
      }
    };

    process();
  });
}

async function run() {
  const startTime = Date.now();

  await processQueue(manifest);

  // Process any m3u8-discovered nested assets
  if (m3u8Queue.length > 0) {
    console.log(`\n📹 Processing ${m3u8Queue.length} nested M3U8 assets...`);
    await processQueue(m3u8Queue);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '─'.repeat(60));
  console.log('✓ Download complete!');
  console.log(`  Already cached:  ${results.alreadyCached}`);
  console.log(`  Newly downloaded: ${results.downloaded}`);
  console.log(`  Failed: ${results.failed.length}`);
  console.log(`  Duration: ${duration}s`);

  if (results.failed.length > 0) {
    console.log('\n⚠️  Failed downloads (saved to asset-download-failures.json):');
    fs.writeFileSync(FAILURES_PATH, JSON.stringify(results.failed, null, 2));
    console.log(`  ${results.failed.length} asset(s) could not be downloaded.`);
    console.log('  Review the failures file and decide whether to strip these refs from index.html');
  } else {
    console.log('\n✓ All assets downloaded successfully!');
  }
}

run().catch(console.error);
