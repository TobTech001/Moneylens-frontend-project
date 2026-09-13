import { api } from './api';

export interface SpendingByCategoryPoint {
  category: string;
  amount: number;
}

export interface TrendPoint {
  date: string;
  income: number;
  expense: number;
}

function toQuery(params: Record<string, string | undefined> = {}): string {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) qs.set(key, value);
  });
  const s = qs.toString();
  return s ? `?${s}` : '';
}

export const analyticsService = {
  spendingByCategory: (params?: { from?: string; to?: string }) =>
    api.get<SpendingByCategoryPoint[]>(`/analytics/spending-by-category${toQuery(params)}`),
  trend: () => api.get<TrendPoint[]>('/analytics/trend'),
};
