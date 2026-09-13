import Container from './Container';

const BUDGETS = [
  { category: 'Food', spent: 24500, limit: 30000 },
  { category: 'Transport', spent: 18000, limit: 25000 },
  { category: 'Subscriptions', spent: 21000, limit: 21000 },
];

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function BudgetPreview() {
  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Don't just watch your money. Take control of it.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate">
              Set a limit for each category, and MoneyLens keeps you posted as you spend — so you find out before
              you've gone over, not after.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Set daily, weekly, or monthly spending limits
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Track your progress in real time
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Get warnings before you overspend
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            {BUDGETS.map((b) => {
              const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
              const atLimit = pct >= 100;
              const near = pct >= 80 && pct < 100;
              return (
                <div key={b.category} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-medium text-ink">{b.category}</p>
                    <p className="text-sm text-slate">
                      {formatNaira(b.spent)} <span className="text-mist">/ {formatNaira(b.limit)}</span>
                    </p>
                  </div>
                  <div className="mt-2.5 h-2 rounded-full bg-bg">
                    <div
                      className={`h-2 rounded-full ${
                        atLimit
                          ? 'bg-danger'
                          : near
                            ? 'bg-warning'
                            : 'bg-gradient-to-r from-primary to-accent-2'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {atLimit && <p className="mt-1.5 text-xs text-danger">You've reached this month's limit.</p>}
                  {near && !atLimit && <p className="mt-1.5 text-xs text-warning">Almost at your limit.</p>}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}