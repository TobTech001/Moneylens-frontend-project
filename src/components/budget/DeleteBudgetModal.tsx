import Modal from '../common/Modal';
import Button from '../common/Button';
import type { BudgetWithStatus } from '../../types/budget';

interface DeleteBudgetModalProps {
  budget: BudgetWithStatus | null;
  onClose: () => void;
  onConfirm: (b: BudgetWithStatus) => void;
}

export default function DeleteBudgetModal({ budget, onClose, onConfirm }: DeleteBudgetModalProps) {
  if (!budget) return null;

  return (
    <Modal
      isOpen={!!budget}
      onClose={onClose}
      title="Delete budget?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onConfirm(budget)}
            className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90"
          >
            Delete Budget
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        Are you sure you want to delete your <span className="font-medium text-ink">{budget.category}</span> budget?
        This action cannot be undone.
      </p>
    </Modal>
  );
}