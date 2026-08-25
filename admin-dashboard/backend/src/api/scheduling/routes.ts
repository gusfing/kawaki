import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware, permissionCheck } from '../middleware.js';
import { schedulingService } from './service.js';

const router = new Hono();

router.use(authMiddleware);

const scheduleSchema = z.object({
  blogId: z.string().uuid(),
  scheduledFor: z.string().datetime(),
});

router.post('/posts', zValidator('json', scheduleSchema), async (c) => {
  const { blogId, scheduledFor } = c.req.valid('json');

  try {
    const result = await schedulingService.schedulePost(blogId, new Date(scheduledFor));
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to schedule post' }, 400);
  }
});

router.get('/upcoming', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '10');
    const upcoming = await schedulingService.getUpcoming(limit);
    return c.json({ success: true, data: upcoming });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch scheduled posts' }, 400);
  }
});

router.get('/stats', async (c) => {
  try {
    const stats = await schedulingService.getStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch stats' }, 400);
  }
});

export { router as schedulingRouter };
