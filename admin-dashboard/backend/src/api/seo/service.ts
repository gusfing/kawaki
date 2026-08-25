import { db } from '../../db/index.js';
import { blogs, pages } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export class SeoService {
  async analyzeContent(content: string, title: string) {
    const wordCount = content.split(/\s+/).length;
    const headingCount = (content.match(/^#+\s+/gm) || []).length;
    const linkCount = (content.match(/\[.+?\]\(.+?\)/g) || []).length;
    const imageCount = (content.match(/!\[.+?\]\(.+?\)/g) || []).length;

    const readabilityScore = this.calculateReadability(content);
    const keywordDensity = this.analyzeKeywordDensity(content);

    const issues: string[] = [];

    if (wordCount < 300) {
      issues.push('Content is too short. Aim for at least 300 words.');
    }

    if (headingCount === 0) {
      issues.push('No headings found. Use H2/H3 tags for structure.');
    }

    if (imageCount === 0) {
      issues.push('No images found. Add relevant images for engagement.');
    }

    if (!title) {
      issues.push('Title is missing.');
    }

    return {
      readability: readabilityScore,
      wordCount,
      headingCount,
      linkCount,
      imageCount,
      keywordDensity,
      headingStructure: headingCount > 0 ? 'good' : 'poor',
      issues,
      score: this.calculateSeoScore(issues),
    };
  }

  async generateSitemap(baseUrl: string) {
    const blogPosts = db.select().from(blogs).where(eq(blogs.status, 'published')).all();

    const pagesList = db
      .select()
      .from(pages)
      .where(eq(pages.published, true))
      .all();

    const urls = [
      {
        loc: baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0',
      },
      ...blogPosts.map((blog: any) => ({
        loc: `${baseUrl}/blog/${blog.slug}`,
        lastmod: blog.updatedAt.toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8',
      })),
      ...pagesList.map((page: any) => ({
        loc: `${baseUrl}/${page.slug}`,
        lastmod: page.updatedAt.toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      })),
    ];

    return this.generateXmlSitemap(urls);
  }

  async generateRobotsTxt(baseUrl: string) {
    return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

User-agent: GPTBot
Disallow: /admin

User-agent: ChatGPT-User
Disallow: /admin

User-agent: CCBot
Disallow: /
`;
  }

  private calculateReadability(content: string): number {
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const syllables = this.countSyllables(content);

    if (words === 0) return 0;

    const flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

    return Math.max(0, Math.min(100, Math.round(flesch)));
  }

  private countSyllables(text: string): number {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    let count = 0;

    words.forEach((word) => {
      count += Math.max(1, (word.match(/[aeiouy]/g) || []).length);
    });

    return count;
  }

  private analyzeKeywordDensity(content: string): Record<string, number> {
    const words = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const wordFreq: Record<string, number> = {};

    words.forEach((word) => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const density: Record<string, number> = {};
    const totalWords = words.length;

    Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .forEach(([word, freq]) => {
        density[word] = parseFloat(((freq / totalWords) * 100).toFixed(2));
      });

    return density;
  }

  private calculateSeoScore(issues: string[]): number {
    const baseScore = 100;
    const penalty = issues.length * 10;
    return Math.max(0, baseScore - penalty);
  }

  private generateXmlSitemap(
    urls: Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }>
  ): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${this.escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return xml;
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

export const seoService = new SeoService();
