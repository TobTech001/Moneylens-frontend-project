import type { DashboardTransaction } from '../../types/Dashboard';

function formatNaira(n: number) {
  const sign = n < 0 ? '-' : '+';
  return `${sign}₦${Math.abs(n).toLocaleString('en-NG')}`;
}

export default function TransactionItem({ transaction }: { transaction: DashboardTransaction }) {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-alt text-base">
        {transaction.categoryIcon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{transaction.merchant}</p>
        <p className="text-xs text-mist">
          {transaction.category} · {transaction.date}
        </p>
      </div>
      <span className={`shrink-0 text-sm font-semibold ${transaction.type === 'income' ? 'text-primary' : 'text-ink'}`}>
        {formatNaira(transaction.amount)}
      </span>
    </div>
  );
}