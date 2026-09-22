import { useEffect, useState } from 'react';
import Container from './Container';
import Reveal from '../common/Reveal';
import { TESTIMONIALS } from '../../data/LandingPageData';
import { IconArrowRight } from '../Icons';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  function goTo(i: number) {
    setIndex(((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const current = TESTIMONIALS[index];

  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            What Our Users Say
          </h2>
        </Reveal>

        <Reveal
          variant="scale-in"
          delay={100}
          className="relative mx-auto mt-12 max-w-2xl"
        >
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-10"
          >
            <p key={index} className="animate-[fadeIn_0.4s_ease-out] text-warning">
              {'★'.repeat(current.rating)}
              <span className="text-line">{'★'.repeat(5 - current.rating)}</span>
            </p>
            <p key={`quote-${index}`} className="animate-[fadeIn_0.4s_ease-out] mt-4 text-lg leading-relaxed text-ink sm:text-xl">
              "{current.review}"
            </p>
            <div key={`author-${index}`} className="animate-[fadeIn_0.4s_ease-out] mt-6 flex items-center justify-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
                {current.initials}
              </span>
              <div className="text-left">
                <p className="text-sm font-medium text-ink">{current.name}</p>
                <p className="text-xs text-slate">{current.role}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-line bg-surface p-2.5 text-ink transition-colors hover:border-primary/40 sm:block"
          >
            <IconArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 hidden translate-x-4 -translate-y-1/2 rounded-full border border-line bg-surface p-2.5 text-ink transition-colors hover:border-primary/40 sm:block"
          >
            <IconArrowRight className="h-4 w-4" />
          </button>
        </Reveal>

        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-1.5 bg-line'}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}