export type BorrowLendType = 'borrow' | 'lend';
export type PaymentStatus = 'pending' | 'partial' | 'paid';

export interface BorrowLendRecord {
  id: string;
  userId: string;
  type: BorrowLendType;
  counterparty: string;
  amount: number;
  amountPaid: number;
  status: PaymentStatus;
  dueDate?: string;
  createdAt: string;
}
