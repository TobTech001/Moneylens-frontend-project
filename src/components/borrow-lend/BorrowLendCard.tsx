import Badge from '../common/Badge';
import BorrowLendActionsMenu from './BorrowLendActionsMenu';
import { BORROW_LEND_STATUS_LABEL, getDueDateLabel, type BorrowLendRecordWithStatus, type BorrowLendStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

const STATUS_TONE: Record<BorrowLendStatus, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  paid: 'positive',
  'partially-paid': 'neutral',
  outstanding: 'neutral',
  overdue: 'negative',
};

const BAR_COLOR: Record<BorrowLendStatus, string> = {
  paid: 'bg-primary',
  'partially-paid': 'bg-accent-2',
  outstanding: 'bg-mist',
  overdue: 'bg-danger',
};

interface BorrowLendCardProps {
  record: BorrowLendRecordWithStatus;
  onView: (r: BorrowLendRecordWithStatus) => void;
  onAddPayment: (r: BorrowLendRecordWithStatus) => void;
  onEdit: (r: BorrowLendRecordWithStatus) => void;
  onDelete: (r: BorrowLendRecordWithStatus) => void;
}

export default function BorrowLendCard({ record: r, onView, onAddPayment, onEdit, onDelete }: BorrowLendCardProps) {
  const progressPct = r.amount > 0 ? Math.min(100, Math.round((r.paidAmount / r.amount) * 100)) : 0;

  return (
    <div
      className="rounded-xl border border-line bg-surface p-4 lg:hidden"
      onClick={() => onView(r)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView(r)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">{r.person}</p>
          <p className="text-xs text-mist">{r.type === 'lent' ? 'Lent' : 'Borrowed'} · {r.description}</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <BorrowLendActionsMenu
            onView={() => onView(r)}
            onAddPayment={() => onAddPayment(r)}
            onEdit={() => onEdit(r)}
            onDelete={() => onDelete(r)}
            showAddPayment={r.status !== 'paid'}
          />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-display text-xl font-semibold text-ink">{formatNaira(r.remainingAmount)}</span>
        <span className="text-xs text-mist">of {formatNaira(r.amount)}</span>
      </div>

      <div className="mt-2 h-1.5 rounded-full bg-surface-alt">
        <div className={`h-1.5 rounded-full transition-all duration-500 ${BAR_COLOR[r.status]}`} style={{ width: `${progressPct}%` }} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-mist">{getDueDateLabel(r)}</span>
        <Badge tone={STATUS_TONE[r.status]}>{BORROW_LEND_STATUS_LABEL[r.status]}</Badge>
      </div>
    </div>
  );
}