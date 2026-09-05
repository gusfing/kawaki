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

  const parsedUrl = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);

  // When rewritten by Vercel's vercel.json destination "/api/[...path]?match=$1"
  if (parsedUrl.searchParams.has('match')) {
    const match = parsedUrl.searchParams.get('match').replace(/^\/+/, '');
    parsedUrl.pathname = `/api/${match}`;
    parsedUrl.searchParams.delete('match');
  } else if (req.headers && req.headers['x-forwarded-uri']) {
    const forwarded = new URL(req.headers['x-forwarded-uri'], `https://${req.headers.host || 'localhost'}`);
    parsedUrl.pathname = forwarded.pathname;
    forwarded.searchParams.forEach((v, k) => {
      if (!parsedUrl.searchParams.has(k)) parsedUrl.searchParams.set(k, v);
    });
  }

  return handleApiRequest(req, res, parsedUrl, req.body);
};
