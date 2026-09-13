import { useState } from 'react';
import Card from '../common/Card';
import { SPENDING_TRENDS } from '../../data/DashboardData';
import type { SpendingPeriod } from '../../types/Dashboard';

const PERIODS: { id: SpendingPeriod; label: string }[] = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

function formatCompactNaira(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${Math.round(n / 1000)}k`;
  return `₦${n}`;
}

export default function SpendingOverview() {
  const [period, setPeriod] = useState<SpendingPeriod>('monthly');
  const points = SPENDING_TRENDS[period];
  const max = Math.max(...points.map((p) => p.amount));

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-ink">Spending Overview</h2>
        <div className="inline-flex rounded-lg border border-line bg-surface-alt p-1">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                period === p.id ? 'bg-primary text-bg' : 'text-slate hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex h-48 items-end gap-2 sm:gap-3">
        {points.map((point) => {
          const heightPct = Math.max(6, Math.round((point.amount / max) * 100));
          return (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary-dim to-primary transition-all duration-500"
                  style={{ height: `${heightPct}%` }}
                  title={formatCompactNaira(point.amount)}
                />
              </div>
              <span className="text-[11px] text-mist">{point.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}