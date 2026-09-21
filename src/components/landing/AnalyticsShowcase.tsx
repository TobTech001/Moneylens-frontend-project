import Container from './Container';
import Reveal from './Reveal';
import { useInView } from '../../hooks/useInView';
import { ANALYTICS_TREND, ANALYTICS_CATEGORIES } from '../../data/LandingPageData';

function AnimatedChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  const points = ANALYTICS_TREND.map((v, i) => `${(i / (ANALYTICS_TREND.length - 1)) * 300},${100 - v}`).join(' ');
  const areaPoints = `0,100 ${points} 300,100`;

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate">Spending Overview</p>
          <p className="font-display text-2xl font-semibold text-ink">₦120,000</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" /> Income
          </span>
          <span className="flex items-center gap-1.5 text-mist">
            <span className="h-2 w-2 rounded-full bg-mist" /> Expenses
          </span>
        </div>
      </div>

      <svg viewBox="0 0 300 100" className="mt-6 h-40 w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill="url(#analyticsFill)"
          className="transition-opacity duration-1000"
          style={{ opacity: inView ? 1 : 0 }}
        />
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: inView ? 0 : 100,
            transition: 'stroke-dashoffset 1.4s ease-out',
          }}
        />
      </svg>

      <div className="mt-2 flex justify-between text-[11px] text-mist">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
        <span>Dec</span>
      </div>
    </div>
  );
}

export default function AnalyticsShowcase() {
  return (
    <section id="analytics" className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Analytics That Actually Explain Things
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Every transaction rolls up into a picture you can actually act on.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal variant="scale-in">
            <AnimatedChart />
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <p className="text-sm font-medium text-ink">Spending by category</p>
              <div className="mt-4 space-y-3">
                {ANALYTICS_CATEGORIES.map((c) => (
                  <div key={c.category} className="flex items-center gap-3">
                    <span className="w-32 shrink-0 text-sm text-ink">
                      {c.icon} {c.category}
                    </span>
                    <div className="h-2 flex-1 rounded-full bg-surface-alt">
                      <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent-2 transition-all duration-1000" style={{ width: `${c.percentage}%` }} />
                    </div>
                    <span className="w-10 shrink-0 text-right text-xs text-slate">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}