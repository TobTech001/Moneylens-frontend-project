import { api } from './api';
import type { Transaction } from '../types/transaction';

export interface TransactionFilters {
  category?: string;
  type?: 'income' | 'expense';
  from?: string;
  to?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function toQuery(filters: TransactionFilters = {}): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.set(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export const transactionService = {
  list: (filters?: TransactionFilters) => api.get<Transaction[]>(`/transactions${toQuery(filters)}`),
  get: (id: string) => api.get<Transaction>(`/transactions/${id}`),
  create: (payload: Omit<Transaction, 'id' | 'userId' | 'createdAt'>) =>
    api.post<Transaction>('/transactions', payload),
  update: (id: string, payload: Partial<Transaction>) => api.put<Transaction>(`/transactions/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/transactions/${id}`),
};
