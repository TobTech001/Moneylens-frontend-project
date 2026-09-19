import { useState } from 'react';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import type { CategoryAnalytics } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

const SLICE_COLORS = [
  'var(--color-primary)',
  'var(--color-accent-2)',
  'var(--color-accent)',
  'var(--color-warning)',
  'var(--color-primary-hover)',
  'var(--color-mist)',
];

interface CategoryBreakdownProps {
  categories: CategoryAnalytics[];
  isLoading?: boolean;
}

export default function CategoryBreakdown({ categories, isLoading }: CategoryBreakdownProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-2 h-3 w-56" />
        <div className="mt-6 flex justify-center">
          <Skeleton className="h-40 w-40 rounded-full" />
        </div>
      </Card>
    );
  }

  if (categories.length === 0) {
    return (
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Spending by Category</h2>
        <p className="mt-1 text-sm text-slate">See which categories take the biggest share of your money.</p>
        <div className="mt-4">
          <EmptyState icon="🍩" title="Not enough data" message="We'll show your category breakdown here once you have more transactions." />
        </div>
      </Card>
    );
  }

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Spending by Category</h2>
      <p className="mt-1 text-sm text-slate">See which categories take the biggest share of your money.</p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative h-44 w-44 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            {categories.map((cat, i) => {
              const dash = (cat.percentage / 100) * circumference;
              const gap = circumference - dash;
              const offset = -((cumulative / 100) * circumference);
              cumulative += cat.percentage;
              return (
                <circle
                  key={cat.category}
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
            <p className="text-xs text-slate">{hoverIndex !== null ? categories[hoverIndex].category : 'Total'}</p>
            <p className="font-display text-sm font-semibold text-ink">
              {hoverIndex !== null ? `${categories[hoverIndex].percentage}%` : formatNaira(categories.reduce((s, c) => s + c.amount, 0))}
            </p>
          </div>
        </div>

        <ul className="w-full flex-1 space-y-2.5">
          {categories.map((cat, i) => (
            <li
              key={cat.category}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                hoverIndex === i ? 'bg-surface-alt' : ''
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: SLICE_COLORS[i % SLICE_COLORS.length] }}
                  aria-hidden
                />
                <span className="truncate text-ink">
                  {cat.icon} {cat.category}
                </span>
              </span>
              <span className="shrink-0 text-right text-slate">
                {formatNaira(cat.amount)} <span className="text-mist">— {cat.percentage}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}