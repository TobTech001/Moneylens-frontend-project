import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { SUBSCRIPTIONS_PREVIEW } from '../../data/DashboardData';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function SubscriptionPreview() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Upcoming Payments</h2>
        <Link to="/subscriptions" className="text-xs font-medium text-primary hover:text-primary-hover">
          Manage Subscriptions →
        </Link>
      </div>

      <div className="mt-4 divide-y divide-line">
        {SUBSCRIPTIONS_PREVIEW.map((sub) => (
          <div key={sub.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-ink">{sub.name}</p>
              <p className="text-xs text-mist">Renews in {sub.renewsInDays} days</p>
            </div>
            <span className="text-sm font-semibold text-ink">{formatNaira(sub.amount)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}