import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { getProfileCompletion, type FinancialProfile, type UserProfile } from '../../types/profile';

interface ProfileCompletionProps {
  profile: UserProfile;
  financialProfile: FinancialProfile;
  isLoading?: boolean;
}

export default function ProfileCompletion({ profile, financialProfile, isLoading }: ProfileCompletionProps) {
  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-2 w-full" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-32" />
          ))}
        </div>
      </Card>
    );
  }

  const { percentage, items } = getProfileCompletion(profile, financialProfile);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Profile Completion</h2>
        <span className="font-display text-lg font-semibold text-primary">{percentage}%</span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-surface-alt">
        <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>

      <ul className="mt-4 space-y-1.5">
        {items.map((item) => (
          <li key={item.label} className={`flex items-center gap-2 text-sm ${item.complete ? 'text-ink' : 'text-mist'}`}>
            <span>{item.complete ? '✓' : '○'}</span>
            {item.label}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-mist">Complete your profile to get the most out of MoneyLens.</p>
    </Card>
  );
}