import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import ProfileAvatar from './ProfileAvatar';
import type { UserProfile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: UserProfile;
  isLoading?: boolean;
  onEdit: () => void;
}

export default function ProfileHeader({ profile, isLoading, onEdit }: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Skeleton className="h-24 w-24 rounded-full sm:h-28 sm:w-28" />
          <div className="flex-1 space-y-2">
            <Skeleton className="mx-auto h-5 w-40 sm:mx-0" />
            <Skeleton className="mx-auto h-3 w-52 sm:mx-0" />
            <Skeleton className="mx-auto h-3 w-40 sm:mx-0" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <ProfileAvatar firstName={profile.firstName} lastName={profile.lastName} avatar={profile.avatar} size="lg" />

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-semibold text-ink">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="mt-1 text-sm text-slate">{profile.email}</p>
          <p className="text-sm text-slate">{profile.phone}</p>
          <p className="text-sm text-slate">
            {profile.state}, {profile.country}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
            <Badge tone="positive">{profile.accountStatus}</Badge>
          </div>
        </div>

        <Button type="button" variant="secondary" onClick={onEdit} className="w-full shrink-0 sm:w-auto">
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}