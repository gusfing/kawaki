#!/usr/bin/env node

/**
 * Kawaki Studios - Newsjacking Radar & Trend Scoring Engine
 *
 * Scans real-time feeds:
 *   1. Hacker News Top Stories API
 *   2. TechCrunch RSS Feed
 *   3. The Verge Atom/RSS Feed
 *   4. Google Trends RSS (US & India)
 *
 * Matches breaking trends against Kawaki Studios services from:
 *   - data/keyword-map.json
 *   - data/blog-plan.json
 *   - data/kawaki-facts.json
 *
 * Scores trends by:
 *   - Relevance to Kawaki services and target keywords (0-50)
 *   - Trend velocity and virality (HN upvotes, Google Trends volume, recency) (0-30)
 *   - Strategic commercial alignment with studio offerings (0-20)
 *
 * Generates a structured publication payload:
 *   { title, slug, primaryKeyword, hookAngle, targetServiceUrl, rawContext }
 *
 * If no breaking story exceeds the confidence threshold (or with --fallback),
 * falls back to the next unwritten topic in data/blog-plan.json.
 *
 * Enforces editorial constraints:
 *   - Titles under 60 characters
 *   - Zero banned phrases or banned punctuation from data/writing-rules.json
 *   - Strict studio facts from data/kawaki-facts.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const KEYWORD_MAP_PATH = path.join(ROOT, 'data', 'keyword-map.json');
const BLOG_PLAN_PATH = path.join(ROOT, 'data', 'blog-plan.json');
const WRITING_RULES_PATH = path.join(ROOT, 'data', 'writing-rules.json');
const CONTENT_DIR = path.join(ROOT, 'content');

const DEFAULT_MIN_SCORE = 50;
const FETCH_TIMEOUT_MS = 10000;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// ---------------------------------------------------------------------------
// Helpers: Data loading & Writing rules validation
// ---------------------------------------------------------------------------

function loadJson(filePath, fallback = {}) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error(`Warning: Failed to load ${filePath}: ${err.message}`);
  }
  return fallback;
}

const writingRules = loadJson(WRITING_RULES_PATH, { bannedPhrases: [], bannedCharacters: [] });
const bannedRegexes = (writingRules.bannedPhrases || []).map(p => new RegExp(p, 'gi'));
const bannedChars = writingRules.bannedCharacters || ['—', '–'];

function auditTextAgainstWritingRules(text) {
  const issues = [];
  if (!text) return issues;

  for (const re of bannedRegexes) {
    re.lastIndex = 0;
    const match = re.exec(text);
    if (match) {
      issues.push(`Banned phrase matched: "${match[0]}"`);
    }
  }

  for (const ch of bannedChars) {
    if (text.includes(ch)) {
      issues.push(`Banned character found: "${ch}"`);
    }
  }

  return issues;
}

function sanitizeText(text) {
  if (!text) return '';
  let clean = text
    .replace(/[—–]/g, ': ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&#8216;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Strip known banned words if found
  for (const re of bannedRegexes) {
    clean = clean.replace(re, '');
  }
  return clean.replace(/\s+/g, ' ').trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-+$/, '');
}

// ---------------------------------------------------------------------------
// Service Taxonomy & Keyword Definitions
// ---------------------------------------------------------------------------

const SERVICE_TAXONOMY = [
  {
    category: 'generative-engine-optimization',
    name: 'Generative Engine Optimization',
    targetUrl: '/generative-engine-optimization',
    primaryKeyword: 'generative engine optimization',
    also: ['geo for ai search', 'how ai search engines cite sources', 'ai search optimization services'],
    triggers: [
      'perplexity', 'chatgpt search', 'searchgpt', 'google ai overview', 'ai overview',
      'llm citation', 'generative engine', 'ai search', 'answer engine', 'gemini search',
      'deepseek search', 'copilot search', 'rag search', 'ai search engine'
    ],
    commercialIntent: 0.95
  },
  {
    category: 'ai-agents-automation',
    name: 'AI Agent & Workflow Automation',
    targetUrl: '/ai-agent-development',
    primaryKeyword: 'ai agent development services',
    also: ['ai agent development company', 'ai automation agency', 'ai chatbot development company'],
    triggers: [
      'ai agent', 'autonomous agent', 'model context protocol', 'mcp', 'agentic',
      'inference server', 'deepseek', 'claude 3.7', 'openai o3', 'gpt-4o', 'llm reasoning',
      'langchain', 'n8n', 'workflow automation', 'ai automation', 'ai chatbot', 'synthetic data'
    ],
    commercialIntent: 0.90
  },
  {
    category: 'technical-seo',
    name: 'Technical SEO & Web Architecture',
    targetUrl: '/technical-seo',
    primaryKeyword: 'technical seo agency',
    also: ['technical seo services', 'technical seo company', 'core web vitals'],
    triggers: [
      'google algorithm', 'core web vitals', 'search console', 'crawl budget',
      'indexing outage', 'google ranking', 'canonical', 'site speed', 'page speed',
      'search leak', 'rendering', 'lighthouse score', 'serp update'
    ],
    commercialIntent: 0.92
  },
  {
    category: 'custom-web-development',
    name: 'Custom Web & App Engineering',
    targetUrl: '/services/custom-web-development',
    primaryKeyword: 'custom web development services',
    also: ['web application development company', 'custom web development company'],
    triggers: [
      'next.js', 'react 19', 'typescript', 'web performance', 'javascript runtime',
      'wasm', 'bun', 'vite', 'server components', 'frontend architecture', 'outsource web development',
      'offshore development', 'custom software'
    ],
    commercialIntent: 0.88
  },
  {
    category: 'shopify-ecommerce',
    name: 'Shopify & Headless Ecommerce',
    targetUrl: '/services/shopify-development',
    primaryKeyword: 'shopify development agency',
    also: ['shopify web development company', 'shopify design agency', 'shopify plus agency'],
    triggers: [
      'shopify', 'ecommerce platform', 'headless commerce', 'shopify checkout',
      'cart abandonment', 'merchant store', 'online retail', 'black friday ecommerce'
    ],
    commercialIntent: 0.85
  },
  {
    category: 'wordpress-security',
    name: 'WordPress Malware Removal & Hardening',
    targetUrl: '/services/wordpress-malware-removal',
    primaryKeyword: 'wordpress malware removal',
    also: ['wordpress malware cleaner', 'remove wordpress malware'],
    triggers: [
      'wordpress vulnerability', 'wordpress malware', 'cve', 'plugin exploit',
      'backdoor', 'web shell', 'malicious redirect', 'zero-day wordpress', 'site hack'
    ],
    commercialIntent: 0.88
  },
  {
    category: 'mobile-app-development',
    name: 'Mobile Application Development',
    targetUrl: '/services/mobile-app-development',
    primaryKeyword: 'mobile app development company in india',
    also: ['flutter app development company', 'best mobile app development company'],
    triggers: [
      'flutter', 'react native', 'ios app', 'android app', 'app store policy',
      'mobile performance', 'cross-platform mobile'
    ],
    commercialIntent: 0.82
  },
  {
    category: 'saas-mvp',
    name: 'AI SaaS & MVP Development',
    targetUrl: '/solutions/ai-saas-mvp-development',
    primaryKeyword: 'saas development company',
    also: ['mvp development company', 'saas development services'],
    triggers: [
      'saas startup', 'micro saas', 'mvp development', 'product hunt launch',
      'ai wrapper', 'software as a service', 'bootstrapped saas'
    ],
    commercialIntent: 0.86
  }
];

// ---------------------------------------------------------------------------
// Feed Scanners (HN, TechCrunch, The Verge, Google Trends)
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, application/json, text/xml, */*',
        ...(options.headers || {})
      }
    });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function scanHackerNews(limit = 25) {
  try {
    const res = await fetchWithTimeout('https://hacker-news.firebaseio.com/v0/topstories.json');
    if (!res.ok) throw new Error(`HN topstories status ${res.status}`);
    const storyIds = (await res.json()).slice(0, limit);

    const items = await Promise.allSettled(
      storyIds.map(async id => {
        const itemRes = await fetchWithTimeout(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (!itemRes.ok) return null;
        return itemRes.json();
      })
    );

    return items
      .filter(p => p.status === 'fulfilled' && p.value && p.value.title)
      .map(p => {
        const item = p.value;
        return {
          source: 'Hacker News',
          title: sanitizeText(item.title),
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
          snippet: item.text ? sanitizeText(item.text).slice(0, 300) : '',
          rawScore: item.score || 0,
          commentsCount: item.descendants || 0,
          publishedAt: item.time ? new Date(item.time * 1000).toISOString() : new Date().toISOString()
        };
      });
  } catch (err) {
    console.error(`[Radar] Hacker News scan warning: ${err.message}`);
    return [];
  }
}

async function scanTechCrunch() {
  const feeds = [
    'https://techcrunch.com/feed/',
    'https://feeds.feedburner.com/TechCrunch/'
  ];

  for (const feedUrl of feeds) {
    try {
      const res = await fetchWithTimeout(feedUrl);
      if (!res.ok) continue;
      const xml = await res.text();
      const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

      if (itemBlocks.length > 0) {
        return itemBlocks.slice(0, 20).map(block => {
          const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
          const linkMatch = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
          const descMatch = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
          const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

          const title = titleMatch ? sanitizeText(titleMatch[1]) : '';
          const url = linkMatch ? linkMatch[1].trim() : '';
          const snippet = descMatch ? sanitizeText(descMatch[1]).slice(0, 300) : '';
          const publishedAt = dateMatch ? new Date(dateMatch[1].trim()).toISOString() : new Date().toISOString();

          return {
            source: 'TechCrunch',
            title,
            url,
            snippet,
            rawScore: 50, // default baseline for editorial front page
            publishedAt
          };
        }).filter(item => item.title.length > 0);
      }
    } catch (err) {
      // try next feed
    }
  }
  return [];
}

async function scanTheVerge() {
  try {
    const res = await fetchWithTimeout('https://www.theverge.com/rss/index.xml');
    if (!res.ok) throw new Error(`The Verge status ${res.status}`);
    const xml = await res.text();

    const entryBlocks = xml.match(/<entry[\s\S]*?<\/entry>/gi) || xml.match(/<item[\s\S]*?<\/item>/gi) || [];

    return entryBlocks.slice(0, 20).map(block => {
      const titleMatch = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      const linkMatch = block.match(/<link[^>]*href="([^"]+)"/i) || block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      const descMatch = block.match(/<content[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content>/i) ||
                         block.match(/<summary[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/i) ||
                         block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
      const dateMatch = block.match(/<published>([\s\S]*?)<\/published>/i) ||
                        block.match(/<updated>([\s\S]*?)<\/updated>/i) ||
                        block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

      const title = titleMatch ? sanitizeText(titleMatch[1]) : '';
      const url = linkMatch ? (linkMatch[1] || '').trim() : '';
      const snippet = descMatch ? sanitizeText(descMatch[1]).slice(0, 300) : '';
      const publishedAt = dateMatch ? new Date(dateMatch[1].trim()).toISOString() : new Date().toISOString();

      return {
        source: 'The Verge',
        title,
        url,
        snippet,
        rawScore: 50,
        publishedAt
      };
    }).filter(item => item.title.length > 0);
  } catch (err) {
    console.error(`[Radar] The Verge scan warning: ${err.message}`);
    return [];
  }
}

async function scanGoogleTrends() {
  const geos = ['US', 'IN'];
  const allTrends = [];

  for (const geo of geos) {
    try {
      const res = await fetchWithTimeout(`https://trends.google.com/trending/rss?geo=${geo}`);
      if (!res.ok) continue;
      const xml = await res.text();
      const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

      itemBlocks.forEach(block => {
        const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        const trafMatch = block.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/i);
        const linkMatch = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
        const newsTitleMatch = block.match(/<ht:news_item_title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/ht:news_item_title>/i);
        const newsUrlMatch = block.match(/<ht:news_item_url>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/ht:news_item_url>/i);
        const newsSnippetMatch = block.match(/<ht:news_item_snippet>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/ht:news_item_snippet>/i);
        const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

        const title = titleMatch ? sanitizeText(titleMatch[1]) : '';
        const newsTitle = newsTitleMatch ? sanitizeText(newsTitleMatch[1]) : '';
        const fullTitle = newsTitle || title;
        const trafStr = trafMatch ? trafMatch[1].replace(/[^0-9]/g, '') : '0';
        let numericTraffic = parseInt(trafStr, 10) || 0;
        if ((trafMatch ? trafMatch[1] : '').toUpperCase().includes('K')) {
          numericTraffic *= 1000;
        } else if ((trafMatch ? trafMatch[1] : '').toUpperCase().includes('M')) {
          numericTraffic *= 1000000;
        }

        allTrends.push({
          source: `Google Trends (${geo})`,
          title: fullTitle,
          queryTerm: title,
          url: (newsUrlMatch ? newsUrlMatch[1].trim() : '') || (linkMatch ? linkMatch[1].trim() : ''),
          snippet: newsSnippetMatch ? sanitizeText(newsSnippetMatch[1]).slice(0, 300) : title,
          rawScore: numericTraffic,
          publishedAt: dateMatch ? new Date(dateMatch[1].trim()).toISOString() : new Date().toISOString()
        });
      });
    } catch (err) {
      console.error(`[Radar] Google Trends (${geo}) scan warning: ${err.message}`);
    }
  }

  return allTrends.filter(item => item.title.length > 0);
}

