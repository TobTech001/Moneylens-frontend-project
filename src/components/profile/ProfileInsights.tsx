import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { ProfileStats } from '../../types/profile';

interface ProfileInsightsProps {
  stats: ProfileStats;
  isLoading?: boolean;
}

export default function ProfileInsights({ stats, isLoading }: ProfileInsightsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-48" />
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const cards = [
    { icon: '🧾', label: 'Transactions Tracked', value: stats.transactionsTracked },
    { icon: '🎯', label: 'Active Budgets', value: stats.activeBudgets },
    { icon: '🔔', label: 'Active Subscriptions', value: stats.activeSubscriptions },
    { icon: '🤝', label: 'Borrow & Lend Records', value: stats.borrowLendRecords },
  ];

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Your MoneyLens Profile</h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-line bg-surface-alt p-4 text-center">
            <span className="text-lg leading-none">{card.icon}</span>
            <p className="mt-2 font-display text-xl font-semibold text-ink">{card.value}</p>
            <p className="mt-1 text-xs text-slate">{card.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}