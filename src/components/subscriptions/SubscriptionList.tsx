import Badge from '../common/Badge';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import SubscriptionActionsMenu from './SubscriptionActionsMenu';
import SubscriptionCard from './SubscriptionCard';
import { CATEGORY_ICONS } from '../../data/SubscriptionData';
import { FREQUENCY_LABEL, SUBSCRIPTION_STATUS_LABEL, type Subscription, type SubscriptionStatus } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
}

const STATUS_TONE: Record<SubscriptionStatus, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  active: 'positive',
  paused: 'warning',
  cancelled: 'neutral',
  'payment-failed': 'negative',
};

interface SubscriptionListProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
  onView: (s: Subscription) => void;
  onEdit: (s: Subscription) => void;
  onPause: (s: Subscription) => void;
  onCancel: (s: Subscription) => void;
  onDelete: (s: Subscription) => void;
  onAdd: () => void;
  onClearFilters: () => void;
  hasAnySubscriptions: boolean;
}

export default function SubscriptionList({
  subscriptions,
  isLoading,
  onView,
  onEdit,
  onPause,
  onCancel,
  onDelete,
  onAdd,
  onClearFilters,
  hasAnySubscriptions,
}: SubscriptionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!hasAnySubscriptions) {
    return (
      <EmptyState
        icon="🔔"
        title="No subscriptions yet"
        message="Add your recurring payments to keep track of where your money goes every month."
        action={
          <Button type="button" onClick={onAdd}>
            + Add Subscription
          </Button>
        }
      />
    );
  }

  if (subscriptions.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No matching subscriptions"
        message="Try changing your search or filters."
        action={
          <Button type="button" variant="secondary" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-slate">
              <th scope="col" className="px-5 py-3.5 font-medium">Service</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Category</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Amount</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Frequency</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Next Payment</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
              <th scope="col" className="px-5 py-3.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {subscriptions.map((s) => (
              <tr key={s.id} className="cursor-pointer transition-colors hover:bg-surface-alt/60" onClick={() => onView(s)}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-alt text-sm">{CATEGORY_ICONS[s.category]}</span>
                    <span className="font-medium text-ink">{s.serviceName}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-slate">{s.category}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-ink">{formatNaira(s.amount)}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-slate">{FREQUENCY_LABEL[s.frequency]}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-slate">{formatDate(s.nextPaymentDate)}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <Badge tone={STATUS_TONE[s.status]}>{SUBSCRIPTION_STATUS_LABEL[s.status]}</Badge>
                </td>
                <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end">
                    <SubscriptionActionsMenu status={s.status} onEdit={() => onEdit(s)} onPause={() => onPause(s)} onCancel={() => onCancel(s)} onDelete={() => onDelete(s)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 lg:hidden">
        {subscriptions.map((s) => (
          <SubscriptionCard key={s.id} subscription={s} onView={onView} onEdit={onEdit} onPause={onPause} onCancel={onCancel} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}