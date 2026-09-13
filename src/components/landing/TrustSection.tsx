import Container from './Container';
import { IconEye, IconLayers, IconTarget } from '../Icons';

const POINTS = [
  { icon: IconEye, text: 'Understand your spending' },
  { icon: IconLayers, text: 'Track your financial habits' },
  { icon: IconTarget, text: 'Make smarter decisions' },
];

export default function TrustSection() {
  return (
    <section className="border-y border-line bg-surface py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-sm font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.75rem]">
            Take control of your financial life.
          </h2>
          <ul className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm text-ink sm:flex-col sm:items-start sm:gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-700">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}