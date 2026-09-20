import Modal from '../common/Modal';
import Button from '../common/Button';
import type { Subscription } from '../../types/subscription';

interface DeleteSubscriptionModalProps {
  subscription: Subscription | null;
  onClose: () => void;
  onConfirm: (s: Subscription) => void;
}

export default function DeleteSubscriptionModal({ subscription, onClose, onConfirm }: DeleteSubscriptionModalProps) {
  if (!subscription) return null;

  return (
    <Modal
      isOpen={!!subscription}
      onClose={onClose}
      title="Delete subscription?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onConfirm(subscription)}
            className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90"
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        This will remove <span className="font-medium text-ink">{subscription.serviceName}</span> from MoneyLens. This
        does not cancel the real service.
      </p>
    </Modal>
  );
}