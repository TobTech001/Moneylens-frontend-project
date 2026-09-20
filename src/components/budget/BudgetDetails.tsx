import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { BUDGET_CATEGORY_ICONS } from '../../data/BudgetData';
import { BUDGET_STATUS_LABEL, type BudgetStatus, type BudgetWithStatus } from '../../types/budget';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' });
}

const BAR_COLOR: Record<BudgetStatus, string> = {
  healthy: 'bg-primary',
  approaching: 'bg-warning',
  over: 'bg-danger',
};

const BADGE_TONE: Record<BudgetStatus, 'positive' | 'warning' | 'negative'> = {
  healthy: 'positive',
  approaching: 'warning',
  over: 'negative',
};

interface BudgetDetailsProps {
  budget: BudgetWithStatus | null;
  onClose: () => void;
  onEdit: (b: BudgetWithStatus) => void;
  onDelete: (b: BudgetWithStatus) => void;
}

export default function BudgetDetails({ budget, onClose, onEdit, onDelete }: BudgetDetailsProps) {
  if (!budget) return null;
  const b = budget;

  return (
    <Modal
      isOpen={!!budget}
      onClose={onClose}
      title={`${b.category} Budget`}
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={() => onDelete(b)} className="!text-danger">
            Delete Budget
          </Button>
          <Button type="button" variant="secondary" onClick={() => onEdit(b)}>
            Edit Budget
          </Button>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-alt text-xl">
          {BUDGET_CATEGORY_ICONS[b.category] ?? '📦'}
        </span>
        <div>
          <p className="text-base font-semibold text-ink">{b.category}</p>
          <Badge tone={BADGE_TONE[b.status]}>{BUDGET_STATUS_LABEL[b.status]}</Badge>
        </div>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-surface-alt">
        <div className={`h-3 rounded-full ${BAR_COLOR[b.status]}`} style={{ width: `${Math.min(b.percentage, 100)}%` }} />
      </div>
      <p className="mt-1.5 text-right text-xs font-medium text-ink">{b.percentage}%</p>

      <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate">Budget</dt>
          <dd className="text-ink">{formatNaira(b.amount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Spent</dt>
          <dd className="text-ink">{formatNaira(b.spent)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Remaining</dt>
          <dd className={b.remaining < 0 ? 'text-danger' : 'text-ink'}>{formatNaira(b.remaining)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Period</dt>
          <dd className="text-ink capitalize">{b.period}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Start Date</dt>
          <dd className="text-ink">{formatDate(b.startDate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">End Date</dt>
          <dd className="text-ink">{formatDate(b.endDate)}</dd>
        </div>
      </dl>
    </Modal>
  );
}