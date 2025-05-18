export interface CreditCard {
  id: string;
  userId: string;
  cardNumber: string;
  cardType: string;
  expiryDate: Date;
  creditLimit: number;
  availableCredit: number;
  status: CreditCardStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Loan {
  id: string;
  userId: string;
  loanType: LoanType;
  amount: number;
  interestRate: number;
  termMonths: number;
  status: LoanStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum CreditCardStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  EXPIRED = 'expired',
}

export enum LoanType {
  PERSONAL = 'personal',
  HOME = 'home',
  AUTO = 'auto',
  EDUCATION = 'education',
  BUSINESS = 'business',
}

export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  CLOSED = 'closed',
  DEFAULT = 'default',
}
