import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { BUDGET_CATEGORY_ICONS } from '../../data/BudgetData';
import type { BudgetWithStatus } from '../../types/budget';

function formatNaira(n: number) {
  const sign = n < 0 ? '-' : '';
  return `${sign}₦${Math.abs(n).toLocaleString('en-NG')}`;
}

interface SpendingVsBudgetProps {
  budgets: BudgetWithStatus[];
  isLoading?: boolean;
}

export default function SpendingVsBudget({ budgets, isLoading }: SpendingVsBudgetProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <div className="mt-6 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const maxValue = Math.max(...budgets.flatMap((b) => [b.amount, b.spent]), 1);

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Spending vs Budget</h2>

      <div className="mt-5 flex items-center gap-4 text-xs text-slate">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-soft" /> Budget
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Spent
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {budgets.map((b) => {
          const overBudget = b.remaining < 0;
          return (
            <div key={b.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">
                  {BUDGET_CATEGORY_ICONS[b.category] ?? '📦'} {b.category}
                </span>
                <span className={overBudget ? 'text-danger' : 'text-mist'}>
                  Difference: {formatNaira(b.remaining)}
                </span>
              </div>
              <div className="mt-1.5 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 flex-1 rounded-full bg-bg">
                    <div className="h-2.5 rounded-full bg-line-soft" style={{ width: `${(b.amount / maxValue) * 100}%` }} />
                  </div>
                  <span className="w-20 shrink-0 text-right text-xs text-mist">{formatNaira(b.amount)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 flex-1 rounded-full bg-bg">
                    <div
                      className={`h-2.5 rounded-full ${overBudget ? 'bg-danger' : 'bg-primary'}`}
                      style={{ width: `${(Math.min(b.spent, maxValue) / maxValue) * 100}%` }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-xs text-ink">{formatNaira(b.spent)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}