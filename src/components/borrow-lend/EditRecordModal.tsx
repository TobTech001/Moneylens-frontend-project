import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import type { BorrowLendRecordWithStatus, BorrowLendType } from '../../types/borrowLend';

const TYPE_OPTIONS: { label: string; value: BorrowLendType }[] = [
  { label: 'Money Lent', value: 'lent' },
  { label: 'Money Borrowed', value: 'borrowed' },
];

interface FormErrors {
  person?: string;
  amount?: string;
  date?: string;
  dueDate?: string;
}

interface EditRecordModalProps {
  record: BorrowLendRecordWithStatus | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<BorrowLendRecordWithStatus>) => void;
}

export default function EditRecordModal({ record, onClose, onSave }: EditRecordModalProps) {
  const [type, setType] = useState<BorrowLendType>('lent');
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!record) return;
    setType(record.type);
    setPerson(record.person);
    setAmount(String(record.amount));
    setDescription(record.description);
    setDate(record.date);
    setDueDate(record.dueDate);
    setNote(record.note ?? '');
    setErrors({});
  }, [record]);

  if (!record) return null;

  function validate(): boolean {
    const next: FormErrors = {};
    if (!person.trim()) next.person = 'Person is required.';
    const amountNum = Number(amount);
    if (!amount) next.amount = 'Amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Amount must be greater than 0.';
    else if (record && amountNum < record.paidAmount) {
      next.amount = `Amount can't be less than the ₦${record.paidAmount.toLocaleString('en-NG')} already paid.`;
    }
    if (!date) next.date = 'Date is required.';
    if (!dueDate) next.dueDate = 'Due date is required.';
    else if (date && dueDate < date) next.dueDate = 'Due date cannot be earlier than the transaction date.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !record) return;

    onSave(record.id, {
      type,
      person: person.trim(),
      amount: Number(amount),
      description: description.trim(),
      date,
      dueDate,
      note: note.trim() || undefined,
    });
  }

  return (
    <Modal
      isOpen={!!record}
      onClose={onClose}
      title="Edit Record"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="edit-record-form">
            Save Changes
          </Button>
        </>
      }
    >
      <form id="edit-record-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink">Type</span>
          <div className="grid grid-cols-2 gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setType(opt.value)}
                className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  type === opt.value ? 'border-primary/40 bg-primary-tint text-primary' : 'border-line bg-surface-alt text-slate hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <Input id="edit-person" label="Person" type="text" value={person} onChange={(e) => setPerson(e.target.value)} error={errors.person} />

        <Input
          id="edit-amount"
          label="Amount"
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
          hint={`Already paid: ₦${record.paidAmount.toLocaleString('en-NG')}`}
        />

        <Input id="edit-description" label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="grid grid-cols-2 gap-3">
          <Input id="edit-date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} />
          <Input id="edit-dueDate" label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} error={errors.dueDate} />
        </div>

        <div>
          <label htmlFor="edit-note" className="mb-1.5 block text-sm font-medium text-ink">
            Note <span className="text-mist">(optional)</span>
          </label>
          <textarea
            id="edit-note"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full resize-none rounded-lg border border-line bg-surface-alt px-3.5 py-3 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </form>
    </Modal>
  );
}