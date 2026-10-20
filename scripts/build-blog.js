const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const sanitizeHtmlLib = require('sanitize-html');
const { getDb, formatBlogRow, FALLBACK_BLOGS } = require('../lib/db-api-handler.js');
const { generateLlms } = require('./generate-llms.js');
const { generateArticleHtml } = require('./render-article.js');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const blogDir = path.resolve(publicDir, 'blog');
const blogIndexFile = path.resolve(publicDir, 'blog.html');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');

// Ensure public/blog directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Deterministic UTC date formatter
function formatDate(isoStr) {
  if (!isoStr) return '25 Feb 2026';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '25 Feb 2026';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// 1. Deterministic Article Loader (DB priority -> Fallback merge)
function getPublishedArticles() {
  const articlesMap = new Map();

  // Load fallback inventory first as base
  if (Array.isArray(FALLBACK_BLOGS)) {
    for (const b of FALLBACK_BLOGS) {
      if (b.status === 'published' && b.slug) {
        articlesMap.set(b.slug, { ...b });
      }
    }
  }

  // Override / supplement with database records when available
  try {
    const db = getDb();
    if (db) {
      const rows = db.prepare("SELECT * FROM blogs WHERE status = 'published'").all();
      if (Array.isArray(rows)) {
        for (const row of rows) {
          const formatted = formatBlogRow(row);
          if (formatted && formatted.slug) {
            articlesMap.set(formatted.slug, formatted);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Build Blog] DB load note (using fallback):', err.message);
  }

  // Deterministic sort: createdAt descending, tie-break by slug
  const articles = Array.from(articlesMap.values()).sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    if (timeB !== timeA) return timeB - timeA;
    return a.slug.localeCompare(b.slug);
  });

  return articles;
}

// 2. Hardened AST-based Allowlist HTML Sanitizer
function sanitizeHtml(html) {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
      'blockquote', 'code', 'pre',
      'a', 'img', 'br', 'hr', 'span',
      'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      'figure': ['class', 'style'],
      'figcaption': ['class', 'style'],
      'code': ['class'],
      'pre': ['class'],
      'span': ['class'],
      'th': ['align', 'colspan', 'rowspan'],
      'td': ['align', 'colspan', 'rowspan']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto'],
      img: ['http', 'https']
    },
    allowedSchemesAppliedTo: ['href', 'src'],
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard'
  });
}

