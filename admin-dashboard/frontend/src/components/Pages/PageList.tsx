import { useState } from 'react';
import { useApi } from '../../hooks/useApi.js';
import { Page } from '../../types/index.js';
import { Trash2, Edit2, Plus, Search, FileText, Globe, ExternalLink, Calendar } from 'lucide-react';

interface PageListProps {
  onEdit?: (page: Page) => void;
  onNew?: () => void;
}

export function PageList({ onEdit, onNew }: PageListProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useApi<any>(
    `/pages?search=${search}&page=${page}`
  );

  const pages: Page[] = Array.isArray(data) ? data : (data?.data || []);
  const pagination = data?.pagination;

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const res = await fetch(`/api/pages/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_key')}`
          }
        });
        if (res.ok) {
          refetch();
        }
      } catch (err) {
        alert('Failed to delete page');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Static Website Pages
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Manage landing pages, case studies, service offerings, and legal templates.
          </p>
        </div>
        <button onClick={onNew} className="btn-primary">
          <Plus size={16} /> Create New Page
        </button>
      </div>

      {/* Search Bar */}
      <div className="card bg-[#13131A] border border-white/10 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pages by title, slug, or content..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input pl-10 pr-4"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
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
          Loading static pages...
        </div>
      )}

      <div className="space-y-4">
        {pages.map((p) => (
          <div
            key={p.id}
            className="card group hover:border-[#FC4625]/40 hover:bg-[#181822] transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FC4625]/10 group-hover:border-[#FC4625]/30 transition-all">
                <FileText size={20} className="text-zinc-400 group-hover:text-[#FC4625] transition-colors" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-[#FC4625] transition-colors">
                    {p.title}
                  </h3>
                  <span
                    className={`badge ${
                      p.published
                        ? 'badge-published'
                        : 'badge-draft'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <span className="text-[#FC4625]">/</span>
                  {p.slug}
                </p>

                {p.seoDescription && (
                  <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl pt-1">
                    {p.seoDescription}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:self-center self-end flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
              <button
                onClick={() => onEdit?.(p)}
                className="btn-secondary text-xs py-2 px-3 hover:text-white"
                title="Edit Page"
              >
                <Edit2 size={14} className="text-zinc-400" /> Edit
              </button>
              <button
                onClick={() => handleDelete(p.id, p.title)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 transition-colors"
                title="Delete Page"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {pages.length === 0 && !loading && (
        <div className="card py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
            <FileText size={24} />
          </div>
          <h4 className="text-base font-bold text-white font-display">No static pages found</h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            You haven't created any custom static pages yet. Create one to publish custom landing or policy pages.
          </p>
          <button onClick={onNew} className="btn-primary text-xs mt-2">
            <Plus size={14} /> Create First Page
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
