const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(rootDir, 'admin-dashboard', 'backend');

console.log('🚀 Starting Kawaki Studios Unified Platform (Backend + Admin + Public Gateway)...\n');

// 1. Spawn Backend API (Hono + SQLite on Port 3000)
const backend = spawn('npx', ['tsx', 'src/index.ts'], {
  cwd: backendDir,
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, PORT: '3000' }
});

backend.on('error', (err) => {
  console.error('[Backend Error]:', err);
});

// 2. Spawn Web Gateway (Serving Public site + Admin panel + API Reverse Proxy on Port 3001)
const gateway = spawn('node', ['server.js'], {
  cwd: rootDir,
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, PORT: '3001', BACKEND_PORT: '3000' }
});

gateway.on('error', (err) => {
  console.error('[Gateway Error]:', err);
});

process.on('SIGINT', () => {
  backend.kill();
  gateway.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  backend.kill();
  gateway.kill();
  process.exit(0);
});
