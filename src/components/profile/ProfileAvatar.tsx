import { getInitials } from '../../types/profile';

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
  avatar: string | null;
  size?: 'md' | 'lg';
}

const SIZE_CLASSES = {
  md: 'h-14 w-14 text-lg',
  lg: 'h-24 w-24 text-3xl sm:h-28 sm:w-28',
};

export default function ProfileAvatar({ firstName, lastName, avatar, size = 'md' }: ProfileAvatarProps) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className={`${SIZE_CLASSES[size]} shrink-0 rounded-full border border-line object-cover`}
      />
    );
  }

  return (
    <div
      className={`${SIZE_CLASSES[size]} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-display font-semibold text-white`}
      aria-hidden
    >
      {getInitials(firstName, lastName)}
    </div>
  );
}