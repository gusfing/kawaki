// Vercel Serverless Function: Legacy /blog-post Permanent Redirector (308)
// Strips legacy ?slug= query parameter while preserving optional tracking parameters

module.exports = (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.kawaki.co.in';
  const rawUrl = req.url || '/';
  const parsedUrl = new URL(rawUrl, `https://${host}`);

  const rawSlug = parsedUrl.searchParams.get('slug') || (req.query && req.query.slug) || '';
  const cleanSlug = rawSlug.trim().replace(/^\/+|\/+$/g, '');

  // Strip the legacy 'slug' parameter completely
  parsedUrl.searchParams.delete('slug');

  const targetBase = cleanSlug ? `/blog/${encodeURI(cleanSlug)}` : '/blog';
  const remainingParams = parsedUrl.searchParams.toString();
  const destination = remainingParams ? `${targetBase}?${remainingParams}` : targetBase;

  res.writeHead(308, {
    Location: destination,
    'Cache-Control': 'public, max-age=31536000, immutable'
  });
  res.end();
};
