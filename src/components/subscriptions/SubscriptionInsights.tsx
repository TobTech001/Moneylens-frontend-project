import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { daysUntil, toMonthlyCost, toYearlyCost, type Subscription } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

interface SubscriptionInsightsProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
}

/** Every insight below is computed from the current subscription list, not hardcoded. */
export default function SubscriptionInsights({ subscriptions, isLoading }: SubscriptionInsightsProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-48" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const active = subscriptions.filter((s) => s.status === 'active');
  const monthlyCost = active.reduce((sum, s) => sum + toMonthlyCost(s.amount, s.frequency), 0);
  const yearlyCost = active.reduce((sum, s) => sum + toYearlyCost(s.amount, s.frequency), 0);

  const totalsByCategory = new Map<string, number>();
  active.forEach((s) => totalsByCategory.set(s.category, (totalsByCategory.get(s.category) ?? 0) + toMonthlyCost(s.amount, s.frequency)));
  const [topCategory, topCategoryAmount] = Array.from(totalsByCategory.entries()).sort((a, b) => b[1] - a[1])[0] ?? ['—', 0];

  const now = new Date();
  const upcomingThisMonth = active.filter((s) => {
    const d = new Date(s.nextPaymentDate + 'T00:00:00');
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const paymentFailedCount = subscriptions.filter((s) => s.status === 'payment-failed').length;
  const staleCount = active.filter((s) => daysUntil(s.nextPaymentDate) < -30).length;
  const reviewCount = paymentFailedCount + staleCount;

  const insights = [
    {
      icon: '💳',
      title: `Your subscriptions cost ${formatNaira(monthlyCost)} monthly`,
      description: `That's approximately ${formatNaira(yearlyCost)} per year.`,
    },
    {
      icon: '🎬',
      title: `${topCategory} is your largest subscription category`,
      description: `You spend approximately ${formatNaira(topCategoryAmount)} per month on ${topCategory.toLowerCase()} services.`,
    },
    {
      icon: '📅',
      title: `${upcomingThisMonth} payment${upcomingThisMonth === 1 ? '' : 's'} coming up`,
      description: `You have ${upcomingThisMonth} subscription payment${upcomingThisMonth === 1 ? '' : 's'} scheduled for this month.`,
    },
  ];

  if (reviewCount > 0) {
    insights.push({
      icon: '🔎',
      title: 'Review unused subscriptions',
      description: `You have ${reviewCount} subscription${reviewCount === 1 ? '' : 's'} that may be worth reviewing before the next billing cycle.`,
    });
  }

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">MoneyLens Insights</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
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