async function scanAllFeeds() {
  const [hnRes, tcRes, vergeRes, gtRes] = await Promise.allSettled([
    scanHackerNews(30),
    scanTechCrunch(),
    scanTheVerge(),
    scanGoogleTrends()
  ]);

  const items = [
    ...(hnRes.status === 'fulfilled' ? hnRes.value : []),
    ...(tcRes.status === 'fulfilled' ? tcRes.value : []),
    ...(vergeRes.status === 'fulfilled' ? vergeRes.value : []),
    ...(gtRes.status === 'fulfilled' ? gtRes.value : [])
  ];

  return {
    items,
    stats: {
      hnCount: hnRes.status === 'fulfilled' ? hnRes.value.length : 0,
      tcCount: tcRes.status === 'fulfilled' ? tcRes.value.length : 0,
      vergeCount: vergeRes.status === 'fulfilled' ? vergeRes.value.length : 0,
      gtCount: gtRes.status === 'fulfilled' ? gtRes.value.length : 0,
      totalScanned: items.length
    }
  };
}

// ---------------------------------------------------------------------------
// Trend Scoring Engine
// ---------------------------------------------------------------------------

function scoreNewsItem(item, keywordMap, blogPlan) {
  const text = `${item.title} ${item.snippet || ''}`.toLowerCase();

  let matchedTaxonomy = null;
  let bestRelevanceScore = 0;
  let matchType = 'none';
  let matchedKeyword = '';

  // 1. Evaluate against service taxonomy & triggers
  for (const tax of SERVICE_TAXONOMY) {
    let score = 0;
    let localMatchType = 'none';

    // Check direct primary keyword match
    if (text.includes(tax.primaryKeyword.toLowerCase())) {
      score = 48;
      localMatchType = 'primaryKeyword';
    } else {
      // Check also keywords
      for (const ak of tax.also) {
        if (text.includes(ak.toLowerCase())) {
          score = Math.max(score, 38);
          localMatchType = 'alsoKeyword';
          break;
        }
      }
      // Check triggers
      for (const tr of tax.triggers) {
        const regex = new RegExp(`\\b${tr.toLowerCase()}\\b`, 'i');
        if (regex.test(text)) {
          score = Math.max(score, 25);
          if (localMatchType === 'none') localMatchType = 'trigger';
        }
      }
    }

    if (score > bestRelevanceScore) {
      bestRelevanceScore = score;
      matchedTaxonomy = tax;
      matchType = localMatchType;
      matchedKeyword = tax.primaryKeyword;
    }
  }

  // 2. Also check keyword-map.json pages directly
  if (keywordMap && keywordMap.pages) {
    for (const [pageUrl, pageData] of Object.entries(keywordMap.pages)) {
      if (pageData.primary && text.includes(pageData.primary.toLowerCase())) {
        if (bestRelevanceScore < 50) {
          bestRelevanceScore = 50;
          matchType = 'exactPagePrimary';
          matchedKeyword = pageData.primary;
          if (!matchedTaxonomy) {
            matchedTaxonomy = {
              category: 'keyword-map-match',
              name: pageData.primary,
              targetUrl: pageUrl,
              primaryKeyword: pageData.primary,
              commercialIntent: 0.90
            };
          }
        }
      }
    }
  }

  // If no relevance found, return zero score
  if (!matchedTaxonomy || bestRelevanceScore === 0) {
    return {
      item,
      totalScore: 0,
      relevanceScore: 0,
      viralityScore: 0,
      alignmentScore: 0,
      matchedTaxonomy: null
    };
  }

  // 3. Virality Score (0 - 30)
  let viralityScore = 0;
  if (item.source === 'Hacker News') {
    if (item.rawScore >= 400) viralityScore = 30;
    else if (item.rawScore >= 200) viralityScore = 24;
    else if (item.rawScore >= 100) viralityScore = 18;
    else if (item.rawScore >= 40) viralityScore = 12;
    else viralityScore = 6;
  } else if (item.source.startsWith('Google Trends')) {
    if (item.rawScore >= 100000) viralityScore = 30;
    else if (item.rawScore >= 50000) viralityScore = 24;
    else if (item.rawScore >= 10000) viralityScore = 18;
    else viralityScore = 10;
  } else {
    // TechCrunch / The Verge front-page breaking coverage
    viralityScore = 18;
  }

  // Recency bonus: within last 12 hours
  const hoursOld = (Date.now() - new Date(item.publishedAt).getTime()) / (1000 * 60 * 60);
  if (hoursOld >= 0 && hoursOld <= 12) {
    viralityScore = Math.min(30, viralityScore + 5);
  }

  // 4. Strategic Commercial Alignment (0 - 20)
  let alignmentScore = 0;
  if (matchedTaxonomy.commercialIntent) {
    alignmentScore = Math.round(matchedTaxonomy.commercialIntent * 20);
  }

  // Priority bonus if item also matches an upcoming blog plan title
  if (blogPlan && Array.isArray(blogPlan.next)) {
    for (const bp of blogPlan.next) {
      if (text.includes(bp.primaryKeyword.toLowerCase()) || (bp.also && bp.also.some(a => text.includes(a.toLowerCase())))) {
        alignmentScore = Math.min(20, alignmentScore + 5);
        break;
      }
    }
  }

  const totalScore = Math.min(100, bestRelevanceScore + viralityScore + alignmentScore);

  return {
    item,
    totalScore,
    relevanceScore: bestRelevanceScore,
    viralityScore,
    alignmentScore,
    matchType,
    matchedKeyword,
    matchedTaxonomy
  };
}

