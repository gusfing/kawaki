const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const ROOT = path.resolve(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.riv': 'application/octet-stream',
  '.glb': 'model/gltf-binary',
  '.usdz': 'model/vnd.usdz+zip',
  '.ktx2': 'image/ktx2',
  '.txt': 'text/plain; charset=utf-8'
};

const PROXY_DOMAINS = [
  'cdn.shopify.com',
  'www.gstatic.com',
  'embed-ssl.wistia.com',
  'www.shopify.com',
  'editions-winter-2026.myshopify.com'
];

function fetchAndCacheFromRemote(targetUrl, localPath, req, res) {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Referer': 'https://www.shopify.com/',
      'Accept': '*/*'
    }
  };

  https.get(targetUrl, options, (remoteRes) => {
    // Handle redirects
    if (remoteRes.statusCode >= 300 && remoteRes.statusCode < 400 && remoteRes.headers.location) {
      return fetchAndCacheFromRemote(remoteRes.headers.location, localPath, req, res);
    }

    if (remoteRes.statusCode !== 200) {
      res.writeHead(remoteRes.statusCode, { 'Content-Type': 'text/plain' });
      res.end(`Remote returned ${remoteRes.statusCode} for ${targetUrl}`);
      return;
    }

    const contentType = remoteRes.headers['content-type'] || MIME_TYPES[path.extname(localPath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000'
    });

    // Ensure directory exists before saving
    const dir = path.dirname(localPath);
    fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
      if (!mkdirErr) {
        const fileStream = fs.createWriteStream(localPath);
        remoteRes.pipe(fileStream);
        fileStream.on('error', (err) => console.error('Write error:', err));
      }
    });

    remoteRes.pipe(res);
  }).on('error', (err) => {
    console.error(`Fetch failed for ${targetUrl}:`, err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end(`Proxy fetch error: ${err.message}`);
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let reqPath = decodeURIComponent(parsedUrl.pathname);

  // Redirect root / or /editions to /editions/winter2026 for Remix route matching
  if (reqPath === '/' || reqPath === '/editions' || reqPath === '/editions/') {
    res.writeHead(302, { 'Location': '/editions/winter2026' });
    res.end();
    return;
  }

  // Serve index.html on /editions/winter2026
  if (reqPath === '/editions/winter2026' || reqPath === '/editions/winter2026/' || reqPath.startsWith('/editions/winter2026')) {
    const indexPath = path.join(ROOT, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveLocalFile(indexPath, res);
      return;
    }
  }

  let filePath = path.join(ROOT, reqPath);

  // Security check: ensure path stays within ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      // File found locally
      serveLocalFile(filePath, res);
      return;
    }

    if (!err && stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      if (fs.existsSync(indexFile)) {
        serveLocalFile(indexFile, res);
        return;
      }
    }

    // Check if path exists with .html extension (e.g. /about -> /about.html)
    if (fs.existsSync(filePath + '.html')) {
      serveLocalFile(filePath + '.html', res);
      return;
    }

    // Check if this path matches a proxyable domain (e.g. /cdn.shopify.com/...)
    const firstSegment = reqPath.split('/')[1];
    if (PROXY_DOMAINS.includes(firstSegment)) {
      const remoteUrlPath = reqPath.substring(firstSegment.length + 1) + parsedUrl.search;
      const remoteTarget = `https://${firstSegment}${remoteUrlPath}`;
      console.log(`[PROXY FETCH] 404 local, downloading: ${remoteTarget}`);
      fetchAndCacheFromRemote(remoteTarget, filePath, req, res);
      return;
    }

    // Otherwise 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not Found: ${reqPath}`);
  });
});

function serveLocalFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);
  stream.on('open', () => {
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    stream.pipe(res);
  });

  stream.on('error', (streamErr) => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
    }
    res.end('Server Error: ' + streamErr.message);
  });
}

server.listen(PORT, () => {
  console.log(`Kawaki Studios app server running at http://localhost:${PORT}`);
});
