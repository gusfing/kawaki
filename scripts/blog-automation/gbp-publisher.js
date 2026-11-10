/**
 * Automated Google Business Profile (GBP / Google Maps) Local Post Publisher
 * Powered by Windsor.ai MCP / JSON-RPC
 *
 * Automatically publishes a "What's New" local post to Kawaki Studios' Google Business Profile
 * whenever a new engineering article or case study is published.
 */

const WINDSOR_TOKEN = process.env.WINDSOR_API_TOKEN || '089684a623e6edd35e15214f85dd1775de61';
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
  const title = article.title || 'New Engineering Publication';
  const excerpt = article.excerpt || article.seoDescription || '';
  
  // Truncate cleanly if needed, Google allows up to 1,500 chars
  let cleanExcerpt = excerpt.replace(/\s+/g, ' ').trim();
  if (cleanExcerpt.length > 500) {
    cleanExcerpt = cleanExcerpt.substring(0, 497) + '...';
  }

  return `New from Kawaki Studios: ${title}

${cleanExcerpt}

Our engineering studio in New Delhi specializes in custom web development, Next.js architecture, headless Shopify, and AI automation. Read our complete technical guide on the Kawaki Studios publication.`;
}

/**
 * Dispatches a local post to Google Business Profile via Windsor
 */
async function publishToGoogleBusinessProfile(article, canonicalUrl) {
  if (!WINDSOR_TOKEN) {
    console.log('   ℹ️ [GBP Automation] WINDSOR_API_TOKEN not configured; skipping GBP local post.');
    return { success: false, skipped: true, reason: 'No token' };
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

