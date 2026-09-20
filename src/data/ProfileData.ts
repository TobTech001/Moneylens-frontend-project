import { MOCK_TRANSACTIONS } from './TransactionData';
import { getBudgets } from './BudgetData';
import { MOCK_SUBSCRIPTIONS } from './SubscriptionData';
import { MOCK_RECORDS } from './BorrowLendData';
import type { FinancialProfile, ProfileStats, UserProfile } from '../types/profile';

export const MOCK_PROFILE: UserProfile = {
  id: 'user-1',
  firstName: 'Toheeb',
  lastName: 'Adegoke',
  username: 'toheeb',
  email: 'adegoke@example.com',
  phone: '+234 801 234 5678',
  dateOfBirth: '2004-03-15',
  gender: 'Male',
  country: 'Nigeria',
  state: 'Oyo',
  avatar: null,
  accountStatus: 'Active',
  memberSince: '2026-09-01',
  userId: 'ML-USER-001',
};

export const MOCK_FINANCIAL_PROFILE: FinancialProfile = {
  currency: '₦ Nigerian Naira',
  incomeRange: '₦250,000 – ₦500,000',
  financialGoal: 'Save More',
  savingTarget: 50000,
};

/** Computed from the same mock datasets the other pages use, rather than
 * hardcoded, per the brief's instruction to derive these where possible. */
export function computeProfileStats(): ProfileStats {
  return {
    transactionsTracked: MOCK_TRANSACTIONS.length,
    activeBudgets: getBudgets('month').length,
    activeSubscriptions: MOCK_SUBSCRIPTIONS.filter((s) => s.status === 'active').length,
    borrowLendRecords: MOCK_RECORDS.length,
  };
}

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];