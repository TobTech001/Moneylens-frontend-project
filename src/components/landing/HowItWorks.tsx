import Container from './Container';
import Reveal from './Reveal';
import { HOW_IT_WORKS_STEPS } from '../../data/LandingPageData';
import { IconUpload, IconLayers, IconEye } from '../icons';

const ICONS = [IconUpload, IconLayers, IconEye];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="max-w-md font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            How MoneyLens works
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-14 sm:grid-cols-3 sm:gap-6">
          {/* desktop connecting line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-primary/60 via-accent/40 to-primary/60 sm:block"
            aria-hidden
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={step.number} delay={i * 150} className="relative">
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl font-semibold text-transparent [-webkit-text-stroke:1.5px_var(--color-line)] sm:text-6xl">
                    {step.number}
                  </span>
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/30 bg-bg text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate">{step.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}