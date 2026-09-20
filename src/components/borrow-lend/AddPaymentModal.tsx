import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import type { BorrowLendRecordWithStatus } from '../../types/borrowLend';

interface FormErrors {
  amount?: string;
  date?: string;
}

interface AddPaymentModalProps {
  record: BorrowLendRecordWithStatus | null;
  onClose: () => void;
  onSave: (recordId: string, amount: number, date: string, note?: string) => void;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddPaymentModal({ record, onClose, onSave }: AddPaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!record) return;
    setAmount('');
    setDate(todayISO());
    setNote('');
    setErrors({});
  }, [record]);

  if (!record) return null;

  function validate(): boolean {
    const next: FormErrors = {};
    const amountNum = Number(amount);
    if (!amount) next.amount = 'Payment amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Amount must be greater than 0.';
    else if (record && amountNum > record.remainingAmount) {
      next.amount = `Payment can't exceed the ₦${record.remainingAmount.toLocaleString('en-NG')} remaining balance.`;
    }
    if (!date) next.date = 'Payment date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !record) return;
    onSave(record.id, Number(amount), date, note.trim() || undefined);
  }

  return (
    <Modal
      isOpen={!!record}
      onClose={onClose}
      title={`Record Payment — ${record.person}`}
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-payment-form">
            Record Payment
          </Button>
        </>
      }
    >
      <form id="add-payment-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <p className="text-sm text-slate">
          Remaining balance: <span className="font-medium text-ink">₦{record.remainingAmount.toLocaleString('en-NG')}</span>
        </p>

        <Input
          id="payment-amount"
          label="Payment Amount"
          type="number"
          inputMode="decimal"
          placeholder="5000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        <Input id="payment-date" label="Payment Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} />

        <div>
          <label htmlFor="payment-note" className="mb-1.5 block text-sm font-medium text-ink">
            Note <span className="text-mist">(optional)</span>
          </label>
          <textarea
            id="payment-note"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Paid through bank transfer"
            className="w-full resize-none rounded-lg border border-line bg-surface-alt px-3.5 py-3 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </form>
    </Modal>
  );
}