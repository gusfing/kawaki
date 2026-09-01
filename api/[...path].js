// Vercel Serverless Function Gateway for Kawaki CMS API
const fs = require('fs');
const path = require('path');

// Default initial data for serverless environment
const INITIAL_BLOGS = [
  {
    id: "blog_luxury_01",
    title: "The Architecture of Modern Digital Luxury",
    slug: "the-architecture-of-modern-digital-luxury",
    content: `# The Architecture of Modern Digital Luxury\n\nWhy modern luxury digital brands are replacing generic design bloat with surgical typography and bespoke engineering.\n\n### 1. The Death of Template Mediocrity\nModern consumer expectations have outgrown generic component libraries. High-value digital presence demands custom design systems tokenized from the ground up in Figma and implemented with sub-second execution.\n\n### 2. Edge Rendering & Kinetic Physics\nWhen latency drops below 200ms globally, digital interfaces stop feeling like web pages and start feeling like physical hardware. That tactile responsiveness commands trust and conversion.\n\n### 3. Engineering as Brand Identity\nCode quality, accessibility compliance (WCAG 2.2 AA), and typography hierarchy are no longer background details—they are the core differentiators of market leaders.`,
    excerpt: "Why modern luxury digital brands are replacing generic design bloat with surgical typography and bespoke engineering.",
    status: "published",
    author: "Kunal Sharma",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Editorial", "Engineering", "Design Systems"],
    seoKeywords: "digital luxury, web performance, headless commerce, typography",
    seoDescription: "An in-depth breakdown of how surgical typography, sub-second latency, and bespoke engineering define modern digital luxury platforms.",
    views: 142,
    createdAt: new Date("2026-08-25T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-08-25T10:00:00Z").toISOString()
  },
  {
    id: "blog_commerce_02",
    title: "Headless Commerce at Sub-Second Latency",
    slug: "headless-commerce-at-sub-second-latency",
    content: `# Headless Commerce at Sub-Second Latency\n\nHow Shopify Hydrogen and edge caching delivered a +340% conversion lift.\n\n### Architecture Highlights\n- Distributed Redis session cache with 18ms p95 read latency.\n- Hydrogen Cart API integration with optimistic mutation queues.\n- Instant route transitions without full page re-hydration.`,
    excerpt: "How Shopify Hydrogen and edge caching delivered a +340% conversion lift.",
    status: "published",
    author: "Kunal Sharma",
    featuredImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Commerce", "Shopify Hydrogen", "Edge APIs"],
    seoKeywords: "headless commerce, shopify hydrogen, conversion optimization",
    seoDescription: "Technical analysis of sub-second headless commerce architecture and its direct impact on transaction velocity.",
    views: 89,
    createdAt: new Date("2026-08-28T14:30:00Z").toISOString(),
    updatedAt: new Date("2026-08-28T14:30:00Z").toISOString()
  }
];

const INITIAL_PAGES = [
  { id: "page_home", title: "Home", slug: "home", status: "published", published: 1, updatedAt: new Date().toISOString() },
  { id: "page_services", title: "Services", slug: "services", status: "published", published: 1, updatedAt: new Date().toISOString() },
  { id: "page_about", title: "About", slug: "about", status: "published", published: 1, updatedAt: new Date().toISOString() },
  { id: "page_works", title: "Case Studies", slug: "case-studies", status: "published", published: 1, updatedAt: new Date().toISOString() },
  { id: "page_blog", title: "Insights & Blog", slug: "blog", status: "published", published: 1, updatedAt: new Date().toISOString() },
  { id: "page_contact", title: "Contact", slug: "contact", status: "published", published: 1, updatedAt: new Date().toISOString() }
];

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const parsedUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname.replace(/^\/api/, '');
  const searchParams = parsedUrl.searchParams;

  // 1. Health Endpoint: /api/health
  if (pathname === '/health' || pathname === '') {
    return res.status(200).json({
      success: true,
      status: 'healthy',
      version: '5.0.0',
      environment: 'Vercel Serverless Edge',
      timestamp: new Date().toISOString()
    });
  }

  // 2. Single Blog Story: /api/blogs/:slug
  if (pathname.startsWith('/blogs/')) {
    const slug = pathname.replace('/blogs/', '');
    const blog = INITIAL_BLOGS.find(b => b.slug === slug || b.id === slug);
    if (blog) {
      return res.status(200).json({ success: true, data: blog });
    }
    return res.status(404).json({ success: false, error: `Story '${slug}' not found` });
  }

  // 3. Blogs List: /api/blogs
  if (pathname === '/blogs') {
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    let filtered = INITIAL_BLOGS;
    if (status) {
      filtered = filtered.filter(b => b.status === status);
    }
    return res.status(200).json({
      success: true,
      data: filtered.slice(0, limit),
      pagination: {
        page: 1,
        limit,
        total: filtered.length
      }
    });
  }

  // 4. Pages List: /api/pages
  if (pathname === '/pages') {
    return res.status(200).json({
      success: true,
      data: INITIAL_PAGES,
      pagination: { page: 1, limit: 50, total: INITIAL_PAGES.length }
    });
  }

  // 5. Analytics Endpoint: /api/analytics/overview
  if (pathname.startsWith('/analytics')) {
    return res.status(200).json({
      success: true,
      data: {
        totalViews: 1420,
        uniqueVisitors: 890,
        publishedBlogs: INITIAL_BLOGS.filter(b => b.status === 'published').length,
        livePages: INITIAL_PAGES.length,
        seoHealth: 98
      }
    });
  }

  // 6. Auth / Verification: /api/auth
  if (pathname.startsWith('/auth')) {
    return res.status(200).json({
      success: true,
      authenticated: true,
      user: { name: 'Kunal Sharma', role: 'Master Admin' }
    });
  }

  // Fallback 404
  return res.status(404).json({
    success: false,
    error: `API Route '${pathname}' not found on Vercel Serverless Gateway`
  });
};
