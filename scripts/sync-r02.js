const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

let content = fs.readFileSync(path.resolve(__dirname, '..', 'content', 'ai-agent-reliability-evaluation.md'), 'utf8');

// Tighten Section 6, 12, 14, 18 slightly
content = content.replace(
  'A fundamental vulnerability of naive AI agents is relying on the model itself to enforce its own constraints. Asking an LLM in its system prompt: *"Please do not issue refunds over $500"* are advisory guidelines. Under prompt injection or context confusion, models will violate advisory instructions.\n\nEnterprise reliability requires **Defense-in-Depth Guardrails**: five deterministic, compiled software layers that models cannot bypass:',
  'Relying on an LLM to enforce its own constraints is a vulnerability. Asking a model in its prompt: *"Do not issue refunds over $500"* is an advisory guideline; under prompt injection or context confusion, models will violate advisory instructions.\n\nEnterprise reliability requires **Defense-in-Depth Guardrails**: five deterministic software layers compiled into application code that models cannot bypass:'
);

content = content.replace(
  `When an action triggers High Risk:
1. The agent serializes its execution checkpoint.
2. The orchestrator issues an approval request displaying the intended action, parameters, and business impact.
3. The execution thread enters \`AWAITING_APPROVAL\` status, releasing compute resources.
4. When authorized via webhook, the worker thread hydrates from the checkpoint and resumes execution.`,
  `When an action triggers High Risk:
1. The agent serializes its execution checkpoint.
2. The orchestrator issues an approval request displaying intended actions, parameters, and estimated impact.
3. The execution thread enters \`AWAITING_APPROVAL\` status, releasing compute resources.
4. Upon webhook authorization, the worker thread hydrates from the checkpoint and resumes execution.`
);

content = content.replace(
  `In language models, context window size is not equivalent to retrieval accuracy. Research demonstrates the **"Lost in the Middle"** phenomenon: models retrieve information at the beginning or end of long context windows significantly more reliably than information in the center.`,
  `Context window size does not guarantee retrieval accuracy. Research demonstrates the **"Lost in the Middle"** phenomenon: models retrieve information at the boundaries of long context windows significantly more reliably than information in the center.`
);

fs.writeFileSync(path.resolve(__dirname, '..', 'content', 'ai-agent-reliability-evaluation.md'), content);

const words = (content.match(/\b[a-zA-Z0-9_\-\.\/']+\b/g) || []).length;
const tokens = content.trim().split(/\s+/).length;
console.log(`Calibrated R02 Word Count: ${words} words (regex) | ${tokens} whitespace tokens.`);

const article = {
  id: "art_ai_automation_reliability_02",
  title: "AI Agent Reliability: Evaluation, Guardrails, and Failure Recovery",
  slug: "ai-agent-reliability-evaluation",
  author: "Kunal Sharma",
  featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  tags: [
    "AI Automation",
    "AI Agents",
    "System Reliability",
    "Enterprise Architecture"
  ],
  seoKeywords: "AI agent reliability, AI agent evaluations, LLM guardrails architecture, agent failure recovery, pass@k agent evaluation, eval-driven development, AI agent action space, deterministic agent harness, autonomous error recovery, enterprise AI workflow reliability",
  seoDescription: "An architectural guide to AI agent reliability in production. Learn how to engineer deterministic eval harnesses, multi-layer guardrails, and autonomous failure recovery.",
  excerpt: "An engineering guide to AI agent reliability in production: evaluation methodologies, pass@k boundaries, defense-in-depth guardrails, and autonomous failure recovery.",
  status: "published",
  views: 185,
  createdAt: "2026-09-24T06:00:00.000Z",
  updatedAt: "2026-09-24T06:00:00.000Z",
  content: content
};

// Sync into SQLite Databases
const dbPaths = [
  path.resolve(__dirname, '..', 'data.db'),
  path.resolve(__dirname, '..', 'admin-dashboard', 'backend', 'data.db'),
  path.resolve(__dirname, '..', 'admin-dashboard', 'data.db')
];

for (const dbPath of dbPaths) {
  if (fs.existsSync(dbPath)) {
    try {
      const db = new DatabaseSync(dbPath);
      const insertStmt = db.prepare(`
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
          views=excluded.views,
          created_at=excluded.created_at,
          updated_at=excluded.updated_at
      `);

      const createdAtUnix = Math.floor(new Date(article.createdAt).getTime() / 1000);
      const updatedAtUnix = Math.floor(new Date(article.updatedAt).getTime() / 1000);

      insertStmt.run(
        article.id,
        article.title,
        article.slug,
        article.content,
        article.excerpt,
        article.status,
        article.author,
        article.featuredImage,
        JSON.stringify(article.tags),
        article.seoKeywords,
        article.seoDescription,
        article.views,
        createdAtUnix,
        updatedAtUnix
      );
      console.log(`✓ Synced article ${article.slug} into ${path.basename(dbPath)}`);
    } catch (err) {
      console.error(`Error updating ${dbPath}:`, err.message);
    }
  }
}

module.exports = { article };
