/* Kawaki Chrome Bridge client for Node scripts.

   const bridge = require('./tools/chrome-bridge/client');
   await bridge.call('open', { url: 'https://search.google.com/search-console', waitFor: 'Overview' });
   const { text } = await bridge.call('snapshot', { max: 4000 });
   await bridge.call('click', { ref: 12, snap: true });

   Reads the token from tools/chrome-bridge/.token (written when the server first starts). */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.BRIDGE_PORT || 8765);
const TOKEN_FILE = path.join(__dirname, '.token');

function token() {
  try {
    return fs.readFileSync(TOKEN_FILE, 'utf8').trim();
  } catch (e) {
    throw new Error('No bridge token yet. Start the bridge once: npm run bridge:chrome');
  }
}

function request(method, action, params) {
  const body = method === 'POST' ? JSON.stringify(Object.assign({ v: 2 }, params || {})) : '';
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/' + action,
      method,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Bridge-Token': token() }
    }, res => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => { data += c; });
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(data); } catch (e) { return reject(new Error('Bad reply from bridge: ' + data.slice(0, 200))); }
        resolve(parsed);
      });
    });
    req.on('error', () => reject(new Error(`The bridge is not running on 127.0.0.1:${PORT}. Start it: npm run bridge:chrome`)));
    if (body) req.write(body);
    req.end();
  });
}

/* Runs one action. Resolves with its data, rejects with the extension's error message. */
async function call(action, params) {
  const r = await request('POST', action, params);
  if (!r.success) throw new Error(r.error || 'Bridge call failed');
  return r.data;
}

async function status() {
  return request('GET', 'status');
}

module.exports = { call, status, request, TOKEN_FILE };
