export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  featuredImage?: string;
  tags: string[];
  seoKeywords?: string;
  seoDescription?: string;
  views: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ApiKey {
  id: string;
  name: string;
  permissions: string[];
  lastUsed?: Date | string;
  active: boolean;
  createdAt: Date | string;
}

export interface ApiKeyResponse extends ApiKey {
  key: string;
}

export interface AnalyticsEvent {
  id: string;
  type: string;
  page?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date | string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  topPages: { page: string; views: number }[];
  trends: { date: string; views: number }[];
  period: string;
}
