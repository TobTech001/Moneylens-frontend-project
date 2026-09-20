export type Theme = 'dark' | 'light' | 'system';
export type AccentColor = 'emerald' | 'blue' | 'purple';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
export type FirstDayOfWeek = 'Monday' | 'Sunday';
export type DashboardPeriod = 'This Week' | 'This Month' | 'Last Month' | 'This Year';

export interface NotificationSettings {
  newTransaction: boolean;
  largeTransaction: boolean;
  budgetWarning: boolean;
  budgetExceeded: boolean;
  upcomingSubscription: boolean;
  subscriptionPayment: boolean;
  paymentReminder: boolean;
  overduePayment: boolean;
  weeklyInsights: boolean;
  monthlyInsights: boolean;
  inApp: boolean;
  email: boolean;
}

export interface PrivacySettings {
  showInsights: boolean;
  usageAnalytics: boolean;
}

export interface FinancialPreferencesSettings {
  currency: string;
  incomeRange: string;
  financialGoal: string;
  monthlySavingsTarget: number;
  spendingAlertThreshold: number;
}

export interface UserSettings {
  language: string;
  timezone: string;
  dateFormat: DateFormat;
  firstDayOfWeek: FirstDayOfWeek;
  defaultDashboardPeriod: DashboardPeriod;
  theme: Theme;
  accentColor: AccentColor;
  compactMode: boolean;
  reduceMotion: boolean;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  financialPreferences: FinancialPreferencesSettings;
}

export type SettingsSectionId =
  | 'general'
  | 'appearance'
  | 'notifications'
  | 'privacy'
  | 'security'
  | 'financial'
  | 'data'
  | 'account';

export interface SettingsSectionMeta {
  id: SettingsSectionId;
  label: string;
}

export const SETTINGS_SECTIONS: SettingsSectionMeta[] = [
  { id: 'general', label: 'General' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'security', label: 'Security' },
  { id: 'financial', label: 'Financial Preferences' },
  { id: 'data', label: 'Data & Storage' },
  { id: 'account', label: 'Account' },
];