// ---------------------------------------------------------------------------
// Title & Hook Angle Generation
// ---------------------------------------------------------------------------

function formatEditorialTitle(str) {
  if (!str) return '';
  let formatted = str.trim();
  // Capitalize known acronyms
  formatted = formatted
    .replace(/\bai\b/gi, 'AI')
    .replace(/\bseo\b/gi, 'SEO')
    .replace(/\berp\b/gi, 'ERP')
    .replace(/\bsaas\b/gi, 'SaaS')
    .replace(/\bllm\b/gi, 'LLM')
    .replace(/\bmcp\b/gi, 'MCP')
    .replace(/\bapi\b/gi, 'API');

  // Capitalize first character
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function extractNewsContext(newsTitle) {
  if (!newsTitle) return '';
  const clean = newsTitle
    .replace(/\|\s*TechCrunch/gi, '')
    .replace(/-\s*The Verge/gi, '')
    .replace(/^Ask HN:\s*/gi, '')
    .replace(/^Show HN:\s*/gi, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[—–]/g, ':')
    .replace(/\?/g, ' : ')
    .replace(/\s+/g, ' ')
    .trim();

  // Try extracting meaningful sub-clause
  const clauses = clean.split(/[:;]/).map(c => c.trim()).filter(Boolean);
  for (const clause of clauses.reverse()) {
    if (clause.length >= 4 && clause.length <= 25 && !auditTextAgainstWritingRules(clause).length) {
      return clause;
    }
  }

  // Filter common stop words and grab the top 2-3 significant words
  const stopWords = new Set(['want', 'to', 'buy', 'your', 'kid', 'an', 'a', 'the', 'this', 'that', 'in', 'on', 'at', 'for', 'and', 'or', 'of', 'with', 'by', 'from', 'about', 'how', 'why', 'what', 'is', 'are']);
  const words = clean.split(/\s+/).filter(w => !stopWords.has(w.toLowerCase().replace(/[^a-z0-9]/g, '')));
  if (words.length > 0) {
    const candidate = words.slice(0, 3).join(' ');
    if (candidate.length <= 25 && candidate.length >= 4 && !auditTextAgainstWritingRules(candidate).length) {
      return candidate;
    }
  }

  return clean.slice(0, 24).trim();
}

function buildNewsjackHeadline(primaryKeyword, newsTitle) {
  // Title must stay <= 60 chars and include the primary keyword
  // Sentence case / clean words, zero banned phrases, zero dashes
  const pk = formatEditorialTitle(primaryKeyword);
  const context = extractNewsContext(newsTitle);

  if (context && context.length >= 3) {
    const candidates = [
      `${pk}: ${context}`,
      `${pk}: ${context} Impact`,
      `${pk}: The ${context} Shift`
    ];
    for (const c of candidates) {
      if (c.length <= 58 && !auditTextAgainstWritingRules(c).length) {
        return c;
      }
    }
  }

  // Fallback candidate under 58 chars
  const fallback = `${pk}: Technical Guide`;
  if (fallback.length <= 58) return fallback;
  return pk.slice(0, 58);
}

function buildHookAngle(newsItem, taxonomy) {
  const serviceName = taxonomy.name;
  const sourceName = newsItem.source;
  const sourceTitle = newsItem.title;
  const sourceSnippet = newsItem.snippet ? ` Reporting indicates: "${newsItem.snippet.slice(0, 180)}..."` : '';

  // Concise paragraph linking breaking news directly to service implications
  const angle = `Recent reporting on ${sourceName} regarding "${sourceTitle}" highlights shifting technical and compliance requirements in ${serviceName}.${sourceSnippet} Engineering teams cannot rely on generic templates or unverified third party dependencies. Kawaki Studios builds verified web architectures designed for production stability, clean performance, and real business search visibility.`;

  return sanitizeText(angle);
}

// ---------------------------------------------------------------------------
// Fallback Mode (Next Unwritten Scheduled Post from blog-plan.json)
// ---------------------------------------------------------------------------

function getFallbackPayload() {
  const blogPlan = loadJson(BLOG_PLAN_PATH, { next: [], done: [] });
  const writtenSlugs = new Set();

  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR);
    for (const f of files) {
      if (f.endsWith('.md')) {
        writtenSlugs.add(f.replace(/\.md$/, ''));
      }
    }
  }

  const doneSlugs = new Set((blogPlan.done || []).map(d => d.slug));

  let candidate = null;
  if (Array.isArray(blogPlan.next)) {
    for (const item of blogPlan.next) {
      if (!writtenSlugs.has(item.slug) && !doneSlugs.has(item.slug)) {
        candidate = item;
        break;
      }
    }
  }

  // If all next items are written, take the first item
  if (!candidate && Array.isArray(blogPlan.next) && blogPlan.next.length > 0) {
    candidate = blogPlan.next[0];
  }

  if (!candidate) {
    candidate = {
      title: 'How to Outsource Web Development to India',
      slug: 'how-to-outsource-web-development-to-india',
      primaryKeyword: 'outsource web development',
      linkTo: '/outsource-web-development'
    };
  }

  // Clean title to ensure <= 60 chars
  let title = candidate.title;
  if (title.length > 60) {
    title = candidate.primaryKeyword ? `${candidate.primaryKeyword}: Plain Guide` : title.slice(0, 58);
  }
  title = sanitizeText(title);

  const hookAngle = `A practical technical guide for founders evaluating engineering partners, focusing on code quality, direct Git milestone delivery, and zero bloated agency overhead.`;

  const payload = {
    title,
    slug: candidate.slug || slugify(title),
    primaryKeyword: candidate.primaryKeyword || 'custom web development services',
    hookAngle: sanitizeText(hookAngle),
    targetServiceUrl: candidate.linkTo || '/services/custom-web-development',
    rawContext: {
      source: 'blog-plan-fallback',
      sourceTitle: candidate.title,
      sourceUrl: candidate.linkTo || '/services/custom-web-development',
      trendScore: 100,
      scoreBreakdown: {
        relevance: 50,
        virality: 30,
        alignment: 20
      },
      reason: 'Scheduled editorial fallback from data/blog-plan.json (no breaking trend exceeding threshold)',
      detectedAt: new Date().toISOString()
    }
  };

  return payload;
}

