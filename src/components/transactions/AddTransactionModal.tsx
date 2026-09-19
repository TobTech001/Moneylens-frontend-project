import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { TRANSACTION_CATEGORIES, type Transaction, type TransactionType } from '../../types/transaction';

const CATEGORY_OPTIONS = TRANSACTION_CATEGORIES.map((c) => ({ label: c, value: c }));
const TYPE_OPTIONS: { label: string; value: TransactionType }[] = [
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
];

interface FormErrors {
  amount?: string;
  description?: string;
  category?: string;
  date?: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id' | 'status'>) => void;
  editingTransaction?: Transaction | null;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddTransactionModal({ isOpen, onClose, onSave, editingTransaction }: AddTransactionModalProps) {
  const isEditing = !!editingTransaction;

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(TRANSACTION_CATEGORIES[0]);
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) return;
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(String(editingTransaction.amount));
      setDescription(editingTransaction.description);
      setCategory(editingTransaction.category === 'Income' ? TRANSACTION_CATEGORIES[0] : editingTransaction.category);
      setDate(editingTransaction.date);
      setNote(editingTransaction.note ?? '');
    } else {
      setType('expense');
      setAmount('');
      setDescription('');
      setCategory(TRANSACTION_CATEGORIES[0]);
      setDate(todayISO());
      setNote('');
    }
    setErrors({});
  }, [isOpen, editingTransaction]);

  function validate(): boolean {
    const next: FormErrors = {};
    const amountNum = Number(amount);
    if (!amount) next.amount = 'Amount is required.';
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = 'Amount must be greater than 0.';
    if (!description.trim()) next.description = 'Description is required.';
    if (!category) next.category = 'Category is required.';
    if (!date) next.date = 'Date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      merchant: description.trim(),
      description: description.trim(),
      amount: Number(amount),
      type,
      category: category as Transaction['category'],
      date,
      time: editingTransaction?.time ?? new Date().toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' }),
      note: note.trim() || undefined,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Transaction' : 'Add Transaction'}
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="transaction-form">
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </>
      }
    >
      <form id="transaction-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink">Transaction Type</span>
          <div className="grid grid-cols-2 gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setType(opt.value)}
                className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  type === opt.value
                    ? 'border-primary/40 bg-primary-tint text-primary'
                    : 'border-line bg-surface-alt text-slate hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <Input
          id="amount"
          label="Amount"
          type="number"
          inputMode="decimal"
          placeholder="10000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />

        <Input
          id="description"
          label="Description"
          type="text"
          placeholder="Food at Chicken Republic"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <Select
          id="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={CATEGORY_OPTIONS}
          error={errors.category}
        />

        <Input
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
        />

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