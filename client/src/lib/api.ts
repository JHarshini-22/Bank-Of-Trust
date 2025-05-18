import { User, Account, Transaction } from './mockData';

const API_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// AUTH API
export async function register(username: string, email: string, firstName: string, lastName: string, password: string, phoneNumber?: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, firstName, lastName, password, phoneNumber }),
      credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json();
      return { data: mapUserFromApi(user) };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Registration failed' };
    }
  } catch (error) {
    return { error: 'Network error during registration' };
  }
}

export async function login(username: string, password: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json();
      return { data: mapUserFromApi(user) };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Login failed' };
    }
  } catch (error) {
    return { error: 'Network error during login' };
  }
}

export async function logout(): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      return { data: undefined };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Logout failed' };
    }
  } catch (error) {
    return { error: 'Network error during logout' };
  }
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_URL}/user`, {
      credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json();
      return { data: mapUserFromApi(user) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch user' };
    }
  } catch (error) {
    return { error: 'Network error fetching user' };
  }
}

// ACCOUNTS API
export async function getAccounts(): Promise<ApiResponse<Account[]>> {
  try {
    const response = await fetch(`${API_URL}/accounts`, {
      credentials: 'include',
    });

    if (response.ok) {
      const accounts = await response.json();
      return { data: accounts.map(mapAccountFromApi) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch accounts' };
    }
  } catch (error) {
    return { error: 'Network error fetching accounts' };
  }
}

export async function getAccount(id: string): Promise<ApiResponse<Account>> {
  try {
    const response = await fetch(`${API_URL}/accounts/${id}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const account = await response.json();
      return { data: mapAccountFromApi(account) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else if (response.status === 404) {
      return { error: 'Account not found' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch account' };
    }
  } catch (error) {
    return { error: 'Network error fetching account' };
  }
}

export async function createAccount(accountType: string, currency: string = 'USD', isDefault: boolean = false): Promise<ApiResponse<Account>> {
  try {
    const response = await fetch(`${API_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountType, currency, isDefault }),
      credentials: 'include',
    });

    if (response.ok) {
      const account = await response.json();
      return { data: mapAccountFromApi(account) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to create account' };
    }
  } catch (error) {
    return { error: 'Network error creating account' };
  }
}

// TRANSACTIONS API
export async function getTransactions(limit: number = 20, offset: number = 0): Promise<ApiResponse<Transaction[]>> {
  try {
    const response = await fetch(`${API_URL}/transactions?limit=${limit}&offset=${offset}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const transactions = await response.json();
      return { data: transactions.map(mapTransactionFromApi) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch transactions' };
    }
  } catch (error) {
    return { error: 'Network error fetching transactions' };
  }
}

export async function getAccountTransactions(accountId: string, limit: number = 20, offset: number = 0): Promise<ApiResponse<Transaction[]>> {
  try {
    const response = await fetch(`${API_URL}/accounts/${accountId}/transactions?limit=${limit}&offset=${offset}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const transactions = await response.json();
      return { data: transactions.map(mapTransactionFromApi) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch account transactions' };
    }
  } catch (error) {
    return { error: 'Network error fetching account transactions' };
  }
}

export async function createTransaction(
  type: 'deposit' | 'withdrawal' | 'transfer',
  amount: number,
  currency: string = 'USD',
  fromAccountId?: string,
  toAccountId?: string,
  description?: string,
  categoryId?: string
): Promise<ApiResponse<Transaction>> {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        amount,
        currency,
        fromAccountId,
        toAccountId,
        description,
        categoryId
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const transaction = await response.json();
      return { data: mapTransactionFromApi(transaction) };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to create transaction' };
    }
  } catch (error) {
    return { error: 'Network error creating transaction' };
  }
}

// ANALYTICS API
export async function getCategories(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      credentials: 'include',
    });

    if (response.ok) {
      const categories = await response.json();
      return { data: categories };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch categories' };
    }
  } catch (error) {
    return { error: 'Network error fetching categories' };
  }
}

export async function getSpendingAnalytics(timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_URL}/analytics/spending?timeframe=${timeframe}`, {
      credentials: 'include',
    });

    if (response.ok) {
      const analytics = await response.json();
      return { data: analytics };
    } else if (response.status === 401) {
      return { error: 'Not authenticated' };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to fetch spending analytics' };
    }
  } catch (error) {
    return { error: 'Network error fetching spending analytics' };
  }
}

// HELPER FUNCTIONS TO MAP API DATA TO FRONTEND DATA MODELS
function mapUserFromApi(apiUser: any): User {
  return {
    id: apiUser.id,
    name: `${apiUser.first_name} ${apiUser.last_name}`,
    email: apiUser.email,
    profileImage: `https://ui-avatars.com/api/?name=${apiUser.first_name}+${apiUser.last_name}&background=random`,
  };
}

function mapAccountFromApi(apiAccount: any): Account {
  return {
    id: apiAccount.id,
    userId: apiAccount.user_id,
    accountNumber: apiAccount.account_number ? `**** **** **** ${apiAccount.account_number.slice(-4)}` : '',
    accountType: capitalizeFirstLetter(apiAccount.account_type) as 'Checking' | 'Savings' | 'Investment',
    balance: parseFloat(apiAccount.balance),
    currency: apiAccount.currency,
  };
}

function mapTransactionFromApi(apiTransaction: any): Transaction {
  const isIncoming = !apiTransaction.from_account_id || (apiTransaction.type === 'deposit');
  
  return {
    id: apiTransaction.id,
    accountId: isIncoming ? apiTransaction.to_account_id : apiTransaction.from_account_id,
    amount: isIncoming ? parseFloat(apiTransaction.amount) : -parseFloat(apiTransaction.amount),
    type: apiTransaction.type as 'deposit' | 'withdrawal' | 'transfer',
    description: apiTransaction.description || capitalizeFirstLetter(apiTransaction.type),
    category: apiTransaction.category_name || 'Uncategorized',
    date: apiTransaction.created_at,
    status: apiTransaction.status as 'completed' | 'pending' | 'failed',
    recipientName: apiTransaction.to_account_number ? `Account ${apiTransaction.to_account_number.slice(-4)}` : undefined,
  };
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}