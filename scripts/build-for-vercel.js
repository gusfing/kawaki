const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const adminFrontendDir = path.resolve(rootDir, 'admin-dashboard', 'frontend');
const adminDistDir = path.resolve(adminFrontendDir, 'dist');
const publicAdminDir = path.resolve(rootDir, 'public', 'admin');

console.log('⚡ [Vercel Build] Starting Kawaki Platform Build Pipeline...');

try {
  // Check if admin frontend needs building
  const publicAdminIndex = path.join(publicAdminDir, 'index.html');
  const hasPrebuiltAdmin = fs.existsSync(publicAdminIndex);

  if (!hasPrebuiltAdmin || process.env.FORCE_REBUILD === 'true') {
    console.log('⚡ [Vercel Build] Installing admin frontend dependencies...');
    execSync('npm install --legacy-peer-deps', {
      cwd: adminFrontendDir,
      stdio: 'inherit'
    });

    console.log('⚡ [Vercel Build] Building Admin Dashboard (React + Vite + Tailwind)...');
    execSync('npm run build', {
      cwd: adminFrontendDir,
      stdio: 'inherit'
    });

    console.log('⚡ [Vercel Build] Syncing Admin Dashboard to public/admin...');
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
    console.log('✓ Admin dashboard synced to public/admin.');
  } else {
    console.log('✓ Pre-built Admin Dashboard verified at public/admin/index.html');
  }

  console.log('\n🚀 [Vercel Build] All Public & Admin Assets Verified & Ready for Edge Deployment!\n');
} catch (err) {
  console.error('✗ [Vercel Build Failed]:', err.message);
  process.exit(1);
}
