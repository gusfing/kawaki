const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: terserMinify } = require('terser');

const rootDir = path.resolve(__dirname, '..');
const srcAssetsDir = path.resolve(rootDir, 'src-assets');
const publicAssetsDir = path.resolve(rootDir, 'public', 'assets');

console.log('⚡ [Minify Assets] Initializing automated asset minification...');

// 1. Ensure src-assets backup exists for human-readable editing
const cssSrcDir = path.join(srcAssetsDir, 'css');
const jsSrcDir = path.join(srcAssetsDir, 'js');
fs.mkdirSync(cssSrcDir, { recursive: true });
fs.mkdirSync(jsSrcDir, { recursive: true });

const cssFiles = ['global.css', 'chatbot.css', 'audio-player.css', 'awwwards-motion.css', 'seo-pages.css'];
const jsFiles = ['main.js', 'chatbot.js', 'audio-player.js', 'exit-popup.js', 'global.js'];

// Copy unminified originals to src-assets if not already present
for (const file of cssFiles) {
  const pubPath = path.join(publicAssetsDir, 'css', file);
  const srcPath = path.join(cssSrcDir, file);
  if (fs.existsSync(pubPath) && !fs.existsSync(srcPath)) {
    fs.copyFileSync(pubPath, srcPath);
  }
}

for (const file of jsFiles) {
  const pubPath = path.join(publicAssetsDir, 'js', file);
  const srcPath = path.join(jsSrcDir, file);
  if (fs.existsSync(pubPath) && !fs.existsSync(srcPath)) {
    fs.copyFileSync(pubPath, srcPath);
  }
}

const cleanCssInstance = new CleanCSS({
  level: 1,
  compatibility: '*'
});

async function run() {
  let totalSaved = 0;
  let totalOrig = 0;

  // Minify CSS
  console.log('\n📦 Minifying CSS files:');
  for (const file of cssFiles) {
    const srcPath = path.join(cssSrcDir, file);
    const destPath = path.join(publicAssetsDir, 'css', file);
    if (!fs.existsSync(srcPath)) continue;

    const sourceContent = fs.readFileSync(srcPath, 'utf8');
    const minified = cleanCssInstance.minify(sourceContent);

    if (minified.errors && minified.errors.length > 0) {
      console.error(`  ❌ Error minifying ${file}:`, minified.errors);
      continue;
    }

    const origSize = Buffer.byteLength(sourceContent);
    const minSize = Buffer.byteLength(minified.styles);
    totalOrig += origSize;
    totalSaved += (origSize - minSize);

    fs.writeFileSync(destPath, minified.styles, 'utf8');
    // Also write .min.css companion
    const minCompanion = destPath.replace(/\.css$/, '.min.css');
    fs.writeFileSync(minCompanion, minified.styles, 'utf8');

    const pct = (((origSize - minSize) / origSize) * 100).toFixed(1);
    console.log(`  ✓ ${file}: ${(origSize / 1024).toFixed(1)} KB → ${(minSize / 1024).toFixed(1)} KB (${pct}% smaller)`);
  }

  // Minify JS
  console.log('\n📦 Minifying JavaScript files:');
  for (const file of jsFiles) {
    const srcPath = path.join(jsSrcDir, file);
    const destPath = path.join(publicAssetsDir, 'js', file);
    if (!fs.existsSync(srcPath)) continue;

    const sourceContent = fs.readFileSync(srcPath, 'utf8');
    try {
      const minified = await terserMinify(sourceContent, {
        compress: {
          drop_console: false, // preserve intentional runtime console logs
        },
        mangle: false // safe: avoid variable name collision in legacy globals
      });

      if (!minified.code) {
        console.warn(`  ⚠️ Minifier output empty for ${file}, preserving source.`);
        continue;
      }

      const origSize = Buffer.byteLength(sourceContent);
      const minSize = Buffer.byteLength(minified.code);
      totalOrig += origSize;
      totalSaved += (origSize - minSize);

      fs.writeFileSync(destPath, minified.code, 'utf8');
      // Also write .min.js companion
      const minCompanion = destPath.replace(/\.js$/, '.min.js');
      fs.writeFileSync(minCompanion, minified.code, 'utf8');

      const pct = (((origSize - minSize) / origSize) * 100).toFixed(1);
      console.log(`  ✓ ${file}: ${(origSize / 1024).toFixed(1)} KB → ${(minSize / 1024).toFixed(1)} KB (${pct}% smaller)`);
    } catch (err) {
      console.error(`  ❌ Error minifying ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 [Minify Assets] Completed! Saved ${(totalSaved / 1024).toFixed(1)} KB total bandwidth across assets.\n`);
}

run();

