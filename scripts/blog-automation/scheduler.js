const fs = require('fs');
const path = require('path');
const { queueFile, contentDir, historyFile } = require('./config.js');
const { generateArticleForQueueItem } = require('./content-generator.js');
const { publishMarkdownFile } = require('./publisher.js');

function getQueue() {
  if (!fs.existsSync(queueFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(queueFile, 'utf8'));
  } catch (e) {
    return [];
  }
}

function getNextPendingItem(force = false) {
  const queue = getQueue();
  const todayStr = new Date().toISOString().slice(0, 10);
  
  // Look for items due today or overdue
  let item = queue.find(q => q.status === 'pending' && q.scheduledDate <= todayStr);
  if (!item && force) {
    // If explicitly forced via CLI flag, take the first pending item
    item = queue.find(q => q.status === 'pending');
  }
  return item;
}

async function runDailyBatch(force = false) {
  console.log(`\n======================================================`);
  console.log(`⏰ [Blog Automation Scheduler] Checking Daily Content Queue...`);
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log(`======================================================`);

  const item = getNextPendingItem(force);
  if (!item) {
    const queue = getQueue();
    const nextUpcoming = queue.find(q => q.status === 'pending');
    if (nextUpcoming) {
      console.log(`ℹ️ [Drip Scheduler] No posts due for publication today.`);
      console.log(`   Next scheduled post: "${nextUpcoming.title}" on ${nextUpcoming.scheduledDate}.`);
      console.log(`   (Use --force to publish immediately ahead of schedule)`);
      return { executed: false, message: 'Upcoming post scheduled for later date', next: nextUpcoming };
    }
    console.log(`✨ All topics in content-queue.json have been published! No pending articles.`);
    return { executed: false, message: 'Queue empty' };
  }

  console.log(`\n🎯 Selected Queue Item: "${item.title}"`);
  console.log(`   Slug: ${item.slug}`);
  console.log(`   Target Keyword: ${item.targetKeyword}`);
  console.log(`   Scheduled Date: ${item.scheduledDate}`);

  // Check if markdown already exists in content/
  const mdPath = path.join(contentDir, `${item.slug}.md`);
  let targetMd = mdPath;

  if (!fs.existsSync(mdPath)) {
    console.log(`\n✍️ Drafting content using Kawaki Editorial Generator...`);
    const generated = await generateArticleForQueueItem(item);
    targetMd = generated.filePath;
  } else {
    console.log(`\n📄 Found pre-existing markdown file at: ${mdPath}`);
  }

  // Publish through quality gate & build pipeline
  const result = await publishMarkdownFile(targetMd);
  return { executed: true, result, item };
}

function startDailyDaemon(checkIntervalMinutes = 60) {
  console.log(`\n🤖 [Blog Automation Daemon] Started.`);
  console.log(`   Cadence: Checking queue every ${checkIntervalMinutes} minutes.`);
  console.log(`   Target Schedule: Drips 1 article/day on its exact scheduledDate.`);

  // Run initial check
  runDailyBatch().catch(err => console.error('Daemon execution error:', err.message));

  // Recurring loop
  const intervalMs = checkIntervalMinutes * 60 * 1000;
  setInterval(() => {
    runDailyBatch().catch(err => console.error('Daemon execution error:', err.message));
  }, intervalMs);
}

module.exports = {
  getQueue,
  getNextPendingItem,
  runDailyBatch,
  startDailyDaemon
};

if (require.main === module) {
  const isDaemon = process.argv.includes('--daemon') || process.argv.includes('-d');
  const isForce = process.argv.includes('--force') || process.argv.includes('-f');
  if (isDaemon) {
    startDailyDaemon();
  } else {
    runDailyBatch(isForce).then(res => {
      console.log('Result:', res);
      process.exit(0);
    }).catch(err => {
      console.error(err);
      process.exit(1);
    });
  }
}
