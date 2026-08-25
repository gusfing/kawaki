import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// Extended schema for new features

export const scheduledPosts = sqliteTable('scheduled_posts', {
  id: text('id').primaryKey(),
  blogId: text('blog_id').notNull(),
  scheduledFor: integer('scheduled_for', { mode: 'timestamp' }).notNull(),
  status: text('status').default('pending'), // pending, published, failed
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

export const contentTemplates = sqliteTable('content_templates', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // blog, page
  content: text('content').notNull(),
  tags: text('tags'),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

export const draftRecovery = sqliteTable('draft_recovery', {
  id: text('id').primaryKey(),
  originalId: text('original_id').notNull(), // blog_id or page_id
  type: text('type').notNull(), // blog, page
  content: text('content').notNull(),
  metadata: text('metadata'), // JSON
  deletedAt: integer('deleted_at', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(), // 30 days retention
});

export const contentExports = sqliteTable('content_exports', {
  id: text('id').primaryKey(),
  contentId: text('content_id').notNull(),
  type: text('type').notNull(), // blog, page
  format: text('format').notNull(), // markdown, json, html
  exportedAt: integer('exported_at', { mode: 'timestamp' }).defaultNow(),
  url: text('url').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(), // 7 days
});

export const apiUsageLog = sqliteTable(
  'api_usage_log',
  {
    id: text('id').primaryKey(),
    apiKeyId: text('api_key_id').notNull(),
    endpoint: text('endpoint').notNull(),
    method: text('method').notNull(),
    statusCode: integer('status_code'),
    responseTime: integer('response_time'), // milliseconds
    createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
  },
  (table) => ({
    apiKeyIdx: index('usage_api_key_idx').on(table.apiKeyId),
    timeIdx: index('usage_time_idx').on(table.createdAt),
  })
);

export const bulkOperations = sqliteTable('bulk_operations', {
  id: text('id').primaryKey(),
  type: text('type').notNull(), // delete, update_status, update_author
  targetIds: text('target_ids').notNull(), // JSON array
  action: text('action').notNull(),
  status: text('status').default('pending'), // pending, completed, failed
  results: text('results'), // JSON with success/error per item
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});
