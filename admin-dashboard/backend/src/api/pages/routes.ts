import { Hono } from 'hono';
import { authMiddleware } from '../middleware.js';
import { pageService } from './service.js';
import { createPageSchema, updatePageSchema } from '../../lib/validation.js';
import { ValidationError } from '../../lib/errors.js';
import { logger } from '../../lib/logger.js';
import type { ApiResponse, PaginatedResponse } from '../../types/api.js';

const app = new Hono();

app.use(authMiddleware);

app.get('/', async (c) => {
  const page = parseInt(c.req.query('page') || '1', 10);
  const limit = parseInt(c.req.query('limit') || '20', 10);
  const search = c.req.query('search');

  const { data, pagination } = await pageService.list({
    page,
    limit,
    search: search || undefined,
  });

  const response: PaginatedResponse<any> = {
    success: true,
    data,
    pagination,
  };

  return c.json(response);
});

app.get('/:slug', async (c) => {
  const slug = c.req.param('slug');

  const page = await pageService.getBySlug(slug);

  const response: ApiResponse<any> = {
    success: true,
    data: page,
  };

  return c.json(response);
});

app.post('/', async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission =
    auth.permissions.includes('pages.write') || auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: pages.write');
  }

  const body = await c.req.json();

  const result = createPageSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError('Invalid page data', {
      errors: result.error.flatten().fieldErrors,
    });
  }

  const page = await pageService.create(result.data);
  logger.info(`Page created: ${page.id}`);

  const response: ApiResponse<any> = {
    success: true,
    data: page,
  };

  return c.json(response, { status: 201 });
});

app.put('/:id', async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission =
    auth.permissions.includes('pages.write') || auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: pages.write');
  }

  const id = c.req.param('id');
  const body = await c.req.json();

  const result = updatePageSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError('Invalid page data', {
      errors: result.error.flatten().fieldErrors,
    });
  }

  const page = await pageService.update(id, result.data);
  logger.info(`Page updated: ${id}`);

  const response: ApiResponse<any> = {
    success: true,
    data: page,
  };

  return c.json(response);
});

app.delete('/:id', async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission =
    auth.permissions.includes('pages.delete') || auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: pages.delete');
  }

  const id = c.req.param('id');

  await pageService.delete(id);
  logger.info(`Page deleted: ${id}`);

  const response: ApiResponse<null> = {
    success: true,
    data: null,
  };

  return c.json(response);
});

export default app;
