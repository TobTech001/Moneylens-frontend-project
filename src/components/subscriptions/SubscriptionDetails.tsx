import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { CATEGORY_ICONS } from '../../data/SubscriptionData';
import {
  FREQUENCY_LABEL,
  SUBSCRIPTION_STATUS_LABEL,
  toYearlyCost,
  type Subscription,
  type SubscriptionStatus,
} from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' });
}

const STATUS_TONE: Record<SubscriptionStatus, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  active: 'positive',
  paused: 'warning',
  cancelled: 'neutral',
  'payment-failed': 'negative',
};

interface SubscriptionDetailsProps {
  subscription: Subscription | null;
  onClose: () => void;
  onEdit: (s: Subscription) => void;
  onPause: (s: Subscription) => void;
  onCancel: (s: Subscription) => void;
  onDelete: (s: Subscription) => void;
}

export default function SubscriptionDetails({ subscription, onClose, onEdit, onPause, onCancel, onDelete }: SubscriptionDetailsProps) {
  if (!subscription) return null;
  const s = subscription;

  return (
    <Modal
      isOpen={!!subscription}
      onClose={onClose}
      title={s.serviceName}
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={() => onDelete(s)} className="!text-danger">
            Delete
          </Button>
          {(s.status === 'active' || s.status === 'paused') && (
            <Button type="button" variant="secondary" onClick={() => onCancel(s)}>
              Cancel
            </Button>
          )}
          {s.status === 'active' && (
            <Button type="button" variant="secondary" onClick={() => onPause(s)}>
              Pause
            </Button>
          )}
          <Button type="button" onClick={() => onEdit(s)}>
            Edit
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface-alt text-xl">{CATEGORY_ICONS[s.category]}</span>
        <div>
          <p className="text-base font-semibold text-ink">{s.serviceName}</p>
          <p className="font-display text-lg font-semibold text-ink">
            {formatNaira(s.amount)} <span className="text-sm font-normal text-mist">/ {FREQUENCY_LABEL[s.frequency].toLowerCase()}</span>
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate">Category</dt>
          <dd className="text-ink">{s.category}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Billing Frequency</dt>
          <dd className="text-ink">{FREQUENCY_LABEL[s.frequency]}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Next Payment</dt>
          <dd className="text-ink">{formatDate(s.nextPaymentDate)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate">Status</dt>
          <dd>
            <Badge tone={STATUS_TONE[s.status]}>{SUBSCRIPTION_STATUS_LABEL[s.status]}</Badge>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate">Estimated Annual Cost</dt>
          <dd className="text-ink">{formatNaira(toYearlyCost(s.amount, s.frequency))}</dd>
        </div>
        {s.note && (
          <div>
            <dt className="text-slate">Note</dt>
            <dd className="mt-1 text-ink">{s.note}</dd>
          </div>
        )}
      </dl>
    </Modal>
  );
}