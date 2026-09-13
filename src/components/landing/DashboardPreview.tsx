import { IconAlert } from '../Icons';

const TRANSACTIONS = [
  { name: 'Jumia Food', category: 'Food', amount: '-₦4,200' },
  { name: 'Bolt', category: 'Transport', amount: '-₦2,100' },
  { name: 'Salary — Flux Ltd', category: 'Income', amount: '+₦450,000' },
];

const CATEGORY_BARS = [
  { label: 'Food', value: 82, amount: '₦47,500' },
  { label: 'Transport', value: 54, amount: '₦31,200' },
  { label: 'Bills', value: 36, amount: '₦21,000' },
];

export default function DashboardPreview() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-primary-dim to-primary-tint p-4">
            <p className="text-xs text-primary-hover/90">Balance</p>
            <p className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">₦130,000</p>
          </div>
          <div className="rounded-xl border border-line bg-surface-alt p-4">
            <p className="text-xs text-slate">Total Spent</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">₦120,000</p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-warning/25 bg-warning/10 p-3">
          <IconAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <p className="text-xs leading-snug text-ink">
            You're spending <span className="font-semibold text-warning">32% more</span> than last month.
          </p>
        </div>

        <div className="mt-4 space-y-2.5 rounded-xl border border-line bg-surface-alt/60 p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate">Top category</p>
            <p className="text-xs text-slate">🍔 Food · ₦47,500</p>
          </div>
          {CATEGORY_BARS.map((c) => (
            <div key={c.label} className="flex items-center gap-2.5">
              <span className="w-16 shrink-0 text-xs text-ink">{c.label}</span>
              <div className="h-1.5 flex-1 rounded-full bg-bg">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent-2"
                  style={{ width: `${c.value}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-xs text-slate">{c.amount}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-line bg-surface-alt/60 p-3.5">
          <p className="mb-2 text-xs font-medium text-slate">Recent transactions</p>
          <div className="divide-y divide-line">
            {TRANSACTIONS.map((t) => (
              <div key={t.name} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-ink">{t.name}</p>
                  <p className="text-[11px] text-mist">{t.category}</p>
                </div>
                <span
                  className={`shrink-0 text-xs font-semibold ${
                    t.amount.startsWith('+') ? 'text-primary' : 'text-ink'
                  }`}
                >
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating insight chip */}
      <div className="absolute -left-8 -top-6 hidden rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:block">
        <p className="text-[11px] text-slate">This week</p>
        <p className="font-display text-sm font-semibold text-primary">+₦82,400</p>
      </div>
      <div className="absolute -bottom-6 -right-6 hidden rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:block">
        <p className="text-[11px] text-slate">Food budget</p>
        <p className="font-display text-sm font-semibold text-warning">91% used</p>
      </div>
    </div>
  );
}