import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import BudgetAlertCard from './BudgetAlertCard';
import type { BudgetAlert, BudgetWithStatus } from '../../types/budget';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

/** Auto-generates alerts from the current budgets rather than hardcoding
 * them, so they update whenever budgets or the period change. */
function buildAlerts(budgets: BudgetWithStatus[]): BudgetAlert[] {
  return budgets.map((b) => {
    if (b.status === 'over') {
      return {
        id: `alert-${b.id}`,
        budgetId: b.id,
        title: `${b.category} budget exceeded`,
        message: `You've exceeded your ${b.category} budget by ${formatNaira(Math.abs(b.remaining))}.`,
        type: 'danger',
        actionLabel: 'Review Spending',
      };
    }
    if (b.status === 'approaching') {
      return {
        id: `alert-${b.id}`,
        budgetId: b.id,
        title: `${b.category} budget is almost full`,
        message: `You've used ${b.percentage}% of your ${b.category} budget. ${formatNaira(b.remaining)} remaining.`,
        type: 'warning',
        actionLabel: 'View Budget',
      };
    }
    return {
      id: `alert-${b.id}`,
      budgetId: b.id,
      title: `${b.category} budget`,
      message: `You still have ${formatNaira(b.remaining)} available for ${b.category}.`,
      type: 'info',
      actionLabel: 'View Budget',
    };
  });
}

interface BudgetAlertsProps {
  budgets: BudgetWithStatus[];
  isLoading?: boolean;
}

export default function BudgetAlerts({ budgets, isLoading }: BudgetAlertsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-32" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const alerts = buildAlerts(budgets);

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Budget Alerts</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {alerts.map((alert) => (
          <BudgetAlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </Card>
  );
}