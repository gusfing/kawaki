import { Hono } from 'hono';
import { authMiddleware } from '../middleware.js';
import { analyticsService } from './service.js';
import { analyticsEventSchema } from '../../lib/validation.js';
import { ValidationError } from '../../lib/errors.js';
import type { ApiResponse } from '../../types/api.js';

const app = new Hono();

app.post('/track', async (c) => {
  const body = await c.req.json();

  const result = analyticsEventSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError('Invalid analytics event', {
      errors: result.error.flatten().fieldErrors,
    });
  }

  const event = await analyticsService.trackEvent(result.data);

  const response: ApiResponse<any> = {
    success: true,
    data: event,
  };

  return c.json(response, { status: 201 });
});

app.use('/summary', authMiddleware);
app.use('/page-stats', authMiddleware);

app.get('/summary', async (c) => {
  const period = (c.req.query('period') || '30d') as '7d' | '30d' | '90d';

  const summary = await analyticsService.getSummary(period);

  const response: ApiResponse<any> = {
    success: true,
    data: summary,
  };

  return c.json(response);
});

app.get('/page-stats/:page', async (c) => {
  const page = c.req.param('page');

  const stats = await analyticsService.getPageStats(`/${page}`);

  const response: ApiResponse<any> = {
    success: true,
    data: stats,
  };

  return c.json(response);
});

export default app;
