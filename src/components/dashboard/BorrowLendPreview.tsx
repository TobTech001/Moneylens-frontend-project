import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { BORROW_LEND_SUMMARY } from '../../data/DashboardData';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function BorrowLendPreview() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Borrow & Lend</h2>
        <Link to="/borrow-lend" className="text-xs font-medium text-primary hover:text-primary-hover">
          View Details →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-primary/25 bg-primary-tint p-3.5">
          <p className="text-xs text-slate">You are owed</p>
          <p className="mt-1 font-display text-lg font-semibold text-primary">
            {formatNaira(BORROW_LEND_SUMMARY.owedToYou)}
          </p>
        </div>
        <div className="rounded-xl border border-warning/25 bg-warning/10 p-3.5">
          <p className="text-xs text-slate">You owe</p>
          <p className="mt-1 font-display text-lg font-semibold text-warning">
            {formatNaira(BORROW_LEND_SUMMARY.youOwe)}
          </p>
        </div>
      </div>
    </Card>
  );
}