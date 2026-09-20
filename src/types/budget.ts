export type BudgetPeriod = 'weekly' | 'monthly';
export type BudgetStatus = 'healthy' | 'approaching' | 'over';

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: BudgetPeriod;
  /** ISO date string */
  startDate: string;
  /** ISO date string */
  endDate: string;
}

/** A Budget plus its derived numbers — kept separate so the raw mock data
 * doesn't duplicate values that are always computable from amount/spent. */
export interface BudgetWithStatus extends Budget {
  remaining: number;
  percentage: number;
  status: BudgetStatus;
}

export function withBudgetStatus(budget: Budget): BudgetWithStatus {
  const remaining = budget.amount - budget.spent;
  const percentage = budget.amount > 0 ? Math.round((budget.spent / budget.amount) * 100) : 0;
  const status: BudgetStatus = percentage >= 100 ? 'over' : percentage >= 70 ? 'approaching' : 'healthy';
  return { ...budget, remaining, percentage, status };
}

export const BUDGET_STATUS_LABEL: Record<BudgetStatus, string> = {
  healthy: 'On track',
  approaching: 'Approaching limit',
  over: 'Over budget',
};

export type BudgetAlertType = 'warning' | 'danger' | 'info';

export interface BudgetAlert {
  id: string;
  budgetId: string;
  title: string;
  message: string;
  type: BudgetAlertType;
  actionLabel: string;
}

export type NewBudgetInput = Omit<Budget, 'id' | 'spent'>;