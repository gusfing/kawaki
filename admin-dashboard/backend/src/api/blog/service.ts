import { randomUUID } from 'crypto';
import { db } from '../../db/index.js';
import { blogs } from '../../db/schema.js';
import { eq, desc, like, and } from 'drizzle-orm';
import { generateSlug, ensureUniqueSlug } from '../../lib/slug.js';
import { ConflictError, NotFoundError } from '../../lib/errors.js';
import type { CreateBlogInput, UpdateBlogInput } from '../../lib/validation.js';

export class BlogService {
  async create(input: CreateBlogInput) {
    const slug = input.slug ? input.slug : generateSlug(input.title);

    const existingSlugs = db
      .select({ slug: blogs.slug })
      .from(blogs)
      .all()
      .map((row) => row.slug);

    const uniqueSlug = ensureUniqueSlug(slug, existingSlugs);

    const blog = {
      id: randomUUID(),
      title: input.title,
      slug: uniqueSlug,
      content: input.content,
      excerpt: input.excerpt || null,
      status: input.status || 'draft',
      author: input.author,
      featuredImage: input.featuredImage || null,
      tags: input.tags ? JSON.stringify(input.tags) : '[]',
      seoKeywords: input.seoKeywords || null,
      seoDescription: input.seoDescription || null,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    db.insert(blogs).values(blog).run();

    return this.formatBlog(blog);
  }

  async getById(id: string) {
    const blog = db.select().from(blogs).where(eq(blogs.id, id)).get();

    if (!blog) {
      throw new NotFoundError(`Blog with id ${id} not found`);
    }

    return this.formatBlog(blog);
  }

  async getBySlug(slug: string) {
    const blog = db.select().from(blogs).where(eq(blogs.slug, slug)).get();

    if (!blog) {
      throw new NotFoundError(`Blog with slug ${slug} not found`);
    }

    return this.formatBlog(blog);
  }

  async list(options?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    let query = db.select().from(blogs);

    if (options?.status) {
      query = query.where(eq(blogs.status, options.status));
    }

    if (options?.search) {
      const searchTerm = `%${options.search}%`;
      query = query.where(
        and(
          eq(blogs.status, options?.status || 'published'),
          like(blogs.title, searchTerm)
        )
      );
    }

    const total = db
      .select({ count: blogs.id })
      .from(blogs)
      .all().length;

    const results = query
      .orderBy(desc(blogs.createdAt))
      .limit(limit)
      .offset(offset)
      .all();

    return {
      data: results.map((blog) => this.formatBlog(blog)),
      pagination: {
        page,
        limit,
        total,
      },
    };
  }

  async update(id: string, input: UpdateBlogInput) {
    const existing = db.select().from(blogs).where(eq(blogs.id, id)).get();

    if (!existing) {
      throw new NotFoundError(`Blog with id ${id} not found`);
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (input.title) {
      updates.title = input.title;
      if (!input.slug) {
        const slug = generateSlug(input.title);
        const existingSlugs = db
          .select({ slug: blogs.slug })
          .from(blogs)
          .where(eq(blogs.id, id))
          .all()
          .map((row) => row.slug);

        updates.slug = ensureUniqueSlug(slug, existingSlugs);
      }
    }

    if (input.slug) updates.slug = input.slug;
    if (input.content) updates.content = input.content;
    if (input.excerpt !== undefined) updates.excerpt = input.excerpt;
    if (input.status) updates.status = input.status;
    if (input.author) updates.author = input.author;
    if (input.featuredImage !== undefined) updates.featuredImage = input.featuredImage;
    if (input.tags) updates.tags = JSON.stringify(input.tags);
    if (input.seoKeywords !== undefined) updates.seoKeywords = input.seoKeywords;
    if (input.seoDescription !== undefined) updates.seoDescription = input.seoDescription;

    db.update(blogs).set(updates).where(eq(blogs.id, id)).run();

    const updated = db.select().from(blogs).where(eq(blogs.id, id)).get();
    return this.formatBlog(updated!);
  }

  async delete(id: string) {
    const existing = db.select().from(blogs).where(eq(blogs.id, id)).get();

    if (!existing) {
      throw new NotFoundError(`Blog with id ${id} not found`);
    }

    db.update(blogs)
      .set({ status: 'archived', updatedAt: new Date() })
      .where(eq(blogs.id, id))
      .run();
  }

  async incrementView(slug: string) {
    const blog = db.select().from(blogs).where(eq(blogs.slug, slug)).get();

    if (!blog) {
      return;
    }

    db.update(blogs)
      .set({ views: (blog.views || 0) + 1 })
      .where(eq(blogs.id, blog.id))
      .run();
  }

  private formatBlog(blog: any) {
    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      status: blog.status,
      author: blog.author,
      featuredImage: blog.featuredImage,
      tags: blog.tags ? JSON.parse(blog.tags) : [],
      seoKeywords: blog.seoKeywords,
      seoDescription: blog.seoDescription,
      views: blog.views || 0,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  }
}

export const blogService = new BlogService();
