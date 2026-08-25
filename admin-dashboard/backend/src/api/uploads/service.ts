import { randomUUID } from 'crypto';
import { createHash } from 'crypto';
import { db } from '../../db/index.js';

export interface UploadedImage {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: Date;
  blogId?: string;
  pageId?: string;
}

export class UploadService {
  private uploads: Map<string, UploadedImage> = new Map();

  async uploadImage(
    filename: string,
    mimeType: string,
    buffer: Buffer,
    metadata?: { blogId?: string; pageId?: string }
  ): Promise<UploadedImage> {
    if (!this.isSupportedMimeType(mimeType)) {
      throw new Error(`Unsupported image type: ${mimeType}`);
    }

    if (buffer.length > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    const id = randomUUID();
    const hash = createHash('sha256').update(buffer).digest('hex');
    const storedFilename = `${hash}-${filename}`;
    const url = `/uploads/${storedFilename}`;

    const image: UploadedImage = {
      id,
      filename: storedFilename,
      mimeType,
      size: buffer.length,
      url,
      uploadedAt: new Date(),
      blogId: metadata?.blogId,
      pageId: metadata?.pageId,
    };

    this.uploads.set(id, image);

    return image;
  }

  async getImage(id: string): Promise<UploadedImage | null> {
    return this.uploads.get(id) || null;
  }

  async listImages(filter?: { blogId?: string; pageId?: string }): Promise<UploadedImage[]> {
    const images = Array.from(this.uploads.values());

    if (filter?.blogId) {
      return images.filter((img) => img.blogId === filter.blogId);
    }

    if (filter?.pageId) {
      return images.filter((img) => img.pageId === filter.pageId);
    }

    return images;
  }

  async deleteImage(id: string): Promise<void> {
    this.uploads.delete(id);
  }

  async getImagesByBlog(blogId: string): Promise<UploadedImage[]> {
    return this.listImages({ blogId });
  }

  private isSupportedMimeType(mimeType: string): boolean {
    const supported = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    return supported.includes(mimeType);
  }
}

export const uploadService = new UploadService();
