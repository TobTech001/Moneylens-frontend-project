import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { toMonthlyCost, toYearlyCost, type Subscription } from '../../types/subscription';

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

function isDueThisMonth(dateISO: string, now: Date): boolean {
  const d = new Date(dateISO + 'T00:00:00');
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

interface SubscriptionSummaryProps {
  subscriptions: Subscription[];
  isLoading?: boolean;
}

export default function SubscriptionSummary({ subscriptions, isLoading }: SubscriptionSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-24" />
          </Card>
        ))}
      </div>
    );
  }

  const active = subscriptions.filter((s) => s.status === 'active');
  const monthlyCost = active.reduce((sum, s) => sum + toMonthlyCost(s.amount, s.frequency), 0);
  const yearlyCost = active.reduce((sum, s) => sum + toYearlyCost(s.amount, s.frequency), 0);
  const now = new Date();
  const upcomingThisMonth = active.filter((s) => isDueThisMonth(s.nextPaymentDate, now)).length;

  const cards = [
    { icon: '💳', label: 'Monthly Cost', value: formatNaira(monthlyCost), supporting: 'Recurring payments per month' },
    { icon: '✅', label: 'Active Subscriptions', value: String(active.length), supporting: 'Currently active' },
    { icon: '📅', label: 'Upcoming Payments', value: String(upcomingThisMonth), supporting: 'Due this month' },
    { icon: '📊', label: 'Yearly Cost', value: formatNaira(yearlyCost), supporting: 'Estimated annual cost' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{card.icon}</span>
            <p className="text-xs text-slate">{card.label}</p>
          </div>
          <p className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">{card.value}</p>
          <p className="mt-1 text-xs text-mist">{card.supporting}</p>
        </Card>
      ))}
    </div>
  );
}