import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMenu } from '../Icons';
import { IconSearch, IconUserCircle, IconSettings, IconLogout } from '../Icons';
import { CURRENT_USER } from '../../data/DashboardData';
import { useAuth } from '../../hooks/useAuth';

const NOTIFICATIONS = [
  { id: 1, text: "You're close to your food budget limit.", time: '2h ago' },
  { id: 2, text: 'Netflix renews in 3 days — ₦2,200.', time: '1d ago' },
  { id: 3, text: 'Your September spending report is ready.', time: '2d ago' },
];

function useClickOutside(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onOutside]);
  return ref;
}

interface TopbarProps {
  title: string;
  onOpenMenu: () => void;
}

export default function Topbar({ title, onOpenMenu }: TopbarProps) {
  const { logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useClickOutside(() => setNotifOpen(false));
  const userRef = useClickOutside(() => setUserOpen(false));

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-bg/95 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-md text-ink hover:bg-surface lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
        </button>
        <h1 className="hidden font-display text-lg font-semibold text-ink sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Search"
          className="grid h-9 w-9 place-items-center rounded-md text-slate transition-colors hover:bg-surface hover:text-ink"
        >
          <IconSearch className="h-[18px] w-[18px]" />
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setNotifOpen((v) => !v);
              setUserOpen(false);
            }}
            className="relative grid h-9 w-9 place-items-center rounded-md text-slate transition-colors hover:bg-surface hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.5 5.3 1.5 5.3H4.5S6 13.5 6 9.5Z" />
              <path d="M9.8 18.2a2.2 2.2 0 0 0 4.4 0" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-line bg-surface p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
              <p className="px-2.5 py-1.5 text-xs font-medium text-slate">Notifications</p>
              <div className="space-y-1">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="rounded-lg px-2.5 py-2 hover:bg-surface-alt">
                    <p className="text-sm text-ink">{n.text}</p>
                    <p className="mt-0.5 text-[11px] text-mist">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => {
              setUserOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-primary-tint font-display text-sm font-semibold text-primary"
            aria-label="Account menu"
          >
            {CURRENT_USER.avatarInitial}
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-surface p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
              <Link
                to="/profile"
                onClick={() => setUserOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink hover:bg-surface-alt"
              >
                <IconUserCircle className="h-4 w-4" />
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setUserOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink hover:bg-surface-alt"
              >
                <IconSettings className="h-4 w-4" />
                Settings
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-danger hover:bg-danger/10"
              >
                <IconLogout className="h-4 w-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}