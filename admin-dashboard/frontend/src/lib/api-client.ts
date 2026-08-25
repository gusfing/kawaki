import { ApiResponse } from '../types/index.js';

export class ApiClient {
  private baseUrl: string;
  private apiKey: string | null = null;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
    this.apiKey = localStorage.getItem('api_key');
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('api_key', key);
  }

  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('api_key');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<{ response: ApiResponse<T>; status: number }> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: { ...this.getHeaders(), ...(options?.headers as HeadersInit) },
    });

    const data = (await response.json()) as ApiResponse<T>;
    return { response: data, status: response.status };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const { response } = await this.fetch<T>(endpoint, { method: 'GET' });
    return response;
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const { response } = await this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const { response } = await this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const { response } = await this.fetch<T>(endpoint, { method: 'DELETE' });
    return response;
  }
}

export const apiClient = new ApiClient();
