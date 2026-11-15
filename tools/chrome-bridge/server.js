/**
 * Kawaki Agent Chrome Bridge — Local Host Server
 * 
 * Runs a local loopback server on 127.0.0.1:8765.
 * Provides dual interface:
 * 1. WebSocket endpoint for the Chrome Extension service worker.
 * 2. HTTP REST endpoint for the Antigravity Agent & CLI automation scripts.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = 8765;
const HOST = '127.0.0.1';

let activeExtensionWs = null;
const pendingRequests = new Map();
let nextRequestId = 1;

// 1. Create HTTP Server
const server = http.createServer((req, res) => {
  // Set CORS headers for local loopback
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      connected: Boolean(activeExtensionWs && activeExtensionWs.readyState === 1),
      port: PORT,
      timestamp: Date.now()
    }));
    return;
  }

  // Handle API commands
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      let parsed = {};
      try {
        if (body) parsed = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
        return;
      }

      const action = url.pathname.replace(/^\//, '');

      try {
        const responseData = await sendCommandToExtension(action, parsed);

        // If screenshot and savePath is provided, write file directly
        if (action === 'screenshot' && parsed.savePath && responseData.base64) {
          const buffer = Buffer.from(responseData.base64, 'base64');
          const resolvedPath = path.resolve(parsed.savePath);
          fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
          fs.writeFileSync(resolvedPath, buffer);
          responseData.savedTo = resolvedPath;
          responseData.fileSize = buffer.length;
          delete responseData.base64; // save response size
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: responseData }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message || String(err) }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

// 2. Attach WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  console.log('[Bridge Server] Chrome Extension connected from', req.socket.remoteAddress);
  activeExtensionWs = ws;

  // Active keepalive to prevent Manifest V3 idle suspension
  const keepaliveTimer = setInterval(() => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ event: 'keepalive', time: Date.now() }));
    }
  }, 10000);

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.event) {
        if (msg.event === 'ping') {
          ws.send(JSON.stringify({ event: 'pong', time: Date.now() }));
        } else {
          console.log(`[Bridge Server] Event from Chrome: ${msg.event} (count: ${msg.count || 0})`);
        }
        return;
      }

      const { id, result, error } = msg;
      if (id && pendingRequests.has(id)) {
        const { resolve, reject } = pendingRequests.get(id);
        pendingRequests.delete(id);
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }
    } catch (e) {
      console.error('[Bridge Server] Error parsing extension message:', e);
    }
  });

  ws.on('close', () => {
    clearInterval(keepaliveTimer);
    console.log('[Bridge Server] Chrome Extension disconnected');
    if (activeExtensionWs === ws) {
      activeExtensionWs = null;
    }
    // Reject any pending requests
    for (const [id, { reject }] of pendingRequests) {
      reject(new Error('Extension disconnected during request'));
    }
    pendingRequests.clear();
  });
});

async function getConnectedWs(timeoutMs = 6000) {
  if (activeExtensionWs && activeExtensionWs.readyState === 1) {
    return activeExtensionWs;
  }
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise(r => setTimeout(r, 200));
    if (activeExtensionWs && activeExtensionWs.readyState === 1) {
      return activeExtensionWs;
    }
  }
  throw new Error('Chrome Extension is not connected. Please ensure Chrome is open with the Kawaki extension active.');
}

function sendCommandToExtension(action, params = {}, timeoutMs = 25000) {
  return new Promise(async (resolve, reject) => {
    let wsInstance;
    try {
      wsInstance = await getConnectedWs(5000);
    } catch (e) {
      return reject(e);
    }

    const id = nextRequestId++;
    const timer = setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id);
        reject(new Error(`Command '${action}' timed out after ${timeoutMs}ms`));
      }
    }, timeoutMs);

    pendingRequests.set(id, {
      resolve: (data) => {
        clearTimeout(timer);
        resolve(data);
      },
      reject: (err) => {
        clearTimeout(timer);
        reject(err);
      }
    });

    try {
      wsInstance.send(JSON.stringify({ id, action, params }));
    } catch (err) {
      clearTimeout(timer);
      pendingRequests.delete(id);
      reject(err);
    }
  });
}

// 3. Start Listening
server.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ Kawaki Agent Chrome Bridge Server Online`);
  console.log(`   Loopback: http://${HOST}:${PORT}`);
  console.log(`   WebSocket: ws://${HOST}:${PORT}`);
  console.log(`======================================================\n`);
});

// Clean shutdown
process.on('SIGINT', () => {
  console.log('\n[Bridge Server] Shutting down...');
  server.close(() => process.exit(0));
});

