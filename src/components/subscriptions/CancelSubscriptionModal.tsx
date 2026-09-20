import Modal from '../common/Modal';
import Button from '../common/Button';
import type { Subscription } from '../../types/subscription';

interface CancelSubscriptionModalProps {
  subscription: Subscription | null;
  onClose: () => void;
  onConfirm: (s: Subscription) => void;
}

export default function CancelSubscriptionModal({ subscription, onClose, onConfirm }: CancelSubscriptionModalProps) {
  if (!subscription) return null;

  return (
    <Modal
      isOpen={!!subscription}
      onClose={onClose}
      title="Cancel subscription?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Keep Subscription
          </Button>
          <Button type="button" onClick={() => onConfirm(subscription)} className="!bg-danger hover:!bg-danger/90">
            Cancel Subscription
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        Are you sure you want to cancel <span className="font-medium text-ink">{subscription.serviceName}</span>? This
        only updates MoneyLens — it does not cancel the real service.
      </p>
    </Modal>
  );
}