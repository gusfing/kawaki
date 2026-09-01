import { useState } from 'react';
import { useApiMutation } from '../../hooks/useApi.js';
import { Download, FileText, CheckCircle2, Layers, Archive } from 'lucide-react';

interface ExportContentProps {
  ids?: string[];
  contentType: 'blog' | 'page';
  exportAll?: boolean;
}

export function ExportContent({ ids, contentType, exportAll }: ExportContentProps) {
  const [format, setFormat] = useState<'markdown' | 'json' | 'html'>('markdown');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const { mutate: exportContent } = useApiMutation<any, Blob>('/export/content', 'POST');

  const handleExport = async () => {
    setIsExporting(true);
    setExportedSuccess(false);
    try {
      const payload = {
        contentType,
        format,
        ...(exportAll ? { exportAll: true } : { ids }),
      };

      const blob = await exportContent(payload);
      if (!blob) throw new Error('No content returned for export');

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${contentType}-export-${timestamp}.${format === 'markdown' ? 'zip' : format}`;

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      setExportedSuccess(true);
      setTimeout(() => setExportedSuccess(false), 4000);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="card space-y-5">
      <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Archive size={16} />
        </div>
        <div>
          <h3 className="font-bold text-white font-display text-base">Bulk Content Exporter</h3>
          <p className="text-xs text-zinc-400">Export stories and static landing pages for offline backups</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(['markdown', 'json', 'html'] as const).map((fmt) => (
              <button
                type="button"
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  format === fmt
                    ? 'bg-[#FC4625]/15 border-[#FC4625] text-white shadow-lg shadow-[#FC4625]/20 font-semibold'
                    : 'bg-white/[0.03] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <div className="text-xs font-bold uppercase">{fmt}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                  {fmt === 'markdown' ? '.zip bundle' : fmt === 'json' ? '.json data' : '.html files'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-400 flex items-start gap-2.5 leading-relaxed">
          <FileText size={16} className="text-[#FC4625] flex-shrink-0 mt-0.5" />
          <span>
            {format === 'markdown' && 'Generates a clean compressed ZIP archive containing individual Markdown files with full frontmatter.'}
            {format === 'json' && 'Generates structured JSON schema with complete timestamps, views, author metadata, and SEO tags.'}
            {format === 'html' && 'Generates standalone rendered HTML files ready for static distribution and headless CDN deployment.'}
          </span>
        </div>

        {exportedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>Archive generated and download initiated successfully.</span>
          </div>
        )}

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="btn-primary w-full py-2.5 text-xs font-semibold disabled:opacity-50"
        >
          <Download size={15} />
          {isExporting ? 'Generating Archive...' : 'Download Export Bundle'}
        </button>
      </div>
    </div>
  );
}
