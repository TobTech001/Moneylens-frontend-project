import { useRef, useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { IconUpload, IconCheck } from '../Icons';

interface ImportTransactionsProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: (count: number) => void;
}

type ImportStep = 'form' | 'importing' | 'done';

export default function ImportTransactions({ isOpen, onClose, onImported }: ImportTransactionsProps) {
  const [step, setStep] = useState<ImportStep>('form');
  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setStep('form');
    setPastedText('');
    setFileName(null);
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
      setStep('done');
      const simulatedCount = pastedText.trim() ? 1 : fileName ? 3 : 0;
      onImported(simulatedCount || 1);
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
          <p className="mt-4 text-sm font-medium text-ink">Transactions imported successfully.</p>
          <Button type="button" onClick={handleClose} className="mt-5">
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}