import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { BUDGET_STATUS_LABEL, type BudgetStatus, type BudgetWithStatus } from '../../types/budget';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

const BAR_COLOR: Record<BudgetStatus, string> = {
  healthy: 'bg-primary',
  approaching: 'bg-warning',
  over: 'bg-danger',
};

const TEXT_COLOR: Record<BudgetStatus, string> = {
  healthy: 'text-primary',
  approaching: 'text-warning',
  over: 'text-danger',
};

interface OverallBudgetProps {
  budgets: BudgetWithStatus[];
  periodLabel: string;
  isLoading?: boolean;
}

export default function OverallBudget({ budgets, periodLabel, isLoading }: OverallBudgetProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-3 h-3 w-32" />
      </Card>
    );
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;
  const percentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 1000) / 10 : 0;
  const remainingPct = totalBudget > 0 ? Math.round((remaining / totalBudget) * 1000) / 10 : 0;
  const status: BudgetStatus = percentage >= 100 ? 'over' : percentage >= 70 ? 'approaching' : 'healthy';

  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-semibold text-ink">{periodLabel} Budget</h2>
        <span className={`text-sm font-medium ${TEXT_COLOR[status]}`}>{BUDGET_STATUS_LABEL[status]}</span>
      </div>

      <p className="mt-1 text-sm text-slate">
        {formatNaira(totalSpent)} spent of {formatNaira(totalBudget)}
      </p>

      <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-surface-alt">
        <div
          className={`h-4 rounded-full transition-all duration-700 ${BAR_COLOR[status]}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className={`font-semibold ${TEXT_COLOR[status]}`}>{percentage}%</span>
        <span className="text-slate">
          {formatNaira(Math.max(remaining, 0))} remaining · {Math.max(remainingPct, 0)}% remaining
        </span>
      </div>
    </Card>
  );
}