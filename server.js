const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
const ROOT = path.resolve(__dirname, 'public');
const ADMIN_ROOT = path.resolve(__dirname, 'admin-dashboard', 'frontend', 'dist');
const { handleApiRequest } = require('./lib/db-api-handler.js');

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
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const PROXY_DOMAINS = [
  'cdn.shopify.com',
  'www.gstatic.com',
  'embed-ssl.wistia.com',
  'editions-winter-2026.myshopify.com'
];

function handleApiProxyOrDirect(req, res, parsedUrl) {
  let bodyChunks = [];
  req.on('data', chunk => bodyChunks.push(chunk));
  req.on('end', () => {
    const rawBody = Buffer.concat(bodyChunks);
    let jsonBody = null;
    if (rawBody.length > 0) {
      try {
        jsonBody = JSON.parse(rawBody.toString('utf-8'));
      } catch (e) {
        jsonBody = null;
      }
    }

    const options = {
      hostname: '127.0.0.1',
      port: BACKEND_PORT,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `127.0.0.1:${BACKEND_PORT}`
      }
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      // Backend not running -> Seamlessly fallback to direct database handler!
      handleApiRequest(req, res, parsedUrl, jsonBody);
    });

    if (rawBody.length > 0) {
      proxyReq.write(rawBody);
    }
    proxyReq.end();
  });
}

function fetchAndCacheFromRemote(targetUrl, localPath, req, res) {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Referer': 'https://kawaki.co.in/',
      'Accept': '*/*'
    }
  };

  https.get(targetUrl, options, (remoteRes) => {
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
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let reqPath;
  try {
    reqPath = decodeURIComponent(parsedUrl.pathname);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request: Malformed URL encoding');
    return;
  }

  // 1. Forward all /api/ requests to the Hono Backend (with SQLite database fallback)
  if (reqPath.startsWith('/api/') || reqPath === '/api') {
    handleApiProxyOrDirect(req, res, parsedUrl);
    return;
  }

  // Canonical Sitemap: serve public/sitemap.xml directly with canonical XML headers
  if (reqPath === '/sitemap.xml') {
    const sitemapPath = path.join(ROOT, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.writeHead(200, {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      });
      fs.createReadStream(sitemapPath).pipe(res);
      return;
    }
  }

  // Security Headers for frontend assets
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 2. Serve Admin Panel at /admin or /admin/*
  if (reqPath === '/admin' || reqPath.startsWith('/admin/')) {
    let subPath = reqPath.slice('/admin'.length).replace(/^[/\\]+/, '');
    if (!subPath) {
      subPath = 'index.html';
    }

    let adminFilePath = path.join(ADMIN_ROOT, subPath);

    if (fs.existsSync(adminFilePath) && fs.statSync(adminFilePath).isFile()) {
      serveLocalFile(adminFilePath, res);
      return;
    }

    // SPA Fallback for client-side routing
    const adminIndex = path.join(ADMIN_ROOT, 'index.html');
    if (fs.existsSync(adminIndex)) {
      serveLocalFile(adminIndex, res);
      return;
    }
  }

  // Safety: Serve admin assets if requested directly at /assets/index-*
  if (reqPath.startsWith('/assets/index-')) {
    const adminAsset = path.join(ADMIN_ROOT, reqPath.replace(/^[/\\]+/, ''));
    if (fs.existsSync(adminAsset) && fs.statSync(adminAsset).isFile()) {
      serveLocalFile(adminAsset, res);
      return;
    }
  }

  // 3. Redirect Shopify/Editions to /services
  if (reqPath.startsWith('/editions') || reqPath === '/shopify' || reqPath === '/shopify.html') {
    res.writeHead(301, { Location: '/services' });
    res.end();
    return;
  }

  // 3b. Legacy /blog-post redirect to clean /blog/:slug (Phase 3.3D)
  if (reqPath === '/blog-post' || reqPath === '/blog-post/' || reqPath === '/blog-post.html') {
    const legacyRedirectHandler = require('./api/legacy-blog-redirect.js');
    legacyRedirectHandler(req, res);
    return;
  }

  // 4. Clean URL redirects (matching Vercel cleanUrls: true)
  if (reqPath === '/index.html') {
    res.writeHead(301, { Location: '/' + (parsedUrl.search || '') });
    res.end();
    return;
  }
  if (reqPath.endsWith('.html')) {
    const cleanPath = reqPath.slice(0, -5);
    res.writeHead(301, { Location: cleanPath + (parsedUrl.search || '') });
    res.end();
    return;
  }

  // 5. Root request / maps to index.html
  if (reqPath === '/') {
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
    const notFoundPage = path.join(ROOT, '404.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      fs.createReadStream(notFoundPage).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not Found: ${reqPath}`);
  });
});

function serveLocalFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);
  stream.on('open', () => {
    const isHTML = filePath.endsWith('.html');
    const cacheControl = isHTML
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=31536000, immutable';

    const headers = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': cacheControl
    };

    if (isHTML) {
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }

    res.writeHead(200, headers);
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
  console.log(`🚀 Kawaki Studios Web & Admin Gateway running at http://localhost:${PORT}`);
  console.log(`   - Website: http://localhost:${PORT}/`);
  console.log(`   - Admin Panel: http://localhost:${PORT}/admin/`);
  console.log(`   - Backend API Proxy: http://localhost:${PORT}/api/ -> http://127.0.0.1:${BACKEND_PORT}/api/`);
});
