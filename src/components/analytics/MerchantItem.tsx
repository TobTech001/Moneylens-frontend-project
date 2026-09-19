import { CATEGORY_ICONS } from '../../data/AnalyticsData';
import type { MerchantAnalytics } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function MerchantItem({ merchant, rank }: { merchant: MerchantAnalytics; rank: number }) {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-alt text-xs font-semibold text-slate">
        {rank}
      </span>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-alt text-base">
        {CATEGORY_ICONS[merchant.category] ?? '📦'}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{merchant.merchant}</p>
        <p className="text-xs text-mist">
          {merchant.category} · {merchant.transactionCount} transaction{merchant.transactionCount === 1 ? '' : 's'}
        </p>
      </div>
      <span className="shrink-0 text-sm font-semibold text-ink">{formatNaira(merchant.totalAmount)}</span>
    </div>
  );
}