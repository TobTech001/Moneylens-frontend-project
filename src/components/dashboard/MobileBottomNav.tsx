import { NavLink } from 'react-router-dom';
import { MOBILE_PRIMARY_NAV } from './NavItems';
import { IconMenu } from '../Icons';

interface MobileBottomNavProps {
  onOpenMenu: () => void;
}

export default function MobileBottomNav({ onOpenMenu }: MobileBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-alt/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-5">
        {MOBILE_PRIMARY_NAV.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${
                isActive ? 'text-primary' : 'text-mist'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-mist transition-colors hover:text-ink"
        >
          <IconMenu className="h-5 w-5" />
          Menu
        </button>
      </div>
    </nav>
  );
}