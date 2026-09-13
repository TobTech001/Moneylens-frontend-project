import { Link } from 'react-router-dom';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import TransactionItem from './TransactionItem';
import { RECENT_TRANSACTIONS } from '../../data/DashboardData';

export default function RecentTransactions() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Recent Transactions</h2>
        <Link to="/transactions" className="text-xs font-medium text-primary hover:text-primary-hover">
          View All →
        </Link>
      </div>

      {RECENT_TRANSACTIONS.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon="🧾"
            title="No transactions yet"
            message="Add your first transaction and start understanding where your money goes."
            action={
              <Button type="button" variant="secondary">
                + Add Transaction
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-2 divide-y divide-line">
          {RECENT_TRANSACTIONS.map((t) => (
            <TransactionItem key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </Card>
  );
}