type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (LOG_LEVELS['debug'] >= LOG_LEVELS[currentLevel]) {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  },

  info: (message: string, data?: unknown) => {
    if (LOG_LEVELS['info'] >= LOG_LEVELS[currentLevel]) {
      console.log(`[INFO] ${message}`, data || '');
    }
  },

  warn: (message: string, data?: unknown) => {
    if (LOG_LEVELS['warn'] >= LOG_LEVELS[currentLevel]) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },

  error: (message: string, error?: unknown) => {
    if (LOG_LEVELS['error'] >= LOG_LEVELS[currentLevel]) {
      console.error(`[ERROR] ${message}`, error || '');
    }
  },
};
