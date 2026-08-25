import { useApi } from '../../hooks/useApi.js';
import { AlertCircle, RotateCcw, Trash2 } from 'lucide-react';

interface DraftRecoveryProps {
  contentType: 'blog' | 'page';
  onRecover?: (content: string) => void;
}

export function DraftRecovery({ contentType, onRecover }: DraftRecoveryProps) {
  const { data: drafts, loading } = useApi<any[]>(`/recovery/drafts?type=${contentType}`);

  if (loading) {
    return <div className="text-gray-600">Loading recovery options...</div>;
  }

  if (!drafts || drafts.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900">Recovered Drafts</h3>
          <p className="text-sm text-yellow-800 mt-1">
            {drafts.length} unsaved draft{drafts.length !== 1 ? 's' : ''} available for recovery
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {drafts.map((draft, index) => (
          <div
            key={index}
            className="bg-white rounded p-3 border border-yellow-100 flex items-center justify-between"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {draft.metadata?.title || `Draft ${index + 1}`}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(draft.deletedAt).toLocaleDateString()}{' '}
                {new Date(draft.deletedAt).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onRecover?.(draft.content)}
                className="p-2 rounded hover:bg-blue-50 text-blue-600 transition"
                title="Restore draft"
              >
                <RotateCcw size={16} />
              </button>
              <button
                className="p-2 rounded hover:bg-red-50 text-red-600 transition"
                title="Delete permanently"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
