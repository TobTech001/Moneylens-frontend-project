export interface Subscription {
  id: string;
  userId: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextRenewal: string;
  category?: string;
}
