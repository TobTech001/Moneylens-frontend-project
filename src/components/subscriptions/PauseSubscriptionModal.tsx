import Modal from '../common/Modal';
import Button from '../common/Button';
import type { Subscription } from '../../types/subscription';

interface PauseSubscriptionModalProps {
  subscription: Subscription | null;
  onClose: () => void;
  onConfirm: (s: Subscription) => void;
}

export default function PauseSubscriptionModal({ subscription, onClose, onConfirm }: PauseSubscriptionModalProps) {
  if (!subscription) return null;

  return (
    <Modal
      isOpen={!!subscription}
      onClose={onClose}
      title="Pause subscription?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={() => onConfirm(subscription)}>
            Pause Subscription
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        <span className="font-medium text-ink">{subscription.serviceName}</span> will be marked as paused and removed
        from your active subscription totals.
      </p>
    </Modal>
  );
}