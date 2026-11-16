#!/usr/bin/env node
/* Kawaki Agent Chrome Bridge server v2.

   Local relay between agents (HTTP on 127.0.0.1:8765) and the Chrome extension (WebSocket, same port).

   Security:
   - Listens on 127.0.0.1 only and rejects any other Host header (stops DNS rebinding).
   - Rejects requests that come from a web page (they carry Origin or Sec-Fetch-* headers). No CORS.
   - Every HTTP request needs the token in tools/chrome-bridge/.token (created on first start, gitignored),
     sent as the X-Bridge-Token header. tools/chrome-bridge/client.js and cli.js do this for you.
     BRIDGE_ALLOW_NO_TOKEN=1 turns the token off for old scripts; the browser checks above still apply.
   - The WebSocket only accepts the Kawaki extension, whose ID is pinned by the "key" in its manifest.

   Start: npm run bridge:chrome   (or node tools/chrome-bridge/server.js) */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { WebSocketServer } = require('ws');

const PORT = Number(process.env.BRIDGE_PORT || 8765);
const HOST = '127.0.0.1';
const DIR = __dirname;
const TOKEN_FILE = path.join(DIR, '.token');
const SHOTS = path.join(DIR, 'shots');
const ALLOW_NO_TOKEN = process.env.BRIDGE_ALLOW_NO_TOKEN === '1';
const HOSTS = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`]);

function loadToken() {
  try {
    const t = fs.readFileSync(TOKEN_FILE, 'utf8').trim();
    if (t.length >= 32) return t;
  } catch (e) { /* first run */ }
  const t = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(TOKEN_FILE, t + '\n', { mode: 0o600 });
  return t;
}
const TOKEN = loadToken();

function extensionId() {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'chrome-extension', 'manifest.json'), 'utf8'));
    if (!m.key) return null;
    const hex = crypto.createHash('sha256').update(Buffer.from(m.key, 'base64')).digest('hex').slice(0, 32);
    return [...hex].map(h => String.fromCharCode(97 + parseInt(h, 16))).join('');
  } catch (e) {
    return null;
  }
}
const EXT_ID = process.env.BRIDGE_EXTENSION_ID || extensionId();
const EXT_ORIGIN = EXT_ID ? `chrome-extension://${EXT_ID}` : null;

let ext = null;
let extVersion = null;
let nextId = 1;
const pending = new Map();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const connected = () => Boolean(ext && ext.readyState === 1);

function reply(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(obj));
}

function fromBrowser(req) {
  const h = req.headers;
  return Boolean(h.origin || h.referer || h['sec-fetch-site'] || h['sec-fetch-mode'] || h['sec-fetch-dest']);
}

function tokenOk(req) {
  if (ALLOW_NO_TOKEN) return true;
  const given = String(req.headers['x-bridge-token'] || (req.headers.authorization || '').replace(/^Bearer\s+/i, ''));
  const a = Buffer.from(given);
  const b = Buffer.from(TOKEN);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function extension(waitMs = 6000) {
  const t0 = Date.now();
  while (!connected()) {
    if (Date.now() - t0 > waitMs) {
      throw new Error('The Chrome extension is not connected. In Chrome open chrome://extensions, turn on Developer mode, click "Load unpacked" and pick tools/chrome-extension (or press its reload button). Chrome must stay open.');
    }
    await sleep(200);
  }
  return ext;
}

async function toExtension(action, params) {
  const sock = await extension();
  const ms = Math.min(Math.max(Number(params._timeout) || (action === 'batch' ? 180000 : 60000), 3000), 600000);
  delete params._timeout;
  return new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`No answer from the extension for "${action}" after ${ms} ms`)); }, ms);
    pending.set(id, { resolve, reject, timer, sock });
    sock.send(JSON.stringify({ id, action, params }));
  });
}

function saveShot(data, p) {
  const ext = data.mime === 'image/png' ? '.png' : '.jpg';
  let file = p.savePath ? path.resolve(String(p.savePath)) : path.join(SHOTS, `shot-${new Date().toISOString().replace(/[:.]/g, '-')}${ext}`);
  if (!/\.(png|jpe?g|webp)$/i.test(file)) file += ext;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const buf = Buffer.from(data.base64, 'base64');
  fs.writeFileSync(file, buf);
  return { savedTo: file, fileSize: buf.length, w: data.w, h: data.h };
}

