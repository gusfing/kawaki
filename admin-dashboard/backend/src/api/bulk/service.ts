import { randomUUID } from 'crypto';
import { blogService } from '../blog/service.js';
import { pageService } from '../pages/service.js';

export interface BulkOperation {
  id: string;
  type: 'delete' | 'update_status' | 'update_author';
  targetIds: string[];
  action: Record<string, unknown>;
  status: 'pending' | 'completed' | 'failed';
  results: Record<string, { success: boolean; message?: string }>;
  createdAt: Date;
}

export class BulkService {
  private operations: Map<string, BulkOperation> = new Map();

  async deleteMultiple(ids: string[], contentType: 'blog' | 'page'): Promise<BulkOperation> {
    const op: BulkOperation = {
      id: randomUUID(),
      type: 'delete',
      targetIds: ids,
      action: { contentType },
      status: 'pending',
      results: {},
      createdAt: new Date(),
    };

    this.operations.set(op.id, op);

    // Execute deletion
    await this.executeDelete(op, contentType);

    op.status = 'completed';
    this.operations.set(op.id, op);

    return op;
  }

  async updateStatusMultiple(
    ids: string[],
    status: 'draft' | 'published' | 'archived',
    contentType: 'blog' | 'page'
  ): Promise<BulkOperation> {
    const op: BulkOperation = {
      id: randomUUID(),
      type: 'update_status',
      targetIds: ids,
      action: { status, contentType },
      status: 'pending',
      results: {},
      createdAt: new Date(),
    };

    this.operations.set(op.id, op);

    // Execute update
    await this.executeStatusUpdate(op, contentType, status);

    op.status = 'completed';
    this.operations.set(op.id, op);

    return op;
  }

  async updateAuthorMultiple(
    ids: string[],
    author: string,
    contentType: 'blog' | 'page'
  ): Promise<BulkOperation> {
    const op: BulkOperation = {
      id: randomUUID(),
      type: 'update_author',
      targetIds: ids,
      action: { author, contentType },
      status: 'pending',
      results: {},
      createdAt: new Date(),
    };

    this.operations.set(op.id, op);

    // Execute update
    await this.executeAuthorUpdate(op, contentType, author);

    op.status = 'completed';
    this.operations.set(op.id, op);

    return op;
  }

  async getOperation(id: string): Promise<BulkOperation | null> {
    return this.operations.get(id) || null;
  }

  async listOperations(limit = 20): Promise<BulkOperation[]> {
    return Array.from(this.operations.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  private async executeDelete(op: BulkOperation, contentType: 'blog' | 'page') {
    const service = contentType === 'blog' ? blogService : pageService;

    for (const id of op.targetIds) {
      try {
        await service.delete(id);
        op.results[id] = { success: true };
      } catch (error) {
        op.results[id] = {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }
  }

  private async executeStatusUpdate(
    op: BulkOperation,
    contentType: 'blog' | 'page',
    status: string
  ) {
    const service = contentType === 'blog' ? blogService : pageService;

    for (const id of op.targetIds) {
      try {
        await service.update(id, { status });
        op.results[id] = { success: true };
      } catch (error) {
        op.results[id] = {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }
  }

  private async executeAuthorUpdate(
    op: BulkOperation,
    contentType: 'blog' | 'page',
    author: string
  ) {
    const service = contentType === 'blog' ? blogService : pageService;

    for (const id of op.targetIds) {
      try {
        await service.update(id, { author });
        op.results[id] = { success: true };
      } catch (error) {
        op.results[id] = {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }
  }

  async getStats() {
    const operations = await this.listOperations(100);

    return {
      total: this.operations.size,
      completed: operations.filter((o) => o.status === 'completed').length,
      pending: operations.filter((o) => o.status === 'pending').length,
      failed: operations.filter((o) => o.status === 'failed').length,
      byType: {
        delete: operations.filter((o) => o.type === 'delete').length,
        updateStatus: operations.filter((o) => o.type === 'update_status').length,
        updateAuthor: operations.filter((o) => o.type === 'update_author').length,
      },
    };
  }
}

export const bulkService = new BulkService();
