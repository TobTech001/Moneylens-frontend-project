import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { CATEGORY_ICONS } from '../../data/AnalyticsData';
import type { MonthlyComparisonRow } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface MonthlyComparisonProps {
  rows: MonthlyComparisonRow[];
  isLoading?: boolean;
}

export default function MonthlyComparison({ rows, isLoading }: MonthlyComparisonProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-44" />
        <div className="mt-6 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const maxValue = Math.max(...rows.flatMap((r) => [r.thisMonth, r.lastMonth]), 1);

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Monthly Comparison</h2>
      <p className="mt-1 text-sm text-slate">Compare your spending across categories.</p>

      <div className="mt-5 flex items-center gap-4 text-xs text-slate">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" /> This Month
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-soft" /> Last Month
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row.category}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">
                {CATEGORY_ICONS[row.category] ?? '📦'} {row.category}
              </span>
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-2.5 flex-1 rounded-full bg-bg">
                  <div className="h-2.5 rounded-full bg-primary" style={{ width: `${(row.thisMonth / maxValue) * 100}%` }} />
                </div>
                <span className="w-20 shrink-0 text-right text-xs text-ink">{formatNaira(row.thisMonth)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 flex-1 rounded-full bg-bg">
                  <div className="h-2.5 rounded-full bg-line-soft" style={{ width: `${(row.lastMonth / maxValue) * 100}%` }} />
                </div>
                <span className="w-20 shrink-0 text-right text-xs text-mist">{formatNaira(row.lastMonth)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}