import { useState } from 'react';
import { Blog } from '../../types/index.js';
import { useApiMutation } from '../../hooks/useApi.js';
import { ArrowLeft, Save, Sparkles, Eye, Code, Globe, Tag, User, Layers, Check } from 'lucide-react';

interface BlogEditorProps {
  blog?: Blog;
  onSave?: (blog: Blog) => void;
  onBack?: () => void;
}

export function BlogEditor({ blog, onSave, onBack }: BlogEditorProps) {
  const isNew = !blog;
  const [title, setTitle] = useState(blog?.title || '');
  const [slug, setSlug] = useState(blog?.slug || '');
  const [content, setContent] = useState(blog?.content || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [status, setStatus] = useState(blog?.status || 'draft');
  const [author, setAuthor] = useState(blog?.author || 'Kunal Sharma');
  const [tags, setTags] = useState(blog?.tags?.join(', ') || '');
  const [seoKeywords, setSeoKeywords] = useState(blog?.seoKeywords || '');
  const [seoDescription, setSeoDescription] = useState(blog?.seoDescription || '');
  const [viewMode, setViewMode] = useState<'write' | 'preview'>('write');

  const { mutate: save, loading, error } = useApiMutation<any, Blog>(
    blog ? `/blogs/${blog.id}` : '/blogs',
    blog ? 'PUT' : 'POST'
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
      excerpt: excerpt || undefined,
      status,
      author,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      seoKeywords: seoKeywords || undefined,
      seoDescription: seoDescription || undefined,
    };

    try {
      const result = await save(payload);
      if (result) {
        onSave?.(result);
      }
    } catch (err) {
      console.error('Failed to save blog:', err);
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
            title="Back to Articles"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              {isNew ? 'Compose Story' : 'Edit Story'}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              {slug ? `/blog/${slug}` : 'Draft publication'}
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
            {loading ? 'Saving...' : isNew ? 'Publish Article' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Title & Slug Box */}
        <div className="card space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Architecture of Modern Headless Commerce"
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
                placeholder="the-architecture-of-modern-headless-commerce"
                className="input font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
                className="input font-medium"
              >
                <option value="draft" className="bg-[#13131A] text-yellow-400">Draft</option>
                <option value="published" className="bg-[#13131A] text-emerald-400">Published</option>
                <option value="archived" className="bg-[#13131A] text-zinc-400">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Markdown Content Editor */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Story Content (Markdown) *
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
              placeholder="Write your editorial markdown here... Supports # Headers, **Bold**, `code`, lists, and images."
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
                <p className="text-zinc-500 italic">No content written yet...</p>
              )}
            </div>
          )}
        </div>

        {/* Excerpt, Author, and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <User size={16} className="text-[#FC4625]" /> Editorial Metadata
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Author Name *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="engineering, architecture, nextjs"
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Brief Excerpt / Summary
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short 2-line teaser for search and cards..."
                className="input min-h-[80px] text-xs"
              />
            </div>
          </div>

          {/* SEO & Search Simulation */}
          <div className="card space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <Globe size={16} className="text-blue-400" /> Search Engine Preview
            </h3>

            {/* Google Search Card Preview */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-left">
              <p className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                https://kawakistudios.com <span className="text-zinc-600">› blog ›</span> {slug || 'untitled-post'}
              </p>
              <p className="text-blue-400 text-sm font-medium hover:underline line-clamp-1 cursor-pointer">
                {title || 'Article Title - Kawaki Studios'}
              </p>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-normal">
                {seoDescription || excerpt || 'Read this editorial engineering story by Kawaki Studios...'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Focus SEO Keywords
              </label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="shopify, headless, ux"
                className="input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Meta Description
              </label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Google search summary (recommended: 140-160 characters)"
                className="input min-h-[70px] text-xs"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
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
            {loading ? 'Saving...' : isNew ? 'Publish Article' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
