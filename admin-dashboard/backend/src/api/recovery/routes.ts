import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware } from '../middleware.js';
import { recoveryService } from './service.js';

const router = new Hono();

router.use(authMiddleware);

const saveDraftSchema = z.object({
  contentId: z.string().uuid(),
  contentType: z.enum(['blog', 'page']),
  content: z.string(),
  metadata: z.object({ title: z.string() }).optional(),
});

router.post('/save-draft', zValidator('json', saveDraftSchema), async (c) => {
  const data = c.req.valid('json');

  try {
    const draft = await recoveryService.saveDraft(data);
    return c.json({ success: true, data: draft });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to save draft' }, 400);
  }
});

router.get('/drafts', async (c) => {
  try {
    const type = (c.req.query('type') || 'blog') as 'blog' | 'page';
    const drafts = await recoveryService.listRecoverable(type);
    return c.json({ success: true, data: drafts });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch drafts' }, 400);
  }
});

router.post('/recover/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const recovered = await recoveryService.recoverDraft(id);
    if (!recovered) {
      return c.json({ success: false, error: 'Draft not found' }, 404);
    }
    return c.json({ success: true, data: recovered });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to recover draft' }, 400);
  }
});

router.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await recoveryService.cleanupExpired();
    return c.json({ success: true, message: 'Draft deleted' });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to delete draft' }, 400);
  }
});

router.get('/stats', async (c) => {
  try {
    const stats = await recoveryService.getDraftStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch stats' }, 400);
  }
});

export { router as recoveryRouter };
