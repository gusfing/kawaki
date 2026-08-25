import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  author: z.string().min(1, 'Author is required'),
  featuredImage: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  seoKeywords: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export const createPageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  published: z.boolean().default(false),
});

export const updatePageSchema = createPageSchema.partial();

export const createApiKeySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  permissions: z.array(z.string()).default([]),
});

export const analyticsEventSchema = z.object({
  type: z.enum(['page_view', 'click', 'submit', 'form_start', 'form_submit']),
  page: z.string().optional(),
  userId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const siteMetadataSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
export type SiteMetadataInput = z.infer<typeof siteMetadataSchema>;
