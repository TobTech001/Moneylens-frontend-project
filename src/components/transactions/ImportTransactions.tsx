import { useRef, useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { IconUpload, IconCheck } from '../Icons';
import type { Transaction } from '../../types/transaction';

interface ImportTransactionsProps {
  isOpen: boolean;
  onClose: () => void;
  /** Fires with the actual transactions to add to the list — not just a count. */
  onImported: (transactions: Transaction[]) => void;
}

type ImportStep = 'form' | 'importing' | 'done';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nowTime() {
  return new Date().toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' });
}

/** Best-effort parse of a pasted bank alert like:
 * "Transfer of NGN 15,000.00 to Chicken Republic on 12-SEP-26..."
 * Falls back to a generic transaction if the text doesn't match the
 * expected shape — this is a frontend simulation, not real SMS parsing. */
function parsePastedAlert(text: string): Transaction {
  const amountMatch = text.match(/NGN\s*([\d,]+(?:\.\d{1,2})?)/i) ?? text.match(/₦\s*([\d,]+(?:\.\d{1,2})?)/);
  const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, '')) : 5000;

  const merchantMatch = text.match(/to\s+([A-Za-z0-9&.,'’ -]+?)(?:\s+on\b|\.|$)/i);
  const merchant = merchantMatch ? merchantMatch[1].trim() : 'Imported Transaction';

  return {
    id: `txn-import-${Date.now()}`,
    merchant,
    description: text.trim().slice(0, 120) || merchant,
    amount,
    type: 'expense',
    category: 'Other',
    date: todayISO(),
    time: nowTime(),
    status: 'completed',
    note: 'Imported from pasted bank alert (demo)',
  };
}

/** Simulates parsing an uploaded statement file into a few transactions,
 * since there's no backend to actually read the file. */
function mockTransactionsFromFile(fileName: string): Transaction[] {
  const base = Date.now();
  return [
    {
      id: `txn-import-${base}-1`,
      merchant: 'Shoprite',
      description: `Imported from ${fileName}`,
      amount: 12300,
      type: 'expense',
      category: 'Shopping',
      date: todayISO(),
      time: nowTime(),
      status: 'completed',
      note: 'Imported from file (demo)',
    },
    {
      id: `txn-import-${base}-2`,
      merchant: 'Ikeja Electric',
      description: `Imported from ${fileName}`,
      amount: 9500,
      type: 'expense',
      category: 'Bills',
      date: todayISO(),
      time: nowTime(),
      status: 'completed',
      note: 'Imported from file (demo)',
    },
    {
      id: `txn-import-${base}-3`,
      merchant: 'Bolt',
      description: `Imported from ${fileName}`,
      amount: 3100,
      type: 'expense',
      category: 'Transport',
      date: todayISO(),
      time: nowTime(),
      status: 'completed',
      note: 'Imported from file (demo)',
    },
  ];
}

export default function ImportTransactions({ isOpen, onClose, onImported }: ImportTransactionsProps) {
  const [step, setStep] = useState<ImportStep>('form');
  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setStep('form');
    setPastedText('');
    setFileName(null);
    setImportedCount(0);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleImport() {
    setStep('importing');
    // Frontend-only simulation — no real bank/SMS parsing happens here yet.
    setTimeout(() => {
      const newTransactions = pastedText.trim()
        ? [parsePastedAlert(pastedText)]
        : fileName
          ? mockTransactionsFromFile(fileName)
          : [];

      setImportedCount(newTransactions.length);
      setStep('done');
      onImported(newTransactions);
    }, 1600);
  }

  const canImport = !!pastedText.trim() || !!fileName;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Import Transactions" size="sm">
      {step === 'form' && (
        <div className="space-y-5">
          <div>
            <label htmlFor="paste-alert" className="mb-1.5 block text-sm font-medium text-ink">
              Paste a bank transaction notification
            </label>
            <textarea
              id="paste-alert"
              rows={4}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Transfer of NGN 15,000.00 to Chicken Republic..."
              className="w-full resize-none rounded-lg border border-line bg-surface-alt px-3.5 py-3 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-mist">or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-line bg-surface-alt py-6 text-center transition-colors hover:border-primary/40"
            >
              <IconUpload className="h-5 w-5 text-mist" />
              <span className="text-sm text-ink">{fileName ?? 'Upload a file'}</span>
              <span className="text-xs text-mist">CSV, PDF, or image of a statement</span>
            </button>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
          </div>

          <div className="flex justify-end gap-3 border-t border-line pt-4">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleImport} disabled={!canImport}>
              Import
            </Button>
          </div>
        </div>
      )}

      {step === 'importing' && (
        <div className="flex flex-col items-center py-8 text-center">
          <LoadingSpinner className="h-7 w-7 text-primary" />
          <p className="mt-4 text-sm text-ink">Importing transactions...</p>
        </div>
      )}

      {step === 'done' && (
        <div className="flex flex-col items-center py-8 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/25 bg-primary-tint text-primary">
            <IconCheck className="h-5 w-5" />
          </span>
          <p className="mt-4 text-sm font-medium text-ink">
            {importedCount} transaction{importedCount === 1 ? '' : 's'} imported successfully.
          </p>
          <Button type="button" onClick={handleClose} className="mt-5">
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}