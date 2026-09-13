export interface OverviewStat {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  helper?: string;
}

export interface CategorySpend {
  category: string;
  icon: string;
  amount: number;
  percent: number;
}

export type InsightType = 'alert' | 'opportunity' | 'budget';

export interface Insight {
  id: string;
  type: InsightType;
  icon: string;
  title: string;
  message: string;
  actionLabel?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  icon: string;
  spent: number;
  limit: number;
}

export interface SubscriptionPreviewItem {
  id: string;
  name: string;
  amount: number;
  renewsInDays: number;
}

export interface BorrowLendSummary {
  owedToYou: number;
  youOwe: number;
}

export interface SpendingTrendPoint {
  label: string;
  amount: number;
}

export type SpendingPeriod = 'weekly' | 'monthly' | 'yearly';

export interface DashboardTransaction {
  id: string;
  merchant: string;
  categoryIcon: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}