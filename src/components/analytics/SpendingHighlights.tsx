import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { DailySpendingPoint } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface SpendingHighlightsProps {
  data: DailySpendingPoint[];
  isLoading?: boolean;
}

export default function SpendingHighlights({ data, isLoading }: SpendingHighlightsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-3 h-6 w-24" />
        </Card>
        <Card>
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-3 h-6 w-24" />
        </Card>
      </div>
    );
  }

  if (data.length === 0) return null;

  // Calculated from the mock dataset rather than hardcoded.
  const highest = data.reduce((max, d) => (d.amount > max.amount ? d : max), data[0]);
  const lowest = data.reduce((min, d) => (d.amount < min.amount ? d : min), data[0]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">📈</span>
          <p className="text-xs text-slate">Highest Spending Day</p>
        </div>
        <p className="mt-2 font-display text-xl font-semibold text-ink">{highest.label}</p>
        <p className="mt-1 text-sm text-warning">{formatNaira(highest.amount)} spent</p>
      </Card>
      <Card>
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">📉</span>
          <p className="text-xs text-slate">Lowest Spending Day</p>
        </div>
        <p className="mt-2 font-display text-xl font-semibold text-ink">{lowest.label}</p>
        <p className="mt-1 text-sm text-primary">{formatNaira(lowest.amount)} spent</p>
      </Card>
    </div>
  );
}