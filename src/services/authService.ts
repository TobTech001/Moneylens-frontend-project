import { api } from './api';
import type { User } from '../types/user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: (payload: LoginPayload) => api.post<AuthResponse>('/auth/login', payload, { auth: false }),
  register: (payload: RegisterPayload) => api.post<AuthResponse>('/auth/register', payload, { auth: false }),
  forgotPassword: (email: string) => api.post<{ message: string }>('/auth/forgot-password', { email }, { auth: false }),
  resetPassword: (token: string, password: string) =>
    api.post<{ message: string }>('/auth/reset-password', { token, password }, { auth: false }),
  me: () => api.get<User>('/auth/me'),
  logout: () => api.post<void>('/auth/logout'),
};
