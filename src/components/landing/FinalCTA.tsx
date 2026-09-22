import { Link } from 'react-router-dom';
import Container from './Container';
import Reveal from '../common/Reveal';
import { IconArrowRight } from '../Icons';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-bg-alt py-20 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #E7EBF3 1px, transparent 1px), linear-gradient(to bottom, #E7EBF3 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
        aria-hidden
      />

      <Container className="text-center">
        <Reveal variant="scale-in">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Take Control of Your Money Today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate">
            Stop wondering where your money went. Start understanding where it goes.
          </p>
          <Link
            to="/register"
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-bg shadow-[0_0_30px_-8px_var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_40px_-6px_var(--color-primary)]"
          >
            Get Started Free
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}