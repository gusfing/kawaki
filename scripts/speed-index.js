/**
 * Kawaki Studios — Google Rapid Indexing API Automation
 * 
 * Bypasses Google Search Console manual queue delays by publishing URL_UPDATED
 * events directly to Google's Indexing API v3.
 * 
 * Usage:
 *   npm run index:google         (indexes priority flagship and service pages)
 *   npm run index:google:all     (indexes canonical URLs from sitemap.xml)
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
    const passed = process.argv.slice(2).filter(a => a.startsWith('http'));
    if (passed.length > 0) {
        return passed;
    }
    const isAll = process.argv.includes('--all') || process.argv.includes('-a');
    if (isAll) {
        const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
            const xml = fs.readFileSync(sitemapPath, 'utf8');
            const matches = xml.match(/<loc>(https:\/\/[^<]+)<\/loc>/g) || [];
            const urls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
            console.log(`📋 Loaded ${urls.length} canonical URLs from sitemap.xml`);
            // Google Indexing API daily quota is 200 publishes/day
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
        console.log('3. In IAM & Admin → Service Accounts → download the JSON key as "service-account.json"');
        console.log('4. In Google Search Console: add service account email as Owner');
        console.log('5. Run again: npm run index:google\n');
        process.exit(1);
    }

    const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    console.log(`✓ Authenticated as: ${keyData.client_email}`);

    const SCOPES = ['https://www.googleapis.com/auth/indexing'];

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE,
            scopes: SCOPES
        });

        const authClient = await auth.getClient();
        const indexing = google.indexing({ version: 'v3', auth: authClient });
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
                // 150ms gentle throttle between requests
                await new Promise(r => setTimeout(r, 150));
            } catch (err) {
                console.error(`❌ [${err.code || 'ERR'}] Failed for: ${url} -> ${err.message}`);
                failCount++;
            }
        }

        console.log(`\n🎉 Google Indexing API Complete: ${successCount} queued successfully, ${failCount} failed.`);
    } catch (error) {
        console.error('❌ Authorization or API error:', error.message);
    }
}

triggerRapidCrawl();
