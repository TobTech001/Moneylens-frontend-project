import { IconAlert } from '../Icons';

interface AuthBrandPanelProps {
  headline: string;
  subtext: string;
}

export default function AuthBrandPanel({ headline, subtext }: AuthBrandPanelProps) {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-bg-alt p-10 lg:flex xl:p-14">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/15 blur-[110px]"
        aria-hidden
      />

      <a href="/" className="relative flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm">
          M
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-ink">MoneyLens</span>
      </a>

      <div className="relative">
        <h2 className="max-w-sm font-display text-3xl font-semibold leading-tight tracking-tight text-ink xl:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">{subtext}</p>

        {/* compact finance preview */}
        <div className="mt-10 max-w-sm rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gradient-to-br from-primary-dim to-primary-tint p-3.5">
              <p className="text-[11px] text-primary-hover/90">Monthly Spending</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">₦120,000</p>
            </div>
            <div className="rounded-xl border border-line bg-surface-alt p-3.5">
              <p className="text-[11px] text-slate">Top Category</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">🍔 Food</p>
              <p className="text-[11px] text-slate">₦47,500</p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-warning/25 bg-warning/10 p-3">
            <IconAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
            <p className="text-[11px] leading-snug text-ink">
              Your food spending increased by <span className="font-semibold text-warning">32%</span> this month.
            </p>
          </div>
        </div>
      </div>

      <p className="relative text-xs text-mist">Understand your money. Control your spending.</p>
    </div>
  );
}