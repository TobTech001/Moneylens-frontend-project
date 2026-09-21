import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import MobileMenu from './MobileMenu';
import { IconMenu, IconClose } from '../icons';
import { NAV_LINKS } from '../../data/LandingPageData';

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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent backdrop-blur-sm'
      }`}
    >
      <Container className={`flex items-center justify-between transition-[height] duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
        <a href="#home" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm">💰</span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">MoneyLens</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-slate transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate hover:text-ink transition-colors">
            Log In
          </Link>
          <Link
            to="/register"
            className="group inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-bg shadow-[0_0_24px_-6px_var(--color-primary)] transition-all hover:bg-primary-hover hover:shadow-[0_0_32px_-6px_var(--color-primary)] active:scale-[0.97]"
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
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}