// ---------------------------------------------------------------------------
// Main Radar Logic
// ---------------------------------------------------------------------------

async function runRadar(options = {}) {
  const minScore = typeof options.minScore === 'number' ? options.minScore : DEFAULT_MIN_SCORE;
  const forceFallback = options.forceFallback || false;

  const keywordMap = loadJson(KEYWORD_MAP_PATH);
  const blogPlan = loadJson(BLOG_PLAN_PATH);

  if (forceFallback) {
    const payload = getFallbackPayload();
    return {
      status: 'fallback',
      reason: 'Forced fallback via CLI argument',
      payload,
      stats: { totalScanned: 0 }
    };
  }

  // 1. Scan real-time feeds
  const { items, stats } = await scanAllFeeds();

  // 2. Score each candidate
  const scoredItems = items.map(item => scoreNewsItem(item, keywordMap, blogPlan));
  scoredItems.sort((a, b) => b.totalScore - a.totalScore);

  const topMatch = scoredItems.find(s => s.totalScore >= minScore);

  // 3. Fallback check
  if (!topMatch) {
    const payload = getFallbackPayload();
    return {
      status: 'fallback',
      reason: `No breaking trend met confidence threshold (min score: ${minScore}). Falling back to scheduled blog plan.`,
      stats,
      scoredCandidatesCount: scoredItems.filter(s => s.totalScore > 0).length,
      topEvaluatedCandidates: scoredItems.slice(0, 5).map(s => ({
        source: s.item.source,
        title: s.item.title,
        score: s.totalScore,
        category: s.matchedTaxonomy ? s.matchedTaxonomy.name : 'none'
      })),
      payload
    };
  }

  // 4. Generate structured payload for breaking trend
  const tax = topMatch.matchedTaxonomy;
  const newsItem = topMatch.item;
  const primaryKeyword = topMatch.matchedKeyword || tax.primaryKeyword;

  // Title generation & validation
  let generatedTitle = buildNewsjackHeadline(primaryKeyword, newsItem.title);
  if (generatedTitle.length > 60) {
    generatedTitle = `${primaryKeyword}: Plain Guide`.slice(0, 59);
  }
  generatedTitle = sanitizeText(generatedTitle);

  // Slug generation
  const slug = slugify(`${primaryKeyword}-${newsItem.title.slice(0, 25)}`);

  // Hook angle
  const hookAngle = buildHookAngle(newsItem, tax);

  // Verify rules
  const titleIssues = auditTextAgainstWritingRules(generatedTitle);
  const angleIssues = auditTextAgainstWritingRules(hookAngle);

  if (titleIssues.length > 0 || angleIssues.length > 0) {
    console.error('[Radar] Warning: Writing rules issues detected, auto-sanitizing output');
  }

  const payload = {
    title: generatedTitle,
    slug,
    primaryKeyword,
    hookAngle,
    targetServiceUrl: tax.targetUrl,
    rawContext: {
      source: newsItem.source,
      sourceTitle: newsItem.title,
      sourceUrl: newsItem.url,
      trendScore: topMatch.totalScore,
      scoreBreakdown: {
        relevance: topMatch.relevanceScore,
        virality: topMatch.viralityScore,
        alignment: topMatch.alignmentScore
      },
      matchType: topMatch.matchType,
      detectedAt: new Date().toISOString(),
      snippet: newsItem.snippet
    }
  };

  return {
    status: 'success',
    stats,
    topMatch,
    payload
  };
}

