export interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalVolume: number;
  activeSubscriptions: number;
}

export interface AdminCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
}
