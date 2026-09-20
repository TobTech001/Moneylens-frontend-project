import Badge from '../common/Badge';
import SubscriptionActionsMenu from './SubscriptionActionsMenu';
import { CATEGORY_ICONS } from '../../data/SubscriptionData';
import { FREQUENCY_LABEL, SUBSCRIPTION_STATUS_LABEL, getPaymentDueLabel, type Subscription, type SubscriptionStatus } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

const STATUS_TONE: Record<SubscriptionStatus, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  active: 'positive',
  paused: 'warning',
  cancelled: 'neutral',
  'payment-failed': 'negative',
};

interface SubscriptionCardProps {
  subscription: Subscription;
  onView: (s: Subscription) => void;
  onEdit: (s: Subscription) => void;
  onPause: (s: Subscription) => void;
  onCancel: (s: Subscription) => void;
  onDelete: (s: Subscription) => void;
}

export default function SubscriptionCard({ subscription: s, onView, onEdit, onPause, onCancel, onDelete }: SubscriptionCardProps) {
  return (
    <div
      className="rounded-xl border border-line bg-surface p-4 lg:hidden"
      onClick={() => onView(s)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView(s)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-alt text-base">
            {CATEGORY_ICONS[s.category]}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{s.serviceName}</p>
            <p className="text-xs text-mist">{s.category}</p>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <SubscriptionActionsMenu status={s.status} onEdit={() => onEdit(s)} onPause={() => onPause(s)} onCancel={() => onCancel(s)} onDelete={() => onDelete(s)} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-display text-lg font-semibold text-ink">{formatNaira(s.amount)}</span>
        <span className="text-xs text-mist">{FREQUENCY_LABEL[s.frequency]}</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-mist">
          Next: {formatDate(s.nextPaymentDate)} · {s.status === 'active' ? getPaymentDueLabel(s.nextPaymentDate) : SUBSCRIPTION_STATUS_LABEL[s.status]}
        </span>
        <Badge tone={STATUS_TONE[s.status]}>{SUBSCRIPTION_STATUS_LABEL[s.status]}</Badge>
      </div>
    </div>
  );
}