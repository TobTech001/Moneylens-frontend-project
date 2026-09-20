import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { SUBSCRIPTION_CATEGORIES, type NewSubscriptionInput, type SubscriptionCategory, type SubscriptionFrequency, type SubscriptionStatus } from '../../types/subscription';

const CATEGORY_OPTIONS = SUBSCRIPTION_CATEGORIES.map((c) => ({ label: c, value: c }));
const FREQUENCY_OPTIONS: { label: string; value: SubscriptionFrequency }[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
];
const STATUS_OPTIONS: { label: string; value: SubscriptionStatus }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
];

interface FormErrors {
  serviceName?: string;
  category?: string;
  amount?: string;
  frequency?: string;
  nextPaymentDate?: string;
}

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: NewSubscriptionInput) => void;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddSubscriptionModal({ isOpen, onClose, onSave }: AddSubscriptionModalProps) {
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState<SubscriptionCategory>(SUBSCRIPTION_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('monthly');
  const [nextPaymentDate, setNextPaymentDate] = useState(todayISO());
  const [status, setStatus] = useState<SubscriptionStatus>('active');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) return;
    setServiceName('');
    setCategory(SUBSCRIPTION_CATEGORIES[0]);
    setAmount('');
    setFrequency('monthly');
    setNextPaymentDate(todayISO());
    setStatus('active');
    setNote('');
    setErrors({});
  }, [isOpen]);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!serviceName.trim()) next.serviceName = 'Service name is required.';
    if (!category) next.category = 'Category is required.';
    const amountNum = Number(amount);
    if (!amount) next.amount = 'Amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Amount must be greater than 0.';
    if (!frequency) next.frequency = 'Billing frequency is required.';
    if (!nextPaymentDate) next.nextPaymentDate = 'Next payment date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      serviceName: serviceName.trim(),
      category,
      amount: Number(amount),
      frequency,
      nextPaymentDate,
      status,
      note: note.trim() || undefined,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Subscription"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-subscription-form">
            Add Subscription
          </Button>
        </>
      }
    >
      <form id="add-subscription-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input id="serviceName" label="Service Name" type="text" placeholder="Netflix" value={serviceName} onChange={(e) => setServiceName(e.target.value)} error={errors.serviceName} />

        <Select
          id="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}
          options={CATEGORY_OPTIONS}
          error={errors.category}
        />

        <Input id="amount" label="Amount" type="number" inputMode="decimal" placeholder="6000" value={amount} onChange={(e) => setAmount(e.target.value)} error={errors.amount} />

        <Select
          id="frequency"
          label="Billing Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as SubscriptionFrequency)}
          options={FREQUENCY_OPTIONS}
          error={errors.frequency}
        />

        <Input
          id="nextPaymentDate"
          label="Next Payment Date"
          type="date"
          value={nextPaymentDate}
          onChange={(e) => setNextPaymentDate(e.target.value)}
          error={errors.nextPaymentDate}
        />

        <Select id="status" label="Status" value={status} onChange={(e) => setStatus(e.target.value as SubscriptionStatus)} options={STATUS_OPTIONS} />

        <div>
          <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-ink">
            Note <span className="text-mist">(optional)</span>
          </label>
          <textarea
            id="note"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Family entertainment subscription."
            className="w-full resize-none rounded-lg border border-line bg-surface-alt px-3.5 py-3 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </form>
    </Modal>
  );
}