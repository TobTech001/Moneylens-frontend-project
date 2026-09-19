import { useState } from 'react';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import type { TrendPoint } from '../../types/analytics';

type Metric = 'spending' | 'income' | 'net';

const METRIC_OPTIONS: { label: string; value: Metric }[] = [
  { label: 'Spending', value: 'spending' },
  { label: 'Income', value: 'income' },
  { label: 'Net Balance', value: 'net' },
];

function formatNaira(n: number) {
  const sign = n < 0 ? '-' : '';
  return `${sign}₦${Math.abs(n).toLocaleString('en-NG')}`;
}

function getValue(point: TrendPoint, metric: Metric): number {
  if (metric === 'spending') return point.spending;
  if (metric === 'income') return point.income;
  return point.income - point.spending;
}

interface SpendingTrendProps {
  trend: TrendPoint[];
  isLoading?: boolean;
}

export default function SpendingTrend({ trend, isLoading }: SpendingTrendProps) {
  const [metric, setMetric] = useState<Metric>('spending');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-56" />
        <Skeleton className="mt-6 h-48 w-full" />
      </Card>
    );
  }

  if (trend.length === 0) {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Spending Trend</h2>
        <p className="mt-1 text-sm text-slate">Track how your spending changes over time.</p>
        <div className="mt-4">
          <EmptyState
            icon="📈"
            title="Not enough data"
            message="We'll show your spending pattern here once you have more transactions."
          />
        </div>
      </Card>
    );
  }

  const values = trend.map((p) => getValue(p, metric));
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1 || 1)) * 300;
    const y = 100 - ((v - minVal) / range) * 90 - 5;
    return { x, y, value: v };
  });

  const linePath = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `0,100 ${linePath} 300,100`;

  const lineColor = metric === 'income' ? 'var(--color-accent-2)' : metric === 'net' ? 'var(--color-primary)' : 'var(--color-warning)';

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Spending Trend</h2>
          <p className="mt-1 text-sm text-slate">Track how your spending changes over time.</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-line bg-surface-alt p-1">
          {METRIC_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMetric(opt.value)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                metric === opt.value ? 'bg-surface text-ink shadow-sm' : 'text-slate hover:text-ink'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-6">
        <svg viewBox="0 0 300 100" className="h-48 w-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trendAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPath} fill="url(#trendAreaFill)" />
          <polyline points={linePath} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 4 : 2.5}
              fill={lineColor}
              stroke="var(--color-surface)"
              strokeWidth="1.5"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}
        </svg>

        {hoverIndex !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
            style={{ left: `${(hoverIndex / (points.length - 1 || 1)) * 100}%`, top: `${points[hoverIndex].y}%` }}
          >
            <p className="font-medium text-ink">{formatNaira(points[hoverIndex].value)}</p>
            <p className="text-mist">{trend[hoverIndex].label}</p>
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-between text-[11px] text-mist">
        {trend.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </Card>
  );
}