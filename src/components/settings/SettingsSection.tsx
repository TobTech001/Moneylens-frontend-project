import type { ReactNode } from 'react';
import Card from '../common/Card';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate">{description}</p>}
      <div className="mt-5 divide-y divide-line">{children}</div>
    </Card>
  );
}