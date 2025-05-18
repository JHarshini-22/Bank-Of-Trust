
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: 'Checking' | 'Savings' | 'Investment';
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  description: string;
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  recipientName?: string;
}

export const currentUser: User = {
  id: 'usr_123456789',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  profileImage: 'https://i.pravatar.cc/150?img=11',
};

export const accounts: Account[] = [
  {
    id: 'acc_checking123',
    userId: 'usr_123456789',
    accountNumber: '**** **** **** 4567',
    accountType: 'Checking',
    balance: 5842.50,
    currency: 'USD',
  },
  {
    id: 'acc_savings456',
    userId: 'usr_123456789',
    accountNumber: '**** **** **** 7890',
    accountType: 'Savings',
    balance: 12750.75,
    currency: 'USD',
  },
  {
    id: 'acc_investment789',
    userId: 'usr_123456789',
    accountNumber: '**** **** **** 1234',
    accountType: 'Investment',
    balance: 34125.20,
    currency: 'USD',
  },
];

export const transactions: Transaction[] = [
  {
    id: 'trx_12345',
    accountId: 'acc_checking123',
    amount: 250.00,
    type: 'deposit',
    description: 'Paycheck Deposit',
    category: 'Income',
    date: '2025-04-08T10:30:00',
    status: 'completed',
  },
  {
    id: 'trx_12346',
    accountId: 'acc_checking123',
    amount: -85.43,
    type: 'withdrawal',
    description: 'Grocery Store Purchase',
    category: 'Food',
    date: '2025-04-07T16:45:00',
    status: 'completed',
  },
  {
    id: 'trx_12347',
    accountId: 'acc_checking123',
    amount: -120.00,
    type: 'transfer',
    description: 'Transfer to Savings',
    category: 'Transfer',
    date: '2025-04-05T09:15:00',
    status: 'completed',
    recipientName: 'Savings Account',
  },
  {
    id: 'trx_12348',
    accountId: 'acc_checking123',
    amount: -45.99,
    type: 'withdrawal',
    description: 'Online Subscription',
    category: 'Entertainment',
    date: '2025-04-03T14:22:00',
    status: 'completed',
  },
  {
    id: 'trx_12349',
    accountId: 'acc_checking123',
    amount: -215.75,
    type: 'withdrawal',
    description: 'Electronics Store',
    category: 'Shopping',
    date: '2025-04-01T11:34:00',
    status: 'completed',
  },
  {
    id: 'trx_12350',
    accountId: 'acc_checking123',
    amount: 1000.00,
    type: 'deposit',
    description: 'Client Payment',
    category: 'Income',
    date: '2025-03-28T15:20:00',
    status: 'completed',
  },
];

export const recentContacts = [
  { id: 'contact_1', name: 'Sarah Williams', email: 'sarah@example.com', image: 'https://i.pravatar.cc/150?img=5' },
  { id: 'contact_2', name: 'James Taylor', email: 'james@example.com', image: 'https://i.pravatar.cc/150?img=12' },
  { id: 'contact_3', name: 'Emma Davis', email: 'emma@example.com', image: 'https://i.pravatar.cc/150?img=9' },
  { id: 'contact_4', name: 'Michael Brown', email: 'michael@example.com', image: 'https://i.pravatar.cc/150?img=8' },
];
