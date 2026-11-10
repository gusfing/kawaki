const fs = require('fs');
const path = require('path');
const { contentDir, historyFile } = require('./config.js');
const { publishMarkdownFile } = require('./publisher.js');

const processedRecently = new Set();

function isAlreadyPublished(slug) {
  if (!fs.existsSync(historyFile)) return false;
  try {
    const history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    return history.some(h => h.slug === slug && h.status === 'published');
  } catch (e) {
    return false;
  }
}

function processContentFolder() {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const slug = path.basename(file, '.md');

    if (processedRecently.has(file)) continue;

    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const isReady = /status:\s*["']?(?:ready|published)["']?/i.test(raw);

      if (isReady && !isAlreadyPublished(slug)) {
        console.log(`\n🔔 [Blog Watcher] Detected new ready markdown file: ${file}`);
        processedRecently.add(file);
        publishMarkdownFile(filePath)
          .catch(err => console.error(`❌ [Blog Watcher] Error publishing ${file}:`, err.message));
      }
    } catch (e) {
      console.warn(`[Blog Watcher] Could not inspect ${file}:`, e.message);
    }
  }
}

function startWatcher() {
  console.log(`\n👀 [Blog Watcher] Watching directory: ${contentDir}`);
  console.log(`   Drop any .md file with 'status: "ready"' or 'status: "published"' to auto-publish.\n`);

  // Initial scan
  processContentFolder();

  // Watch for filesystem changes
  fs.watch(contentDir, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
      setTimeout(() => processContentFolder(), 1500);
    }
  });

  // Polling safety net (every 30 seconds)
  setInterval(() => {
    processContentFolder();
  }, 30000);
}

module.exports = {
  startWatcher,
  processContentFolder
};

if (require.main === module) {
  startWatcher();
}

