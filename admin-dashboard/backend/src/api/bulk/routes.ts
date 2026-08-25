import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware } from '../middleware.js';
import { bulkService } from './service.js';

const router = new Hono();

router.use(authMiddleware);

const executeSchema = z.object({
  contentType: z.enum(['blog', 'page']),
  ids: z.array(z.string().uuid()),
  action: z.enum(['delete', 'status', 'author']),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  author: z.string().optional(),
});

router.post('/execute', zValidator('json', executeSchema), async (c) => {
  const { contentType, ids, action, status, author } = c.req.valid('json');

  try {
    let result;

    if (action === 'delete') {
      result = await bulkService.deleteMultiple(ids, contentType);
    } else if (action === 'status' && status) {
      result = await bulkService.updateStatusMultiple(ids, status, contentType);
    } else if (action === 'author' && author) {
      result = await bulkService.updateAuthorMultiple(ids, author, contentType);
    } else {
      return c.json({ success: false, error: 'Invalid action or missing required parameters' }, 400);
    }

    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Bulk operation failed' }, 400);
  }
});

router.get('/operation/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const operation = await bulkService.getOperation(id);

    if (!operation) {
      return c.json({ success: false, error: 'Operation not found' }, 404);
    }

    return c.json({ success: true, data: operation });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch operation' }, 400);
  }
});

router.get('/operations', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '20');
    const operations = await bulkService.listOperations(limit);
    return c.json({ success: true, data: operations });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch operations' }, 400);
  }
});

router.get('/stats', async (c) => {
  try {
    const stats = await bulkService.getStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch stats' }, 400);
  }
});

export { router as bulkRouter };