// 3. Convert Markdown to Safe Semantic HTML (ensuring exactly one H1 per page)
function renderMarkdown(md, articleTitle) {
  if (!md) return '';
  let cleanedMd = md.trim();
  // Strip duplicate leading # title if it matches or is at the start
  cleanedMd = cleanedMd.replace(/^#\s+[^\n]+\n+/, '');
  // Downgrade any remaining markdown # to ## so the header H1 remains the single page H1
  cleanedMd = cleanedMd.replace(/^#\s+(.+)$/gm, '## $1');
  const rawHtml = marked.parse(cleanedMd, {
    gfm: true,
    breaks: true
  });
  return sanitizeHtml(rawHtml);
}

// Contextual service links by category or slug
function getContextualService(article) {
  const slug = (article.slug || '').toLowerCase();
  const category = (article.tags && article.tags[0] ? article.tags[0] : '').toLowerCase();

  if (slug === 'shopify-liquid-vs-headless' || slug.includes('liquid-vs-headless')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      contactUrl: '/contact?service=shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('shopify') || slug.includes('commerce') || category.includes('commerce')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('state-management') || slug.includes('api-boundaries') || slug.includes('web-application')) {
    return {
      name: 'Web Application Development',
      url: '/services/web-application-development',
      label: 'Explore Full-Stack Web Application Engineering'
    };
  }
  if (slug.includes('performance') || slug.includes('speed') || slug.includes('core-web-vitals') || category.includes('performance')) {
    return {
      name: 'Website Performance Optimization',
      url: '/services/website-performance-optimization',
      label: 'Explore Website Performance & Core Web Vitals Optimization'
    };
  }
  if (slug.includes('backdoor') || slug.includes('web-shell') || category.includes('backdoor')) {
    return {
      name: 'WordPress Backdoor Removal',
      url: '/services/wordpress-backdoor-removal',
      contactUrl: '/contact?service=wordpress-backdoor-removal',
      label: 'Explore WordPress Backdoor Removal & Forensic Incident Response'
    };
  }
  if (slug.includes('redirect') || category.includes('redirect')) {
    return {
      name: 'WordPress Malicious Redirect Removal',
      url: '/services/malicious-redirect-removal',
      contactUrl: '/contact?service=malicious-redirect-removal',
      label: 'Explore WordPress Malicious Redirect Removal & Injected Script Cleanup'
    };
  }
  if (slug.includes('keyword-hack') || slug.includes('seo-spam') || slug.includes('spam-removal') || category.includes('spam') || slug.includes('malware') || category.includes('malware')) {
    return {
      name: 'SEO Spam Removal',
      url: '/services/seo-spam-removal',
      contactUrl: '/contact?service=seo-spam-removal',
      label: 'Explore WordPress SEO Spam Removal & Recovery'
    };
  }
  if (slug.includes('wordpress')) {
    return {
      name: 'WordPress Development',
      url: '/services/wordpress-development',
      label: 'Explore Custom WordPress Engineering & Gutenberg Architecture'
    };
  }
  if (slug.includes('search') || slug.includes('aeo') || slug.includes('geo')) {
    return {
      name: 'AI Search Optimization',
      url: '/services/ai-search-optimization',
      label: 'Explore AI Search Optimization & Search Engineering'
    };
  }
  if (slug === 'ai-automation-vs-ai-agents' || slug.includes('automation-vs-ai-agents')) {
    return {
      name: 'AI Automation',
      url: '/services/ai-automation',
      contactUrl: '/contact?service=ai-automation',
      label: 'Explore AI Automation & Workflow Architecture'
    };
  }
  if (slug.includes('ai-') || slug.includes('automation') || category.includes('ai') || category.includes('automation')) {
    return {
      name: 'AI Automation',
      url: '/services/ai-automation',
      label: 'Explore AI Automation & Workflow Architecture'
    };
  }
  if (slug.includes('custom-web') || slug.includes('no-code') || slug.includes('web-development')) {
    return {
      name: 'Custom Web Development',
      url: '/services/custom-web-development',
      contactUrl: '/contact?service=custom-web-development',
      label: 'Explore Custom Web Development & Architectural Tiers'
    };
  }
  return {
    name: 'Custom Web Development',
    url: '/services/custom-web-development',
    label: 'Explore Custom Web Development & Architectural Tiers'
  };
}

// 4. Generate Single Article HTML (Delegated to render-article.js)

// 5. Update Blog Index Grid & Script in public/blog.html
function updateBlogIndexHtml(articles) {
  let content = fs.readFileSync(blogIndexFile, 'utf8');

  // Generate cards HTML
  const fallbackImages = [
    '/assets/images/blog/ai-citations-vs-brand-mentions-hero.jpg',
    '/assets/images/blog/nextjs-performance-architecture-hero.jpg',
    '/assets/images/blog/webflow-vs-custom-development-hero.jpg',
    '/assets/images/blog/ai-automation-vs-ai-agents-hero.jpg',
    '/assets/images/blog/what-is-editorial-engineering-hero.jpg'
  ];

  const cardsHtml = articles.map((b, idx) => {
    const dateStr = formatDate(b.createdAt);
    const category = (b.tags && b.tags[0]) ? b.tags[0] : 'Editorial';
    const imgSrc = b.featuredImage || fallbackImages[idx % fallbackImages.length];

    return `                <a href="/blog/${b.slug}" class="blog-card span-4 dynamic-api-card" data-category="${category}">
                    <div class="card-meta-row">
                        <span class="meta-date">${dateStr}</span>
                        <span class="meta-separator"></span>
                        <span class="meta-category" style="color: #C6FF00; font-weight: 700;">${category}</span>
                        <span class="read-more">Read <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                    </div>
                    <div class="card-image-wrapper">
                        <img src="${imgSrc}" alt="${b.title}" width="800" height="450" loading="lazy" decoding="async" onerror="this.src='${fallbackImages[0]}'">
                    </div>
                    <h2 class="card-title">${b.title}</h2>
                </a>`;
  }).join('\n');

  // Replace #blogGrid container content
  const gridRegex = /(<div class="blog-grid" id="blogGrid">)([\s\S]*?)(<\/div>\s*<\/section>)/i;
  if (gridRegex.test(content)) {
    content = content.replace(gridRegex, `$1\n${cardsHtml}\n            $3`);
  } else {
    console.warn('[Build Blog] Warning: Could not find #blogGrid in public/blog.html');
  }

  // Ensure verified Instagram profile URL in blog.html (fully idempotent)
  content = content.replace(/href="https:\/\/instagram\.com(?:\/[^"]*)?"(?:kawaki\.agency")*/g, 'href="https://instagram.com/kawaki.agency"');

  // Update client script in blog.html: remove fetch, retain filtering & Lenis
  const scriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*(?:async\s*)?\(\)\s*=>\s*\{[\s\S]*?<\/script>/i;
  const newScript = `<script>
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

            // Lenis Smooth Scroll
            const lenis = new Lenis();
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((t) => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);

            // Category Filtering on Static Pre-Rendered Cards
            const filterContainer = document.getElementById('categoryFilters');

            function applyFilter(selectedCategory) {
                const allCards = document.querySelectorAll('.blog-card');
                allCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category') || '';
                    if (selectedCategory === 'all' || cardCategory.toLowerCase() === selectedCategory.toLowerCase()) {
                        card.style.display = 'flex';
                        if (typeof gsap !== "undefined") {
                            gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            if (filterContainer) {
                filterContainer.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') return;
                    e.preventDefault();

                    const selectedCategory = e.target.getAttribute('data-category');
                    filterContainer.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                    e.target.classList.add('active');

                    applyFilter(selectedCategory);
                });
            }
        });
    </script>`;

  if (scriptRegex.test(content)) {
    content = content.replace(scriptRegex, newScript);
  }

  fs.writeFileSync(blogIndexFile, content, 'utf8');
  console.log(`✓ Updated public/blog.html with ${articles.length} pre-rendered article cards.`);
}

