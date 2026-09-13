import Container from './Container';

export default function ProductPreview() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
        aria-hidden
      />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            One dashboard. Your whole financial picture.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Transactions, analytics, and insights — all in one place, always up to date.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* main frame */}
          <div className="rounded-2xl border border-line bg-surface p-3 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] sm:p-4">
            <div className="mb-3 flex items-center gap-1.5 px-1">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            <div className="rounded-xl border border-line bg-bg-alt p-5 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gradient-to-br from-primary-dim to-primary-tint p-4 sm:col-span-1">
                  <p className="text-xs text-primary-hover/90">Balance</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-white">₦130,000</p>
                </div>
                <div className="rounded-xl border border-line bg-surface p-4">
                  <p className="text-xs text-slate">This month</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">₦120,000</p>
                  <p className="mt-1 text-xs text-warning">+32% vs last month</p>
                </div>
                <div className="rounded-xl border border-line bg-surface p-4">
                  <p className="text-xs text-slate">Top category</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">🍔 Food</p>
                  <p className="mt-1 text-xs text-slate">₦47,500</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[1.3fr_1fr]">
                <div className="rounded-xl border border-line bg-surface p-4">
                  <p className="mb-3 text-xs font-medium text-slate">Spending analytics</p>
                  <svg viewBox="0 0 280 80" className="h-20 w-full" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="var(--color-accent-2)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,60 35,40 70,52 105,25 140,38 175,18 210,32 245,15 280,28"
                    />
                  </svg>
                </div>
                <div className="rounded-xl border border-line bg-surface p-4">
                  <p className="mb-2.5 text-xs font-medium text-slate">Recent transactions</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-ink">
                      <span>Jumia Food</span>
                      <span>-₦4,200</span>
                    </div>
                    <div className="flex justify-between text-ink">
                      <span>Bolt</span>
                      <span>-₦2,100</span>
                    </div>
                    <div className="flex justify-between text-primary">
                      <span>Salary</span>
                      <span>+₦450,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* floating layered cards */}
          <div className="absolute -left-6 top-10 hidden w-44 rounded-xl border border-line bg-surface/95 p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl md:block">
            <p className="text-[11px] text-slate">Financial insight</p>
            <p className="mt-1 text-xs leading-relaxed text-ink">
              You're close to your <span className="text-warning">food budget</span> limit.
            </p>
          </div>
          <div className="absolute -right-6 bottom-6 hidden w-40 rounded-xl border border-line bg-surface/95 p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl md:block">
            <p className="text-[11px] text-slate">Subscriptions</p>
            <p className="mt-1 font-display text-lg font-semibold text-accent">₦18,500</p>
          </div>
        </div>
      </Container>
    </section>
  );
}