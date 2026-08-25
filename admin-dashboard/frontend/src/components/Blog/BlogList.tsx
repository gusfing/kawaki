import { useState } from 'react';
import { useApi, useApiMutation } from '../../hooks/useApi.js';
import { Blog } from '../../types/index.js';
import { Trash2, Edit2, Plus, Search, Eye, User, Calendar, BookOpen, Sparkles, ExternalLink } from 'lucide-react';

interface BlogListProps {
  onEdit?: (blog: Blog) => void;
  onNew?: () => void;
}

export function BlogList({ onEdit, onNew }: BlogListProps) {
  const [status, setStatus] = useState<string>('published');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useApi<any>(
    `/blogs?status=${status}&search=${search}&page=${page}`
  );

  const blogs: Blog[] = Array.isArray(data) ? data : (data?.data || []);
  const pagination = data?.pagination;

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const res = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_key')}`
          }
        });
        if (res.ok) {
          refetch();
        }
      } catch (err) {
        alert('Failed to delete blog');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & New Story Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Editorial Articles
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your blog publications, drafting pipelines, and editorial revisions.
          </p>
        </div>
        <button onClick={onNew} className="btn-primary">
          <Plus size={16} /> Compose New Story
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card bg-[#13131A] border border-white/10 p-4 space-y-4 sm:space-y-0 sm:flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search stories by title, slug, or content..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input pl-10 pr-4"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['published', 'draft', 'archived'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                status === s
                  ? 'bg-white/10 text-white border border-white/20 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="card py-16 text-center text-zinc-400 font-mono text-xs flex flex-col items-center justify-center gap-3">
          <span className="w-5 h-5 border-2 border-[#FC4625] border-t-transparent rounded-full animate-spin" />
          Synchronizing editorial archives...
        </div>
      )}

      {/* Article Cards Grid */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="card group hover:border-[#FC4625]/40 hover:bg-[#181822] transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FC4625]/10 group-hover:border-[#FC4625]/30 transition-all">
                <BookOpen size={20} className="text-zinc-400 group-hover:text-[#FC4625] transition-colors" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-[#FC4625] transition-colors">
                    {blog.title}
                  </h3>
                  <span
                    className={`badge ${
                      blog.status === 'published'
                        ? 'badge-published'
                        : blog.status === 'draft'
                          ? 'badge-draft'
                          : 'badge-archived'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {blog.status}
                  </span>
                </div>

                <p className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <span className="text-[#FC4625]">/blog/</span>
                  {blog.slug}
                </p>

                {blog.excerpt && (
                  <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl pt-1">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-zinc-400" />
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={13} className="text-zinc-400" />
                    {blog.views || 0} reads
                  </span>
                  {blog.createdAt && (
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Calendar size={13} className="text-zinc-400" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:self-center self-end flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
              <button
                onClick={() => onEdit?.(blog)}
                className="btn-secondary text-xs py-2 px-3 hover:text-white"
                title="Edit Article"
              >
                <Edit2 size={14} className="text-zinc-400" /> Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id, blog.title)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 transition-colors"
                title="Delete Article"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && !loading && (
        <div className="card py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
            <BookOpen size={24} />
          </div>
          <h4 className="text-base font-bold text-white font-display">No articles found</h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            There are no {status} stories matching your current filter. Create a new editorial piece to get started.
          </p>
          <button onClick={onNew} className="btn-primary text-xs mt-2">
            <Plus size={14} /> Create First Article
          </button>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total > pagination.limit && (
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-secondary text-xs disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-xs font-mono text-zinc-400">
            Page {page} of {Math.ceil(pagination.total / pagination.limit)}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(pagination.total / pagination.limit)}
            className="btn-secondary text-xs disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
