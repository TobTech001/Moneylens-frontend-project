import { useRef, useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import ProfileAvatar from './ProfileAvatar';
import { IconCamera } from '../Icons';
import type { UserProfile } from '../../types/profile';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface ProfileHeaderProps {
  profile: UserProfile;
  isLoading?: boolean;
  onEdit: () => void;
  onChangePhoto: (dataUrl: string) => void;
  onRemovePhoto: () => void;
}

export default function ProfileHeader({ profile, isLoading, onEdit, onChangePhoto, onRemovePhoto }: ProfileHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setPhotoError('Please choose a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setPhotoError('Image must be smaller than 5MB.');
      return;
    }

    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onChangePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

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
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="relative">
            <ProfileAvatar firstName={profile.firstName} lastName={profile.lastName} avatar={profile.avatar} size="lg" />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-surface bg-primary text-bg transition-colors hover:bg-primary-hover"
            >
              <IconCamera className="h-4 w-4" />
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload profile picture"
            />
          </div>
          {profile.avatar && (
            <button type="button" onClick={onRemovePhoto} className="text-xs font-medium text-danger hover:opacity-80">
              Remove Photo
            </button>
          )}
        </div>

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
          {photoError && <p className="mt-2 text-xs text-danger">{photoError}</p>}
          <p className="mt-2 text-xs text-mist">JPG, PNG, or WEBP. Max 5MB. Stays on your device — nothing is uploaded.</p>
        </div>

        <Button type="button" variant="secondary" onClick={onEdit} className="w-full shrink-0 sm:w-auto">
          Edit Profile
        </Button>
      </div>
    </Card>
  );
}