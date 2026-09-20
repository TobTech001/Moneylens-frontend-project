export type Gender = 'Male' | 'Female' | 'Prefer not to say';
export type AccountStatus = 'Active' | 'Inactive' | 'Suspended';

export const INCOME_RANGES = [
  'Below ₦100,000',
  '₦100,000 – ₦250,000',
  '₦250,000 – ₦500,000',
  '₦500,000 – ₦1,000,000',
  'Above ₦1,000,000',
] as const;
export type IncomeRange = (typeof INCOME_RANGES)[number];

export const FINANCIAL_GOALS = [
  'Save More',
  'Reduce Spending',
  'Pay Off Debt',
  'Track Expenses',
  'Build Emergency Fund',
  'Invest More',
] as const;
export type FinancialGoal = (typeof FINANCIAL_GOALS)[number];

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  /** ISO date string */
  dateOfBirth: string;
  gender: Gender;
  country: string;
  state: string;
  /** Data URL of a locally-selected image, or null for initials fallback. Frontend-only — never uploaded. */
  avatar: string | null;
  accountStatus: AccountStatus;
  /** ISO date string */
  memberSince: string;
  userId: string;
}

export interface FinancialProfile {
  currency: string;
  incomeRange: IncomeRange;
  financialGoal: FinancialGoal;
  savingTarget: number;
}

export interface ProfileStats {
  transactionsTracked: number;
  activeBudgets: number;
  activeSubscriptions: number;
  borrowLendRecords: number;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export interface ProfileCompletionItem {
  label: string;
  complete: boolean;
}

export function getProfileCompletion(profile: UserProfile, financialProfile: FinancialProfile): {
  percentage: number;
  items: ProfileCompletionItem[];
} {
  const items: ProfileCompletionItem[] = [
    { label: 'Personal information', complete: !!(profile.firstName && profile.lastName) },
    { label: 'Email', complete: !!profile.email },
    { label: 'Phone number', complete: !!profile.phone },
    { label: 'Financial goal', complete: !!financialProfile.financialGoal },
    { label: 'Profile photo', complete: !!profile.avatar },
  ];
  const percentage = Math.round((items.filter((i) => i.complete).length / items.length) * 100);
  return { percentage, items };
}