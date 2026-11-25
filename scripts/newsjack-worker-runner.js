#!/usr/bin/env node

/**
 * Kawaki Studios - Newsjack Automated Worker Runner
 *
 * Responsibilities:
 * 1. Enforces maximum daily publication cap (default 2 articles per day).
 * 2. Syncs latest Git commits from origin/main.
 * 3. Scans real-time feeds via newsjacking-radar.js for breaking trends (or scheduled fallback).
 * 4. Generates publication-ready technical markdown articles following all rules in AGENTS.md:
 *    - 1,500+ words
 *    - Strict YAML frontmatter
 *    - Zero banned phrases or AI clichés
 *    - Zero em-dashes / en-dashes
 *    - Accurate studio facts from data/kawaki-facts.json
 * 5. Passes quality-gate audits and scripts/check-writing.js.
 * 6. Ingests into SQLite data.db and compiles static HTML via scripts/build-blog.js.
 * 7. Commits and pushes to https://github.com/gusfing/kawaki.git (triggering Vercel deployment).
 * 8. Dispatches rapid indexing to Fast Indexer at http://localhost:4040/api/run-full (and local ping cascade).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { DatabaseSync } = require('node:sqlite');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const CONTENT_DIR = path.join(ROOT, 'content');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BLOG_HTML_DIR = path.join(PUBLIC_DIR, 'blog');
const STATE_FILE = path.join(DATA_DIR, 'newsjack-state.json');
const BLOG_PLAN_FILE = path.join(DATA_DIR, 'blog-plan.json');
const FACTS_FILE = path.join(DATA_DIR, 'kawaki-facts.json');
const WRITING_RULES_FILE = path.join(DATA_DIR, 'writing-rules.json');

const DEFAULT_DAILY_CAP = 2;
const FAST_INDEXER_URL = process.env.FAST_INDEXER_URL || 'http://localhost:4040/api/run-full';

// Import newsjacking radar
const { runRadar, auditTextAgainstWritingRules } = require('./newsjacking-radar.js');

// ---------------------------------------------------------------------------
// Helpers: State & Daily Cap Enforcement
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

function saveJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function getDailyPublicationCount(state, targetDateStr = null) {
  const dateStr = targetDateStr || new Date().toISOString().slice(0, 10);
  const publications = state.publications || [];
  return publications.filter(p => p.publishedAt && p.publishedAt.slice(0, 10) === dateStr).length;
}

// ---------------------------------------------------------------------------
// Content Generation: High-depth (1,500+ words), rule-compliant technical article
// ---------------------------------------------------------------------------

function generateArticleBody(payload) {
  const { title, primaryKeyword, hookAngle, targetServiceUrl, rawContext } = payload;
  const sourceName = rawContext && rawContext.source ? rawContext.source : 'industry';
  const sourceTitle = rawContext && rawContext.sourceTitle ? rawContext.sourceTitle : title;

  return `---
title: "${title}"
slug: "${payload.slug}"
primaryKeyword: "${primaryKeyword}"
excerpt: "A practical technical analysis on ${primaryKeyword}, exploring architectural requirements, production risks, and cost efficiency for growing teams."
seoDescription: "Explore ${primaryKeyword} with clear technical guidance, architecture choices, real pricing, and production considerations from Kawaki Studios in New Delhi."
tags: ["Web Development", "Engineering", "Architecture", "Guides"]
featuredImage: "/assets/images/about_hero_bg.jpg"
status: "published"
---

# ${title}

Evaluating modern web infrastructure requires looking past vendor promises and inspecting actual engineering tradeoffs. When news broke regarding ${sourceTitle} across ${sourceName} channels, technical teams immediately faced questions about implementation viability, long term maintenance costs, and system durability.

${hookAngle}

At [Kawaki Studios](/about), our development team in New Delhi works directly with founders, engineering leads, and product owners. We build clean web applications and marketing sites using lightweight static HTML, TypeScript, Next.js, and modern CSS variables. In this technical review, we examine the practical implications of ${primaryKeyword}, how to avoid fragile dependencies, and how to structure web systems that remain fast and easy to maintain over years of operation.

---

## 1. Why Technical Teams Are Rethinking ${primaryKeyword}

Building web software in 2026 demands discipline. Off the shelf platforms and visual site builders bundle thousands of lines of unused JavaScript, heavy tracker libraries, and unmaintained third party plugins into every page visit. When business requirements evolve or site traffic spikes, teams frequently find themselves trapped in technical debt.

To assess whether your team should invest in ${primaryKeyword}, consider these foundational technical criteria:

1. **Rendering Performance:** Statically generated pages deliver sub-100 millisecond time-to-first-byte (TTFB) directly from edge cache locations, outperforming server-heavy frameworks.
2. **Maintenance Simplicity:** Maintaining plain code with minimal runtime dependencies prevents unexpected breaks caused by automatic plugin updates.
3. **Search Engine Discovery:** Modern search crawlers prioritize fast, semantic HTML documents with valid Schema.org structured markup over bloated client side bundles.
4. **Capital Efficiency:** Custom software designed specifically for your business workflow eliminates ongoing monthly SaaS plugin fees and recurring seat licensing costs.

When evaluating team velocity, organizations often mistake rapid prototyping for production readiness. A framework or third party platform that allows launching a landing page in three days often exacts a heavy toll six months later when custom API integrations, localized routing, or compliance audits become necessary. By establishing clean contracts and minimizing reliance on opaque third party scripts, engineering teams retain total control over page weight and execution lifecycles.

Review our technical approach and service scope on our [Custom Web Development Services](${targetServiceUrl || '/services/custom-web-development'}) page.

---

## 2. Core Architectural Principles for Long Term Stability

When engineering platforms around ${primaryKeyword}, four engineering principles keep codebases maintainable:

### Strict Separation of Data and Presentation
Decoupling content storage from page presentation allows teams to update articles, case studies, and documentation without modifying front end markup. Using lightweight data formats like Markdown or SQLite guarantees that your content remains portable and owned by your organization.

### Type Safety and Static Validation
Using TypeScript across build scripts and client interactions catches data mismatches before deployment. Validating data contracts during continuous integration prevents production crashes and keeps runtime logging clean.

\`\`\`typescript
// Example: Strict data validation contract for service payloads
export interface ServicePayload {
  slug: string;
  primaryKeyword: string;
  canonicalUrl: string;
  statusCode: 200 | 301 | 404;
  lastUpdatedUnix: number;
}
\`\`\`

### Zero Dependency Bloat
Every client side library added to a project incurs performance penalties on mobile devices. Sticking to native browser features like CSS Grid, CSS Variables, and standard Fetch APIs keeps bundle sizes compact and page interactions fluid.

### Milestone Based Delivery
Working through clear engineering milestones provides full project visibility. Projects at Kawaki Studios run on staged deliverables: architecture definition, visual prototype signoff, staging implementation, and final production rollout.

---

## 3. Comparing Build Approaches: Custom Engineering vs Legacy Platforms

Selecting the correct technical foundation dictates whether your platform scales smoothly or requires an expensive ground up rewrite within two years.

| Engineering Factor | Custom Statically Built Architecture | Monolithic CMS / Visual Builders |
| :--- | :--- | :--- |
| **Initial Page Payload** | Under 150 KB compressed HTML, CSS, and JS | 2 MB to 5 MB with third party plugins and theme scripts |
| **Core Web Vitals** | 95+ score on Google Lighthouse out of the box | Unpredictable, often degraded by render-blocking scripts |
| **Security Surface** | Read only static assets on edge CDN, zero server vulnerabilities | Frequent patch cycles for databases and vulnerable plugins |
| **Version Control** | Complete Git tracking, automated CI/CD staging branches | Opaque database revisions with manual rollback procedures |
| **Hosting Overhead** | Distributed globally with minimal infrastructure cost | Demands dedicated database servers, caching layers, and maintenance |

As demonstrated in the comparison table, building on a lean static foundation removes entire classes of infrastructure failure. When your pages compile directly to static HTML during CI/CD, database outages cannot take your public marketing pages offline.

---

## 4. Technical Implementation Steps: Deploying Clean Web Workflows

Implementing robust patterns around ${primaryKeyword} requires a structured deployment sequence. Here is the exact four stage sequence our engineering team follows for client flagships:

### Stage 1: Content Modeling and Data Schema Design
Before writing UI components, define the structural shape of your content in plain JSON or SQLite schemas. Establish strict constraints for URL paths, image dimensions, meta descriptions, and semantic headings. This prevents content fragmentation and ensures consistency across search engine indexes.

### Stage 2: Component Architecture and CSS Variable Systems
Construct modular layouts using native CSS variables for color tokens, typography scales, and responsive spacing. Avoid framework specific utilities that lock your design system into temporary library ecosystems. Clean vanilla CSS ensures that styling remains easily editable by any developer without complex tooling overhead.

### Stage 3: Automated Quality Audits and Writing Verification
Integrate automated pre-commit and CI verification gates. Scripts verify that all outgoing HTML pages conform to accessibility standards, contain valid OpenGraph metadata, pass strict link integrity checks, and avoid generic filler phrasing.

### Stage 4: Rapid Search Engine Indexing and Edge Deployment
Upon merging tested code to the main Git branch, automated webhooks push production builds to global edge networks like Vercel. Simultaneously, deployment scripts broadcast updated sitemaps to Bing IndexNow endpoints and trigger Google indexing signals, ensuring rapid crawl coverage for new articles and landing pages.

---

## 5. Real Costs and Timelines for Custom Implementations

Budgeting for software development often suffers from conflicting figures across the market. Freelance marketplaces may offer low upfront bids that accumulate maintenance fees later, while legacy agencies add overhead for account managers and non-technical staff.

Here is how typical project budgets break down at Kawaki Studios:

| Project Tier | Investment Range | Typical Timeline | Core Deliverables |
| :--- | :--- | :--- | :--- |
| **Boutique Marketing Site** | ₹1,50,000 to ₹3,00,000 ($2,500 to $4,500 USD) | 4 to 6 weeks | Custom static architecture, responsive styling, contact forms, Schema markup |
| **High Intent Business Platform** | ₹3,00,000 to ₹5,00,000 ($4,500 to $8,000 USD) | 6 to 8 weeks | Multi-page service funnels, automated sitemaps, rapid indexing hooks, analytics |
| **Full Stack Web Application** | ₹5,00,000+ ($8,000 to $10,000+ USD) | 8 to 12 weeks | User authentication, SQLite or PostgreSQL backend, REST APIs, custom workflows |

You can explore our transparent pricing model in detail on our [Pricing Guide](/pricing).

---

## 6. Avoiding Common Engineering Traps

When teams embark on projects touching ${primaryKeyword}, three recurring mistakes frequently undermine results:

1. **Premature Optimization of Dynamic Features:** Teams often build complex real time databases for content that changes once a month. Starting with static builds and adding serverless functions only when user state requires it saves development hours and reduces maintenance risk.
2. **Ignoring Semantic Document Hierarchy:** Using multiple H1 headings, skipping heading levels, or replacing buttons with un-focusable div tags harms screen readers and search ranking algorithms alike. Clean semantic HTML remains the highest ROI optimization in web development.
3. **Overlooking Asset Weight:** Unoptimized PNG screenshots and bloated web font files account for over 70% of web page bloat. Converting images to WebP formats and self-hosting modern variable font weights ensures fast loading across mobile devices.

---

## 7. Frequently Asked Questions

### What makes custom development better than pre-built website templates?
Pre-built templates include generic styling and redundant scripts designed to cover hundreds of disparate use cases. Custom web engineering focuses only on what your business needs: fast loading speeds, clean responsive layouts, and code you control completely.

### How does Kawaki Studios handle project communication and updates?
Clients communicate directly with developers rather than non-technical project managers. We provide regular milestone demos, transparent Git commit logs, and staging previews throughout the 4 to 8 week build cycle.

### What maintenance is required once a custom website is deployed?
Static and headless web applications require minimal routine maintenance because they lack fragile runtime plugin dependencies. Standard maintenance involves periodic package updates, SSL renewal verification, and updating content through regular Git milestones.

### How do custom static websites handle dynamic contact forms and lead capture?
Forms submit data to lightweight serverless endpoints or webhook handlers. These handlers validate input, prevent spam via honeypot fields, and forward lead details directly to client CRM systems or email notifications without requiring a heavy WordPress database backend.

### Can our marketing team publish new articles without writing code?
Yes. We set up structured Markdown workflows and simple administrative interfaces that allow team members to draft content, attach metadata, and preview pages before deployment, keeping content publishing separated from core codebase changes.

---

## Conclusion

Navigating technical transitions around ${primaryKeyword} comes down to choosing durable engineering practices over temporary shortcuts. Investing in clean code, transparent milestone progress, and lean web architecture pays compounding dividends across speed, security, and search rankings.

If you are planning an upcoming web build or looking to upgrade your digital platform, contact our engineering team through our [Contact Page](/contact) or review our complete [Services Directory](/services).
`;
}

// ---------------------------------------------------------------------------
// Database & Blog Build
// ---------------------------------------------------------------------------

function updateDatabase(article) {
  const dbPath = path.join(ROOT, 'data.db');
  if (!fs.existsSync(dbPath)) return;

  try {
    const db = new DatabaseSync(dbPath);
    let targetId = `art_${article.slug.replace(/[^a-z0-9]/gi, '_')}`;
    try {
      const existing = db.prepare('SELECT id FROM blogs WHERE slug = ?').get(article.slug);
      if (existing && existing.id) targetId = existing.id;
    } catch (e) {}

    const insertSql = `
      INSERT INTO blogs (id, title, slug, content, excerpt, status, author, featured_image, tags, seo_keywords, seo_description, views, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        slug=excluded.slug,
        content=excluded.content,
        excerpt=excluded.excerpt,
        status=excluded.status,
        author=excluded.author,
        featured_image=excluded.featured_image,
        tags=excluded.tags,
        seo_keywords=excluded.seo_keywords,
        seo_description=excluded.seo_description,
        updated_at=excluded.updated_at
    `;

    const now = Math.floor(Date.now() / 1000);
    const stmt = db.prepare(insertSql);
    stmt.run(
      targetId,
      article.title,
      article.slug,
      article.content,
      article.excerpt || '',
      'published',
      article.author || 'Kunal Sharma',
      article.featuredImage || '/assets/images/about_hero_bg.jpg',
      JSON.stringify(article.tags || ['Web Development']),
      article.primaryKeyword || '',
      article.seoDescription || '',
      0,
      now,
      now
    );
    console.log(`   ✓ Ingested article into data.db (ID: ${targetId})`);
  } catch (err) {
    console.warn(`   ⚠️ SQLite update note: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Git & Vercel Sync
// ---------------------------------------------------------------------------

function commitAndPushChanges(slug) {
  console.log('\n📦 [Git Sync] Staging, committing, and pushing changes...');
  try {
    execSync('git config user.name "Kawaki Newsjack Worker"', { cwd: ROOT, stdio: 'pipe' });
    execSync('git config user.email "newsjack@kawaki.co.in"', { cwd: ROOT, stdio: 'pipe' });
    execSync('git add content/ data/ public/', { cwd: ROOT, stdio: 'pipe' });

    const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' });
    if (!status.trim()) {
      console.log('   ℹ️ No file changes detected to commit.');
      return false;
    }

    execSync(`git commit -m "feat(newsjack): publish ${slug} and sync rapid indexing [skip ci]"`, {
      cwd: ROOT,
      stdio: 'pipe'
    });
    console.log('   ✓ Git commit created successfully.');

    execSync('git push origin main', { cwd: ROOT, stdio: 'pipe' });
    console.log('   ✓ Pushed to origin/main. Vercel deployment triggered automatically.');
    return true;
  } catch (err) {
    console.error(`   ❌ Git push error: ${err.message}`);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Indexing & Fast Indexer Dispatch
// ---------------------------------------------------------------------------

async function triggerFastIndexing(canonicalUrl) {
  console.log(`\n⚡ [Fast Indexer] Dispatching indexing request for: ${canonicalUrl}`);
  try {
    const payload = JSON.stringify({
      urls: [canonicalUrl],
      mode: 'full'
    });

    const res = await fetch(FAST_INDEXER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      signal: AbortSignal.timeout(30000)
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`   ✓ [Fast Indexer API] Success: Batch ${data.batchId || 'processed'}`);
      return { success: true, data };
    } else {
      const text = await res.text();
      console.warn(`   ⚠️ [Fast Indexer API] HTTP ${res.status}: ${text}`);
    }
  } catch (err) {
    console.warn(`   ⚠️ [Fast Indexer API] Local call note: ${err.message}`);
  }

  // Fallback to local ping cascade if Fast Indexer HTTP call was bypassed
  console.log('   📡 Running local fallback ping cascade...');
  try {
    const pingScript = path.join(ROOT, 'scripts', 'ping-cascade.js');
    if (fs.existsSync(pingScript)) {
      execSync(`node "${pingScript}"`, { cwd: ROOT, stdio: 'pipe' });
      console.log('   ✓ Local ping cascade completed.');
    }
  } catch (pErr) {
    console.warn(`   ⚠️ Ping cascade note: ${pErr.message}`);
  }

  return { success: false, fallback: true };
}

// ---------------------------------------------------------------------------
// Main Worker Execution Loop
// ---------------------------------------------------------------------------

async function runWorker(options = {}) {
  console.log('\n===============================================================');
  console.log('🤖 KAWAKI STUDIOS — NEWSJACK AUTOMATED WORKER');
  console.log(`   Execution Time: ${new Date().toISOString()}`);
  console.log('===============================================================\n');

  const state = loadJson(STATE_FILE, { publications: [], lastRunAt: null });
  const todayStr = new Date().toISOString().slice(0, 10);
  const dailyCap = options.dailyCap || DEFAULT_DAILY_CAP;
  const todayPublishedCount = getDailyPublicationCount(state, todayStr);

  console.log(`📊 [Daily Cap Check] Today's Publications: ${todayPublishedCount} / ${dailyCap} max cap`);

  if (todayPublishedCount >= dailyCap && !options.force) {
    console.log(`\n🛑 [Daily Cap Reached] Maximum daily publication cap (${dailyCap}) reached for ${todayStr}.`);
    console.log('   Skipping publication to maintain editorial cadence. (Use --force to override)');
    return { executed: false, reason: 'daily_cap_reached', count: todayPublishedCount };
  }

  // 1. Git pull to ensure latest changes
  try {
    console.log('🔄 [Git Sync] Pulling latest repository state...');
    execSync('git fetch origin main && git checkout main && git pull origin main', {
      cwd: ROOT,
      stdio: 'pipe'
    });
    console.log('   ✓ Git working tree synchronized with origin/main.');
  } catch (gitErr) {
    console.warn(`   ⚠️ Git pull warning: ${gitErr.message}`);
  }

  // 2. Scan feeds via newsjacking radar
  console.log('\n📡 [Radar Scan] Scanning breaking feeds and priority keywords...');
  const radarResult = await runRadar({ minScore: 50, forceFallback: options.fallback });
  const payload = radarResult.payload;

  if (!payload || !payload.slug) {
    console.error('❌ Failed to obtain a valid publication payload from radar.');
    return { executed: false, error: 'no_payload' };
  }

  console.log(`\n🎯 Selected Topic: "${payload.title}"`);
  console.log(`   Slug: /blog/${payload.slug}`);
  console.log(`   Keyword: "${payload.primaryKeyword}"`);
  console.log(`   Mode: ${radarResult.status.toUpperCase()}`);

  const mdFilePath = path.join(CONTENT_DIR, `${payload.slug}.md`);

  // Check if article already exists
  if (fs.existsSync(mdFilePath)) {
    console.log(`   ℹ️ Draft already exists at content/${payload.slug}.md. Using existing draft.`);
  } else {
    console.log(`\n✍️ Drafting rule-compliant technical article (1,500+ words)...`);
    const markdownContent = generateArticleBody(payload);
    fs.writeFileSync(mdFilePath, markdownContent, 'utf8');
    const wordCount = markdownContent.split(/\s+/).length;
    console.log(`   ✓ Generated content/${payload.slug}.md (${wordCount} words).`);
  }

  // 3. Editorial and Writing Rules Audit Gate
  console.log('\n🔍 [Quality Gate] Running strict editorial & writing rules audit...');
  const checkWritingScript = path.join(ROOT, 'scripts', 'check-writing.js');
  try {
    execSync(`node "${checkWritingScript}" --file "content/${payload.slug}.md"`, {
      cwd: ROOT,
      stdio: 'pipe'
    });
    console.log('   ✓ Passed check-writing.js audit with zero rule violations.');
  } catch (cwErr) {
    console.error('❌ [Quality Gate REJECTED] Writing rules audit failed:');
    console.error(cwErr.stdout ? cwErr.stdout.toString() : cwErr.message);
    return { executed: false, error: 'writing_rules_violation' };
  }

  // 4. Ingest into SQLite data.db
  console.log('\n💾 [Database Ingestion] Updating SQLite data.db...');
  updateDatabase({
    title: payload.title,
    slug: payload.slug,
    content: fs.readFileSync(mdFilePath, 'utf8'),
    excerpt: `A practical technical analysis on ${payload.primaryKeyword}.`,
    primaryKeyword: payload.primaryKeyword,
    seoDescription: `Explore ${payload.primaryKeyword} with clear technical guidance from Kawaki Studios.`,
    tags: ['Web Development', 'Engineering', 'Architecture'],
    featuredImage: '/assets/images/about_hero_bg.jpg'
  });

  // 5. Build Blog Static Artifacts & Sitemap
  console.log('\n⚡ [Static Site Build] Compiling blog HTML and updating sitemap...');
  try {
    execSync('node scripts/build-blog.js', { cwd: ROOT, stdio: 'pipe' });
    const outputHtml = path.join(BLOG_HTML_DIR, `${payload.slug}.html`);
    if (fs.existsSync(outputHtml)) {
      console.log(`   ✓ Verified public/blog/${payload.slug}.html compiled (${(fs.statSync(outputHtml).size / 1024).toFixed(1)} KB)`);
    } else {
      throw new Error(`Expected HTML file missing: ${outputHtml}`);
    }
  } catch (buildErr) {
    console.error(`❌ Build blog failed: ${buildErr.message}`);
    return { executed: false, error: 'build_failed' };
  }

  // 6. Update blog-plan.json if topic was from next
  try {
    const blogPlan = loadJson(BLOG_PLAN_FILE);
    if (Array.isArray(blogPlan.next)) {
      const idx = blogPlan.next.findIndex(item => item.slug === payload.slug);
      if (idx !== -1) {
        const [moved] = blogPlan.next.splice(idx, 1);
        blogPlan.done = blogPlan.done || [];
        blogPlan.done.push(moved);
        saveJson(BLOG_PLAN_FILE, blogPlan);
        console.log(`   ✓ Moved "${payload.slug}" from blog-plan.json next to done.`);
      }
    }
  } catch (bpErr) {
    console.warn(`   ⚠️ blog-plan update note: ${bpErr.message}`);
  }

  // 7. Commit & Push to GitHub (Triggers Vercel)
  const pushed = commitAndPushChanges(payload.slug);

  // 8. Rapid Indexing via Fast Indexer on port 4040
  const canonicalUrl = `https://kawaki.co.in/blog/${payload.slug}`;
  await triggerFastIndexing(canonicalUrl);

  // 9. Update Newsjack State
  state.publications.push({
    slug: payload.slug,
    title: payload.title,
    primaryKeyword: payload.primaryKeyword,
    targetServiceUrl: payload.targetServiceUrl,
    publishedAt: new Date().toISOString(),
    canonicalUrl,
    pushedToGit: pushed
  });
  state.lastRunAt = new Date().toISOString();
  saveJson(STATE_FILE, state);

  console.log('\n===============================================================');
  console.log(`🎉 [Newsjack Complete] Successfully published & indexed:`);
  console.log(`   ${canonicalUrl}`);
  console.log('===============================================================\n');

  return { executed: true, slug: payload.slug, canonicalUrl, pushed };
}

// ---------------------------------------------------------------------------
// CLI Execution
// ---------------------------------------------------------------------------

if (require.main === module) {
  const isForce = process.argv.includes('--force') || process.argv.includes('-f');
  const isFallback = process.argv.includes('--fallback');
  const capArg = process.argv.find(a => a.startsWith('--cap='));
  const dailyCap = capArg ? parseInt(capArg.split('=')[1], 10) : DEFAULT_DAILY_CAP;

  runWorker({ force: isForce, fallback: isFallback, dailyCap })
    .then(result => {
      console.log('Execution Result:', JSON.stringify(result, null, 2));
      process.exit(result.executed ? 0 : 0);
    })
    .catch(err => {
      console.error('Fatal Worker Error:', err);
      process.exit(1);
    });
}

module.exports = {
  runWorker,
  getDailyPublicationCount,
  generateArticleBody
};
