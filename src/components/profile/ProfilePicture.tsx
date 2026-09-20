import { useRef, useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProfileAvatar from './ProfileAvatar';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface ProfilePictureProps {
  firstName: string;
  lastName: string;
  avatar: string | null;
  onChangePhoto: (dataUrl: string) => void;
  onRemovePhoto: () => void;
}

export default function ProfilePicture({ firstName, lastName, avatar, onChangePhoto, onRemovePhoto }: ProfilePictureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('Image must be smaller than 5MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onChangePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Profile Picture</h2>

      <div className="mt-4 flex items-center gap-4">
        <ProfileAvatar firstName={firstName} lastName={lastName} avatar={avatar} size="md" />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
            Change Photo
          </Button>
          {avatar && (
            <Button type="button" variant="ghost" onClick={onRemovePhoto} className="!text-danger">
              Remove Photo
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload profile picture"
        />
      </div>

      {error && <p className="mt-3 text-xs text-danger">{error}</p>}
      <p className="mt-3 text-xs text-mist">JPG, PNG, or WEBP. Max 5MB. This preview stays on your device — nothing is uploaded.</p>
    </Card>
  );
}