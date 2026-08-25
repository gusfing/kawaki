import { randomUUID } from 'crypto';

export interface ScheduledPost {
  id: string;
  blogId: string;
  scheduledFor: Date;
  status: 'pending' | 'published' | 'failed';
  createdAt: Date;
}

export class SchedulingService {
  private scheduledPosts: Map<string, ScheduledPost> = new Map();

  async schedulePost(blogId: string, scheduledFor: Date): Promise<ScheduledPost> {
    if (scheduledFor <= new Date()) {
      throw new Error('Scheduled time must be in the future');
    }

    const post: ScheduledPost = {
      id: randomUUID(),
      blogId,
      scheduledFor,
      status: 'pending',
      createdAt: new Date(),
    };

    this.scheduledPosts.set(post.id, post);

    // Set timeout to publish
    this.schedulePublish(post);

    return post;
  }

  async getScheduled(blogId: string): Promise<ScheduledPost[]> {
    return Array.from(this.scheduledPosts.values()).filter(
      (p) => p.blogId === blogId && p.status === 'pending'
    );
  }

  async cancelSchedule(id: string): Promise<void> {
    const post = this.scheduledPosts.get(id);
    if (post) {
      this.scheduledPosts.delete(id);
    }
  }

  async publishScheduled(id: string): Promise<ScheduledPost> {
    const post = this.scheduledPosts.get(id);
    if (!post) throw new Error('Scheduled post not found');

    post.status = 'published';
    this.scheduledPosts.set(id, post);

    return post;
  }

  async getUpcoming(limit = 10): Promise<ScheduledPost[]> {
    return Array.from(this.scheduledPosts.values())
      .filter((p) => p.status === 'pending')
      .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())
      .slice(0, limit);
  }

  private schedulePublish(post: ScheduledPost) {
    const now = new Date().getTime();
    const delay = post.scheduledFor.getTime() - now;

    if (delay > 0) {
      setTimeout(async () => {
        // Trigger publish
        await this.publishScheduled(post.id);
        console.log(`Published scheduled post: ${post.blogId}`);
      }, delay);
    }
  }

  async getStats() {
    const posts = Array.from(this.scheduledPosts.values());
    return {
      pending: posts.filter((p) => p.status === 'pending').length,
      published: posts.filter((p) => p.status === 'published').length,
      failed: posts.filter((p) => p.status === 'failed').length,
      upcoming: this.getUpcoming(5),
    };
  }
}

export const schedulingService = new SchedulingService();
