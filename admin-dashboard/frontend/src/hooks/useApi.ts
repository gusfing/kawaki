import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api-client.js';
import { ApiResponse } from '../types/index.js';

interface UseApiOptions {
  skip?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}

export function useApi<T>(endpoint: string, options?: UseApiOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<T>(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch data');
      }

      setData(response.data || null);
      options?.onSuccess?.(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      options?.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  useEffect(() => {
    if (!options?.skip) {
      fetchData();
    }
  }, [fetchData, options?.skip]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export function useApiMutation<TInput, TOutput>(endpoint: string, method: 'POST' | 'PUT' = 'POST') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TOutput | null>(null);

  const mutate = useCallback(
    async (input: TInput) => {
      setLoading(true);
      setError(null);

      try {
        const response =
          method === 'POST'
            ? await apiClient.post<TOutput>(endpoint, input)
            : await apiClient.put<TOutput>(endpoint, input);

        if (!response.success) {
          throw new Error(response.error || 'Failed to complete operation');
        }

        setData(response.data || null);
        return response.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  return {
    mutate,
    loading,
    error,
    data,
  };
}
