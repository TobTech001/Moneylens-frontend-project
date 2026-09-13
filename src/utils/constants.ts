export const APP_NAME = 'MoneyLens';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

export const TRANSACTION_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health',
  'Housing',
  'Income',
  'Other',
] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  ANALYTICS: '/analytics',
  BUDGET: '/budget',
  BORROW_LEND: '/borrow-lend',
  SUBSCRIPTIONS: '/subscriptions',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    TRANSACTIONS: '/admin/transactions',
    CATEGORIES: '/admin/categories',
    REPORTS: '/admin/reports',
    NOTIFICATIONS: '/admin/notifications',
    SETTINGS: '/admin/settings',
  },
} as const;
