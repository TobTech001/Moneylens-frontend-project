import { api } from './api';
import type { AdminStats, AdminCategory } from '../types/admin';
import type { User } from '../types/user';

export const adminService = {
  stats: () => api.get<AdminStats>('/admin/stats'),
  users: () => api.get<User[]>('/admin/users'),
  categories: () => api.get<AdminCategory[]>('/admin/categories'),
  createCategory: (payload: Omit<AdminCategory, 'id'>) => api.post<AdminCategory>('/admin/categories', payload),
};
