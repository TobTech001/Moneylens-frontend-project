import type { Budget, BudgetPeriod } from '../types/budget';

export const BUDGET_CATEGORY_ICONS: Record<string, string> = {
  Food: '🍔',
  Transport: '🚗',
  'Data & Airtime': '📱',
  Bills: '💡',
  Subscriptions: '📺',
  Education: '🎓',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Other: '📦',
};

export const BUDGET_CATEGORIES = Object.keys(BUDGET_CATEGORY_ICONS);

export type BudgetPeriodFilter = 'week' | 'month' | 'lastMonth' | 'custom';

export const PERIOD_FILTER_LABELS: Record<BudgetPeriodFilter, string> = {
  week: 'This Week',
  month: 'This Month',
  lastMonth: 'Last Month',
  custom: 'Custom Period',
};

// "This Month" (September 2026) is hand-set so the summary cards reconcile
// exactly with the brief: Total Budget ₦100,000, Total Spent ₦72,500,
// Remaining ₦27,500, Usage 72.5%.
const MONTH_BUDGETS: Budget[] = [
  { id: 'bud-food', category: 'Food', amount: 30000, spent: 24500, period: 'monthly', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 'bud-transport', category: 'Transport', amount: 25000, spent: 18000, period: 'monthly', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 'bud-data', category: 'Data & Airtime', amount: 10000, spent: 7000, period: 'monthly', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 'bud-entertainment', category: 'Entertainment', amount: 10000, spent: 12000, period: 'monthly', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 'bud-bills', category: 'Bills', amount: 15000, spent: 6000, period: 'monthly', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 'bud-shopping', category: 'Shopping', amount: 10000, spent: 5000, period: 'monthly', startDate: '2026-09-01', endDate: '2026-09-30' },
];

function scale(budgets: Budget[], factor: number, period: BudgetPeriod, startDate: string, endDate: string): Budget[] {
  return budgets.map((b) => ({
    ...b,
    id: `${b.id}-${period}-${startDate}`,
    amount: Math.round((b.amount * factor) / 100) * 100,
    spent: Math.round((b.spent * factor) / 100) * 100,
    period,
    startDate,
    endDate,
  }));
}

const BUDGET_DATASETS: Record<BudgetPeriodFilter, Budget[]> = {
  month: MONTH_BUDGETS,
  week: scale(MONTH_BUDGETS, 0.26, 'weekly', '2026-09-15', '2026-09-21'),
  lastMonth: scale(MONTH_BUDGETS, 0.86, 'monthly', '2026-08-01', '2026-08-31'),
  custom: MONTH_BUDGETS,
};

export function getBudgets(period: BudgetPeriodFilter): Budget[] {
  return BUDGET_DATASETS[period];
}