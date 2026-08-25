import { Hono } from 'hono';
import { ApiResponse } from '../../types/api.js';

const app = new Hono();

app.get('/', (c) => {
  const response: ApiResponse<{
    status: string;
    version: string;
    timestamp: string;
    database: string;
  }> = {
    success: true,
    data: {
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: 'connected',
    },
  };

  return c.json(response);
});

export default app;
