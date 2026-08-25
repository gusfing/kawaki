import { Hono } from 'hono';
import { authMiddleware } from '../middleware.js';
import { uploadService } from './service.js';
import type { ApiResponse } from '../../types/api.js';

const app = new Hono();

app.use(authMiddleware);

app.post('/images', async (c) => {
  const body = await c.req.parseBody();
  const file = body['file'] as File;

  if (!file) {
    throw new Error('No file provided');
  }

  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const image = await uploadService.uploadImage(file.name, file.type, Buffer.from(uint8Array), {
    blogId: body['blogId'] as string | undefined,
    pageId: body['pageId'] as string | undefined,
  });

  const response: ApiResponse<any> = {
    success: true,
    data: image,
  };

  return c.json(response, { status: 201 });
});

app.get('/images', async (c) => {
  const blogId = c.req.query('blogId');
  const pageId = c.req.query('pageId');

  const images = await uploadService.listImages({
    blogId: blogId || undefined,
    pageId: pageId || undefined,
  });

  const response: ApiResponse<any[]> = {
    success: true,
    data: images,
  };

  return c.json(response);
});

app.get('/images/:id', async (c) => {
  const id = c.req.param('id');
  const image = await uploadService.getImage(id);

  if (!image) {
    throw new Error(`Image not found: ${id}`);
  }

  const response: ApiResponse<any> = {
    success: true,
    data: image,
  };

  return c.json(response);
});

app.delete('/images/:id', async (c) => {
  const id = c.req.param('id');
  await uploadService.deleteImage(id);

  const response: ApiResponse<null> = {
    success: true,
    data: null,
  };

  return c.json(response);
});

export default app;
