import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import type { BorrowLendType, NewRecordInput } from '../../types/borrowLend';

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

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: NewRecordInput) => void;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddRecordModal({ isOpen, onClose, onSave }: AddRecordModalProps) {
  const [type, setType] = useState<BorrowLendType>('lent');
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) return;
    setType('lent');
    setPerson('');
    setAmount('');
    setDescription('');
    setDate(todayISO());
    setDueDate('');
    setNote('');
    setErrors({});
  }, [isOpen]);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!person.trim()) next.person = 'Person is required.';
    const amountNum = Number(amount);
    if (!amount) next.amount = 'Amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Amount must be greater than 0.';
    if (!date) next.date = 'Date is required.';
    if (!dueDate) next.dueDate = 'Due date is required.';
    else if (date && dueDate < date) next.dueDate = 'Due date cannot be earlier than the transaction date.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      type,
      person: person.trim(),
      amount: Number(amount),
      description: description.trim() || (type === 'lent' ? 'Money lent' : 'Money borrowed'),
      date,
      dueDate,
      note: note.trim() || undefined,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Record"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-record-form">
            Add Record
          </Button>
        </>
      }
    >
      <form id="add-record-form" onSubmit={handleSubmit} noValidate className="space-y-4">
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

        <Input id="person" label="Person" type="text" placeholder="Azeez" value={person} onChange={(e) => setPerson(e.target.value)} error={errors.person} />

        <Input
          id="amount"
          label="Amount"
          type="number"
          inputMode="decimal"
          placeholder="20000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        <Input
          id="description"
          label="Description"
          type="text"
          placeholder="Emergency loan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input id="date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} />
          <Input id="dueDate" label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} error={errors.dueDate} />
        </div>

        <div>
          <label htmlFor="note" className="mb-1.5 block text-sm font-medium text-ink">
            Note <span className="text-mist">(optional)</span>
          </label>
          <textarea
            id="note"
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