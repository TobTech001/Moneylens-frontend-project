import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { BUDGET_CATEGORIES } from '../../data/BudgetData';
import type { Budget, BudgetPeriod, BudgetWithStatus } from '../../types/budget';

const CATEGORY_OPTIONS = BUDGET_CATEGORIES.map((c) => ({ label: c, value: c }));
const PERIOD_OPTIONS: { label: string; value: BudgetPeriod }[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

interface FormErrors {
  category?: string;
  amount?: string;
  startDate?: string;
}

interface EditBudgetModalProps {
  budget: BudgetWithStatus | null;
  onClose: () => void;
  onSave: (id: string, input: Partial<Budget>) => void;
}

export default function EditBudgetModal({ budget, onClose, onSave }: EditBudgetModalProps) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<BudgetPeriod>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setAmount(String(budget.amount));
      setPeriod(budget.period);
      setStartDate(budget.startDate);
      setEndDate(budget.endDate);
      setErrors({});
    }
  }, [budget]);

  if (!budget) return null;

  function validate(): boolean {
    const next: FormErrors = {};
    const amountNum = Number(amount);
    if (!category) next.category = 'Category is required.';
    if (!amount) next.amount = 'Budget amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Budget amount must be greater than 0.';
    if (!startDate) next.startDate = 'Start date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !budget) return;

    onSave(budget.id, { category, amount: Number(amount), period, startDate, endDate });
  }

  return (
    <Modal
      isOpen={!!budget}
      onClose={onClose}
      title="Edit Budget"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="edit-budget-form">
            Save Changes
          </Button>
        </>
      }
    >
      <form id="edit-budget-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Select
          id="edit-budget-category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={CATEGORY_OPTIONS}
          error={errors.category}
        />

        <Input
          id="edit-budget-amount"
          label="Budget Amount"
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        <Select
          id="edit-budget-period"
          label="Period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as BudgetPeriod)}
          options={PERIOD_OPTIONS}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            id="edit-budget-start"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            error={errors.startDate}
          />
          <Input id="edit-budget-end" label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}