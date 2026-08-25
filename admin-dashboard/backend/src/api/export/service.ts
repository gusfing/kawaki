import { randomUUID } from 'crypto';

export interface ContentExport {
  id: string;
  contentId: string;
  type: 'blog' | 'page';
  format: 'markdown' | 'json' | 'html';
  exportedAt: Date;
  url: string;
  expiresAt: Date;
}

export class ExportService {
  private exports: Map<string, ContentExport> = new Map();

  async exportContent(
    contentId: string,
    type: 'blog' | 'page',
    content: Record<string, unknown>,
    format: 'markdown' | 'json' | 'html'
  ): Promise<ContentExport> {
    const id = randomUUID();
    const filename = `${contentId}-${Date.now()}.${this.getFileExtension(format)}`;
    const url = `/exports/${filename}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const exportRecord: ContentExport = {
      id,
      contentId,
      type,
      format,
      exportedAt: new Date(),
      url,
      expiresAt,
    };

    this.exports.set(id, exportRecord);

    // Generate export data
    const data = this.formatExport(content, format);
    // In production, save to file storage
    console.log(`Exported ${contentId} as ${format} to ${url}`);

    return exportRecord;
  }

  async getExport(id: string): Promise<ContentExport | null> {
    const exp = this.exports.get(id);

    if (!exp) return null;

    if (exp.expiresAt <= new Date()) {
      this.exports.delete(id);
      return null;
    }

    return exp;
  }

  async listExports(contentId?: string): Promise<ContentExport[]> {
    const now = new Date();
    const exports = Array.from(this.exports.values()).filter((e) => e.expiresAt > now);

    if (contentId) {
      return exports.filter((e) => e.contentId === contentId);
    }

    return exports.sort((a, b) => b.exportedAt.getTime() - a.exportedAt.getTime());
  }

  async bulkExport(
    contentIds: string[],
    type: 'blog' | 'page',
    format: 'markdown' | 'json'
  ): Promise<{ id: string; exportUrl: string }[]> {
    // Generate zip file with all content
    const zipId = randomUUID();
    const zipUrl = `/exports/${zipId}-bulk.zip`;

    return contentIds.map((id, index) => ({
      id,
      exportUrl: `${zipUrl}#file-${index}`,
    }));
  }

  private formatExport(
    content: Record<string, unknown>,
    format: 'markdown' | 'json' | 'html'
  ): string {
    switch (format) {
      case 'markdown':
        return this.formatAsMarkdown(content);
      case 'json':
        return JSON.stringify(content, null, 2);
      case 'html':
        return this.formatAsHtml(content);
      default:
        return JSON.stringify(content);
    }
  }

  private formatAsMarkdown(content: Record<string, unknown>): string {
    let md = '';

    if (content.title) {
      md += `# ${content.title}\n\n`;
    }

    if (content.excerpt) {
      md += `> ${content.excerpt}\n\n`;
    }

    if (content.author) {
      md += `**Author:** ${content.author}\n`;
    }

    if (content.tags) {
      md += `**Tags:** ${(content.tags as string[]).join(', ')}\n\n`;
    }

    if (content.content) {
      md += `${content.content}\n`;
    }

    return md;
  }

  private formatAsHtml(content: Record<string, unknown>): string {
    return `<!DOCTYPE html>
<html>
<head>
  <title>${content.title || 'Exported Content'}</title>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .meta { color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <h1>${content.title || 'Untitled'}</h1>
  ${content.excerpt ? `<p class="excerpt">${content.excerpt}</p>` : ''}
  <div class="meta">
    ${content.author ? `<p><strong>Author:</strong> ${content.author}</p>` : ''}
    ${content.tags ? `<p><strong>Tags:</strong> ${(content.tags as string[]).join(', ')}</p>` : ''}
  </div>
  <div class="content">
    ${content.content || ''}
  </div>
</body>
</html>`;
  }

  private getFileExtension(format: string): string {
    const extensions: Record<string, string> = {
      markdown: 'md',
      json: 'json',
      html: 'html',
    };
    return extensions[format] || 'txt';
  }

  async getExportStats() {
    const exports = await this.listExports();

    return {
      total: exports.length,
      byFormat: {
        markdown: exports.filter((e) => e.format === 'markdown').length,
        json: exports.filter((e) => e.format === 'json').length,
        html: exports.filter((e) => e.format === 'html').length,
      },
      recentExports: exports.slice(0, 5),
    };
  }
}

export const exportService = new ExportService();
