// Vercel Serverless Function Gateway for Kawaki CMS API
const { handleApiRequest } = require('../lib/db-api-handler.js');

module.exports = (req, res) => {
  // CORS Pre-flight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status ? res.status(204).end() : res.end();
  }

  // Determine actual requested path from Vercel proxy headers, query or URL
  let rawPath = req.url || '/';
  
  if (req.headers && req.headers['x-forwarded-uri']) {
    rawPath = req.headers['x-forwarded-uri'];
  } else if (req.headers && req.headers['x-now-route-matches']) {
    rawPath = req.headers['x-now-route-matches'];
  } else if (req.query && req.query.path) {
    const p = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path;
    rawPath = `/api/${p}`;
  } else if (req.query && req.query.match) {
    rawPath = `/api/${req.query.match}`;
  } else if (rawPath.includes('[...path]')) {
    if (req.headers && req.headers['x-matched-path'] && !req.headers['x-matched-path'].includes('[...path]')) {
      rawPath = req.headers['x-matched-path'];
    }
  }

  const parsedUrl = new URL(rawPath, `https://${req.headers.host || 'localhost'}`);
  
  // Merge query parameters if passed separately by Vercel
  if (req.query) {
    Object.keys(req.query).forEach(k => {
      if (k !== 'match' && k !== 'path' && !parsedUrl.searchParams.has(k)) {
        parsedUrl.searchParams.set(k, req.query[k]);
      }
    });
  }

  return handleApiRequest(req, res, parsedUrl, req.body);
};
