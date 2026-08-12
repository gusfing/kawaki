import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  const staticRoutes = [
    '',
    '/services',
    '/services/web-development',
    '/services/ecommerce-development',
    '/services/shopify-development',
    '/services/wordpress-development',
    '/services/web-app-development',
    '/services/frontend-development',
    '/services/backend-development',
    '/services/maintenance-support',
    '/industries',
    '/case-studies',
    '/blog',
    '/guides',
    '/faqs',
    '/about',
    '/process',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...staticRoutes]
}
