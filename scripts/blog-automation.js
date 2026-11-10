#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { queueFile, contentDir } = require('./blog-automation/config.js');
const { getQueue, runDailyBatch, startDailyDaemon } = require('./blog-automation/scheduler.js');
const { publishMarkdownFile } = require('./blog-automation/publisher.js');
const { startWatcher } = require('./blog-automation/watcher.js');
const { generateArticleForQueueItem } = require('./blog-automation/content-generator.js');

const cmd = (process.argv[2] || 'help').toLowerCase();
const arg = process.argv[3];

async function main() {
  switch (cmd) {
    case 'auto':
    case 'run':
    case 'next':
      console.log('🚀 [Kawaki Blog Automation] Running automated daily queue processor...');
      await runDailyBatch();
      break;

    case 'watch':
      startWatcher();
      break;

    case 'daemon':
      startDailyDaemon();
      break;

    case 'queue':
    case 'status':
    case 'list': {
      const queue = getQueue();
      console.log(`\n======================================================`);
      console.log(`📋 KAWAKI CONTENT QUEUE STATUS (${queue.length} Total Topics)`);
      console.log(`======================================================\n`);
      queue.forEach((q, idx) => {
        const icon = q.status === 'published' ? '✅' : '⏳';
        console.log(`${icon} [${idx + 1}] ${q.title}`);
        console.log(`   Slug: /blog/${q.slug}`);
        console.log(`   Keyword: "${q.targetKeyword}" | Scheduled: ${q.scheduledDate} | Status: ${q.status.toUpperCase()}`);
        if (q.publishedAt) {
          console.log(`   Published At: ${q.publishedAt}`);
        }
        console.log('');
      });
      break;
    }

    case 'publish': {
      if (!arg) {
        console.error('❌ Please specify a file path or slug to publish. E.g.: node scripts/blog-automation.js publish how-much-does-a-custom-website-cost');
        process.exit(1);
      }
      let filePath = arg;
      if (!filePath.endsWith('.md')) {
        filePath = path.join(contentDir, `${arg}.md`);
      }
      if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
      }
      await publishMarkdownFile(filePath);
      break;
    }

    case 'generate': {
      if (!arg) {
        console.error('❌ Please specify a slug from the queue to generate. E.g.: node scripts/blog-automation.js generate how-much-does-a-custom-website-cost');
        process.exit(1);
      }
      const queue = getQueue();
      const item = queue.find(q => q.slug === arg);
      if (!item) {
        console.error(`❌ Slug "${arg}" not found in content-queue.json!`);
        process.exit(1);
      }
      await generateArticleForQueueItem(item);
      break;
    }

    default:
      console.log(`
Kawaki Studios — Blog Automation Suite

Usage:
  node scripts/blog-automation.js <command> [argument]
  npm run <npm-script>

Commands:
  auto, run            Process next pending item in content queue (Generate -> Audit -> Build -> Index)
  watch                Watch content/ directory for new/updated markdown files and auto-publish
  daemon               Start continuous daily background runner matching CONTENT-CALENDAR.md
  queue, list          Inspect the current editorial topic queue & publication status
  generate <slug>      Generate high-depth markdown draft for a queued topic
  publish <file/slug>  Manually audit and publish a specific markdown file to production

NPM Scripts:
  npm run blog:auto    -> Process next scheduled article end-to-end
  npm run blog:watch   -> Start real-time markdown folder watcher
  npm run blog:daemon  -> Run daily background scheduler
  npm run blog:queue   -> View content queue status
`);
      break;
  }
}

main().catch(err => {
  console.error('\n❌ Execution error:', err);
  process.exit(1);
});

