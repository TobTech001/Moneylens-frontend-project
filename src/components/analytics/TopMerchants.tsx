import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import MerchantItem from './MerchantItem';
import type { MerchantAnalytics } from '../../types/analytics';

interface TopMerchantsProps {
  merchants: MerchantAnalytics[];
  isLoading?: boolean;
}

export default function TopMerchants({ merchants, isLoading }: TopMerchantsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-32" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Top Merchants</h2>
      {merchants.length === 0 ? (
        <div className="mt-4">
          <EmptyState icon="🏪" title="Not enough data" message="We'll show your top merchants here once you have more transactions." />
        </div>
      ) : (
        <div className="mt-2 divide-y divide-line">
          {merchants.map((m, i) => (
            <MerchantItem key={m.merchant} merchant={m} rank={i + 1} />
          ))}
        </div>
      )}
    </Card>
  );
}