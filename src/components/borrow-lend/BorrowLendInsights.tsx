import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { BorrowLendRecordWithStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface BorrowLendInsightsProps {
  records: BorrowLendRecordWithStatus[];
  isLoading?: boolean;
}

export default function BorrowLendInsights({ records, isLoading }: BorrowLendInsightsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-48" />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const owedToYou = records.filter((r) => r.type === 'lent').reduce((sum, r) => sum + r.remainingAmount, 0);
  const youOwe = records.filter((r) => r.type === 'borrowed').reduce((sum, r) => sum + r.remainingAmount, 0);
  const upcomingCount = records.filter((r) => (r.status === 'outstanding' || r.status === 'partially-paid') && r.daysUntilDue >= 0 && r.daysUntilDue <= 7).length;

  const insights = [
    { icon: '💰', title: `You are owed ${formatNaira(owedToYou)}`, description: 'People currently owe you this much in total.' },
    { icon: '📌', title: `You owe ${formatNaira(youOwe)}`, description: 'Your outstanding borrowed balance.' },
    {
      icon: '⏰',
      title: `${upcomingCount} payment${upcomingCount === 1 ? '' : 's'} coming up`,
      description: `You have ${upcomingCount} record${upcomingCount === 1 ? '' : 's'} with upcoming due dates.`,
    },
  ];

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Borrow & Lend Insights</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {insights.map((insight) => (
          <div key={insight.title} className="rounded-xl border border-line bg-surface-alt p-4">
            <span className="text-lg leading-none">{insight.icon}</span>
            <p className="mt-2 text-sm font-semibold text-ink">{insight.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate">{insight.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}