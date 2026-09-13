import { IconCheck } from '../Icons';

export interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

export const PASSWORD_REQUIREMENTS: Requirement[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
];

export function getPasswordStrength(password: string): number {
  return PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;
}

export function passwordMeetsAllRequirements(password: string): boolean {
  return getPasswordStrength(password) === PASSWORD_REQUIREMENTS.length;
}

export default function PasswordRequirements({ password }: { password: string }) {
  if (!password) return null;

  return (
    <ul className="mt-2 space-y-1">
      {PASSWORD_REQUIREMENTS.map((req) => {
        const passed = req.test(password);
        return (
          <li key={req.label} className={`flex items-center gap-1.5 text-xs ${passed ? 'text-primary' : 'text-mist'}`}>
            <span
              className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border ${
                passed ? 'border-primary bg-primary/15' : 'border-line'
              }`}
            >
              {passed && <IconCheck className="h-2.5 w-2.5" />}
            </span>
            {req.label}
          </li>
        );
      })}
    </ul>
  );
}