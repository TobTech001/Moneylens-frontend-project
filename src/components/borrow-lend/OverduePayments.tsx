import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { getDueDateLabel, type BorrowLendRecordWithStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', day: 'numeric' });
}

interface OverduePaymentsProps {
  records: BorrowLendRecordWithStatus[];
  isLoading?: boolean;
  onViewDetails: (r: BorrowLendRecordWithStatus) => void;
}

export default function OverduePayments({ records, isLoading, onViewDetails }: OverduePaymentsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-4 h-14 w-full" />
      </Card>
    );
  }

  const overdue = records.filter((r) => r.status === 'overdue');
  if (overdue.length === 0) return null;

  return (
    <Card className="!border-danger/25">
      <h2 className="font-display text-lg font-semibold text-danger">⚠️ Overdue</h2>
      <div className="mt-4 divide-y divide-line">
        {overdue.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{r.person}</p>
              <p className="text-xs text-mist">
                {formatNaira(r.remainingAmount)} remaining · Due {formatDate(r.dueDate)}
              </p>
              <p className="mt-0.5 text-xs font-medium text-danger">{getDueDateLabel(r)}</p>
            </div>
            <button type="button" onClick={() => onViewDetails(r)} className="shrink-0 text-xs font-medium text-danger hover:opacity-80">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}