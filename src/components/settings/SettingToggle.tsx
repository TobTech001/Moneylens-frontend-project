interface SettingToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

/** An accessible switch — announces state via aria-checked and role="switch",
 * and shows a visible On/Off label so state is never color-only. */
export default function SettingToggle({ checked, onChange, label }: SettingToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        checked ? 'border-primary/40 bg-primary' : 'border-line bg-surface-alt'
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
        }`}
      />
      <span className="sr-only">{checked ? 'On' : 'Off'}</span>
    </button>
  );
}