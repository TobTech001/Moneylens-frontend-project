import Modal from '../common/Modal';
import Button from '../common/Button';
import type { Transaction } from '../../types/transaction';

interface DeleteConfirmModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onConfirm: (t: Transaction) => void;
}

export default function DeleteConfirmModal({ transaction, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!transaction) return null;

  return (
    <Modal
      isOpen={!!transaction}
      onClose={onClose}
      title="Delete transaction?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onConfirm(transaction)}
            className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90"
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        You're about to delete <span className="font-medium text-ink">{transaction.merchant}</span> (
        {transaction.date}). This action cannot be undone.
      </p>
    </Modal>
  );
}