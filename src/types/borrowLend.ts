export type BorrowLendType = 'lent' | 'borrowed';
export type BorrowLendStatus = 'outstanding' | 'partially-paid' | 'paid' | 'overdue';

export interface Payment {
  id: string;
  recordId: string;
  amount: number;
  /** ISO date string */
  date: string;
  note?: string;
}

export interface BorrowLendRecord {
  id: string;
  person: string;
  type: BorrowLendType;
  amount: number;
  paidAmount: number;
  description: string;
  /** ISO date string — when the money was given/received */
  date: string;
  /** ISO date string — expected repayment date */
  dueDate: string;
  note?: string;
  payments: Payment[];
}

/** A record plus its derived numbers — kept separate so the raw mock data
 * doesn't duplicate values that are always computable from amount/paidAmount/dueDate. */
export interface BorrowLendRecordWithStatus extends BorrowLendRecord {
  remainingAmount: number;
  status: BorrowLendStatus;
  daysUntilDue: number;
}

export const BORROW_LEND_STATUS_LABEL: Record<BorrowLendStatus, string> = {
  outstanding: 'Outstanding',
  'partially-paid': 'Partially Paid',
  paid: 'Paid',
  overdue: 'Overdue',
};

function daysBetween(dueISO: string, todayISO: string): number {
  const due = new Date(dueISO + 'T00:00:00');
  const today = new Date(todayISO + 'T00:00:00');
  return Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function withRecordStatus(record: BorrowLendRecord, today = new Date()): BorrowLendRecordWithStatus {
  const remainingAmount = record.amount - record.paidAmount;
  const todayISO = today.toISOString().slice(0, 10);
  const daysUntilDue = daysBetween(record.dueDate, todayISO);

  let status: BorrowLendStatus;
  if (remainingAmount <= 0) {
    status = 'paid';
  } else if (daysUntilDue <= 0) {
    status = 'overdue';
  } else if (record.paidAmount > 0) {
    status = 'partially-paid';
  } else {
    status = 'outstanding';
  }

  return { ...record, remainingAmount, status, daysUntilDue };
}

export function getDueDateLabel(record: BorrowLendRecordWithStatus): string {
  if (record.status === 'paid') return 'Paid';
  if (record.daysUntilDue < 0) return `Overdue — ${Math.abs(record.daysUntilDue)} day${Math.abs(record.daysUntilDue) === 1 ? '' : 's'} late`;
  if (record.daysUntilDue === 0) return 'Due today';
  if (record.daysUntilDue <= 3) return `${record.daysUntilDue} day${record.daysUntilDue === 1 ? '' : 's'} remaining — Due soon`;
  return `${record.daysUntilDue} days remaining`;
}

export type NewRecordInput = Omit<BorrowLendRecord, 'id' | 'paidAmount' | 'payments'>;