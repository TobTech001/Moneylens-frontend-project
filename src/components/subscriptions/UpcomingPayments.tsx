import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { daysUntil, getPaymentDueLabel, type Subscription } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric' });
}

interface UpcomingPaymentsProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
  onViewDetails: (s: Subscription) => void;
}

export default function UpcomingPayments({ subscriptions, isLoading, onViewDetails }: UpcomingPaymentsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const upcoming = subscriptions
    .filter((s) => s.status === 'active' && daysUntil(s.nextPaymentDate) >= 0)
    .sort((a, b) => daysUntil(a.nextPaymentDate) - daysUntil(b.nextPaymentDate))
    .slice(0, 5);

  if (upcoming.length === 0) return null;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Upcoming Payments</h2>
      <div className="mt-4 divide-y divide-line">
        {upcoming.map((s) => {
          const days = daysUntil(s.nextPaymentDate);
          const dueSoon = days <= 3;
          return (
            <div key={s.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{s.serviceName}</p>
                <p className="text-xs text-mist">
                  {formatNaira(s.amount)} · Due {formatDate(s.nextPaymentDate)}
                </p>
                <p className={`mt-0.5 text-xs font-medium ${dueSoon ? 'text-warning' : 'text-slate'}`}>{getPaymentDueLabel(s.nextPaymentDate)}</p>
              </div>
              <button type="button" onClick={() => onViewDetails(s)} className="shrink-0 text-xs font-medium text-primary hover:text-primary-hover">
                View Details →
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}