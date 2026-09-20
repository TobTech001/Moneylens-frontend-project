import { MOCK_TRANSACTIONS } from './TransactionData';
import { getBudgets } from './BudgetData';
import { MOCK_SUBSCRIPTIONS } from './SubscriptionData';
import { MOCK_RECORDS } from './BorrowLendData';
import type { UserSettings } from '../types/settings';

export const SETTINGS_STORAGE_KEY = 'moneylens-settings';

export const DEFAULT_SETTINGS: UserSettings = {
  language: 'English',
  timezone: 'Africa/Lagos (GMT+1)',
  dateFormat: 'DD/MM/YYYY',
  firstDayOfWeek: 'Monday',
  defaultDashboardPeriod: 'This Month',
  theme: 'dark',
  accentColor: 'emerald',
  compactMode: false,
  reduceMotion: false,
  notifications: {
    newTransaction: true,
    largeTransaction: true,
    budgetWarning: true,
    budgetExceeded: true,
    upcomingSubscription: true,
    subscriptionPayment: false,
    paymentReminder: true,
    overduePayment: true,
    weeklyInsights: true,
    monthlyInsights: true,
    inApp: true,
    email: false,
  },
  privacy: {
    showInsights: true,
    usageAnalytics: true,
  },
  financialPreferences: {
    currency: 'NGN — Nigerian Naira (₦)',
    incomeRange: '₦250,000 – ₦500,000',
    financialGoal: 'Save More',
    monthlySavingsTarget: 50000,
    spendingAlertThreshold: 50000,
  },
};

/** Reads settings from localStorage, falling back to defaults for missing
 * keys or invalid/corrupted stored data — never throws to the caller. */
export function getSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    // Shallow-merge over defaults so a partially-saved or older shape doesn't crash the page.
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      notifications: { ...DEFAULT_SETTINGS.notifications, ...parsed.notifications },
      privacy: { ...DEFAULT_SETTINGS.privacy, ...parsed.privacy },
      financialPreferences: { ...DEFAULT_SETTINGS.financialPreferences, ...parsed.financialPreferences },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

export function resetSettings(): UserSettings {
  saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

const MONEYLENS_STORAGE_KEYS = [
  'moneylens-settings',
  'moneylens-user',
  'moneylens-transactions',
  'moneylens-budgets',
  'moneylens-subscriptions',
  'moneylens-borrow-lend',
  'moneylens_demo_user',
  'moneylens_token',
];

export function clearLocalData(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    MONEYLENS_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    return true;
  } catch {
    return false;
  }
}

/** Computed from the same mock datasets the other pages use, not hardcoded. */
export function getStorageUsage() {
  return {
    transactions: MOCK_TRANSACTIONS.length,
    budgets: getBudgets('month').length,
    subscriptions: MOCK_SUBSCRIPTIONS.length,
    borrowLendRecords: MOCK_RECORDS.length,
  };
}

export const MOCK_CURRENT_SESSION = {
  device: 'Windows',
  browser: 'Chrome',
  location: 'Ibadan, Nigeria',
  status: 'Active now',
};