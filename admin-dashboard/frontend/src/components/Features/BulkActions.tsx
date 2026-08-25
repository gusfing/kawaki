import { useState } from 'react';
import { useApiMutation } from '../../hooks/useApi.js';
import { Zap, Trash2, Edit, Users } from 'lucide-react';

interface BulkActionsProps {
  selectedIds: string[];
  contentType: 'blog' | 'page';
  onAction?: () => void;
}

export function BulkActions({ selectedIds, contentType, onAction }: BulkActionsProps) {
  const [showActions, setShowActions] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'delete' | 'status' | 'author' | null>(
    null
  );
  const [statusValue, setStatusValue] = useState('published');
  const [authorValue, setAuthorValue] = useState('');

  const { mutate: execute, loading } = useApiMutation<any, any>('/bulk/execute', 'POST');

  if (selectedIds.length === 0) {
    return null;
  }

  const handleExecute = async () => {
    let payload: Record<string, unknown> = {
      contentType,
      ids: selectedIds,
      action: selectedAction,
    };

    if (selectedAction === 'status') {
      payload.status = statusValue;
    } else if (selectedAction === 'author') {
      payload.author = authorValue;
    }

    try {
      await execute(payload);
      setShowActions(false);
      setSelectedAction(null);
      onAction?.();
    } catch (err) {
      console.error('Bulk action failed:', err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 space-y-3">
      {selectedIds.length > 0 && (
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-3">
          <Zap size={20} />
          <span className="font-medium">{selectedIds.length} selected</span>
        </div>
      )}

      {showActions && selectedAction && selectedAction === 'status' && (
        <div className="bg-white rounded-lg shadow-lg p-4 space-y-3 w-80">
          <h3 className="font-semibold text-gray-900">Change Status</h3>
          <select value={statusValue} onChange={(e) => setStatusValue(e.target.value)} className="input">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedAction(null)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleExecute} disabled={loading} className="flex-1 btn-primary">
              {loading ? 'Applying...' : 'Apply'}
            </button>
          </div>
        </div>
      )}

      {showActions && selectedAction && selectedAction === 'author' && (
        <div className="bg-white rounded-lg shadow-lg p-4 space-y-3 w-80">
          <h3 className="font-semibold text-gray-900">Change Author</h3>
          <input
            type="text"
            value={authorValue}
            onChange={(e) => setAuthorValue(e.target.value)}
            placeholder="New author name"
            className="input"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedAction(null)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleExecute} disabled={loading} className="flex-1 btn-primary">
              {loading ? 'Applying...' : 'Apply'}
            </button>
          </div>
        </div>
      )}

      {!showActions && (
        <button
          onClick={() => setShowActions(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg p-4 flex items-center gap-2 transition"
        >
          <Zap size={20} /> Bulk Actions
        </button>
      )}

      {showActions && !selectedAction && (
        <div className="bg-white rounded-lg shadow-lg p-4 space-y-2">
          <button
            onClick={() => setSelectedAction('status')}
            className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded transition"
          >
            <Edit size={18} className="text-blue-600" />
            <span className="text-gray-900">Change Status</span>
          </button>

          <button
            onClick={() => setSelectedAction('author')}
            className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded transition"
          >
            <Users size={18} className="text-green-600" />
            <span className="text-gray-900">Change Author</span>
          </button>

          <button
            onClick={async () => {
              await execute({
                contentType,
                ids: selectedIds,
                action: 'delete',
              });
            }}
            className="w-full flex items-center gap-2 p-3 hover:bg-red-50 rounded transition text-red-600"
          >
            <Trash2 size={18} />
            <span>Delete All</span>
          </button>

          <button
            onClick={() => setShowActions(false)}
            className="w-full p-2 text-gray-600 hover:bg-gray-50 rounded transition text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
