import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from './lib/logger.js';
import { loadEnv } from './env.js';
import { initializeDatabase, closeDatabase } from './db/index.js';
import { corsMiddleware, loggingMiddleware, errorHandler } from './api/middleware.js';
import healthRoutes from './api/health/routes.js';
import blogRoutes from './api/blog/routes.js';
import pageRoutes from './api/pages/routes.js';
import authRoutes from './api/auth/routes.js';
import analyticsRoutes from './api/analytics/routes.js';
import seoRoutes from './api/seo/routes.js';
import { schedulingRouter } from './api/scheduling/routes.js';
import { templatesRouter } from './api/templates/routes.js';
import { recoveryRouter } from './api/recovery/routes.js';
import { exportRouter } from './api/export/routes.js';
import { bulkRouter } from './api/bulk/routes.js';

const env = loadEnv();
const app = new Hono();

app.use(corsMiddleware);
app.use(loggingMiddleware);

app.onError(errorHandler);

app.route('/api/health', healthRoutes);
app.route('/api/blogs', blogRoutes);
app.route('/api/pages', pageRoutes);
app.route('/api/auth', authRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/seo', seoRoutes);
app.route('/api/scheduling', schedulingRouter);
app.route('/api/templates', templatesRouter);
app.route('/api/recovery', recoveryRouter);
app.route('/api/export', exportRouter);
app.route('/api/bulk', bulkRouter);

app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'Kawaki Admin Dashboard API v1',
    endpoints: {
      health: '/api/health',
      blogs: '/api/blogs',
      pages: '/api/pages',
      auth: '/api/auth',
    },
  });
});

async function start() {
  try {
    logger.info('🚀 Kawaki Admin Dashboard Backend');
    logger.info('Created by Kunal Sharma');
    logger.info('Version: 5.0.0 (Advanced Features Phase)');

    logger.info('Initializing database...');
    await initializeDatabase();
    logger.info('Database initialized');

    const port = env.PORT;
    logger.info(`Starting server on port ${port}`);

    serve({
      fetch: app.fetch,
      port,
    });
    logger.info(`✓ Server running at http://localhost:${port}`);

    process.on('SIGINT', () => {
      logger.info('Shutting down...');
      closeDatabase();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Shutting down...');
      closeDatabase();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

start();

export default app;
