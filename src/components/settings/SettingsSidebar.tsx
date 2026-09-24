import { NavLink } from 'react-router-dom';
import { IconSettings, IconPalette, IconBell, IconShield, IconLock, IconTarget, IconDatabase, IconUserCircle } from '../icons';
import type { SettingsSectionId } from '../../types/settings';

const ICONS: Record<SettingsSectionId, typeof IconSettings> = {
  general: IconSettings,
  appearance: IconPalette,
  notifications: IconBell,
  privacy: IconShield,
  security: IconLock,
  financial: IconTarget,
  data: IconDatabase,
  account: IconUserCircle,
};

interface SettingsSidebarProps {
  sections: { id: SettingsSectionId; label: string }[];
}

export default function SettingsSidebar({ sections }: SettingsSidebarProps) {
  return (
    <nav aria-label="Settings sections" className="hidden w-56 shrink-0 lg:block">
      <ul className="space-y-1">
        {sections.map((section) => {
          const Icon = ICONS[section.id];
          return (
            <li key={section.id}>
              <NavLink
                to={`/settings/${section.id}`}
                className={({ isActive }) =>
                  `flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive ? 'border border-primary/25 bg-primary-tint text-primary' : 'text-slate hover:bg-surface-alt hover:text-ink'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {section.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}