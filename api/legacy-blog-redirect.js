// Vercel Serverless Function: Legacy /blog-post Permanent Redirector (308)
// Strips legacy ?slug= query parameter while preserving optional tracking parameters
// Directs legacy slugs to their canonical /blog/:slug destination

const LEGACY_SLUG_MAP = {
  'the-architecture-of-modern-digital-luxury': 'what-is-editorial-engineering',
  'core-web-vitals-checklist': 'nextjs-performance-architecture',
  'headless-commerce-at-sub-second-latency': 'headless-shopify-development-guide'
};

module.exports = (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.kawaki.co.in';
  const rawUrl = req.url || '/';
  const parsedUrl = new URL(rawUrl, `https://${host}`);

  let rawSlug = parsedUrl.searchParams.get('slug') || (req.query && req.query.slug) || '';

  // Check forwarded URI if present
  if (!rawSlug && req.headers && req.headers['x-forwarded-uri']) {
    try {
      const fUrl = new URL(req.headers['x-forwarded-uri'], `https://${host}`);
      rawSlug = fUrl.searchParams.get('slug') || '';
      fUrl.searchParams.forEach((v, k) => {
        if (!parsedUrl.searchParams.has(k)) parsedUrl.searchParams.set(k, v);
      });
    } catch (e) {}
  }

  const cleanSlug = rawSlug.trim().replace(/^\/+|\/+$/g, '');

  // Strip the legacy 'slug' parameter completely
  parsedUrl.searchParams.delete('slug');

  // Resolve legacy alias slugs to canonical destinations
  const resolvedSlug = LEGACY_SLUG_MAP[cleanSlug] || cleanSlug;

  const targetBase = resolvedSlug ? `/blog/${encodeURI(resolvedSlug)}` : '/blog';
  const remainingParams = parsedUrl.searchParams.toString();
  const destination = remainingParams ? `${targetBase}?${remainingParams}` : targetBase;

  res.writeHead(308, {
    Location: destination,
    'Cache-Control': 'public, max-age=31536000, immutable'
  });
  res.end();
};
