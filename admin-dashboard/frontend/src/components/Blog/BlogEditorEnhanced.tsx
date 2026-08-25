import { useState, useEffect } from 'react';
import { Blog } from '../../types/index.js';
import { useApiMutation } from '../../hooks/useApi.js';
import { useAutosave } from '../../hooks/useAutosave.js';
import { ImageUploader } from '../Common/ImageUploader.js';
import { MarkdownPreview } from '../Common/MarkdownPreview.js';
import { ChevronLeft, Eye, EyeOff, Save } from 'lucide-react';

interface BlogEditorEnhancedProps {
  blog?: Blog;
  onSave?: (blog: Blog) => void;
  onBack?: () => void;
}

export function BlogEditorEnhanced({ blog, onSave, onBack }: BlogEditorEnhancedProps) {
  const isNew = !blog;
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState(blog?.title || '');
  const [slug, setSlug] = useState(blog?.slug || '');
  const [content, setContent] = useState(blog?.content || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [status, setStatus] = useState(blog?.status || 'draft');
  const [author, setAuthor] = useState(blog?.author || '');
  const [tags, setTags] = useState(blog?.tags?.join(', ') || '');
  const [seoKeywords, setSeoKeywords] = useState(blog?.seoKeywords || '');
  const [seoDescription, setSeoDescription] = useState(blog?.seoDescription || '');

  const { mutate: save, loading, error } = useApiMutation<any, Blog>(
    blog ? `/blogs/${blog.id}` : '/blogs',
    blog ? 'PUT' : 'POST'
  );

  // Autosave draft
  const { lastSaved, isSaving } = useAutosave(
    {
      title,
      content,
      excerpt,
      status,
      author,
      tags,
      seoKeywords,
      seoDescription,
    },
    {
      key: `blog_${blog?.id || 'new'}`,
      interval: 30000, // Save every 30 seconds
    }
  );

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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isNew ? 'New Blog Post' : 'Edit Blog Post'}
          </h1>
        </div>

        {/* Autosave Status */}
        <div className="text-sm text-gray-600 flex items-center gap-2">
          {isSaving && <span>Saving...</span>}
          {lastSaved && !isSaving && (
            <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        )}

        {/* Metadata */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Metadata</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog post title"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated"
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary"
              className="input h-16"
            />
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Content *</h2>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              {showPreview ? (
                <>
                  <EyeOff size={18} /> Hide Preview
                </>
              ) : (
                <>
                  <Eye size={18} /> Show Preview
                </>
              )}
            </button>
          </div>

          {showPreview ? (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <MarkdownPreview content={content} />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post in markdown..."
              className="input h-96 font-mono"
              required
            />
          )}
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Images</h2>
          <ImageUploader
            blogId={blog?.id}
            onImageUpload={(image) => {
              const markdown = `![alt](${image.url})`;
              setContent((prev) => `${prev}\n\n${markdown}`);
            }}
          />
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">SEO Settings</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords
            </label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="keyword1, keyword2"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Page description for search engines"
              className="input h-20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onBack} className="btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? 'Saving...' : isNew ? 'Create Blog' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
