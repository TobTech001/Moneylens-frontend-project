import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { BUDGET_ITEMS } from '../../data/DashboardData';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function BudgetProgress() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Monthly Budgets</h2>
        <Link to="/budget" className="text-xs font-medium text-primary hover:text-primary-hover">
          Manage Budgets →
        </Link>
      </div>

      <div className="mt-5 space-y-4">
        {BUDGET_ITEMS.map((b) => {
          const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
          const atLimit = pct >= 100;
          const near = pct >= 80 && pct < 100;
          const barColor = atLimit ? 'bg-danger' : near ? 'bg-warning' : 'bg-primary';

          return (
            <div key={b.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">
                  {b.icon} {b.category}
                </span>
                <span className="text-slate">
                  {formatNaira(b.spent)} <span className="text-mist">/ {formatNaira(b.limit)}</span>
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-surface-alt">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className={`mt-1 text-xs ${atLimit ? 'text-danger' : near ? 'text-warning' : 'text-mist'}`}>{pct}%</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}