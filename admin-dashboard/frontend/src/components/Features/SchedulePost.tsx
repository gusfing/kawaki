import { useState } from 'react';
import { useApiMutation } from '../../hooks/useApi.js';
import { Clock, Calendar } from 'lucide-react';

interface SchedulePostProps {
  blogId: string;
  onScheduled?: () => void;
}

export function SchedulePost({ blogId, onScheduled }: SchedulePostProps) {
  const [showScheduler, setShowScheduler] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');

  const { mutate: schedule, loading, error } = useApiMutation<any, any>(
    `/scheduling/posts`,
    'POST'
  );

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      alert('Please select a date');
      return;
    }

    const scheduledFor = new Date(`${date}T${time}:00`);

    try {
      await schedule({
        blogId,
        scheduledFor: scheduledFor.toISOString(),
      });
      setShowScheduler(false);
      onScheduled?.();
    } catch (err) {
      console.error('Failed to schedule:', err);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowScheduler(!showScheduler)}
        className="btn-secondary flex items-center gap-2"
      >
        <Clock size={18} /> Schedule Post
      </button>

      {showScheduler && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-blue-900">Schedule Publication</h3>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-red-800 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSchedule} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-100 border border-blue-300 rounded p-3 text-sm text-blue-900 flex items-start gap-2">
              <Calendar size={16} className="mt-0.5 flex-shrink-0" />
              <span>
                Post will be automatically published on{' '}
                {date ? new Date(date).toLocaleDateString() : 'selected date'} at {time}
              </span>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowScheduler(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
