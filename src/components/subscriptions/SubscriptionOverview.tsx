import { useState } from 'react';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import { CATEGORY_ICONS } from '../../data/SubscriptionData';
import { toMonthlyCost, type Subscription } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

const SLICE_COLORS = [
  'var(--color-primary)',
  'var(--color-accent-2)',
  'var(--color-accent)',
  'var(--color-warning)',
  'var(--color-primary-hover)',
  'var(--color-mist)',
  'var(--color-danger)',
];

interface SubscriptionOverviewProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
}

export default function SubscriptionOverview({ subscriptions, isLoading }: SubscriptionOverviewProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-52" />
        <Skeleton className="mt-2 h-3 w-64" />
        <div className="mt-6 flex justify-center">
          <Skeleton className="h-40 w-40 rounded-full" />
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

  const total = Array.from(totalsByCategory.values()).reduce((sum, v) => sum + v, 0);
  const breakdown = Array.from(totalsByCategory.entries())
    .map(([category, amount]) => ({ category, amount, percentage: total > 0 ? Math.round((amount / total) * 100) : 0 }))
    .sort((a, b) => b.amount - a.amount);

  if (breakdown.length === 0) {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Subscription Overview</h2>
        <p className="mt-1 text-sm text-slate">See how much your recurring services cost you.</p>
        <div className="mt-4">
          <EmptyState icon="🍩" title="Not enough data" message="Add a subscription to see your spending breakdown here." />
        </div>
      </Card>
    );
  }

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Subscription Overview</h2>
      <p className="mt-1 text-sm text-slate">See how much your recurring services cost you.</p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative h-44 w-44 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            {breakdown.map((b, i) => {
              const dash = (b.percentage / 100) * circumference;
              const gap = circumference - dash;
              const offset = -((cumulative / 100) * circumference);
              cumulative += b.percentage;
              return (
                <circle
                  key={b.category}
                  cx="18"
                  cy="18"
                  r={radius}
                  fill="none"
                  stroke={SLICE_COLORS[i % SLICE_COLORS.length]}
                  strokeWidth={hoverIndex === i ? 4.5 : 3.6}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={offset}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-slate">{hoverIndex !== null ? breakdown[hoverIndex].category : 'Monthly'}</p>
            <p className="font-display text-sm font-semibold text-ink">
              {hoverIndex !== null ? formatNaira(breakdown[hoverIndex].amount) : formatNaira(total)}
            </p>
          </div>
        </div>

        <ul className="w-full flex-1 space-y-2.5">
          {breakdown.map((b, i) => (
            <li
              key={b.category}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors ${hoverIndex === i ? 'bg-surface-alt' : ''}`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: SLICE_COLORS[i % SLICE_COLORS.length] }} aria-hidden />
                <span className="truncate text-ink">
                  {CATEGORY_ICONS[b.category as keyof typeof CATEGORY_ICONS] ?? '📦'} {b.category}
                </span>
              </span>
              <span className="shrink-0 text-right text-slate">
                {formatNaira(b.amount)} <span className="text-mist">— {b.percentage}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}