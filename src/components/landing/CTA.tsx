import { Link } from 'react-router-dom';
import Container from './Container';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-bg-alt py-20 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]"
        aria-hidden
      />
      <Container className="text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Stop wondering where your money went.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate">
          Start understanding your spending and take control of your financial life with MoneyLens.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_30px_-8px_var(--color-primary)] transition-colors hover:bg-primary-hover"
          >
            Get Started for Free
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
          >
            Log In
          </Link>
        </div>
      </Container>
    </section>
  );
}