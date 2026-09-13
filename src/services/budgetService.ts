import { api } from './api';
import type { Budget } from '../types/budget';

export const budgetService = {
  list: () => api.get<Budget[]>('/budgets'),
  create: (payload: Omit<Budget, 'id' | 'userId' | 'spent'>) => api.post<Budget>('/budgets', payload),
  update: (id: string, payload: Partial<Budget>) => api.put<Budget>(`/budgets/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/budgets/${id}`),
};
