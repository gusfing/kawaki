import { randomUUID } from 'crypto';

export interface DraftRecovery {
  id: string;
  originalId: string;
  type: 'blog' | 'page';
  content: string;
  metadata: Record<string, unknown>;
  deletedAt: Date;
  expiresAt: Date;
}

export class RecoveryService {
  private recoveryBin: Map<string, DraftRecovery> = new Map();

  async saveDraft(
    originalId: string,
    type: 'blog' | 'page',
    content: string,
    metadata: Record<string, unknown>
  ): Promise<DraftRecovery> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const draft: DraftRecovery = {
      id: randomUUID(),
      originalId,
      type,
      content,
      metadata,
      deletedAt: now,
      expiresAt,
    };

    this.recoveryBin.set(draft.id, draft);
    return draft;
  }

  async recoverDraft(id: string): Promise<DraftRecovery | null> {
    const draft = this.recoveryBin.get(id);

    if (!draft) return null;

    if (draft.expiresAt <= new Date()) {
      this.recoveryBin.delete(id);
      return null;
    }

    return draft;
  }

  async listRecoverable(type?: 'blog' | 'page'): Promise<DraftRecovery[]> {
    const now = new Date();
    const recoverable = Array.from(this.recoveryBin.values()).filter(
      (d) => d.expiresAt > now && (!type || d.type === type)
    );

    return recoverable.sort((a, b) => b.deletedAt.getTime() - a.deletedAt.getTime());
  }

  async getRecoverableByOriginalId(originalId: string): Promise<DraftRecovery[]> {
    return this.listRecoverable().then((drafts) =>
      drafts.filter((d) => d.originalId === originalId)
    );
  }

  async permanentlyDelete(id: string): Promise<void> {
    this.recoveryBin.delete(id);
  }

  async cleanupExpired(): Promise<number> {
    const now = new Date();
    let deleted = 0;

    for (const [id, draft] of this.recoveryBin) {
      if (draft.expiresAt <= now) {
        this.recoveryBin.delete(id);
        deleted++;
      }
    }

    return deleted;
  }

  async getDraftStats() {
    const drafts = await this.listRecoverable();
    const now = new Date();

    return {
      total: drafts.length,
      blogs: drafts.filter((d) => d.type === 'blog').length,
      pages: drafts.filter((d) => d.type === 'page').length,
      expiringIn7Days: drafts.filter(
        (d) => d.expiresAt.getTime() - now.getTime() <= 7 * 24 * 60 * 60 * 1000
      ).length,
      oldest: drafts[drafts.length - 1]?.deletedAt || null,
    };
  }
}

export const recoveryService = new RecoveryService();
