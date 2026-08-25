import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '../lib/api-client.js';

export function useAuth() {
  const [apiKey, setApiKeyState] = useState<string | null>(() => {
    return localStorage.getItem('api_key');
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!apiKey);

  const setApiKey = useCallback((key: string) => {
    apiClient.setApiKey(key);
    setApiKeyState(key);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    apiClient.clearApiKey();
    setApiKeyState(null);
    setIsAuthenticated(false);
    localStorage.removeItem('api_key');
  }, []);

  useEffect(() => {
    const storedKey = localStorage.getItem('api_key');
    if (storedKey) {
      apiClient.setApiKey(storedKey);
    }
  }, []);

  return {
    apiKey,
    setApiKey,
    logout,
    isAuthenticated,
  };
}
