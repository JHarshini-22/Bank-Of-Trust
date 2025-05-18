// Dynamically determine API URL based on environment
const API_URL = window.location.hostname.includes('replit') || window.location.hostname.includes('repl.co')
  ? 'http://workspace.sailikhith79.repl.co'
  : 'http://localhost:5000';

console.log('Using API URL:', API_URL);

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registered user data
 */
export async function register(userData) {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

/**
 * Login user
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<Object>} User data
 */
export async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * Logout user
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

/**
 * Get current user
 * @returns {Promise<Object>} User data
 */
export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}

/**
 * Create a new account
 * @param {string} accountType - The account type (checking, savings, etc.)
 * @param {string} currency - The currency code (USD, EUR, etc.)
 * @param {boolean} isDefault - Whether this is the default account
 * @returns {Promise<Object>} The created account
 */
export async function createAccount(accountType, currency = 'USD', isDefault = false) {
  try {
    const response = await fetch(`${API_URL}/api/accounts`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountType, currency, isDefault })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create account:', error);
    throw error;
  }
}

/**
 * Fetch accounts from the API
 * @returns {Promise<Array>} List of accounts
 */
export async function getAccounts() {
  try {
    const response = await fetch(`${API_URL}/api/accounts`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
    return [];
  }
}

/**
 * Fetch transactions for an account
 * @param {string} accountId - The account ID
 * @returns {Promise<Array>} List of transactions
 */
export async function getTransactions(accountId) {
  try {
    const response = await fetch(`${API_URL}/api/accounts/${accountId}/transactions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
}

/**
 * Fetch categories from the API
 * @returns {Promise<Array>} List of categories
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/api/categories`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

/**
 * Create a deposit transaction
 * @param {string} accountId - The account ID to deposit to
 * @param {number} amount - The amount to deposit
 * @param {string} categoryId - The category ID
 * @param {string} description - Transaction description
 * @returns {Promise<Object>} The created transaction
 */
export async function createDeposit(accountId, amount, categoryId, description = '') {
  try {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'deposit',
        accountId,
        amount,
        categoryId,
        description
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create deposit:', error);
    throw error;
  }
}

/**
 * Create a withdrawal transaction
 * @param {string} accountId - The account ID to withdraw from
 * @param {number} amount - The amount to withdraw
 * @param {string} categoryId - The category ID
 * @param {string} description - Transaction description
 * @returns {Promise<Object>} The created transaction
 */
export async function createWithdrawal(accountId, amount, categoryId, description = '') {
  try {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'withdrawal',
        accountId,
        amount,
        categoryId,
        description
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create withdrawal:', error);
    throw error;
  }
}

/**
 * Create a transfer transaction
 * @param {string} fromAccountId - The account ID to transfer from
 * @param {string} toAccountId - The account ID to transfer to
 * @param {number} amount - The amount to transfer
 * @param {string} categoryId - The category ID
 * @param {string} description - Transaction description
 * @returns {Promise<Object>} The created transaction
 */
export async function createTransfer(fromAccountId, toAccountId, amount, categoryId, description = '') {
  try {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'transfer',
        fromAccountId,
        toAccountId,
        amount,
        categoryId,
        description
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create transfer:', error);
    throw error;
  }
}