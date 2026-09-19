import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { Transaction } from '../../types/transaction';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface TransactionSummaryProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export default function TransactionSummary({ transactions, isLoading }: TransactionSummaryProps) {
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const cards = [
    { label: 'Total Income', value: totalIncome, icon: '💰', tone: 'primary' as const },
    { label: 'Total Expenses', value: totalExpenses, icon: '💸', tone: 'danger' as const },
    { label: 'Money In', value: totalIncome, icon: '↗️', tone: 'primary' as const, signed: '+' as const },
    { label: 'Money Out', value: totalExpenses, icon: '↘️', tone: 'danger' as const, signed: '-' as const },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-3 h-7 w-28" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{card.icon}</span>
            <p className="text-xs text-slate">{card.label}</p>
          </div>
          <p className={`mt-2 font-display text-xl font-semibold sm:text-2xl ${card.tone === 'primary' ? 'text-primary' : 'text-danger'}`}>
            {card.signed ?? ''}
            {formatNaira(card.value)}
          </p>
        </Card>
      ))}
    </div>
  );
}