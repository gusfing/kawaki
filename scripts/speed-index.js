/**
 * Kawaki Studios — Google Rapid Indexing API Automation
 * 
 * Bypasses Google Search Console manual queue delays by publishing URL_UPDATED
 * events directly to Google's Indexing API v3.
 * 
 * Prerequisites:
 * 1. Create a Service Account in Google Cloud Console.
 * 2. Enable "Web Search Indexing API" in Google Cloud Console.
 * 3. Add the Service Account email (e.g. `your-sa@project.iam.gserviceaccount.com`)
 *    as an Owner in Google Search Console for `https://kawaki.co.in/`.
 * 4. Save your service account credentials as `service-account.json` in the project root.
 * 
 * Usage:
 *   node scripts/speed-index.js
 *   node scripts/speed-index.js --all   (indexes all canonical URLs from sitemap.xml)
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// 1. Resolve Service Account JSON key file
const KEY_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '..', 'service-account.json');

// 2. High-priority core flagship pages to index immediately
const CORE_URLS = [
    'https://kawaki.co.in/',
    'https://kawaki.co.in/about',
    'https://kawaki.co.in/services',
    'https://kawaki.co.in/services/custom-web-development',
    'https://kawaki.co.in/services/shopify-development',
    'https://kawaki.co.in/services/ai-automation',
    'https://kawaki.co.in/services/ai-search-optimization',
    'https://kawaki.co.in/services/wordpress-malware-removal',
    'https://kawaki.co.in/case-studies',
    'https://kawaki.co.in/case-studies/bazzaro',
    'https://kawaki.co.in/case-studies/kala-design',
    'https://kawaki.co.in/case-studies/nursepass',
    'https://kawaki.co.in/case-studies/urbanland',
    'https://kawaki.co.in/case-studies/kova',
    'https://kawaki.co.in/case-studies/decor-lab',
    'https://kawaki.co.in/case-studies/iptv-mobile',
    'https://kawaki.co.in/case-studies/nextschool-erp',
    'https://kawaki.co.in/blog',
    'https://kawaki.co.in/contact'
];

function getUrlsToIndex() {
    const isAll = process.argv.includes('--all') || process.argv.includes('-a');
    if (isAll) {
        const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
            const xml = fs.readFileSync(sitemapPath, 'utf8');
            const matches = xml.match(/<loc>(https:\/\/[^<]+)<\/loc>/g) || [];
            const urls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
            console.log(`📋 Loaded ${urls.length} canonical URLs from sitemap.xml`);
            // Google Indexing API daily quota is typically 200 publishes/day
            return urls.slice(0, 200);
        }
    }
    return CORE_URLS;
}

async function triggerRapidCrawl() {
    console.log('⚡ [Google Rapid Indexing API] Initializing...');

    if (!fs.existsSync(KEY_FILE)) {
        console.error(`\n❌ Service Account file not found at: ${KEY_FILE}`);
        console.log('\n📖 Quick Setup Guide:');
        console.log('1. Go to Google Cloud Console: https://console.cloud.google.com/');
        console.log('2. Create a project and enable the "Web Search Indexing API"');
        console.log('3. Create a Service Account under IAM & Admin → Service Accounts');
        console.log('4. Create a JSON key and download it as "service-account.json" to this project folder');
        console.log('5. In Google Search Console (https://search.google.com/search-console):');
        console.log('   Settings → Users and permissions → Add User → paste your service account email → set Permission to "Owner"');
        console.log('6. Run this command again: node scripts/speed-index.js\n');
        process.exit(1);
    }

    const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    console.log(`✓ Authenticating as Service Account: ${keyData.client_email}`);

    // Official Google Web Search Indexing OAuth scope
    const SCOPES = ['https://www.googleapis.com/auth/indexing'];

    const jwtClient = new google.auth.JWT(
        keyData.client_email,
        null,
        keyData.private_key,
        SCOPES
    );

    try {
        await jwtClient.authorize();
        console.log('✓ Successfully authorized with Google Cloud API.');

        const indexing = google.indexing({ version: 'v3', auth: jwtClient });
        const urls = getUrlsToIndex();

        console.log(`\n🚀 Publishing URL_UPDATED signals for ${urls.length} URLs...\n`);

        let successCount = 0;
        let failCount = 0;

        for (const url of urls) {
            try {
                const res = await indexing.urlNotifications.publish({
                    requestBody: {
                        url: url,
                        type: 'URL_UPDATED' // Requests Googlebot prioritize crawling
                    }
                });
                console.log(`✓ [200 OK] Rapid crawl queued: ${url}`);
                successCount++;
                // Small 120ms throttle to prevent rate-limit spikes
                await new Promise(r => setTimeout(r, 120));
            } catch (err) {
                console.error(`❌ [${err.code || 'ERR'}] Failed for: ${url} -> ${err.message}`);
                failCount++;
            }
        }

        console.log(`\n🎉 Indexing API Complete: ${successCount} queued, ${failCount} failed.`);
    } catch (error) {
        console.error('❌ Authorization or API error:', error.message);
    }
}

triggerRapidCrawl();
