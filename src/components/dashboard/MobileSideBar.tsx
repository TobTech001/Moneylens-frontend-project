import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_GROUPS } from './NavItems';
import { IconClose } from '../Icons';
import { IconLogout } from '../Icons';
import { CURRENT_USER } from '../../data/DashboardData';
import { useAuth } from '../../hooks/useAuth';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const { logout } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-line bg-bg-alt transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm">
              💰
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">MoneyLens</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-md text-slate hover:bg-surface hover:text-ink"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-mist">{group.title}</p>
              <ul className="space-y-1">
                {group.items.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <NavLink
                      to={href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'border-primary/25 bg-primary-tint font-medium text-primary'
                            : 'text-slate hover:bg-surface hover:text-ink'
                        }`
                      }
                    >
                      <Icon className="h-[18px] w-[18px]" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-tint font-display text-sm font-semibold text-primary">
              {CURRENT_USER.avatarInitial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{CURRENT_USER.name}</p>
              <p className="truncate text-xs text-mist">Free plan</p>
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="Log out"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-mist transition-colors hover:bg-surface hover:text-danger"
            >
              <IconLogout className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}