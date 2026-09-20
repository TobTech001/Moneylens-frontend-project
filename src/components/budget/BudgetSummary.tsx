import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { BudgetWithStatus } from '../../types/budget';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface BudgetSummaryProps {
  budgets: BudgetWithStatus[];
  periodLabel: string;
  isLoading?: boolean;
}

export default function BudgetSummary({ budgets, periodLabel, isLoading }: BudgetSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-28" />
            <Skeleton className="mt-2 h-3 w-20" />
          </Card>
        ))}
      </div>
    );
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;
  const usage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 1000) / 10 : 0;
  const usageTone = usage >= 100 ? 'text-danger' : usage >= 70 ? 'text-warning' : 'text-primary';

  const cards = [
    { icon: '🎯', label: 'Total Budget', value: formatNaira(totalBudget), supporting: periodLabel, tone: 'text-accent' },
    { icon: '💸', label: 'Total Spent', value: formatNaira(totalSpent), supporting: 'This period', tone: 'text-ink' },
    { icon: '💰', label: 'Remaining', value: formatNaira(remaining), supporting: 'Available to spend', tone: 'text-primary' },
    { icon: '📊', label: 'Overall Usage', value: `${usage}%`, supporting: 'of your budget', tone: usageTone },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{card.icon}</span>
            <p className="text-xs text-slate">{card.label}</p>
          </div>
          <p className={`mt-2 font-display text-xl font-semibold sm:text-2xl ${card.tone}`}>{card.value}</p>
          <p className="mt-1 text-xs text-mist">{card.supporting}</p>
        </Card>
      ))}
    </div>
  );
}