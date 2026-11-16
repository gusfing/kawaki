const fs = require('fs');
const { factsFile, EDITORIAL_STANDARDS } = require('./config.js');

function parseFrontmatter(markdownText) {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = markdownText.match(fmRegex);

  if (!match) {
    // If no frontmatter block, try to infer title from first H1
    const h1Match = markdownText.match(/^#\s+(.+)$/m);
    return {
      metadata: {
        title: h1Match ? h1Match[1].trim() : 'Untitled Post',
        status: 'draft'
      },
      content: markdownText
    };
  }

  const rawYaml = match[1];
  const body = match[2];
  const metadata = {};

  rawYaml.split(/\r?\n/).forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Strip quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      try {
        val = JSON.parse(val);
      } catch (e) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    metadata[key] = val;
  });

  return { metadata, content: body };
}

function countWords(text) {
  if (!text) return 0;
  // Clean markdown tokens, code blocks, images
  const clean = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[.*?\]\((.*?)\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_~>\-+|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.split(/\s+/).filter(Boolean).length;
}

function auditArticle(articleData) {
  const issues = [];
  const warnings = [];

  const title = articleData.title || '';
  const slug = articleData.slug || '';
  const content = articleData.content || '';
  const excerpt = articleData.excerpt || '';
  const seoDescription = articleData.seoDescription || '';
  const seoKeywords = articleData.seoKeywords || '';

  // 1. Mandatory metadata fields
  if (!title || title.length < 15) {
    issues.push(`Title is missing or too short ("${title}"). Must be at least 15 chars.`);
  }
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    issues.push(`Slug "${slug}" is invalid. Must be lowercase alphanumeric with hyphens.`);
  }
  if (!excerpt) {
    warnings.push('Excerpt is missing; will fallback to first paragraph.');
  }
  if (seoDescription && (seoDescription.length < 80 || seoDescription.length > 200)) {
    warnings.push(`SEO description length (${seoDescription.length} chars) is suboptimal. Ideal: 120-165 chars.`);
  }

  // 2. Word count check
  const words = countWords(content);
  if (words < EDITORIAL_STANDARDS.minWordCount) {
    issues.push(`Word count (${words}) is below Kawaki editorial threshold (${EDITORIAL_STANDARDS.minWordCount} words).`);
  }

  // 3. Heading Structure
  const h2Matches = content.match(/^##\s+[^\n]+/gm) || [];
  const h3Matches = content.match(/^###\s+[^\n]+/gm) || [];
  if (h2Matches.length < 3) {
    issues.push(`Insufficient H2 structure: found ${h2Matches.length} sections, expected at least 3.`);
  }
  if (h3Matches.length < 2) {
    warnings.push(`Low H3 sub-heading density: found ${h3Matches.length} sub-sections.`);
  }

  // 4. Disallowed Claims & Facts Gate
  if (fs.existsSync(factsFile)) {
    try {
      const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));
      if (Array.isArray(facts.disallowedClaims)) {
        for (const claim of facts.disallowedClaims) {
          const escaped = claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const re = new RegExp('\\b' + escaped + '\\b', 'i');
          if (re.test(content) || re.test(title)) {
            issues.push(`Disallowed studio claim detected: "${claim}". Must adhere to verified studio facts.`);
          }
        }
      }
    } catch (e) {
      warnings.push(`Could not read factsFile for disallowed claim verification: ${e.message}`);
    }
  }

  // 4b. Writing rules: banned phrases and dashes (data/writing-rules.json, AGENTS.md)
  try {
    const path = require('path');
    const rules = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'data', 'writing-rules.json'), 'utf8'));
    const prose = [title, excerpt, seoDescription, content.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ').replace(/\]\([^)]*\)/g, ']')].join(' \n ');
    for (const p of rules.bannedPhrases) {
      const m = prose.match(new RegExp(p, 'i'));
      if (m) issues.push(`Banned phrase "${m[0]}": rewrite it in plain language (see AGENTS.md, Writing).`);
    }
    for (const ch of rules.bannedCharacters) {
      const n = prose.split(ch).length - 1;
      if (n) issues.push(`${n} ${ch === '\u2014' ? 'em' : 'en'} dash(es): use commas, colons or "to" instead.`);
    }
    // Image rules: a local hero image with its WebP pair, never a stock hotlink.
    const img = articleData.featuredImage || '';
    if (!img) issues.push('No featuredImage. Make one following AGENTS.md, Blog images.');
    else if (/^https?:/i.test(img)) issues.push(`featuredImage is a hotlink (${img}). Use a local image made to AGENTS.md, Blog images.`);
    else {
      const base = path.resolve(__dirname, '..', '..', 'public') + img.replace(/\.(jpe?g|png)$/i, '');
      if (!fs.existsSync(base + '.webp') || !fs.existsSync(base + '-720.webp')) issues.push(`featuredImage needs ${img.replace(/\.(jpe?g|png)$/i, '')}.webp and -720.webp next to it (AGENTS.md, Blog images).`);
    }
  } catch (e) {
    issues.push(`Writing rules could not be checked: ${e.message}`);
  }

  // 5. Internal link verification
  const linkMatches = content.match(/\[[^\]]+\]\((\/[^\)]+)\)/g) || [];
  if (linkMatches.length < 2) {
    issues.push(`Insufficient internal linking: found ${linkMatches.length} internal links, expected at least 2 money page / service links.`);
  }

  // 6. FAQ Section check
  const hasFaq = /##.*(?:Frequently Asked Questions|FAQ)/i.test(content);
  if (!hasFaq) {
    warnings.push('No dedicated FAQ section found (## Frequently Asked Questions). FAQ boosts AI search citation and rich results.');
  }

  const passed = issues.length === 0;

  return {
    passed,
    wordCount: words,
    h2Count: h2Matches.length,
    h3Count: h3Matches.length,
    internalLinksCount: linkMatches.length,
    issues,
    warnings
  };
}

module.exports = {
  parseFrontmatter,
  countWords,
  auditArticle
};

