import { Link } from 'react-router-dom';
import Container from './Container';
import DashboardPreview from './DashboardPreview';
import { IconArrowRight } from '../Icons';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* background: subtle grid + glow orbs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E7EBF3 1px, transparent 1px), linear-gradient(to bottom, #E7EBF3 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-40 -z-10 h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-[110px]"
        aria-hidden
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
          <div>
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Finally, see where your <span className="text-primary">money</span> goes.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate sm:text-lg">
              MoneyLens automatically helps you understand your spending, track your financial habits, and make
              smarter decisions with your money.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-8px_var(--color-primary)] transition-colors hover:bg-primary-hover"
              >
                Start Understanding Your Money
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-line bg-surface/60 px-6 py-3 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-primary/40 hover:bg-surface"
              >
                See How It Works
              </a>
            </div>

            <p className="mt-6 text-xs text-mist">No card required to get started.</p>
          </div>

          <div className="relative">
            <DashboardPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}