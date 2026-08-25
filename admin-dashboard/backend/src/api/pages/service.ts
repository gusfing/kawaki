import { randomUUID } from 'crypto';
import { db } from '../../db/index.js';
import { pages } from '../../db/schema.js';
import { eq, desc, like } from 'drizzle-orm';
import { generateSlug, ensureUniqueSlug } from '../../lib/slug.js';
import { NotFoundError } from '../../lib/errors.js';
import type { CreatePageInput, UpdatePageInput } from '../../lib/validation.js';

export class PageService {
  async create(input: CreatePageInput) {
    const slug = input.slug ? input.slug : generateSlug(input.title);

    const existingSlugs = db
      .select({ slug: pages.slug })
      .from(pages)
      .all()
      .map((row) => row.slug);

    const uniqueSlug = ensureUniqueSlug(slug, existingSlugs);

    const page = {
      id: randomUUID(),
      title: input.title,
      slug: uniqueSlug,
      content: input.content,
      status: input.status || 'draft',
      seoTitle: input.seoTitle || null,
      seoDescription: input.seoDescription || null,
      seoKeywords: input.seoKeywords || null,
      published: input.published || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    db.insert(pages).values(page).run();

    return this.formatPage(page);
  }

  async getById(id: string) {
    const page = db.select().from(pages).where(eq(pages.id, id)).get();

    if (!page) {
      throw new NotFoundError(`Page with id ${id} not found`);
    }

    return this.formatPage(page);
  }

  async getBySlug(slug: string) {
    const page = db.select().from(pages).where(eq(pages.slug, slug)).get();

    if (!page) {
      throw new NotFoundError(`Page with slug ${slug} not found`);
    }

    return this.formatPage(page);
  }

  async list(options?: { page?: number; limit?: number; search?: string }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    let query = db.select().from(pages);

    if (options?.search) {
      const searchTerm = `%${options.search}%`;
      query = query.where(like(pages.title, searchTerm));
    }

    const total = db.select({ count: pages.id }).from(pages).all().length;

    const results = query
      .orderBy(desc(pages.createdAt))
      .limit(limit)
      .offset(offset)
      .all();

    return {
      data: results.map((p) => this.formatPage(p)),
      pagination: { page, limit, total },
    };
  }

  async update(id: string, input: UpdatePageInput) {
    const existing = db.select().from(pages).where(eq(pages.id, id)).get();

    if (!existing) {
      throw new NotFoundError(`Page with id ${id} not found`);
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (input.title) {
      updates.title = input.title;
      if (!input.slug) {
        const slug = generateSlug(input.title);
        const existingSlugs = db
          .select({ slug: pages.slug })
          .from(pages)
          .where(eq(pages.id, id))
          .all()
          .map((row) => row.slug);

        updates.slug = ensureUniqueSlug(slug, existingSlugs);
      }
    }

    if (input.slug) updates.slug = input.slug;
    if (input.content) updates.content = input.content;
    if (input.status) updates.status = input.status;
    if (input.seoTitle !== undefined) updates.seoTitle = input.seoTitle;
    if (input.seoDescription !== undefined) updates.seoDescription = input.seoDescription;
    if (input.seoKeywords !== undefined) updates.seoKeywords = input.seoKeywords;
    if (input.published !== undefined) updates.published = input.published;

    db.update(pages).set(updates).where(eq(pages.id, id)).run();

    const updated = db.select().from(pages).where(eq(pages.id, id)).get();
    return this.formatPage(updated!);
  }

  async delete(id: string) {
    const existing = db.select().from(pages).where(eq(pages.id, id)).get();

    if (!existing) {
      throw new NotFoundError(`Page with id ${id} not found`);
    }

    db.update(pages)
      .set({ status: 'archived', updatedAt: new Date() })
      .where(eq(pages.id, id))
      .run();
  }

  private formatPage(page: any) {
    return {
      id: page.id,
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      seoKeywords: page.seoKeywords,
      published: page.published,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    };
  }
}

export const pageService = new PageService();
