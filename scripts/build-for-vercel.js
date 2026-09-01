const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const adminFrontendDir = path.resolve(rootDir, 'admin-dashboard', 'frontend');
const adminDistDir = path.resolve(adminFrontendDir, 'dist');
const publicAdminDir = path.resolve(rootDir, 'public', 'admin');

console.log('⚡ [Vercel Build] 1. Building Admin Dashboard (React + Vite + Tailwind)...');

try {
  // 1. Build Admin Dashboard
  execSync('npm run build', {
    cwd: adminFrontendDir,
    stdio: 'inherit'
  });
  console.log('✓ Admin dashboard built successfully.');

  // 2. Copy dist to public/admin
  console.log('⚡ [Vercel Build] 2. Syncing Admin Dashboard to public/admin...');
  if (fs.existsSync(publicAdminDir)) {
    fs.rmSync(publicAdminDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicAdminDir, { recursive: true });

  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursiveSync(adminDistDir, publicAdminDir);
  console.log('✓ Admin dashboard copied to public/admin for Vercel static serving.');

  console.log('\n🚀 [Vercel Build] Build Complete & Ready for Global Edge Deployment!\n');
} catch (err) {
  console.error('✗ [Vercel Build Failed]:', err.message);
  process.exit(1);
}
