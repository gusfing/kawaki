import { useEffect, useRef, useState } from 'react';

interface AutosaveOptions {
  key: string;
  interval?: number;
  onSave?: (data: unknown) => void;
}

export function useAutosave<T>(data: T, options: AutosaveOptions) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      setIsSaving(true);

      try {
        // Save to localStorage
        localStorage.setItem(`draft_${options.key}`, JSON.stringify(data));
        setLastSaved(new Date());

        // Call onSave callback if provided
        if (options.onSave) {
          await options.onSave(data);
        }
      } catch (error) {
        console.error('Autosave failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, options.interval || 30000); // Default 30 seconds

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, options]);

  const saveDraft = () => {
    localStorage.setItem(`draft_${options.key}`, JSON.stringify(data));
    setLastSaved(new Date());
  };

  const loadDraft = (): T | null => {
    const draft = localStorage.getItem(`draft_${options.key}`);
    return draft ? JSON.parse(draft) : null;
  };

  const clearDraft = () => {
    localStorage.removeItem(`draft_${options.key}`);
  };

  return {
    lastSaved,
    isSaving,
    saveDraft,
    loadDraft,
    clearDraft,
  };
}
