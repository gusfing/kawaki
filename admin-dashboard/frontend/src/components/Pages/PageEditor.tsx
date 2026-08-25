import { useState } from 'react';
import { Page } from '../../types/index.js';
import { useApiMutation } from '../../hooks/useApi.js';
import { ArrowLeft, Save, Code, Eye, Globe } from 'lucide-react';

interface PageEditorProps {
  page?: Page;
  onSave?: (page: Page) => void;
  onBack?: () => void;
}

export function PageEditor({ page, onSave, onBack }: PageEditorProps) {
  const isNew = !page;
  const [title, setTitle] = useState(page?.title || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [content, setContent] = useState(page?.content || '');
  const [published, setPublished] = useState(page?.published || false);
  const [seoTitle, setSeoTitle] = useState(page?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(page?.seoDescription || '');
  const [seoKeywords, setSeoKeywords] = useState(page?.seoKeywords || '');
  const [viewMode, setViewMode] = useState<'write' | 'preview'>('write');

  const { mutate: save, loading, error } = useApiMutation<any, Page>(
    page ? `/pages/${page.id}` : '/pages',
    page ? 'PUT' : 'POST'
  );

  const generateSlug = () => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      slug: slug || undefined,
      content,
      published,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      seoKeywords: seoKeywords || undefined,
    };

    try {
      const result = await save(payload);
      if (result) {
        onSave?.(result);
      }
    } catch (err) {
      console.error('Failed to save page:', err);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition"
            title="Back to Pages"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              {isNew ? 'Create Page' : 'Edit Page'}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              {slug ? `/${slug}` : 'Static page draft'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button type="button" onClick={onBack} className="btn-secondary text-xs">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary text-xs"
          >
            <Save size={14} />
            {loading ? 'Saving...' : isNew ? 'Publish Page' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Page Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Terms of Service or Studio Philosophy"
              className="input text-base sm:text-lg font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-[11px] text-[#FC4625] hover:underline font-mono"
                >
                  Generate from title
                </button>
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="terms-of-service"
                className="input font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Publish Status
              </label>
              <select
                value={published ? 'true' : 'false'}
                onChange={(e) => setPublished(e.target.value === 'true')}
                className="input font-medium"
              >
                <option value="false" className="bg-[#13131A] text-yellow-400">Draft</option>
                <option value="true" className="bg-[#13131A] text-emerald-400">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Markdown Content Editor */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Page Body Content (Markdown) *
            </label>
            <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('write')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  viewMode === 'write' ? 'bg-[#FC4625] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code size={13} className="inline mr-1" /> Editor
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  viewMode === 'preview' ? 'bg-[#FC4625] text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye size={13} className="inline mr-1" /> Preview
              </button>
            </div>
          </div>

          {viewMode === 'write' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write page content in markdown format..."
              className="input font-mono text-sm min-h-[350px] leading-relaxed p-4"
              required
            />
          ) : (
            <div className="min-h-[350px] p-6 rounded-xl bg-black/30 border border-white/5 prose prose-invert max-w-none text-zinc-300">
              {content ? (
                <div className="space-y-4 whitespace-pre-wrap leading-relaxed">
                  {content}
                </div>
              ) : (
                <p className="text-zinc-500 italic">No page content written yet...</p>
              )}
            </div>
          )}
        </div>

        {/* SEO Settings */}
        <div className="card space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
            <Globe size={16} className="text-blue-400" /> Search Engine Optimization
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Custom title tag for Google"
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                SEO Keywords
              </label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="studio, policy, terms"
                className="input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
              Meta Description
            </label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Page description displayed in search engine results"
              className="input min-h-[70px] text-xs"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <button type="button" onClick={onBack} className="btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            <Save size={16} />
            {loading ? 'Saving...' : isNew ? 'Publish Page' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
