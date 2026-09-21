import { IconAlert } from '../icons';

const TRANSACTIONS = [
  { name: 'Chicken Republic', category: 'Food', amount: '-₦4,500' },
  { name: 'Bolt', category: 'Transport', amount: '-₦3,200' },
  { name: 'Salary', category: 'Income', amount: '+₦250,000' },
];

export default function HeroDashboard() {
  return (
    <div className="relative animate-float">
      <div className="rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary-dim to-primary-tint p-4">
          <p className="text-xs text-primary-hover/90">Total Balance</p>
          <p className="mt-1 font-display text-2xl font-semibold text-white">₦524,680</p>
          <p className="mt-1 text-xs text-primary-hover/90">This Month +12.4%</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line bg-surface-alt p-3.5">
            <p className="text-xs text-slate">Income</p>
            <p className="mt-1 font-display text-lg font-semibold text-primary">+₦250,000</p>
          </div>
          <div className="rounded-xl border border-line bg-surface-alt p-3.5">
            <p className="text-xs text-slate">Expenses</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">-₦120,000</p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-line bg-surface-alt/60 p-3.5">
          <p className="mb-2 text-xs font-medium text-slate">Spending trend</p>
          <svg viewBox="0 0 280 70" className="h-16 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon fill="url(#heroTrend)" points="0,60 35,40 70,52 105,25 140,38 175,18 210,32 245,15 280,28 280,70 0,70" />
            <polyline
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,60 35,40 70,52 105,25 140,38 175,18 210,32 245,15 280,28"
            />
          </svg>
        </div>

        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-warning/25 bg-warning/10 p-3">
          <IconAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <p className="text-xs leading-snug text-ink">
            You're spending <span className="font-semibold text-warning">18% more on food</span> this month.
          </p>
        </div>

        <div className="mt-3 rounded-xl border border-line bg-surface-alt/60 p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate">Food budget</span>
            <span className="text-warning">82%</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-bg">
            <div className="h-1.5 w-[82%] rounded-full bg-gradient-to-r from-warning to-danger" />
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-line bg-surface-alt/60 p-3.5">
          <p className="mb-2 text-xs font-medium text-slate">Recent transactions</p>
          <div className="divide-y divide-line">
            {TRANSACTIONS.map((t) => (
              <div key={t.name} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-ink">{t.name}</p>
                  <p className="text-[11px] text-mist">{t.category}</p>
                </div>
                <span className={`shrink-0 text-xs font-semibold ${t.amount.startsWith('+') ? 'text-primary' : 'text-ink'}`}>{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -left-8 top-8 hidden rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:block">
        <p className="text-[11px] text-slate">This week</p>
        <p className="font-display text-sm font-semibold text-primary">+₦82,400</p>
      </div>
      <div className="absolute -right-6 bottom-10 hidden rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:block">
        <p className="text-[11px] text-slate">Subscriptions</p>
        <p className="font-display text-sm font-semibold text-accent">₦18,500</p>
      </div>
    </div>
  );
}