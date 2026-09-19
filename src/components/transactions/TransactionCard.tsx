import Badge from '../common/Badge';
import TransactionActionsMenu from './TransactionMenu';
import { CATEGORY_ICONS } from '../../data/TransactionData';
import type { Transaction, TransactionStatus } from '../../types/transaction';

function formatNaira(n: number, type: Transaction['type']) {
  const sign = type === 'income' ? '+' : '-';
  return `${sign}₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

const STATUS_TONE: Record<TransactionStatus, 'positive' | 'warning' | 'negative'> = {
  completed: 'positive',
  pending: 'warning',
  failed: 'negative',
};

interface TransactionCardProps {
  transaction: Transaction;
  onView: (t: Transaction) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
}

export default function TransactionCard({ transaction: t, onView, onEdit, onDelete }: TransactionCardProps) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 lg:hidden"
      onClick={() => onView(t)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView(t)}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-alt text-lg">
        {CATEGORY_ICONS[t.category] ?? '📦'}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{t.merchant}</p>
            <p className="text-xs text-mist">
              {t.category} · {formatDate(t.date)}
            </p>
          </div>
          <span className={`shrink-0 text-sm font-semibold ${t.type === 'income' ? 'text-primary' : 'text-ink'}`}>
            {formatNaira(t.amount, t.type)}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <Badge tone={STATUS_TONE[t.status]}>{t.status[0].toUpperCase() + t.status.slice(1)}</Badge>
          <div onClick={(e) => e.stopPropagation()}>
            <TransactionActionsMenu onView={() => onView(t)} onEdit={() => onEdit(t)} onDelete={() => onDelete(t)} />
          </div>
        </div>
      </div>
    </div>
  );
}