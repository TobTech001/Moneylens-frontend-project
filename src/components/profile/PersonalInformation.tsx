import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import type { UserProfile } from '../../types/profile';

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface PersonalInformationProps {
  profile: UserProfile;
  isLoading?: boolean;
}

export default function PersonalInformation({ profile, isLoading }: PersonalInformationProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <div className="mt-5 grid grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  const fields = [
    { label: 'First Name', value: profile.firstName },
    { label: 'Last Name', value: profile.lastName },
    { label: 'Username', value: profile.username },
    { label: 'Email', value: profile.email },
    { label: 'Phone Number', value: profile.phone },
    { label: 'Date of Birth', value: formatDate(profile.dateOfBirth) },
    { label: 'Gender', value: profile.gender },
    { label: 'Country', value: profile.country },
    { label: 'State', value: profile.state },
  ];

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Personal Information</h2>
      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-xs text-slate">{field.label}</dt>
            <dd className="mt-1 text-sm text-ink">{field.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}