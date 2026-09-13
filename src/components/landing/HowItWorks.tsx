import Container from './Container';
import { IconUpload, IconLayers, IconEye } from '../Icons';

const STEPS = [
  {
    number: '01',
    icon: IconUpload,
    title: 'Add your transactions',
    description: 'Paste or import your transaction information — takes a few seconds.',
  },
  {
    number: '02',
    icon: IconLayers,
    title: 'MoneyLens understands it',
    description: 'Your transactions are automatically organized and categorized.',
  },
  {
    number: '03',
    icon: IconEye,
    title: 'See your financial story',
    description: 'Understand where your money goes and make smarter decisions.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <h2 className="max-w-md font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          How MoneyLens works
        </h2>

        <div className="relative mt-16 grid gap-14 sm:grid-cols-3 sm:gap-6">
          <div
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-primary/60 via-accent/40 to-primary/60 sm:block"
            aria-hidden
          />
          {STEPS.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-semibold text-transparent [-webkit-text-stroke:1.5px_var(--color-line)] sm:text-6xl">
                  {number}
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary-tint text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}