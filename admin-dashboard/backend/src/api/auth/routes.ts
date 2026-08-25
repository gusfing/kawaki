import { Hono } from 'hono';
import { authMiddleware } from '../middleware.js';
import { db } from '../../db/index.js';
import { apiKeys } from '../../db/schema.js';
import { randomUUID } from 'crypto';
import { generateApiKey, hashApiKey, parsePermissions } from '../../lib/auth.js';
import { createApiKeySchema } from '../../lib/validation.js';
import { ValidationError } from '../../lib/errors.js';
import { logger } from '../../lib/logger.js';
import type { ApiResponse } from '../../types/api.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

app.use(authMiddleware);

app.get('/keys', async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission = auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: admin');
  }

  const keys = db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      permissions: apiKeys.permissions,
      lastUsed: apiKeys.lastUsed,
      active: apiKeys.active,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .all();

  const formatted = keys.map((key) => ({
    ...key,
    permissions: parsePermissions(key.permissions),
  }));

  const response: ApiResponse<any[]> = {
    success: true,
    data: formatted,
  };

  return c.json(response);
});

app.post('/keys', async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission = auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: admin');
  }

  const body = await c.req.json();

  const result = createApiKeySchema.safeParse(body);
  if (!result.success) {
    throw new ValidationError('Invalid API key data', {
      errors: result.error.flatten().fieldErrors,
    });
  }

  const plainKey = generateApiKey();
  const hashedKey = hashApiKey(plainKey);

  const newKey = {
    id: randomUUID(),
    key: hashedKey,
    name: result.data.name,
    permissions: JSON.stringify(result.data.permissions || ['blog.read', 'pages.read']),
    active: true,
    lastUsed: null,
    createdAt: new Date(),
  };

  db.insert(apiKeys).values(newKey).run();

  logger.info(`API key created: ${newKey.id}`);

  const response: ApiResponse<any> = {
    success: true,
    data: {
      id: newKey.id,
      name: newKey.name,
      key: plainKey,
      permissions: JSON.parse(newKey.permissions),
      active: newKey.active,
      createdAt: newKey.createdAt,
    },
  };

  return c.json(response, { status: 201 });
});

app.delete('/keys/:id', async (c) => {
  const auth = c.get('auth') as any;
  const hasPermission = auth.permissions.includes('*');

  if (!hasPermission) {
    throw new Error('Missing permission: admin');
  }

  const id = c.req.param('id');

  db.update(apiKeys).set({ active: false }).where(eq(apiKeys.id, id)).run();

  logger.info(`API key deactivated: ${id}`);

  const response: ApiResponse<null> = {
    success: true,
    data: null,
  };

  return c.json(response);
});

export default app;
