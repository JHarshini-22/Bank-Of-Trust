export interface SpendingCategory {
  id: string;
  name: string;
  color: string;
}

export interface SpendingAnalytics {
  userId: string;
  timeframe: TimeFrame;
  categories: CategorySpending[];
  totalSpent: number;
  previousPeriodSpent: number;
  changePercentage: number;
}

export interface CategorySpending {
  category: SpendingCategory;
  amount: number;
  percentage: number;
  transactions: number;
}

export enum TimeFrame {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
