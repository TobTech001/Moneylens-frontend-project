import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/LandingPageData';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={`md:hidden overflow-hidden border-t border-line bg-bg transition-[max-height,opacity] duration-300 ease-out ${
        open ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0 border-t-0'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-5 py-4 sm:px-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-2 py-2.5 text-sm text-ink hover:bg-surface"
          >
            {link.label}
          </a>
        ))}
        <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
          <Link to="/login" onClick={onClose} className="rounded-lg px-2 py-2.5 text-center text-sm font-medium text-ink hover:bg-surface">
            Log In
          </Link>
          <Link to="/register" onClick={onClose} className="rounded-lg bg-primary px-2 py-2.5 text-center text-sm font-semibold text-bg hover:bg-primary-hover">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}