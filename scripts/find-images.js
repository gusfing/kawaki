const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(jpg|png|webp)$/i.test(file)) {
      if (stat.size > 5000 && stat.size < 120000) {
        results.push({ path: fullPath, size: stat.size });
      }
    }
  }
  return results;
}

const imgs = walk('public');
console.log(JSON.stringify(imgs.slice(0, 8), null, 2));