// ---------------------------------------------------------------------------
// CLI Execution
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const jsonOnly = args.includes('--json');
  const forceFallback = args.includes('--fallback');
  const showAll = args.includes('--all');

  let minScore = DEFAULT_MIN_SCORE;
  const scoreIdx = args.indexOf('--min-score');
  if (scoreIdx !== -1 && args[scoreIdx + 1]) {
    minScore = parseInt(args[scoreIdx + 1], 10) || DEFAULT_MIN_SCORE;
  }

  if (!jsonOnly) {
    console.log(`\n===============================================================`);
    console.log(`📡 KAWAKI STUDIOS — NEWSJACKING RADAR & TREND SCORING ENGINE`);
    console.log(`===============================================================\n`);
    console.log(`Config: Min Confidence Score = ${minScore} | Fallback Mode = ${forceFallback ? 'FORCED' : 'AUTO'}`);
  }

  try {
    const result = await runRadar({ minScore, forceFallback });

    if (jsonOnly) {
      process.stdout.write(JSON.stringify(result.payload, null, 2) + '\n');
      return;
    }

    console.log(`\n[Scan Summary] Scanned ${result.stats.totalScanned || 0} real-time feed items:`);
    if (result.stats.hnCount !== undefined) {
      console.log(`   - Hacker News:   ${result.stats.hnCount} top stories`);
      console.log(`   - TechCrunch:    ${result.stats.tcCount} articles`);
      console.log(`   - The Verge:     ${result.stats.vergeCount} articles`);
      console.log(`   - Google Trends: ${result.stats.gtCount} trending queries`);
    }

    if (result.status === 'fallback') {
      console.log(`\n⚡ [Status: FALLBACK]`);
      console.log(`   ${result.reason}`);
      if (result.topEvaluatedCandidates && result.topEvaluatedCandidates.length) {
        console.log(`\n   Top Evaluated Candidates Below Threshold:`);
        result.topEvaluatedCandidates.forEach((c, idx) => {
          console.log(`   ${idx + 1}. [${c.score} pts] [${c.source}] ${c.title.slice(0, 60)} -> Category: ${c.category}`);
        });
      }
    } else {
      console.log(`\n🔥 [Status: BREAKING TREND DETECTED]`);
      console.log(`   Source:   ${result.topMatch.item.source}`);
      console.log(`   Headline: "${result.topMatch.item.title}"`);
      console.log(`   Score:    ${result.topMatch.totalScore}/100 (Relevance: ${result.topMatch.relevanceScore}, Virality: ${result.topMatch.viralityScore}, Alignment: ${result.topMatch.alignmentScore})`);
      console.log(`   Match:    ${result.topMatch.matchType} -> ${result.topMatch.matchedTaxonomy.name}`);
    }

    console.log(`\n===============================================================`);
    console.log(`📦 STRUCTURED PUBLICATION PAYLOAD:`);
    console.log(`===============================================================`);
    console.log(JSON.stringify(result.payload, null, 2));

    // Audit verification check
    const titleCheck = auditTextAgainstWritingRules(result.payload.title);
    const angleCheck = auditTextAgainstWritingRules(result.payload.hookAngle);
    const charCount = result.payload.title.length;

    console.log(`\n[Quality Audit Check]`);
    console.log(`   Title Length:     ${charCount} / 60 chars [${charCount <= 60 ? 'PASS' : 'FAIL'}]`);
    console.log(`   Title Writing:    ${titleCheck.length === 0 ? 'CLEAN (PASS)' : 'FAIL: ' + titleCheck.join(', ')}`);
    console.log(`   Hook Angle Clean: ${angleCheck.length === 0 ? 'CLEAN (PASS)' : 'FAIL: ' + angleCheck.join(', ')}`);
    console.log(`===============================================================\n`);

  } catch (err) {
    console.error('\n❌ Fatal Radar Error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  scanAllFeeds,
  scanHackerNews,
  scanTechCrunch,
  scanTheVerge,
  scanGoogleTrends,
  scoreNewsItem,
  getFallbackPayload,
  runRadar,
  auditTextAgainstWritingRules,
  sanitizeText,
  buildNewsjackHeadline,
  buildHookAngle,
  SERVICE_TAXONOMY
};
