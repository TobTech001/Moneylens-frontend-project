export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export const TRANSACTION_CATEGORIES = [
  'Food',
  'Transport',
  'Data & Airtime',
  'Bills',
  'Subscriptions',
  'Education',
  'Entertainment',
  'Shopping',
  'Other',
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number] | 'Income';

export interface Transaction {
  id: string;
  merchant: string;
  description: string;
  /** Always a positive number — sign is derived from `type` when displaying. */
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  /** ISO date string, e.g. '2026-09-10' */
  date: string;
  /** e.g. '10:24 AM' */
  time: string;
  status: TransactionStatus;
  note?: string;
}

export type NewTransactionInput = Omit<Transaction, 'id' | 'status'>;