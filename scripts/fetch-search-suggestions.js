#!/usr/bin/env node

/**
 * Kawaki Studios - Google Autocomplete & "People Also Search For" Scraper
 *
 * Fetches real-time search suggestions directly from Google's suggestion pipeline
 * for all base keywords in data/keyword-map.json (or a custom query passed via CLI).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const KEYWORD_MAP_PATH = path.join(ROOT, 'data', 'keyword-map.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'keyword-suggestions.json');

async function getGoogleSuggestions(query, gl = 'in', hl = 'en') {
  const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&gl=${gl}&hl=${hl}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    const suggestions = Array.isArray(data[1]) ? data[1] : [];
    return suggestions;
  } catch (err) {
    console.error(`Error fetching suggestions for "${query}":`, err.message);
    return [];
  }
}

async function scrapeKeywordDeep(baseKeyword, gl = 'in') {
  // Query variations: base query, 'best' prefix, 'cost of' prefix, 'vs' suffix
  const queries = [
    baseKeyword,
    `best ${baseKeyword}`,
    `${baseKeyword} cost`,
    `how to choose ${baseKeyword}`
  ];

  const allSuggestions = new Set();
  const categorized = {
    autocomplete: [],
    commercial: [],
    informational: []
  };

  for (const q of queries) {
    const list = await getGoogleSuggestions(q, gl);
    for (const item of list) {
      const clean = item.trim();
      if (clean && !allSuggestions.has(clean.toLowerCase())) {
        allSuggestions.add(clean.toLowerCase());
        if (clean.includes('cost') || clean.includes('price') || clean.includes('pricing') || clean.includes('best') || clean.includes('top') || clean.includes('agency') || clean.includes('company')) {
          categorized.commercial.push(clean);
        } else if (clean.startsWith('how') || clean.startsWith('what') || clean.includes('guide') || clean.includes('checklist') || clean.includes('vs')) {
          categorized.informational.push(clean);
        } else {
          categorized.autocomplete.push(clean);
        }
      }
    }
    // Small delay to respect rate limits
    await new Promise(r => setTimeout(r, 150));
  }

  return {
    baseKeyword,
    region: gl,
    totalSuggestions: allSuggestions.size,
    suggestions: Array.from(allSuggestions),
    categorized
  };
}

async function main() {
  const customQuery = process.argv[2];

  if (customQuery) {
    console.log(`\n🔍 Fetching Google Search Suggestions for: "${customQuery}"...`);
    const result = await scrapeKeywordDeep(customQuery, 'in');
    console.log('\nTop Google Autocomplete & "People Also Search For":');
    result.suggestions.forEach((s, i) => console.log(`  ${(i + 1).toString().padStart(2, ' ')}. ${s}`));
    return;
  }

  // Load from keyword map
  if (!fs.existsSync(KEYWORD_MAP_PATH)) {
    console.error('Keyword map not found at:', KEYWORD_MAP_PATH);
    process.exit(1);
  }

  const keywordMap = JSON.parse(fs.readFileSync(KEYWORD_MAP_PATH, 'utf8'));
  const pages = keywordMap.pages || {};

  console.log(`\n🚀 Scraping Google suggestions for ${Object.keys(pages).length} base keywords...`);

  const results = {};

  for (const [route, info] of Object.entries(pages)) {
    const base = info.primary;
    if (!base) continue;

    const gl = (info.market && info.market.toLowerCase().includes('us') && !info.market.toLowerCase().includes('india')) ? 'us' : 'in';
    process.stdout.write(`  -> Scanning "${base}" (${gl.toUpperCase()})...\r`);
    const deepResult = await scrapeKeywordDeep(base, gl);
    results[base] = {
      route,
      market: info.market,
      volume: info.volume,
      kd: info.kd,
      ...deepResult
    };
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n\n✓ Scraped suggestions for ${Object.keys(results).length} base keywords!`);
  console.log(`✓ Saved to: data/keyword-suggestions.json`);
}

main();
