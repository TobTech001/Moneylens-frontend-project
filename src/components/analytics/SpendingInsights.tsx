import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import InsightCard from './InsightCard';
import type { AnalyticsDataset, AnalyticsInsight } from '../../types/analytics';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

/** Derives a handful of readable insights from the current period's dataset,
 * rather than hardcoding them, so they update when the period changes. */
function buildInsights(dataset: AnalyticsDataset): AnalyticsInsight[] {
  const { categories, merchants, summary } = dataset;
  const insights: AnalyticsInsight[] = [];

  const top = categories[0];
  if (top) {
    insights.push({
      id: 'top-category',
      title: `${top.category} spending increased`,
      description: `You spent ${formatNaira(top.amount)} on ${top.category} this month, which is ${Math.abs(top.changePct)}% ${
        top.changePct >= 0 ? 'more' : 'less'
      } than last period.`,
      type: 'alert',
      actionLabel: 'View Transactions',
      actionHref: '/transactions',
    });
  }

  const second = categories[1];
  if (second) {
    insights.push({
      id: 'second-category',
      title: `${second.category} is your second-largest category`,
      description: `You spent ${formatNaira(second.amount)} on ${second.category} this period.`,
      type: 'info',
      actionLabel: 'View Category',
      actionHref: '/transactions',
    });
  }

  if (top) {
    const potentialSaving = Math.round(top.amount * 0.1);
    insights.push({
      id: 'savings-opportunity',
      title: 'You have a potential savings opportunity',
      description: `Reducing ${top.category.toLowerCase()} spending by 10% could save approximately ${formatNaira(
        potentialSaving,
      )} this period.`,
      type: 'opportunity',
      actionLabel: 'Review Spending',
      actionHref: '/budget',
    });
  }

  const subscriptionTotal = merchants
    .filter((m) => m.category === 'Subscriptions')
    .reduce((sum, m) => sum + m.totalAmount, 0);
  if (subscriptionTotal > 0) {
    insights.push({
      id: 'subscriptions',
      title: 'Subscription spending detected',
      description: `You spent ${formatNaira(subscriptionTotal)} on subscriptions this period.`,
      type: 'subscription',
      actionLabel: 'View Transactions',
      actionHref: '/transactions',
    });
  }

  return insights.slice(0, 4).map((insight) =>
    summary.spendingChangePct < 0 && insight.id === 'top-category'
      ? { ...insight, type: 'info' as const }
      : insight,
  );
}

interface SpendingInsightsProps {
  dataset: AnalyticsDataset;
  isLoading?: boolean;
}

export default function SpendingInsights({ dataset, isLoading }: SpendingInsightsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-48" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const insights = buildInsights(dataset);

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">MoneyLens Insights</h2>
      <p className="mt-1 text-sm text-slate">Personalized observations based on your spending activity.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </Card>
  );
}