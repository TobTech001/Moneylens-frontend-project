import type { AnalyticsDataset, AnalyticsPeriod, MonthlyComparisonRow } from '../types/analytics';

export const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  week: 'This Week',
  month: 'This Month',
  lastMonth: 'Last Month',
  last3Months: 'Last 3 Months',
  year: 'This Year',
};

export const CATEGORY_ICONS: Record<string, string> = {
  Food: '🍔',
  Transport: '🚗',
  'Data & Airtime': '📱',
  Bills: '💡',
  Subscriptions: '📺',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Education: '🎓',
  Other: '📦',
};

// This Month is the dataset every brief example is drawn from, so its
// figures are hand-set to match those examples exactly. Other periods are
// plausible, internally-consistent mock variations.
const ANALYTICS_DATASETS: Record<AnalyticsPeriod, AnalyticsDataset> = {
  week: {
    summary: {
      totalSpending: 76000,
      averageDailySpending: 10857,
      topCategory: 'Food',
      topCategoryAmount: 29640,
      spendingChangePct: 14,
    },
    trend: [
      { label: 'Mon', spending: 8500, income: 0 },
      { label: 'Tue', spending: 12000, income: 0 },
      { label: 'Wed', spending: 5500, income: 0 },
      { label: 'Thu', spending: 15000, income: 0 },
      { label: 'Fri', spending: 10000, income: 0 },
      { label: 'Sat', spending: 18000, income: 0 },
      { label: 'Sun', spending: 7000, income: 60000 },
    ],
    categories: [
      { category: 'Food', icon: '🍔', amount: 29640, percentage: 39, previousAmount: 25800, changePct: 14.9 },
      { category: 'Transport', icon: '🚗', amount: 15960, percentage: 21, previousAmount: 14200, changePct: 12.4 },
      { category: 'Data & Airtime', icon: '📱', amount: 9880, percentage: 13, previousAmount: 9200, changePct: 7.4 },
      { category: 'Bills', icon: '💡', amount: 6840, percentage: 9, previousAmount: 7100, changePct: -3.7 },
      { category: 'Shopping', icon: '🛍️', amount: 6080, percentage: 8, previousAmount: 5600, changePct: 8.6 },
      { category: 'Other', icon: '📦', amount: 7600, percentage: 10, previousAmount: 7000, changePct: 8.6 },
    ],
    merchants: [
      { merchant: 'Chicken Republic', category: 'Food', transactionCount: 2, totalAmount: 6200 },
      { merchant: 'Bolt', category: 'Transport', transactionCount: 3, totalAmount: 8100 },
      { merchant: 'MTN', category: 'Data & Airtime', transactionCount: 1, totalAmount: 5000 },
      { merchant: 'Shoprite', category: 'Shopping', transactionCount: 1, totalAmount: 5700 },
      { merchant: 'Netflix', category: 'Subscriptions', transactionCount: 1, totalAmount: 6000 },
    ],
    dailySpending: [
      { label: 'Mon', amount: 8500 },
      { label: 'Tue', amount: 12000 },
      { label: 'Wed', amount: 5500 },
      { label: 'Thu', amount: 15000 },
      { label: 'Fri', amount: 10000 },
      { label: 'Sat', amount: 18000 },
      { label: 'Sun', amount: 7000 },
    ],
  },

  month: {
    summary: {
      totalSpending: 120000,
      averageDailySpending: 4000,
      topCategory: 'Food',
      topCategoryAmount: 47500,
      spendingChangePct: 32,
    },
    trend: [
      { label: 'Week 1', spending: 27000, income: 250000 },
      { label: 'Week 2', spending: 31500, income: 0 },
      { label: 'Week 3', spending: 34800, income: 0 },
      { label: 'Week 4', spending: 26700, income: 0 },
    ],
    categories: [
      { category: 'Food', icon: '🍔', amount: 47500, percentage: 39, previousAmount: 36000, changePct: 32.0 },
      { category: 'Transport', icon: '🚗', amount: 25000, percentage: 21, previousAmount: 23000, changePct: 8.7 },
      { category: 'Data & Airtime', icon: '📱', amount: 15000, percentage: 13, previousAmount: 13000, changePct: 15.4 },
      { category: 'Bills', icon: '💡', amount: 10800, percentage: 9, previousAmount: 9800, changePct: 10.2 },
      { category: 'Shopping', icon: '🛍️', amount: 9600, percentage: 8, previousAmount: 10200, changePct: -5.9 },
      { category: 'Other', icon: '📦', amount: 12100, percentage: 10, previousAmount: 11000, changePct: 10.0 },
    ],
    merchants: [
      { merchant: 'Chicken Republic', category: 'Food', transactionCount: 4, totalAmount: 12500 },
      { merchant: 'Bolt', category: 'Transport', transactionCount: 5, totalAmount: 9800 },
      { merchant: 'MTN', category: 'Data & Airtime', transactionCount: 2, totalAmount: 8500 },
      { merchant: 'Netflix', category: 'Subscriptions', transactionCount: 1, totalAmount: 6000 },
      { merchant: 'Shoprite', category: 'Shopping', transactionCount: 1, totalAmount: 5700 },
    ],
    dailySpending: [
      { label: 'Sep 1', amount: 3500 },
      { label: 'Sep 2', amount: 7200 },
      { label: 'Sep 3', amount: 4800 },
      { label: 'Sep 4', amount: 6500 },
      { label: 'Sep 5', amount: 8000 },
      { label: 'Sep 6', amount: 4200 },
      { label: 'Sep 7', amount: 9100 },
      { label: 'Sep 8', amount: 6000 },
      { label: 'Sep 9', amount: 3800 },
      { label: 'Sep 10', amount: 5000 },
      { label: 'Sep 11', amount: 2800 },
      { label: 'Sep 12', amount: 8500 },
      { label: 'Sep 13', amount: 18700 },
      { label: 'Sep 14', amount: 3200 },
      { label: 'Sep 15', amount: 4500 },
      { label: 'Sep 16', amount: 1200 },
      { label: 'Sep 17', amount: 2600 },
      { label: 'Sep 18', amount: 3400 },
      { label: 'Sep 19', amount: 5200 },
    ],
  },

  lastMonth: {
    summary: {
      totalSpending: 90900,
      averageDailySpending: 3030,
      topCategory: 'Food',
      topCategoryAmount: 35500,
      spendingChangePct: -9,
    },
    trend: [
      { label: 'Week 1', spending: 24000, income: 250000 },
      { label: 'Week 2', spending: 21500, income: 0 },
      { label: 'Week 3', spending: 23800, income: 0 },
      { label: 'Week 4', spending: 21600, income: 0 },
    ],
    categories: [
      { category: 'Food', icon: '🍔', amount: 35500, percentage: 39, previousAmount: 33000, changePct: 7.6 },
      { category: 'Transport', icon: '🚗', amount: 22700, percentage: 25, previousAmount: 20800, changePct: 9.1 },
      { category: 'Data & Airtime', icon: '📱', amount: 12700, percentage: 14, previousAmount: 12200, changePct: 4.1 },
      { category: 'Bills', icon: '💡', amount: 10000, percentage: 11, previousAmount: 10700, changePct: -6.5 },
      { category: 'Shopping', icon: '🛍️', amount: 8200, percentage: 9, previousAmount: 7700, changePct: 6.5 },
      { category: 'Other', icon: '📦', amount: 1800, percentage: 2, previousAmount: 2000, changePct: -10.0 },
    ],
    merchants: [
      { merchant: 'Chicken Republic', category: 'Food', transactionCount: 3, totalAmount: 9200 },
      { merchant: 'Bolt', category: 'Transport', transactionCount: 4, totalAmount: 7600 },
      { merchant: 'MTN', category: 'Data & Airtime', transactionCount: 2, totalAmount: 7000 },
      { merchant: 'Netflix', category: 'Subscriptions', transactionCount: 1, totalAmount: 6000 },
      { merchant: 'Shoprite', category: 'Shopping', transactionCount: 1, totalAmount: 4800 },
    ],
    dailySpending: [
      { label: 'Week 1', amount: 24000 },
      { label: 'Week 2', amount: 21500 },
      { label: 'Week 3', amount: 23800 },
      { label: 'Week 4', amount: 21600 },
    ],
  },

  last3Months: {
    summary: {
      totalSpending: 315900,
      averageDailySpending: 3510,
      topCategory: 'Food',
      topCategoryAmount: 123200,
      spendingChangePct: 18,
    },
    trend: [
      { label: 'Jul', spending: 99400, income: 250000 },
      { label: 'Aug', spending: 90900, income: 250000 },
      { label: 'Sep', spending: 120000, income: 310000 },
    ],
    categories: [
      { category: 'Food', icon: '🍔', amount: 123200, percentage: 39, previousAmount: 105000, changePct: 17.3 },
      { category: 'Transport', icon: '🚗', amount: 66300, percentage: 21, previousAmount: 60800, changePct: 9.0 },
      { category: 'Data & Airtime', icon: '📱', amount: 41100, percentage: 13, previousAmount: 38600, changePct: 6.5 },
      { category: 'Bills', icon: '💡', amount: 28400, percentage: 9, previousAmount: 29500, changePct: -3.7 },
      { category: 'Shopping', icon: '🛍️', amount: 25300, percentage: 8, previousAmount: 24700, changePct: 2.4 },
      { category: 'Other', icon: '📦', amount: 31600, percentage: 10, previousAmount: 28900, changePct: 9.3 },
    ],
    merchants: [
      { merchant: 'Chicken Republic', category: 'Food', transactionCount: 11, totalAmount: 33800 },
      { merchant: 'Bolt', category: 'Transport', transactionCount: 14, totalAmount: 27600 },
      { merchant: 'MTN', category: 'Data & Airtime', transactionCount: 6, totalAmount: 22500 },
      { merchant: 'Netflix', category: 'Subscriptions', transactionCount: 3, totalAmount: 18000 },
      { merchant: 'Shoprite', category: 'Shopping', transactionCount: 3, totalAmount: 15900 },
    ],
    dailySpending: [
      { label: 'Jul', amount: 99400 },
      { label: 'Aug', amount: 90900 },
      { label: 'Sep', amount: 120000 },
    ],
  },

  year: {
    summary: {
      totalSpending: 1380000,
      averageDailySpending: 3781,
      topCategory: 'Food',
      topCategoryAmount: 538200,
      spendingChangePct: 11,
    },
    trend: [
      { label: 'Jan', spending: 102000, income: 250000 },
      { label: 'Feb', spending: 98000, income: 250000 },
      { label: 'Mar', spending: 115000, income: 250000 },
      { label: 'Apr', spending: 108000, income: 250000 },
      { label: 'May', spending: 121000, income: 250000 },
      { label: 'Jun', spending: 96000, income: 250000 },
      { label: 'Jul', spending: 99400, income: 250000 },
      { label: 'Aug', spending: 90900, income: 250000 },
      { label: 'Sep', spending: 120000, income: 310000 },
      { label: 'Oct', spending: 110000, income: 250000 },
      { label: 'Nov', spending: 132000, income: 250000 },
      { label: 'Dec', spending: 87700, income: 380000 },
    ],
    categories: [
      { category: 'Food', icon: '🍔', amount: 538200, percentage: 39, previousAmount: 486000, changePct: 10.7 },
      { category: 'Transport', icon: '🚗', amount: 289800, percentage: 21, previousAmount: 265000, changePct: 9.4 },
      { category: 'Data & Airtime', icon: '📱', amount: 179400, percentage: 13, previousAmount: 168000, changePct: 6.8 },
      { category: 'Bills', icon: '💡', amount: 124200, percentage: 9, previousAmount: 129000, changePct: -3.7 },
      { category: 'Shopping', icon: '🛍️', amount: 110400, percentage: 8, previousAmount: 102000, changePct: 8.2 },
      { category: 'Other', icon: '📦', amount: 138000, percentage: 10, previousAmount: 124000, changePct: 11.3 },
    ],
    merchants: [
      { merchant: 'Chicken Republic', category: 'Food', transactionCount: 44, totalAmount: 148000 },
      { merchant: 'Bolt', category: 'Transport', transactionCount: 58, totalAmount: 112000 },
      { merchant: 'MTN', category: 'Data & Airtime', transactionCount: 24, totalAmount: 96000 },
      { merchant: 'Netflix', category: 'Subscriptions', transactionCount: 12, totalAmount: 72000 },
      { merchant: 'Shoprite', category: 'Shopping', transactionCount: 12, totalAmount: 68000 },
    ],
    dailySpending: [
      { label: 'Jan', amount: 102000 },
      { label: 'Feb', amount: 98000 },
      { label: 'Mar', amount: 115000 },
      { label: 'Apr', amount: 108000 },
      { label: 'May', amount: 121000 },
      { label: 'Jun', amount: 96000 },
      { label: 'Jul', amount: 99400 },
      { label: 'Aug', amount: 90900 },
      { label: 'Sep', amount: 120000 },
      { label: 'Oct', amount: 110000 },
      { label: 'Nov', amount: 132000 },
      { label: 'Dec', amount: 87700 },
    ],
  },
};

export function getAnalyticsDataset(period: AnalyticsPeriod): AnalyticsDataset {
  return ANALYTICS_DATASETS[period];
}

// "This Month vs Last Month" — fixed regardless of the selected period, per spec.
export const MONTHLY_COMPARISON: MonthlyComparisonRow[] = [
  { category: 'Food', thisMonth: 47500, lastMonth: 36000 },
  { category: 'Transport', thisMonth: 25000, lastMonth: 23000 },
  { category: 'Data & Airtime', thisMonth: 15000, lastMonth: 13000 },
  { category: 'Bills', thisMonth: 11000, lastMonth: 9800 },
  { category: 'Entertainment', thisMonth: 7000, lastMonth: 6500 },
  { category: 'Shopping', thisMonth: 9600, lastMonth: 10200 },
  { category: 'Education', thisMonth: 5000, lastMonth: 4500 },
];