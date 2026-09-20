import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { BORROW_LEND_STATUS_LABEL, getDueDateLabel, type BorrowLendRecordWithStatus, type BorrowLendStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' });
}

const STATUS_TONE: Record<BorrowLendStatus, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  paid: 'positive',
  'partially-paid': 'neutral',
  outstanding: 'neutral',
  overdue: 'negative',
};

interface BorrowLendDetailsProps {
  record: BorrowLendRecordWithStatus | null;
  onClose: () => void;
  onAddPayment: (r: BorrowLendRecordWithStatus) => void;
  onEdit: (r: BorrowLendRecordWithStatus) => void;
  onDelete: (r: BorrowLendRecordWithStatus) => void;
}

export default function BorrowLendDetails({ record, onClose, onAddPayment, onEdit, onDelete }: BorrowLendDetailsProps) {
  if (!record) return null;
  const r = record;
  const progressPct = r.amount > 0 ? Math.min(100, Math.round((r.paidAmount / r.amount) * 100)) : 0;

  return (
    <Modal
      isOpen={!!record}
      onClose={onClose}
      title={`${r.person} — ${r.type === 'lent' ? 'Money Lent' : 'Money Borrowed'}`}
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={() => onDelete(r)} className="!text-danger">
            Delete
          </Button>
          <Button type="button" variant="secondary" onClick={() => onEdit(r)}>
            Edit
          </Button>
          {r.status !== 'paid' && (
            <Button type="button" onClick={() => onAddPayment(r)}>
              Add Payment
            </Button>
          )}
        </>
      }
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate">Total Amount</p>
          <p className="font-display text-xl font-semibold text-ink">{formatNaira(r.amount)}</p>
        </div>
        <Badge tone={STATUS_TONE[r.status]}>{BORROW_LEND_STATUS_LABEL[r.status]}</Badge>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate">
          <span>Paid {formatNaira(r.paidAmount)}</span>
          <span>{progressPct}%</span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-surface-alt">
          <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="mt-1.5 text-xs text-mist">{formatNaira(r.remainingAmount)} remaining</p>
      </div>

      <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate">Date</dt>
          <dd className="text-ink">{formatDate(r.date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Due Date</dt>
          <dd className="text-ink">{formatDate(r.dueDate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Status</dt>
          <dd className="text-ink">{getDueDateLabel(r)}</dd>
        </div>
        <div>
          <dt className="text-slate">Description</dt>
          <dd className="mt-1 text-ink">{r.description}</dd>
        </div>
        {r.note && (
          <div>
            <dt className="text-slate">Note</dt>
            <dd className="mt-1 text-ink">{r.note}</dd>
          </div>
        )}
        {r.payments.length > 0 && (
          <div>
            <dt className="mb-2 text-slate">Payment History</dt>
            <dd className="space-y-2">
              {r.payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg bg-surface-alt px-3 py-2 text-xs">
                  <span className="text-ink">{formatDate(p.date)}</span>
                  <span className="font-medium text-primary">{formatNaira(p.amount)}</span>
                </div>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </Modal>
  );
}