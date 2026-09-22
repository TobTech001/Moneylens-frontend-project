import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import HeroDashboard from './HeroDashboard';
import SocialProof from './SocialProof';
import Reveal from '../common/Reveal';
import { IconArrowRight } from '../Icons';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      {/* mouse-following glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 hover:opacity-100 sm:opacity-100"
        style={{
          background: 'radial-gradient(500px circle at var(--mx, 50%) var(--my, 20%), color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 70%)',
        }}
        aria-hidden
      />
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(to right, #E7EBF3 1px, transparent 1px), linear-gradient(to bottom, #E7EBF3 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-[110px]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-40 -z-10 h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-[110px]" aria-hidden />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
          <div>
            <Reveal variant="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-tint px-3.5 py-1.5 text-xs font-medium text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-primary" />
                </span>
                Smart money management, made simple
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={100}>
              <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
                Know Where Your Money Goes.{' '}
                <span className="bg-gradient-to-r from-primary via-primary-hover to-accent-2 bg-clip-text text-transparent">
                  Build a Better Financial Future.
                </span>
              </h1>
            </Reveal>

            <Reveal variant="fade-up" delay={200}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate sm:text-lg">
                MoneyLens helps you track spending, manage budgets, monitor subscriptions, and understand your
                financial habits — all in one place.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-8px_var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_40px_-6px_var(--color-primary)] active:translate-y-0"
                >
                  Get Started Free
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg border border-line bg-surface/60 px-6 py-3 text-sm font-medium text-ink backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-surface"
                >
                  Explore MoneyLens
                </a>
              </div>
            </Reveal>

            <Reveal variant="fade-in" delay={400} className="mt-8">
              <SocialProof />
            </Reveal>
          </div>

          <Reveal variant="scale-in" delay={200}>
            <div className="relative">
              <HeroDashboard />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}