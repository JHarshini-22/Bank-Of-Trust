export interface Transaction {
  id: string;
  fromAccountId?: string;
  toAccountId?: string;
  amount: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  reference: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
  PAYMENT = 'payment',
  FEE = 'fee',
  INTEREST = 'interest',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}
