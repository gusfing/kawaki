import { Hono } from 'hono';
import { authMiddleware } from '../middleware.js';
import { seoService } from './service.js';
import { ValidationError } from '../../lib/errors.js';
import type { ApiResponse } from '../../types/api.js';

const app = new Hono();

app.post('/analyze', async (c) => {
  const body = await c.req.json();

  if (!body.content || !body.title) {
    throw new ValidationError('Content and title are required', {
      missing: ['content', 'title'],
    });
  }

  const analysis = await seoService.analyzeContent(body.content, body.title);

  const response: ApiResponse<any> = {
    success: true,
    data: analysis,
  };

  return c.json(response);
});

app.use(authMiddleware);

app.get('/sitemap', async (c) => {
  const baseUrl = c.req.query('baseUrl') || 'https://example.com';

  const sitemap = await seoService.generateSitemap(baseUrl);

  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
  });
});

app.get('/robots.txt', async (c) => {
  const baseUrl = c.req.query('baseUrl') || 'https://example.com';

  const robots = await seoService.generateRobotsTxt(baseUrl);

  return c.text(robots, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
});

export default app;
