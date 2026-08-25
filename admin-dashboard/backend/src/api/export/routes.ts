import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware } from '../middleware.js';
import { exportService } from './service.js';

const router = new Hono();

router.use(authMiddleware);

const exportSchema = z.object({
  contentType: z.enum(['blog', 'page']),
  format: z.enum(['markdown', 'json', 'html']),
  ids: z.array(z.string().uuid()).optional(),
  exportAll: z.boolean().optional(),
});

router.post('/content', zValidator('json', exportSchema), async (c) => {
  const { contentType, format, ids, exportAll } = c.req.valid('json');

  try {
    let content: any;

    if (exportAll) {
      content = await exportService.bulkExport(contentType, format);
    } else if (ids && ids.length > 0) {
      content = await exportService.exportContent(ids, contentType, format);
    } else {
      return c.json({ success: false, error: 'Either ids or exportAll must be provided' }, 400);
    }

    // Set appropriate content type and filename
    const filename = `${contentType}-export-${new Date().toISOString().split('T')[0]}`;

    if (format === 'json') {
      c.header('Content-Type', 'application/json');
      c.header('Content-Disposition', `attachment; filename="${filename}.json"`);
      return c.body(JSON.stringify(content, null, 2));
    } else if (format === 'markdown') {
      c.header('Content-Type', 'application/zip');
      c.header('Content-Disposition', `attachment; filename="${filename}.zip"`);
      return c.body(content as unknown as Uint8Array);
    } else if (format === 'html') {
      c.header('Content-Type', 'text/html');
      c.header('Content-Disposition', `attachment; filename="${filename}.html"`);
      return c.body(content as string);
    }
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Export failed' }, 400);
  }
});

export { router as exportRouter };
