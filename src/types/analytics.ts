export type AnalyticsPeriod = 'week' | 'month' | 'lastMonth' | 'last3Months' | 'year';

export interface AnalyticsSummary {
  totalSpending: number;
  averageDailySpending: number;
  topCategory: string;
  topCategoryAmount: number;
  /** Percentage change vs the prior period. Positive = spending went up. */
  spendingChangePct: number;
}

export interface TrendPoint {
  label: string;
  spending: number;
  income: number;
}

export interface CategoryAnalytics {
  category: string;
  icon: string;
  amount: number;
  percentage: number;
  previousAmount: number;
  changePct: number;
}

export interface MerchantAnalytics {
  merchant: string;
  category: string;
  transactionCount: number;
  totalAmount: number;
}

export interface DailySpendingPoint {
  label: string;
  amount: number;
}

export interface MonthlyComparisonRow {
  category: string;
  thisMonth: number;
  lastMonth: number;
}

export type InsightType = 'alert' | 'info' | 'opportunity' | 'subscription';

export interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  actionLabel?: string;
  actionHref?: string;
}

export interface AnalyticsDataset {
  summary: AnalyticsSummary;
  trend: TrendPoint[];
  categories: CategoryAnalytics[];
  merchants: MerchantAnalytics[];
  dailySpending: DailySpendingPoint[];
}