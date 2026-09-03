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

  const parsedUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  return handleApiRequest(req, res, parsedUrl, req.body);
};
