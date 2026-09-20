import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { CATEGORY_ICONS } from '../../data/SubscriptionData';
import { toMonthlyCost, type Subscription } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

interface SubscriptionCostBreakdownProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
}

export default function SubscriptionCostBreakdown({ subscriptions, isLoading }: SubscriptionCostBreakdownProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-56" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const active = subscriptions.filter((s) => s.status === 'active');
  const totalsByCategory = new Map<string, number>();
  active.forEach((s) => {
    const monthly = toMonthlyCost(s.amount, s.frequency);
    totalsByCategory.set(s.category, (totalsByCategory.get(s.category) ?? 0) + monthly);
  });

  const rows = Array.from(totalsByCategory.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...rows.map((r) => r.amount), 1);

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Where Your Subscription Money Goes</h2>

      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.category}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">
                {CATEGORY_ICONS[row.category as keyof typeof CATEGORY_ICONS] ?? '📦'} {row.category}
              </span>
              <span className="text-slate">{formatNaira(row.amount)} / month</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-surface-alt">
              <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent-2" style={{ width: `${(row.amount / maxAmount) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}