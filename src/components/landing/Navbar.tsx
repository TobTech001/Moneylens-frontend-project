import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { IconMenu, IconClose } from '../Icons';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Insights', href: '#insights' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent backdrop-blur-sm'
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm">
            M
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">MoneyLens</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate hover:text-ink transition-colors">
            Log In
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-bg shadow-[0_0_24px_-6px_var(--color-primary)] transition-colors hover:bg-primary-hover"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-surface"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-line bg-bg transition-[max-height] duration-300 ease-out ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-ink hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-center text-sm font-medium text-ink hover:bg-surface"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-primary px-2 py-2.5 text-center text-sm font-semibold text-bg hover:bg-primary-hover"
            >
              Get Started
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}