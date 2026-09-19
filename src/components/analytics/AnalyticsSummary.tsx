import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { AnalyticsSummary as AnalyticsSummaryType } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface AnalyticsSummaryProps {
  summary: AnalyticsSummaryType;
  isLoading?: boolean;
}

export default function AnalyticsSummary({ summary, isLoading }: AnalyticsSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-28" />
            <Skeleton className="mt-2 h-3 w-20" />
          </Card>
        ))}
      </div>
    );
  }

  const changeUp = summary.spendingChangePct >= 0;

  const cards = [
    {
      icon: '💸',
      label: 'Total Spending',
      value: formatNaira(summary.totalSpending),
      supporting: 'This month',
    },
    {
      icon: '📅',
      label: 'Average Daily Spending',
      value: formatNaira(summary.averageDailySpending),
      supporting: 'Based on your selected period',
    },
    {
      icon: '🍔',
      label: 'Top Category',
      value: summary.topCategory,
      supporting: `${formatNaira(summary.topCategoryAmount)} spent`,
    },
    {
      icon: changeUp ? '⚠️' : '✅',
      label: 'Spending Change',
      value: `${changeUp ? '+' : ''}${summary.spendingChangePct}%`,
      supporting: 'Compared with last month',
      tone: changeUp ? 'warning' : 'primary',
    },
  ] as const;

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
              'tone' in card && card.tone === 'warning' ? 'text-warning' : 'tone' in card && card.tone === 'primary' ? 'text-primary' : 'text-ink'
            }`}
          >
            {card.value}
          </p>
          <p className="mt-1 text-xs text-mist">{card.supporting}</p>
        </Card>
      ))}
    </div>
  );
}