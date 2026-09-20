import { IconSettings, IconPalette, IconBell, IconShield, IconLock, IconTarget, IconDatabase, IconUserCircle } from '../Icons';
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
  active: SettingsSectionId;
  onChange: (id: SettingsSectionId) => void;
}

export default function SettingsSidebar({ sections, active, onChange }: SettingsSidebarProps) {
  return (
    <nav aria-label="Settings sections" className="hidden w-56 shrink-0 lg:block">
      <ul className="space-y-1">
        {sections.map((section) => {
          const Icon = ICONS[section.id];
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onChange(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive ? 'border border-primary/25 bg-primary-tint text-primary' : 'text-slate hover:bg-surface-alt hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}