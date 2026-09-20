import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { BorrowLendRecordWithStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface BorrowLendSummaryProps {
  records: BorrowLendRecordWithStatus[];
  isLoading?: boolean;
}

export default function BorrowLendSummary({ records, isLoading }: BorrowLendSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-28" />
          </Card>
        ))}
      </div>
    );
  }

  const lent = records.filter((r) => r.type === 'lent');
  const borrowed = records.filter((r) => r.type === 'borrowed');

  const moneyLent = lent.reduce((sum, r) => sum + r.amount, 0);
  const moneyBorrowed = borrowed.reduce((sum, r) => sum + r.amount, 0);
  const toReceive = lent.reduce((sum, r) => sum + r.remainingAmount, 0);
  const toPay = borrowed.reduce((sum, r) => sum + r.remainingAmount, 0);

  const cards = [
    { icon: '📤', label: 'Money Lent', value: moneyLent, supporting: 'Money others owe you', tone: 'ink' as const },
    { icon: '📥', label: 'Money Borrowed', value: moneyBorrowed, supporting: 'Money you owe others', tone: 'ink' as const },
    { icon: '💰', label: 'To Receive', value: toReceive, supporting: 'Still outstanding', tone: 'primary' as const },
    { icon: '📌', label: 'To Pay', value: toPay, supporting: 'Still outstanding', tone: 'warning' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{card.icon}</span>
            <p className="text-xs text-slate">{card.label}</p>
          </div>
          <p
            className={`mt-2 font-display text-xl font-semibold sm:text-2xl ${
              card.tone === 'primary' ? 'text-primary' : card.tone === 'warning' ? 'text-warning' : 'text-ink'
            }`}
          >
            {formatNaira(card.value)}
          </p>
          <p className="mt-1 text-xs text-mist">{card.supporting}</p>
        </Card>
      ))}
    </div>
  );
}