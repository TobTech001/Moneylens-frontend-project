import { Link } from 'react-router-dom';
import GeneralSettingsPage from './GeneralSettingsPage';
import { SETTINGS_SECTION_ICONS, SETTINGS_SECTION_DESCRIPTIONS } from '../../../components/settings/SettingsSectionIcons';
import { SETTINGS_SECTIONS } from '../../../types/settings';
import { IconArrowRight } from '../../../components/Icons';

export default function SettingsIndexPage() {
  return (
    <>
      {/* Mobile: a tappable menu — each row navigates to its own full page. */}
      <div className="space-y-2 lg:hidden">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = SETTINGS_SECTION_ICONS[section.id];
          return (
            <Link
              key={section.id}
              to={`/settings/${section.id}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-primary/30 hover:bg-surface-alt"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{section.label}</span>
                <span className="block truncate text-xs text-slate">{SETTINGS_SECTION_DESCRIPTIONS[section.id]}</span>
              </span>
              <IconArrowRight className="h-4 w-4 shrink-0 text-mist" />
            </Link>
          );
        })}
      </div>

      {/* Desktop: the sidebar is always visible for picking a section, so default the content pane to General. */}
      <div className="hidden lg:block">
        <GeneralSettingsPage />
      </div>
    </>
  );
}