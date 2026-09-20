import type { SettingsSectionId } from '../../types/settings';

interface SettingsMobileNavProps {
  sections: { id: SettingsSectionId; label: string }[];
  active: SettingsSectionId;
  onChange: (id: SettingsSectionId) => void;
}

export default function SettingsMobileNav({ sections, active, onChange }: SettingsMobileNavProps) {
  return (
    <nav aria-label="Settings sections" className="-mx-5 overflow-x-auto px-5 lg:hidden">
      <div role="tablist" className="flex gap-1 rounded-lg border border-line bg-surface p-1">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            role="tab"
            aria-selected={active === section.id}
            onClick={() => onChange(section.id)}
            className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
              active === section.id ? 'bg-primary-tint text-primary' : 'text-slate hover:text-ink'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}