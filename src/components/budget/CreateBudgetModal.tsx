import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { BUDGET_CATEGORIES } from '../../data/BudgetData';
import type { BudgetPeriod, NewBudgetInput } from '../../types/budget';

const CATEGORY_OPTIONS = BUDGET_CATEGORIES.map((c) => ({ label: c, value: c }));
const PERIOD_OPTIONS: { label: string; value: BudgetPeriod }[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

interface FormErrors {
  category?: string;
  amount?: string;
  period?: string;
  startDate?: string;
}

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (input: NewBudgetInput) => void;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function calculateEndDate(startDate: string, period: BudgetPeriod): string {
  const start = new Date(startDate + 'T00:00:00');
  if (period === 'weekly') {
    start.setDate(start.getDate() + 6);
  } else {
    start.setMonth(start.getMonth() + 1);
    start.setDate(start.getDate() - 1);
  }
  return start.toISOString().slice(0, 10);
}

export default function CreateBudgetModal({ isOpen, onClose, onCreate }: CreateBudgetModalProps) {
  const [category, setCategory] = useState(BUDGET_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<BudgetPeriod>('monthly');
  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState(calculateEndDate(todayISO(), 'monthly'));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) {
      setCategory(BUDGET_CATEGORIES[0]);
      setAmount('');
      setPeriod('monthly');
      setStartDate(todayISO());
      setEndDate(calculateEndDate(todayISO(), 'monthly'));
      setErrors({});
    }
  }, [isOpen]);

  function handlePeriodChange(next: BudgetPeriod) {
    setPeriod(next);
    setEndDate(calculateEndDate(startDate, next));
  }

  function handleStartDateChange(next: string) {
    setStartDate(next);
    setEndDate(calculateEndDate(next, period));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    const amountNum = Number(amount);
    if (!category) next.category = 'Category is required.';
    if (!amount) next.amount = 'Budget amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Budget amount must be greater than 0.';
    if (!period) next.period = 'Period is required.';
    if (!startDate) next.startDate = 'Start date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onCreate({ category, amount: Number(amount), period, startDate, endDate });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Budget"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="create-budget-form">
            Create Budget
          </Button>
        </>
      }
    >
      <form id="create-budget-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Select
          id="budget-category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={CATEGORY_OPTIONS}
          error={errors.category}
        />

        <Input
          id="budget-amount"
          label="Budget Amount"
          type="number"
          inputMode="decimal"
          placeholder="30000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        <Select
          id="budget-period"
          label="Period"
          value={period}
          onChange={(e) => handlePeriodChange(e.target.value as BudgetPeriod)}
          options={PERIOD_OPTIONS}
          error={errors.period}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            id="budget-start"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            error={errors.startDate}
          />
          <Input id="budget-end" label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}