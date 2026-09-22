import Container from './Container';
import Reveal from './Reveal';
import { BENEFITS } from '../../data/LandingPageData';
import { IconEye, IconTarget, IconShield, IconBell, IconBulb, IconChart } from '../Icons';

const ICONS = { eye: IconEye, target: IconTarget, shield: IconShield, bell: IconBell, bulb: IconBulb, chart: IconChart };

export default function Benefits() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-lg">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Why People Choose MoneyLens
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => {
            const Icon = ICONS[benefit.icon as keyof typeof ICONS];
            return (
              <Reveal key={benefit.text} delay={i * 80}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-primary/25">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <p className="text-sm text-ink">{benefit.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}