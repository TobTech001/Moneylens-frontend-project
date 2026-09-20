import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { getDueDateLabel, type BorrowLendRecordWithStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric' });
}

interface UpcomingPaymentsProps {
  records: BorrowLendRecordWithStatus[];
  isLoading?: boolean;
  onViewDetails: (r: BorrowLendRecordWithStatus) => void;
}

export default function UpcomingPayments({ records, isLoading, onViewDetails }: UpcomingPaymentsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const upcoming = records
    .filter((r) => (r.status === 'outstanding' || r.status === 'partially-paid') && r.daysUntilDue >= 0)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  if (upcoming.length === 0) return null;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Upcoming Payments</h2>
      <div className="mt-4 divide-y divide-line">
        {upcoming.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{r.person}</p>
              <p className="text-xs text-mist">
                {formatNaira(r.remainingAmount)} remaining · Due {formatDate(r.dueDate)}
              </p>
              <p className="mt-0.5 text-xs font-medium text-warning">{getDueDateLabel(r)}</p>
            </div>
            <button type="button" onClick={() => onViewDetails(r)} className="shrink-0 text-xs font-medium text-primary hover:text-primary-hover">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}