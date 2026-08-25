import { Hono } from 'hono';
import { authMiddleware, optionalAuthMiddleware } from '../middleware.js';
import { blogService } from './service.js';
import { createBlogSchema, updateBlogSchema } from '../../lib/validation.js';
import { ValidationError } from '../../lib/errors.js';
import { logger } from '../../lib/logger.js';
import type { ApiResponse, PaginatedResponse } from '../../types/api.js';

const app = new Hono();

// Public GET routes with optional auth (public gets published posts; authenticated gets requested status)
app.get('/', optionalAuthMiddleware, async (c) => {
  const auth = c.get('auth') as any;
  const requestedStatus = c.req.query('status');
  const status = auth ? requestedStatus : (requestedStatus || 'published');
  const search = c.req.query('search');
  const page = parseInt(c.req.query('page') || '1', 10);
  const limit = parseInt(c.req.query('limit') || '20', 10);

  const { data, pagination } = await blogService.list({
    status: status || undefined,
    search: search || undefined,
    page,
    limit,
  });

  const response: PaginatedResponse<any> = {
    success: true,
    data,
    pagination,
  };

  return c.json(response);
});

app.get('/:slug', optionalAuthMiddleware, async (c) => {
  const slug = c.req.param('slug');

  const blog = await blogService.getBySlug(slug);
  await blogService.incrementView(slug);

  const response: ApiResponse<any> = {
    success: true,
    data: blog,
  };

  return c.json(response);
});

// Protected mutation routes
app.post('/', authMiddleware, async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission =
    auth.permissions.includes('blog.write') || auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: blog.write');
  }

  const body = await c.req.json();

  const result = createBlogSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError('Invalid blog data', {
      errors: result.error.flatten().fieldErrors,
    });
  }

  const blog = await blogService.create(result.data);
  logger.info(`Blog created: ${blog.id}`);

  const response: ApiResponse<any> = {
    success: true,
    data: blog,
  };

  return c.json(response, { status: 201 });
});

app.put('/:id', authMiddleware, async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission =
    auth.permissions.includes('blog.write') || auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: blog.write');
  }

  const id = c.req.param('id');
  const body = await c.req.json();

  const result = updateBlogSchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError('Invalid blog data', {
      errors: result.error.flatten().fieldErrors,
    });
  }

  const blog = await blogService.update(id, result.data);
  logger.info(`Blog updated: ${id}`);

  const response: ApiResponse<any> = {
    success: true,
    data: blog,
  };

  return c.json(response);
});

app.delete('/:id', authMiddleware, async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission =
    auth.permissions.includes('blog.delete') || auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: blog.delete');
  }

  const id = c.req.param('id');
  await blogService.delete(id);
  logger.info(`Blog deleted: ${id}`);

  const response: ApiResponse<{ id: string }> = {
    success: true,
    data: { id },
  };

  return c.json(response);
});

export default app;
