import Select from '../common/Select';

interface SettingSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  ariaLabel: string;
}

export default function SettingSelect({ value, onChange, options, ariaLabel }: SettingSelectProps) {
  return (
    <div className="w-full sm:w-56">
      <Select aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)} options={options} />
    </div>
  );
}