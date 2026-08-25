import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware } from '../middleware.js';
import { templateService } from './service.js';

const router = new Hono();

router.use(authMiddleware);

const createTemplateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['blog', 'page']),
  content: z.string(),
  description: z.string().optional(),
});

router.get('/', async (c) => {
  try {
    const type = (c.req.query('type') || 'blog') as 'blog' | 'page';
    const templates = await templateService.listTemplates(type);
    return c.json({ success: true, data: templates });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch templates' }, 400);
  }
});

router.get('/built-in', async (c) => {
  try {
    const type = (c.req.query('type') || 'blog') as 'blog' | 'page';
    const templates = await templateService.getBuiltInTemplates(type);
    return c.json({ success: true, data: templates });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch built-in templates' }, 400);
  }
});

router.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const template = await templateService.getTemplate(id);
    if (!template) {
      return c.json({ success: false, error: 'Template not found' }, 404);
    }
    return c.json({ success: true, data: template });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch template' }, 400);
  }
});

router.post('/', zValidator('json', createTemplateSchema), async (c) => {
  const data = c.req.valid('json');

  try {
    const template = await templateService.createTemplate(data);
    return c.json({ success: true, data: template }, 201);
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to create template' }, 400);
  }
});

router.post('/:id/clone', async (c) => {
  try {
    const id = c.req.param('id');
    const cloned = await templateService.cloneTemplate(id);
    return c.json({ success: true, data: cloned }, 201);
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to clone template' }, 400);
  }
});

export { router as templatesRouter };
