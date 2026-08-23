const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

const match = html.match(/streamController\.enqueue\("(.+?)"\)/s);
if (match) {
  const raw = match[1];
  // Parse Turbo stream JSON
  try {
    const unescaped = JSON.parse('"' + raw + '"');
    const parsed = JSON.parse(unescaped);
    console.log('Stream parsed type:', typeof parsed, Array.isArray(parsed));
    console.log('Stream keys/length:', Array.isArray(parsed) ? parsed.length : Object.keys(parsed));

    // Look for sections array
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (typeof item === 'string' && (item.includes('Sidekick') || item.includes('Hero') || item.includes('Renaissance'))) {
        console.log(`Item ${i}:`, item.substring(0, 80));
      }
    }
  } catch (e) {
    console.log('Parse error:', e.message);
  }
}
