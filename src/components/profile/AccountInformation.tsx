import Card from '../common/Card';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import type { UserProfile } from '../../types/profile';

function formatMonthYear(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', year: 'numeric' });
}

interface AccountInformationProps {
  profile: UserProfile;
  isLoading?: boolean;
}

export default function AccountInformation({ profile, isLoading }: AccountInformationProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-44" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const rows = [
    { label: 'Account Status', value: <Badge tone="positive">{profile.accountStatus}</Badge> },
    { label: 'Member Since', value: formatMonthYear(profile.memberSince) },
    { label: 'Account Type', value: 'Personal' },
    { label: 'User ID', value: profile.userId },
  ];

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Account Information</h2>
      <div className="mt-5 divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span className="text-sm text-slate">{row.label}</span>
            <span className="text-sm font-medium text-ink">{row.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}