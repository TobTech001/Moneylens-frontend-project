import type {
  OverviewStat,
  CategorySpend,
  Insight,
  BudgetItem,
  SubscriptionPreviewItem,
  BorrowLendSummary,
  SpendingTrendPoint,
  SpendingPeriod,
  DashboardTransaction,
} from '../types/Dashboard';

export const CURRENT_USER = {
  name: 'Toheeb',
  avatarInitial: 'T',
};

export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const OVERVIEW_STATS: OverviewStat[] = [
  { id: 'balance', label: 'Available Balance', value: '₦130,000', change: '↑ 12% vs last month', changeType: 'positive' },
  { id: 'income', label: 'Total Income', value: '₦250,000', helper: 'This month' },
  { id: 'spent', label: 'Total Spent', value: '₦120,000', change: '↑ 18% vs last month', changeType: 'negative' },
  { id: 'savings', label: 'Savings', value: '₦130,000', helper: '52% of your income' },
];

export const SPENDING_TRENDS: Record<SpendingPeriod, SpendingTrendPoint[]> = {
  weekly: [
    { label: 'Mon', amount: 12500 },
    { label: 'Tue', amount: 8200 },
    { label: 'Wed', amount: 15300 },
    { label: 'Thu', amount: 6400 },
    { label: 'Fri', amount: 21000 },
    { label: 'Sat', amount: 17800 },
    { label: 'Sun', amount: 9200 },
  ],
  monthly: [
    { label: 'Apr', amount: 98000 },
    { label: 'May', amount: 112000 },
    { label: 'Jun', amount: 87000 },
    { label: 'Jul', amount: 134000 },
    { label: 'Aug', amount: 101500 },
    { label: 'Sep', amount: 120000 },
  ],
  yearly: [
    { label: '2021', amount: 980000 },
    { label: '2022', amount: 1120000 },
    { label: '2023', amount: 1340000 },
    { label: '2024', amount: 1265000 },
    { label: '2025', amount: 1450000 },
  ],
};

export const TOP_CATEGORIES: CategorySpend[] = [
  { category: 'Food', icon: '🍔', amount: 47500, percent: 39 },
  { category: 'Transport', icon: '🚗', amount: 25000, percent: 21 },
  { category: 'Data & Airtime', icon: '📱', amount: 15000, percent: 13 },
  { category: 'Subscriptions', icon: '📺', amount: 10000, percent: 8 },
];

export const INSIGHTS: Insight[] = [
  {
    id: 'insight-1',
    type: 'alert',
    icon: '⚠️',
    title: 'Spending Alert',
    message: "You're spending 32% more on food than last month.",
    actionLabel: 'View Details',
  },
  {
    id: 'insight-2',
    type: 'opportunity',
    icon: '💡',
    title: 'Saving Opportunity',
    message: 'Reducing your food spending by ₦10,000 could help you reach your monthly savings goal.',
    actionLabel: 'View Details',
  },
  {
    id: 'insight-3',
    type: 'budget',
    icon: '🎯',
    title: 'Budget Alert',
    message: "You've used 82% of your transport budget.",
    actionLabel: 'View Details',
  },
];

export const RECENT_TRANSACTIONS: DashboardTransaction[] = [
  { id: 'tx-1', merchant: 'Chicken Republic', categoryIcon: '🍔', category: 'Food', date: 'Today', amount: -5500, type: 'expense' },
  { id: 'tx-2', merchant: 'Bolt', categoryIcon: '🚗', category: 'Transport', date: 'Yesterday', amount: -3200, type: 'expense' },
  { id: 'tx-3', merchant: 'Salary', categoryIcon: '💰', category: 'Income', date: 'Sep 1', amount: 250000, type: 'income' },
  { id: 'tx-4', merchant: 'MTN Data', categoryIcon: '📱', category: 'Data & Airtime', date: 'Sep 10', amount: -5000, type: 'expense' },
];

export const BUDGET_ITEMS: BudgetItem[] = [
  { id: 'budget-food', category: 'Food', icon: '🍔', spent: 24500, limit: 30000 },
  { id: 'budget-transport', category: 'Transport', icon: '🚗', spent: 18000, limit: 25000 },
];

export const SUBSCRIPTIONS_PREVIEW: SubscriptionPreviewItem[] = [
  { id: 'sub-netflix', name: 'Netflix', amount: 2200, renewsInDays: 3 },
  { id: 'sub-spotify', name: 'Spotify', amount: 1300, renewsInDays: 7 },
];

export const BORROW_LEND_SUMMARY: BorrowLendSummary = {
  owedToYou: 25000,
  youOwe: 10000,
};