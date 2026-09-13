import { getPasswordStrength, PASSWORD_REQUIREMENTS } from './PasswordRequirements';

function getStrengthMeta(count: number): { label: 'Weak' | 'Fair' | 'Strong'; color: string; pct: number } {
  const pct = (count / PASSWORD_REQUIREMENTS.length) * 100;
  if (count >= PASSWORD_REQUIREMENTS.length) return { label: 'Strong', color: 'bg-primary', pct };
  if (count >= 2) return { label: 'Fair', color: 'bg-warning', pct };
  return { label: 'Weak', color: 'bg-danger', pct };
}

export default function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const count = getPasswordStrength(password);
  const { label, color, pct } = getStrengthMeta(count);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate">Password strength</span>
        <span
          className={`font-medium ${label === 'Strong' ? 'text-primary' : label === 'Fair' ? 'text-warning' : 'text-danger'}`}
        >
          {label}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
        <div className={`h-1.5 rounded-full transition-all duration-300 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}