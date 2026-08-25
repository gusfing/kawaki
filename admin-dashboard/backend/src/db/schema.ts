import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const blogs = sqliteTable(
  'blogs',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    excerpt: text('excerpt'),
    status: text('status').default('draft'),
    author: text('author').notNull(),
    featuredImage: text('featured_image'),
    tags: text('tags'),
    seoKeywords: text('seo_keywords'),
    seoDescription: text('seo_description'),
    views: integer('views').default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).defaultNow(),
  },
  (table) => ({
    statusIdx: index('blogs_status_idx').on(table.status),
    slugIdx: index('blogs_slug_idx').on(table.slug),
  })
);

export const pages = sqliteTable(
  'pages',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content').notNull(),
    status: text('status').default('draft'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    seoKeywords: text('seo_keywords'),
    published: integer('published', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).defaultNow(),
  },
  (table) => ({
    slugIdx: index('pages_slug_idx').on(table.slug),
  })
);

export const apiKeys = sqliteTable(
  'api_keys',
  {
    id: text('id').primaryKey(),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    permissions: text('permissions').notNull(),
    lastUsed: integer('last_used', { mode: 'timestamp' }),
    active: integer('active', { mode: 'boolean' }).default(true),
    createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
  },
  (table) => ({
    keyIdx: index('api_keys_key_idx').on(table.key),
  })
);

export const analyticsEvents = sqliteTable(
  'analytics_events',
  {
    id: text('id').primaryKey(),
    type: text('type').notNull(),
    page: text('page'),
    userId: text('user_id'),
    metadata: text('metadata'),
    createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
  },
  (table) => ({
    pageIdx: index('events_page_idx').on(table.page),
    typeIdx: index('events_type_idx').on(table.type),
  })
);

export const siteMetadata = sqliteTable('site_metadata', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).defaultNow(),
});
