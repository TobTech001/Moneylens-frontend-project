import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { CategoryAnalytics } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface CategoryDetailsProps {
  categories: CategoryAnalytics[];
  isLoading?: boolean;
}

export default function CategoryDetails({ categories, isLoading }: CategoryDetailsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-48" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Category Spending Details</h2>

      <div className="mt-4 divide-y divide-line">
        {categories.map((cat) => {
          const up = cat.changePct >= 0;
          return (
            <div key={cat.category} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="text-lg leading-none">{cat.icon}</span>
                <div>
                  <p className="text-sm font-medium text-ink">{cat.category}</p>
                  <p className="text-xs text-mist">
                    {cat.percentage}% of spending · Previous: {formatNaira(cat.previousAmount)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-ink">{formatNaira(cat.amount)}</p>
                <p className={`text-xs font-medium ${up ? 'text-warning' : 'text-primary'}`}>
                  {up ? '↑' : '↓'} {Math.abs(cat.changePct)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}