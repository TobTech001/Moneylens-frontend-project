import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { CATEGORY_ICONS } from '../../data/TransactionData';
import type { Transaction, TransactionStatus } from '../../types/transaction';

function formatNaira(n: number, type: Transaction['type']) {
  const sign = type === 'income' ? '+' : '-';
  return `${sign}₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' });
}

const STATUS_TONE: Record<TransactionStatus, 'positive' | 'warning' | 'negative'> = {
  completed: 'positive',
  pending: 'warning',
  failed: 'negative',
};

interface TransactionDetailsProps {
  transaction: Transaction | null;
  onClose: () => void;
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
}

export default function TransactionDetails({ transaction, onClose, onEdit, onDelete }: TransactionDetailsProps) {
  if (!transaction) return null;
  const t = transaction;

  return (
    <Modal
      isOpen={!!transaction}
      onClose={onClose}
      title="Transaction Details"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={() => onDelete(t)} className="!text-danger">
            Delete
          </Button>
          <Button type="button" variant="secondary" onClick={() => onEdit(t)}>
            Edit
          </Button>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-alt text-xl">
          {CATEGORY_ICONS[t.category] ?? '📦'}
        </span>
        <div>
          <p className="text-base font-semibold text-ink">{t.merchant}</p>
          <p className={`text-lg font-display font-semibold ${t.type === 'income' ? 'text-primary' : 'text-ink'}`}>
            {formatNaira(t.amount, t.type)}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate">Description</dt>
          <dd className="text-right text-ink">{t.description}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Date</dt>
          <dd className="text-ink">{formatDate(t.date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Time</dt>
          <dd className="text-ink">{t.time}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Category</dt>
          <dd className="text-ink">{t.category}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Type</dt>
          <dd className="text-ink">{t.type === 'income' ? 'Income' : 'Expense'}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate">Status</dt>
          <dd>
            <Badge tone={STATUS_TONE[t.status]}>{t.status[0].toUpperCase() + t.status.slice(1)}</Badge>
          </dd>
        </div>
        {t.note && (
          <div>
            <dt className="text-slate">Note</dt>
            <dd className="mt-1 text-ink">{t.note}</dd>
          </div>
        )}
      </dl>
    </Modal>
  );
}