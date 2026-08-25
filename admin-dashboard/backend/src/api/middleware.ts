import { Context, Next } from 'hono';
import { AppError, UnauthorizedError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';
import { extractApiKeyFromHeader, hashApiKey, parsePermissions } from '../lib/auth.js';
import { db } from '../db/index.js';
import { apiKeys } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export async function errorHandler(err: unknown, c: Context) {
  logger.error('Request error', err);

  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        error: err.message,
        code: err.code,
        details: err.details,
        statusCode: err.statusCode,
      },
      { status: err.statusCode }
    );
  }

  if (err instanceof Error) {
    return c.json(
      {
        success: false,
        error: err.message || 'Internal server error',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
      },
      { status: 500 }
    );
  }

  return c.json(
    {
      success: false,
      error: 'Unknown error occurred',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
    },
    { status: 500 }
  );
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    throw new UnauthorizedError('Missing Authorization header');
  }

  const providedKey = extractApiKeyFromHeader(authHeader);
  if (!providedKey) {
    throw new UnauthorizedError('Invalid Authorization header format');
  }

  const hashedKey = hashApiKey(providedKey);
  const keyRecord = db.select().from(apiKeys).where(eq(apiKeys.key, hashedKey)).get();

  if (!keyRecord || !keyRecord.active) {
    throw new UnauthorizedError('Invalid or inactive API key');
  }

  const permissions = parsePermissions(keyRecord.permissions);

  c.set('auth', {
    apiKeyId: keyRecord.id,
    permissions,
  });

  // Update last used
  db.update(apiKeys)
    .set({ lastUsed: new Date() })
    .where(eq(apiKeys.id, keyRecord.id))
    .run();

  await next();
}

export async function optionalAuthMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    try {
      const providedKey = extractApiKeyFromHeader(authHeader);
      if (providedKey) {
        const hashedKey = hashApiKey(providedKey);
        const keyRecord = db.select().from(apiKeys).where(eq(apiKeys.key, hashedKey)).get();
        if (keyRecord && keyRecord.active) {
          const permissions = parsePermissions(keyRecord.permissions);
          c.set('auth', {
            apiKeyId: keyRecord.id,
            permissions,
          });
        }
      }
    } catch {
      // ignore optional auth errors
    }
  }
  await next();
}

export async function permissionCheck(permission: string) {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth');
    if (!auth) {
      throw new UnauthorizedError('Authentication required');
    }

    const hasPermission =
      auth.permissions.includes(permission) || auth.permissions.includes('*');

    if (!hasPermission) {
      throw new Error(`Missing permission: ${permission}`);
    }

    await next();
  };
}

export async function corsMiddleware(c: Context, next: Next) {
  const origin = c.req.header('Origin') || '*';

  c.header('Access-Control-Allow-Origin', origin);
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Allow-Credentials', 'true');

  if (c.req.method === 'OPTIONS') {
    return c.text('', 200);
  }

  await next();
}

export async function loggingMiddleware(c: Context, next: Next) {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  logger.info(`${c.req.method} ${c.req.path} - ${c.res.status} (${duration}ms)`);
}
