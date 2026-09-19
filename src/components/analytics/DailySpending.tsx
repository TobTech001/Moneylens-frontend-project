import { useState } from 'react';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import type { DailySpendingPoint } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface DailySpendingProps {
  data: DailySpendingPoint[];
  isLoading?: boolean;
}

export default function DailySpending({ data, isLoading }: DailySpendingProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-6 h-40 w-full" />
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Daily Spending</h2>
        <div className="mt-4">
          <EmptyState icon="📊" title="Not enough data" message="We'll show your spending pattern here once you have more transactions." />
        </div>
      </Card>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.amount), 1);
  // Thin out labels when there are many bars, so the axis stays readable.
  const labelStride = data.length > 14 ? Math.ceil(data.length / 8) : 1;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Daily Spending</h2>
      <p className="mt-1 text-sm text-slate">Spot unusually high-spending days at a glance.</p>

      <div className="relative mt-6 flex h-40 items-end gap-1.5">
        {data.map((d, i) => (
          <div
            key={d.label}
            className="group relative flex-1"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div
              className={`w-full rounded-t-sm transition-colors ${
                hoverIndex === i ? 'bg-accent-2' : 'bg-primary/70 group-hover:bg-primary'
              }`}
              style={{ height: `${Math.max((d.amount / maxAmount) * 100, 3)}%` }}
            />
            {hoverIndex === i && (
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
                <p className="font-medium text-ink">{formatNaira(d.amount)}</p>
                <p className="text-mist">{d.label}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 flex gap-1.5 text-[10px] text-mist">
        {data.map((d, i) => (
          <span key={d.label} className="flex-1 text-center">
            {i % labelStride === 0 ? d.label : ''}
          </span>
        ))}
      </div>
    </Card>
  );
}