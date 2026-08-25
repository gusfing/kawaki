import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BlogService } from '../../src/api/blog/service.js';
import { NotFoundError } from '../../src/lib/errors.js';

describe('BlogService', () => {
  let blogService: BlogService;

  beforeEach(() => {
    blogService = new BlogService();
  });

  describe('create', () => {
    it('creates a blog with valid input', async () => {
      const blog = await blogService.create({
        title: 'Test Blog Post',
        content: '# Hello\n\nThis is markdown',
        author: 'Test Author',
      });

      expect(blog).toHaveProperty('id');
      expect(blog.title).toBe('Test Blog Post');
      expect(blog.slug).toBe('test-blog-post');
      expect(blog.status).toBe('draft');
      expect(blog.author).toBe('Test Author');
    });

    it('generates unique slug for duplicate titles', async () => {
      const blog1 = await blogService.create({
        title: 'Duplicate Title',
        content: 'Content 1',
        author: 'Author 1',
      });

      const blog2 = await blogService.create({
        title: 'Duplicate Title',
        content: 'Content 2',
        author: 'Author 2',
      });

      expect(blog1.slug).toBe('duplicate-title');
      expect(blog2.slug).toBe('duplicate-title-1');
    });

    it('allows custom slug', async () => {
      const blog = await blogService.create({
        title: 'My Post',
        slug: 'custom-slug',
        content: 'Content',
        author: 'Author',
      });

      expect(blog.slug).toBe('custom-slug');
    });

    it('parses tags as array', async () => {
      const blog = await blogService.create({
        title: 'Tagged Post',
        content: 'Content',
        author: 'Author',
        tags: ['tag1', 'tag2'],
      });

      expect(Array.isArray(blog.tags)).toBe(true);
      expect(blog.tags).toEqual(['tag1', 'tag2']);
    });

    it('sets default empty tags', async () => {
      const blog = await blogService.create({
        title: 'No Tags',
        content: 'Content',
        author: 'Author',
      });

      expect(blog.tags).toEqual([]);
    });
  });

  describe('getById', () => {
    it('retrieves blog by id', async () => {
      const created = await blogService.create({
        title: 'Retrievable',
        content: 'Content',
        author: 'Author',
      });

      const retrieved = await blogService.getById(created.id);

      expect(retrieved.id).toBe(created.id);
      expect(retrieved.title).toBe('Retrievable');
    });

    it('throws NotFoundError for invalid id', async () => {
      await expect(blogService.getById('nonexistent')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('getBySlug', () => {
    it('retrieves blog by slug', async () => {
      const created = await blogService.create({
        title: 'Slug Test',
        content: 'Content',
        author: 'Author',
      });

      const retrieved = await blogService.getBySlug(created.slug);

      expect(retrieved.slug).toBe('slug-test');
      expect(retrieved.title).toBe('Slug Test');
    });

    it('throws NotFoundError for invalid slug', async () => {
      await expect(blogService.getBySlug('nonexistent-slug')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('list', () => {
    beforeEach(async () => {
      await blogService.create({
        title: 'Published Post',
        content: 'Content',
        author: 'Author',
        status: 'published',
      });

      await blogService.create({
        title: 'Draft Post',
        content: 'Content',
        author: 'Author',
        status: 'draft',
      });
    });

    it('lists all blogs with pagination', async () => {
      const { data, pagination } = await blogService.list();

      expect(Array.isArray(data)).toBe(true);
      expect(pagination.page).toBe(1);
      expect(pagination.limit).toBe(20);
      expect(pagination.total).toBeGreaterThan(0);
    });

    it('filters by status', async () => {
      const { data } = await blogService.list({ status: 'published' });

      const allPublished = data.every((blog) => blog.status === 'published');
      expect(allPublished).toBe(true);
    });

    it('searches by title', async () => {
      const { data } = await blogService.list({ search: 'Published' });

      expect(data.length).toBeGreaterThan(0);
      expect(data.some((blog) => blog.title.includes('Published'))).toBe(true);
    });

    it('respects page and limit', async () => {
      const { pagination } = await blogService.list({
        page: 1,
        limit: 10,
      });

      expect(pagination.limit).toBe(10);
      expect(pagination.page).toBe(1);
    });
  });

  describe('update', () => {
    it('updates blog properties', async () => {
      const created = await blogService.create({
        title: 'Original',
        content: 'Original content',
        author: 'Author',
      });

      const updated = await blogService.update(created.id, {
        title: 'Updated Title',
        content: 'Updated content',
      });

      expect(updated.title).toBe('Updated Title');
      expect(updated.content).toBe('Updated content');
      expect(updated.id).toBe(created.id);
    });

    it('auto-generates new slug when title changes', async () => {
      const created = await blogService.create({
        title: 'Old Title',
        content: 'Content',
        author: 'Author',
      });

      const updated = await blogService.update(created.id, {
        title: 'New Title',
      });

      expect(updated.slug).toBe('new-title');
    });

    it('preserves unspecified fields', async () => {
      const created = await blogService.create({
        title: 'Original',
        content: 'Content',
        author: 'Original Author',
        excerpt: 'Original excerpt',
      });

      const updated = await blogService.update(created.id, {
        title: 'Updated',
      });

      expect(updated.author).toBe('Original Author');
      expect(updated.excerpt).toBe('Original excerpt');
    });

    it('throws NotFoundError for invalid id', async () => {
      await expect(
        blogService.update('nonexistent', { title: 'New Title' })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('soft-deletes blog (archives)', async () => {
      const created = await blogService.create({
        title: 'To Delete',
        content: 'Content',
        author: 'Author',
      });

      await blogService.delete(created.id);

      const deleted = await blogService.getById(created.id);
      expect(deleted.status).toBe('archived');
    });

    it('throws NotFoundError for invalid id', async () => {
      await expect(blogService.delete('nonexistent')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('incrementView', () => {
    it('increments view count', async () => {
      const created = await blogService.create({
        title: 'Viewable',
        content: 'Content',
        author: 'Author',
      });

      const initial = created.views;

      await blogService.incrementView(created.slug);
      const afterIncrement = await blogService.getBySlug(created.slug);

      expect(afterIncrement.views).toBe(initial + 1);
    });

    it('handles nonexistent slug gracefully', async () => {
      await expect(
        blogService.incrementView('nonexistent-slug')
      ).resolves.not.toThrow();
    });
  });
});