// 6. Update sitemap.xml with Clean URLs
function updateSitemap(articles) {
  try {
    const { execSync } = require('child_process');
    execSync('node scripts/build-sitemap.js', { stdio: 'inherit', cwd: rootDir });
  } catch (err) {
    console.warn('⚠️ Warning updating sitemap via build-sitemap.js:', err.message);
  }
}

// 7. Stale Article Reconciliation & Cleanup (Tightened Generator Ownership Boundary)
const ARTICLE_FILE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;

function reconcileStaleArticles(articles) {
  const expectedFiles = new Set(articles.map(a => `${a.slug}.html`));
  const removedFiles = [];

  if (fs.existsSync(blogDir)) {
    const existingEntries = fs.readdirSync(blogDir);
    for (const entry of existingEntries) {
      const entryPath = path.join(blogDir, entry);
      const isFile = fs.statSync(entryPath).isFile();

      // 1. Must be a file and match clean slug filename pattern
      if (!isFile || !ARTICLE_FILE_PATTERN.test(entry)) {
        continue;
      }

      // 2. If it is in the current expected published inventory, keep it
      if (expectedFiles.has(entry)) {
        continue;
      }

      // 3. Verify generator ownership before deleting (never delete arbitrary custom HTML)
      try {
        const fileHead = fs.readFileSync(entryPath, 'utf8').slice(0, 2048);
        const isGeneratorOwned = fileHead.includes('<meta name="generator" content="Kawaki Blog Engine"') ||
                                 fileHead.includes('id="articleWrapper"');
        if (isGeneratorOwned) {
          fs.unlinkSync(entryPath);
          removedFiles.push(entry);
          console.log(`  🗑️ [Cleanup] Removed stale generator-owned article: public/blog/${entry}`);
        } else {
          console.log(`  ℹ️ [Preserved] Skipping non-generator HTML file: public/blog/${entry}`);
        }
      } catch (readErr) {
        console.warn(`  ⚠️ Could not inspect public/blog/${entry}: ${readErr.message}`);
      }
    }
  }

  if (removedFiles.length === 0) {
    console.log('✓ Verified public/blog inventory: 0 stale article files found.');
  } else {
    console.log(`✓ Stale article cleanup complete: removed ${removedFiles.length} file(s).`);
  }
  return removedFiles;
}

// 8. Main Runner
function build() {
  console.log('⚡ [Build Blog] Loading published articles from inventory...');
  const articles = getPublishedArticles();
  console.log(`✓ Loaded ${articles.length} published articles.`);

  if (articles.length === 0) {
    console.error('❌ [Build Blog] No published articles found!');
    process.exit(1);
  }

  // Reconcile and clean up any stale generated article files
  const removedStale = reconcileStaleArticles(articles);

  // Generate individual article pages
  for (const article of articles) {
    const articleHtml = generateArticleHtml(article, articles);
    const targetFile = path.resolve(blogDir, `${article.slug}.html`);
    fs.writeFileSync(targetFile, articleHtml, 'utf8');
    console.log(`  -> Generated public/blog/${article.slug}.html`);
  }

  // Update blog index grid
  updateBlogIndexHtml(articles);

  // Update sitemap.xml
  updateSitemap(articles);

  // Update llms.txt and llms-full.txt
  generateLlms(articles);

  console.log('\n🚀 [Build Blog] Successfully pre-rendered all articles, sitemaps, and llms.txt!\n');
  return { articles, removedStale };
}

if (require.main === module) {
  build();
}

module.exports = {
  getPublishedArticles,
  reconcileStaleArticles,
  renderMarkdown,
  sanitizeHtml,
  generateArticleHtml,
  updateBlogIndexHtml,
  updateSitemap,
  build
};
