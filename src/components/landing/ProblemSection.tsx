import Container from './Container';

const ALERTS = [
  { bank: 'GTBank', text: 'Debit Alert: N5,000.00 to 08012345678. Bal N241,880.15', time: '2 min ago' },
  { bank: 'Kuda', text: 'You made a transfer of N2,100.00 to BOLT NG. New balance N118,340.00', time: '3h ago' },
  { bank: 'Access', text: 'Debit: NGN18,500.00 to NETFLIX/SPOTIFY/DSTV. Available balance NGN64,120.40', time: '1d ago' },
];

export default function ProblemSection() {
  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Your money isn't disappearing. You just can't see where it's going.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
          Every debit alert lands, and gets forgotten by the next one. By month end you know your balance dropped —
          but not how much went to food, how much to transport, or which subscriptions quietly drained your account.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-danger">
              <span></span> Confusing transaction alerts
            </p>
            <div className="space-y-3">
              {ALERTS.map((a) => (
                <div key={a.bank} className="rounded-xl border border-line bg-surface p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-xs font-medium text-slate">{a.bank}</p>
                    <p className="text-[11px] text-mist">{a.time}</p>
                  </div>
                  <p className="font-mono text-[13px] leading-relaxed text-ink">{a.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <span></span> Clear spending categories
            </p>
            <div className="rounded-xl border border-primary/25 bg-surface p-5 shadow-[0_0_40px_-20px_var(--color-primary)]">
              <div className="space-y-3">
                {[
                  { label: 'Transport', amount: '₦2,100', pct: 40 },
                  { label: 'Subscriptions', amount: '₦18,500', pct: 85 },
                  { label: 'Transfers', amount: '₦5,000', pct: 55 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink">{row.label}</span>
                      <span className="text-slate">{row.amount}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-bg">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent-2"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-slate">
                Same three alerts — now organized into categories you can actually act on.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}