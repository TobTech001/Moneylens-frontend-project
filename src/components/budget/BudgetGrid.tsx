import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import BudgetCard from './BudgetCard';
import type { BudgetWithStatus } from '../../types/budget';

interface BudgetGridProps {
  budgets: BudgetWithStatus[];
  isLoading?: boolean;
  onViewDetails: (b: BudgetWithStatus) => void;
  onEdit: (b: BudgetWithStatus) => void;
  onDelete: (b: BudgetWithStatus) => void;
  onCreate: () => void;
}

export default function BudgetGrid({ budgets, isLoading, onViewDetails, onEdit, onDelete, onCreate }: BudgetGridProps) {
  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Category Budgets</h2>
      <p className="mt-1 text-sm text-slate">Track how much you're spending in each category.</p>

      {isLoading ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-line p-4">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-2 w-full" />
              <Skeleton className="mt-3 h-3 w-24" />
            </div>
          ))}
        </div>
      ) : budgets.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon="🎯"
            title="No budgets yet"
            message="Create your first budget to start controlling your spending."
            action={
              <button
                type="button"
                onClick={onCreate}
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-primary-hover"
              >
                Create Budget
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {budgets.map((b) => (
            <BudgetCard key={b.id} budget={b} onViewDetails={onViewDetails} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </Card>
  );
}