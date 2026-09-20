import Badge from '../common/Badge';
import BudgetActionsMenu from './BudgetActionsMenu';
import { BUDGET_CATEGORY_ICONS } from '../../data/BudgetData';
import { BUDGET_STATUS_LABEL, type BudgetStatus, type BudgetWithStatus } from '../../types/budget';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
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

interface BudgetCardProps {
  budget: BudgetWithStatus;
  onViewDetails: (b: BudgetWithStatus) => void;
  onEdit: (b: BudgetWithStatus) => void;
  onDelete: (b: BudgetWithStatus) => void;
}

export default function BudgetCard({ budget, onViewDetails, onEdit, onDelete }: BudgetCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-alt text-base">
            {BUDGET_CATEGORY_ICONS[budget.category] ?? '📦'}
          </span>
          <p className="text-sm font-medium text-ink">{budget.category}</p>
        </div>
        <BudgetActionsMenu
          onViewDetails={() => onViewDetails(budget)}
          onEdit={() => onEdit(budget)}
          onDelete={() => onDelete(budget)}
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between text-sm">
        <span className="text-ink">{formatNaira(budget.spent)}</span>
        <span className="text-mist">of {formatNaira(budget.amount)}</span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-surface-alt">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${BAR_COLOR[budget.status]}`}
          style={{ width: `${Math.min(budget.percentage, 100)}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-mist">
          {budget.remaining >= 0 ? formatNaira(budget.remaining) : `-${formatNaira(Math.abs(budget.remaining))}`} remaining
        </span>
        <span className="text-xs font-medium text-ink">{budget.percentage}%</span>
      </div>

      <div className="mt-3">
        <Badge tone={BADGE_TONE[budget.status]}>{BUDGET_STATUS_LABEL[budget.status]}</Badge>
      </div>
    </div>
  );
}