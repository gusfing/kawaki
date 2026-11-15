const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(rootDir, 'admin-dashboard', 'backend');

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

async function start() {
  const is3000Free = await isPortAvailable(3000);
  const backendPort = is3000Free ? 3000 : 3002;
  const gatewayPort = 3001;

  console.log(`🚀 Starting Kawaki Studios Unified Platform...`);
  console.log(`👉 Web Gateway / Public Site: http://localhost:${gatewayPort}`);
  console.log(`👉 Admin Dashboard:           http://localhost:${gatewayPort}/admin`);
  console.log(`👉 Backend API:               http://localhost:${backendPort}\n`);

  // 1. Spawn Backend API (Hono + SQLite)
  const backend = spawn('npx', ['tsx', 'src/index.ts'], {
    cwd: backendDir,
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(backendPort) }
  });

  backend.on('error', (err) => {
    console.error('[Backend Error]:', err);
  });

  // 2. Spawn Web Gateway (Serving Public site + Admin panel + API Reverse Proxy on Port 3001)
  const gateway = spawn('node', ['server.js'], {
    cwd: rootDir,
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(gatewayPort), BACKEND_PORT: String(backendPort) }
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
}

start();
