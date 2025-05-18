export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  JOINT = 'joint',
  BUSINESS = 'business',
  INVESTMENT = 'investment',
}

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  CLOSED = 'closed',
}