const server = http.createServer((req, res) => {
  if (!HOSTS.has(req.headers.host)) return reply(res, 403, { success: false, error: 'Bad Host header' });
  if (fromBrowser(req)) return reply(res, 403, { success: false, error: 'Requests from web pages are not accepted' });
  if (!tokenOk(req)) return reply(res, 401, { success: false, error: `Missing or wrong token. Send the X-Bridge-Token header with the contents of ${TOKEN_FILE}, or use tools/chrome-bridge/client.js / cli.js.` });

  const action = new URL(req.url, 'http://bridge').pathname.slice(1);
  if (req.method === 'GET' && action === 'status') {
    return reply(res, 200, { connected: connected(), extension: extVersion, extensionId: EXT_ID, port: PORT, timestamp: Date.now() });
  }
  if (req.method !== 'POST') return reply(res, 405, { success: false, error: 'Use POST /<action> with a JSON body (GET only for /status)' });
  if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) return reply(res, 415, { success: false, error: 'Content-Type must be application/json' });
  if (!/^[a-z_]{1,40}$/.test(action)) return reply(res, 404, { success: false, error: 'Unknown action' });

  const chunks = [];
  let size = 0;
  req.on('data', c => {
    size += c.length;
    if (size > 25 * 1024 * 1024) { reply(res, 413, { success: false, error: 'Body too large' }); req.destroy(); return; }
    chunks.push(c);
  });
  req.on('end', async () => {
    if (res.writableEnded) return;
    let params;
    try {
      params = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
      if (!params || typeof params !== 'object' || Array.isArray(params)) throw new Error();
    } catch (e) {
      return reply(res, 400, { success: false, error: 'Body must be a JSON object' });
    }
    const t0 = Date.now();
    try {
      let data = await toExtension(action, params);
      if (action === 'screenshot' && data && data.base64 && (params.savePath || params.v)) data = saveShot(data, params);
      if (action === 'batch' && data && Array.isArray(data.steps)) {
        data.steps = data.steps.map(s => (s.do === 'screenshot' && s.base64 ? Object.assign({ do: 'screenshot' }, saveShot(s, {})) : s));
      }
      console.log(`${new Date().toLocaleTimeString()} ${action} ok ${Date.now() - t0}ms`);
      reply(res, 200, { success: true, data });
    } catch (e) {
      console.log(`${new Date().toLocaleTimeString()} ${action} failed ${Date.now() - t0}ms: ${e.message}`);
      reply(res, 500, { success: false, error: e.message });
    }
  });
});

const refusedSeen = new Map();
function refused(origin, host) {
  // Log each refused origin once a minute, so an old copy of the extension is easy to spot.
  const key = `${origin}|${host}`;
  if (Date.now() - (refusedSeen.get(key) || 0) < 60000) return;
  refusedSeen.set(key, Date.now());
  const hint = /^chrome-extension:/.test(origin || '') ? ' (another extension, probably an old copy of the bridge: remove it in chrome://extensions)' : '';
  console.log(`Refused WebSocket from ${origin || 'no origin'} via ${host}${hint}`);
}

const wss = new WebSocketServer({
  server,
  maxPayload: 64 * 1024 * 1024,
  verifyClient: ({ origin, req }) => {
    const ok = HOSTS.has(req.headers.host) && (EXT_ORIGIN ? origin === EXT_ORIGIN : /^chrome-extension:\/\/[a-p]{32}$/.test(origin || ''));
    if (!ok) refused(origin, req.headers.host);
    return ok;
  }
});

wss.on('connection', (sock, req) => {
  if (ext && ext !== sock) { try { ext.close(4000, 'replaced by a new connection'); } catch (e) { /* already closed */ } }
  ext = sock;
  sock.isAlive = true;
  console.log(`Extension connected (${req.headers.origin})`);
  sock.on('pong', () => { sock.isAlive = true; });
  sock.on('message', raw => {
    sock.isAlive = true;
    let m;
    try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.event === 'hello') { extVersion = m.version; console.log(`Extension v${m.version} ready`); return; }
    if (m.event) return;
    const p = pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    clearTimeout(p.timer);
    if (m.error) p.reject(new Error(m.error)); else p.resolve(m.result);
  });
  sock.on('close', () => {
    for (const [id, p] of pending) {
      if (p.sock === sock) { clearTimeout(p.timer); pending.delete(id); p.reject(new Error('The extension disconnected')); }
    }
    if (ext === sock) { ext = null; console.log('Extension disconnected'); }
  });
});

setInterval(() => {
  for (const s of wss.clients) {
    if (!s.isAlive) { s.terminate(); continue; }
    s.isAlive = false;
    try { s.ping(); } catch (e) { /* closing */ }
  }
}, 25000);

server.on('error', e => {
  if (e.code === 'EADDRINUSE') console.error(`Port ${PORT} is busy: the bridge is probably already running.`);
  else console.error(e);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`Kawaki Chrome Bridge on http://${HOST}:${PORT}`);
  console.log(`  token file: ${TOKEN_FILE}${ALLOW_NO_TOKEN ? '  (token NOT required: BRIDGE_ALLOW_NO_TOKEN=1)' : ''}`);
  console.log(`  extension:  ${EXT_ORIGIN || 'any chrome-extension:// origin (no key in manifest)'}`);
});
