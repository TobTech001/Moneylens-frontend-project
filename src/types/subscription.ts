export const SUBSCRIPTION_CATEGORIES = [
  'Entertainment',
  'Productivity',
  'Education',
  'Cloud & Software',
  'Health',
  'News',
  'Other',
] as const;
export type SubscriptionCategory = (typeof SUBSCRIPTION_CATEGORIES)[number];

export type SubscriptionFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'payment-failed';

export interface Subscription {
  id: string;
  serviceName: string;
  category: SubscriptionCategory;
  amount: number;
  frequency: SubscriptionFrequency;
  /** ISO date string */
  nextPaymentDate: string;
  status: SubscriptionStatus;
  note?: string;
  /** ISO date string */
  createdAt: string;
}

export const SUBSCRIPTION_STATUS_LABEL: Record<SubscriptionStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  cancelled: 'Cancelled',
  'payment-failed': 'Payment Failed',
};

export const FREQUENCY_LABEL: Record<SubscriptionFrequency, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
};

/** Normalizes any billing frequency to an equivalent monthly cost. */
export function toMonthlyCost(amount: number, frequency: SubscriptionFrequency): number {
  switch (frequency) {
    case 'weekly':
      return amount * 4;
    case 'monthly':
      return amount;
    case 'quarterly':
      return amount / 3;
    case 'yearly':
      return amount / 12;
  }
}

/** Normalizes any billing frequency to an equivalent yearly cost. */
export function toYearlyCost(amount: number, frequency: SubscriptionFrequency): number {
  switch (frequency) {
    case 'weekly':
      return amount * 52;
    case 'monthly':
      return amount * 12;
    case 'quarterly':
      return amount * 4;
    case 'yearly':
      return amount;
  }
}

export type NewSubscriptionInput = Omit<Subscription, 'id' | 'createdAt'>;

export function daysUntil(dateISO: string, today = new Date()): number {
  const due = new Date(dateISO + 'T00:00:00');
  const todayOnly = new Date(today.toISOString().slice(0, 10) + 'T00:00:00');
  return Math.round((due.getTime() - todayOnly.getTime()) / (1000 * 60 * 60 * 24));
}

export function getPaymentDueLabel(dateISO: string, today = new Date()): string {
  const days = daysUntil(dateISO, today);
  if (days < 0) return 'Payment overdue';
  if (days === 0) return 'Payment due today';
  if (days === 1) return '1 day remaining';
  return `${days} days remaining`;
}