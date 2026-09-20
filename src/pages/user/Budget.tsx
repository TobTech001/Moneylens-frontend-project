import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import ErrorState from '../../components/common/ErrorState';
import Toast from '../../components/common/Toast';
import BudgetPeriodFilter from '../../components/budget/BudgetPeriodFilter';
import BudgetSummary from '../../components/budget/BudgetSummary';
import OverallBudget from '../../components/budget/OverallBudget';
import BudgetGrid from '../../components/budget/BudgetGrid';
import BudgetAlerts from '../../components/budget/BudgetAlerts';
import SpendingVsBudget from '../../components/budget/SpendingVsBudget';
import BudgetDetails from '../../components/budget/BudgetDetails';
import CreateBudgetModal from '../../components/budget/CreateBudgetModal';
import EditBudgetModal from '../../components/budget/EditBudgetModal';
import DeleteBudgetModal from '../../components/budget/DeleteBudgetModal';
import { getBudgets, PERIOD_FILTER_LABELS, BUDGET_CATEGORY_ICONS, type BudgetPeriodFilter as PeriodValue } from '../../data/BudgetData';
import { withBudgetStatus, type Budget, type BudgetWithStatus, type NewBudgetInput } from '../../types/budget';

export default function BudgetPage() {
  const [period, setPeriod] = useState<PeriodValue>('month');
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [viewingBudget, setViewingBudget] = useState<BudgetWithStatus | null>(null);
  const [editingBudget, setEditingBudget] = useState<BudgetWithStatus | null>(null);
  const [deletingBudget, setDeletingBudget] = useState<BudgetWithStatus | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function load() {
    setIsLoading(true);
    setHasError(false);
    // Frontend-only — simulates a fetch keyed off the selected period.
    setTimeout(() => {
      setBudgets(getBudgets(period));
      setIsLoading(false);
    }, 700);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const budgetsWithStatus = useMemo(() => budgets.map(withBudgetStatus), [budgets]);

  function handleCreate(input: NewBudgetInput) {
    const newBudget: Budget = { ...input, id: `bud-${Date.now()}`, spent: 0 };
    setBudgets((prev) => [newBudget, ...prev]);
    setIsCreateModalOpen(false);
    setToastMessage('Budget created successfully.');
  }

  function handleSaveEdit(id: string, input: Partial<Budget>) {
    setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...input } : b)));
    setEditingBudget(null);
    setToastMessage('Budget updated successfully.');
  }

  function handleConfirmDelete(b: BudgetWithStatus) {
    setBudgets((prev) => prev.filter((x) => x.id !== b.id));
    setDeletingBudget(null);
    setToastMessage('Budget deleted successfully.');
  }

  const periodLabel = PERIOD_FILTER_LABELS[period];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Budget</h1>
          <p className="mt-1 text-sm text-slate">Set spending limits and stay in control of your money.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <BudgetPeriodFilter value={period} onChange={setPeriod} />
          <Button type="button" onClick={() => setIsCreateModalOpen(true)}>
            + Create Budget
          </Button>
        </div>
      </div>

      {hasError ? (
        <ErrorState message="We couldn't load your budgets." onRetry={load} />
      ) : (
        <>
          <BudgetSummary budgets={budgetsWithStatus} periodLabel={periodLabel} isLoading={isLoading} />

          <OverallBudget budgets={budgetsWithStatus} periodLabel={periodLabel} isLoading={isLoading} />

          <BudgetGrid
            budgets={budgetsWithStatus}
            isLoading={isLoading}
            onViewDetails={setViewingBudget}
            onEdit={setEditingBudget}
            onDelete={setDeletingBudget}
            onCreate={() => setIsCreateModalOpen(true)}
          />

          <BudgetAlerts budgets={budgetsWithStatus} isLoading={isLoading} />

          {/* Budget Overview — compact at-a-glance usage across every category */}
          {!isLoading && budgetsWithStatus.length > 0 && (
            <Card>
              <h2 className="font-display text-lg font-semibold text-ink">Budget Overview</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {budgetsWithStatus.map((b) => (
                  <div key={b.id} className="flex items-center gap-3">
                    <span className="text-base leading-none">{BUDGET_CATEGORY_ICONS[b.category] ?? '📦'}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink">{b.category}</span>
                        <span className="text-mist">{b.percentage}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-surface-alt">
                        <div
                          className={`h-1.5 rounded-full ${
                            b.status === 'over' ? 'bg-danger' : b.status === 'approaching' ? 'bg-warning' : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min(b.percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {isLoading && (
            <Card>
              <Skeleton className="h-4 w-40" />
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </Card>
          )}

          <SpendingVsBudget budgets={budgetsWithStatus} isLoading={isLoading} />
        </>
      )}

      <BudgetDetails
        budget={viewingBudget}
        onClose={() => setViewingBudget(null)}
        onEdit={(b) => {
          setViewingBudget(null);
          setEditingBudget(b);
        }}
        onDelete={(b) => {
          setViewingBudget(null);
          setDeletingBudget(b);
        }}
      />

      <CreateBudgetModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreate} />

      <EditBudgetModal budget={editingBudget} onClose={() => setEditingBudget(null)} onSave={handleSaveEdit} />

      <DeleteBudgetModal budget={deletingBudget} onClose={() => setDeletingBudget(null)} onConfirm={handleConfirmDelete} />

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}