/**
 * Automated Google Business Profile (GBP / Google Maps) Local Post Publisher
 * Powered by Windsor.ai MCP / JSON-RPC
 *
 * Automatically publishes a "What's New" local post to Kawaki Studios' Google Business Profile
 * whenever a new engineering article or case study is published.
 */

// The token lives only in the environment (GitHub secret WINDSOR_API_TOKEN). Never put a key in code.
const WINDSOR_TOKEN = process.env.WINDSOR_API_TOKEN || '';
const GBP_LOCATION_ACCOUNT = process.env.GBP_LOCATION_ACCOUNT || 'locations/17760429272361351076';
const SITE_ORIGIN = 'https://kawaki.co.in';

/**
 * Call Windsor.ai MCP JSON-RPC tool
 */
async function callWindsorTool(toolName, toolArgs = {}) {
  const res = await fetch('https://mcp.windsor.ai/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WINDSOR_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Math.floor(Math.random() * 100000),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: toolArgs
      }
    })
  });

  if (!res.ok) {
    throw new Error(`Windsor HTTP error ${res.status}: ${res.statusText}`);
  }

  const text = await res.text();
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      return data.result;
    }
  }
  return null;
}

/**
 * Formats a clean, high-intent local update for Google Business Profile
 */
function formatGbpSummary(article) {
  // Plain words, same rules as the site (data/writing-rules.json). No keyword lists, no claims.
  const title = article.title || 'New post';
  let excerpt = String(article.excerpt || article.seoDescription || '').replace(/\s+/g, ' ').trim();
  if (excerpt.length > 500) excerpt = excerpt.slice(0, excerpt.lastIndexOf(' ', 495)) + '...';
  return `New on the Kawaki Studios blog: ${title}

${excerpt}

Written by the developers at our New Delhi studio.`;
}

/**
 * Dispatches a local post to Google Business Profile via Windsor
 */
async function publishToGoogleBusinessProfile(article, canonicalUrl) {
  if (!WINDSOR_TOKEN) {
    console.log('   ℹ️ [GBP Automation] WINDSOR_API_TOKEN not configured; skipping GBP local post.');
    return { success: false, skipped: true, reason: 'No token' };
  }

  // Only post once the page answers 200 on the live site (Vercel deploys a few minutes after the push).
  const target = canonicalUrl || `${SITE_ORIGIN}/blog/${article.slug}`;
  let live = false;
  for (let i = 0; i < 18 && !live; i++) {
    try { const r = await fetch(target, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(15000) }); live = r.status === 200; } catch (e) { live = false; }
    if (!live) await new Promise(r => setTimeout(r, 20000));
  }
  if (!live) {
    console.log(`   ℹ️ [GBP Automation] ${target} is not live yet; no post made, so the profile never links to a 404.`);
    return { success: false, skipped: true, reason: 'Page not live' };
  }

  try {
    const summary = formatGbpSummary(article);
    
    // Resolve absolute image URL
    let photoUrl = article.featuredImage || '/assets/images/about_hero_bg.jpg';
    if (!photoUrl.startsWith('http')) {
      photoUrl = `${SITE_ORIGIN}${photoUrl.startsWith('/') ? photoUrl : '/' + photoUrl}`;
    }

    // Google post requires jpg/png; if webp, fallback to high-res JPG
    if (photoUrl.endsWith('.webp')) {
      photoUrl = `${SITE_ORIGIN}/assets/images/hero_agency_showcase.jpg`;
    }

    const postParams = {
      summary: summary,
      cta_type: 'LEARN_MORE',
      cta_url: canonicalUrl || `${SITE_ORIGIN}/blog/${article.slug}`,
      photo_url: photoUrl,
      language_code: 'en'
    };

    console.log(`   📡 [GBP Automation] Dispatching Google Local Post via Windsor...`);
    const result = await callWindsorTool('execute_action', {
      connector: 'google_my_business',
      account: GBP_LOCATION_ACCOUNT,
      action: 'create_local_post',
      params: postParams
    });

    if (result && result.content && result.content[0]) {
      const parsed = JSON.parse(result.content[0].text);
      if (parsed.success) {
        console.log(`   ✓ [GBP Automation] Google Local Post successfully published! (Post ID: ${parsed.data ? parsed.data.post_id : 'live'})`);
        return { success: true, data: parsed.data };
      } else {
        console.warn(`   ⚠️ [GBP Automation] Google API response: ${parsed.message || JSON.stringify(parsed)}`);
        return { success: false, error: parsed.message };
      }
    }

    console.log(`   ✓ [GBP Automation] Local post dispatched.`);
    return { success: true, result };
  } catch (err) {
    console.warn(`   ⚠️ [GBP Automation] Could not publish local post: ${err.message}`);
    return { success: false, error: err.message };
  }
}

module.exports = {
  publishToGoogleBusinessProfile,
  callWindsorTool
};

