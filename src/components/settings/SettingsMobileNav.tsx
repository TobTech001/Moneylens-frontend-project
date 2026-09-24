import { NavLink } from 'react-router-dom';
import type { SettingsSectionId } from '../../types/settings';

interface SettingsMobileNavProps {
  sections: { id: SettingsSectionId; label: string }[];
}

export default function SettingsMobileNav({ sections }: SettingsMobileNavProps) {
  return (
    <nav aria-label="Settings sections" className="-mx-5 overflow-x-auto px-5 lg:hidden">
      <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
        {sections.map((section) => (
          <NavLink
            key={section.id}
            to={`/settings/${section.id}`}
            className={({ isActive }) =>
              `shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-tint text-primary' : 'text-slate hover:text-ink'
              }`
            }
          >
            {section.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}