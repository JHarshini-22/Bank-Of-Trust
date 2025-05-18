import { useState, useEffect } from 'react'
import { 
  getAccounts, getTransactions, getCategories, 
  login, register, logout, getCurrentUser, createAccount,
  createDeposit, createWithdrawal, createTransfer
} from './api'
import styles from './styles'

function App() {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Auth state
  const [user, setUser] = useState(null)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  
  // Dashboard state
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  
  // Create a mock user and bypass actual authentication
  useEffect(() => {
    async function setupMockUser() {
      try {
        setLoading(true)
        
        // Create a mock user with more details
        const mockUser = {
          id: '12345-mock-id',
          username: 'demouser',
          email: 'demo@example.com',
          first_name: 'Demo',
          last_name: 'User',
          role: 'customer',
          status: 'active',
          phone_number: '+1 (555) 123-4567',
          created_at: '2023-08-15T10:30:00Z',
          kyc_verified: true,
          profile_image: null
        }
        
        setUser(mockUser)
        
        // Enhanced mock accounts data with more details
        const mockAccounts = [
          {
            id: 'account-1',
            account_number: '1000000001',
            account_type: 'checking',
            balance: 5432.78,
            currency: 'USD',
            status: 'active',
            is_default: true,
            created_at: '2023-08-15T10:35:00Z',
            interest_rate: 0.01,
            available_credit: null,
            routing_number: '072403352'
          },
          {
            id: 'account-2',
            account_number: '1000000002',
            account_type: 'savings',
            balance: 12750.45,
            currency: 'USD',
            status: 'active',
            is_default: false,
            created_at: '2023-08-15T10:40:00Z',
            interest_rate: 2.5,
            available_credit: null,
            routing_number: '072403352'
          },
          {
            id: 'account-3',
            account_number: '1000000003',
            account_type: 'credit',
            balance: 754.36,
            currency: 'USD',
            status: 'active',
            is_default: false,
            created_at: '2023-09-01T14:22:00Z',
            interest_rate: 18.99,
            available_credit: 4245.64,
            credit_limit: 5000,
            payment_due_date: '2023-04-15T00:00:00Z',
            minimum_payment: 35,
            routing_number: null
          },
          {
            id: 'account-4',
            account_number: '1000000004',
            account_type: 'investment',
            balance: 28651.92,
            currency: 'USD',
            status: 'active',
            is_default: false,
            created_at: '2023-12-15T09:10:00Z',
            interest_rate: null,
            available_credit: null,
            routing_number: '072403352',
            portfolio_risk: 'moderate',
            ytd_return: 7.2
          }
        ]
        
        setAccounts(mockAccounts)
        setSelectedAccountId('account-1')
        
        // Enhanced mock categories with more details
        const mockCategories = [
          { id: 'cat-1', name: 'Housing', color: '#FF5733', icon: '🏠' },
          { id: 'cat-2', name: 'Transportation', color: '#33FF57', icon: '🚗' },
          { id: 'cat-3', name: 'Food', color: '#3357FF', icon: '🍔' },
          { id: 'cat-4', name: 'Entertainment', color: '#F033FF', icon: '🎬' },
          { id: 'cat-5', name: 'Healthcare', color: '#33FFF0', icon: '🏥' },
          { id: 'cat-6', name: 'Personal', color: '#FFC733', icon: '👤' },
          { id: 'cat-7', name: 'Education', color: '#FF33A8', icon: '📚' },
          { id: 'cat-8', name: 'Income', color: '#33FFA8', icon: '💰' },
          { id: 'cat-9', name: 'Transfer', color: '#808080', icon: '🔄' },
          { id: 'cat-10', name: 'Shopping', color: '#FF9933', icon: '🛍️' },
          { id: 'cat-11', name: 'Utilities', color: '#3399FF', icon: '💡' },
          { id: 'cat-12', name: 'Subscriptions', color: '#FF3399', icon: '📱' }
        ]
        
        setCategories(mockCategories)
        
        // Enhanced mock transactions with more variety and details
        const mockTransactions = [
          {
            id: 'tx-1',
            amount: 2850.75,
            type: 'deposit',
            description: 'Salary payment - March',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            category_id: 'cat-8',
            status: 'completed',
            account_id: 'account-1',
            currency: 'USD',
            merchant: 'TechCorp Inc.',
            reference: 'REF123456789'
          },
          {
            id: 'tx-2',
            amount: 120.45,
            type: 'withdrawal',
            description: 'Grocery shopping - Whole Foods',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            category_id: 'cat-3',
            status: 'completed',
            account_id: 'account-1',
            currency: 'USD',
            merchant: 'Whole Foods Market',
            reference: 'POS928374651'
          },
          {
            id: 'tx-3',
            amount: 1200,
            type: 'withdrawal',
            description: 'Monthly rent payment',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            category_id: 'cat-1',
            status: 'completed',
            account_id: 'account-1',
            currency: 'USD',
            merchant: 'Cityview Apartments',
            reference: 'ACH772435761'
          },
          {
            id: 'tx-4',
            amount: 500,
            type: 'transfer',
            description: 'Transfer to savings',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            category_id: 'cat-9',
            status: 'completed',
            account_id: 'account-1',
            to_account_id: 'account-2',
            currency: 'USD',
            reference: 'TRF837264591'
          },
          {
            id: 'tx-5',
            amount: 89.99,
            type: 'withdrawal',
            description: 'Netflix annual subscription',
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            category_id: 'cat-12',
            status: 'completed',
            account_id: 'account-1',
            currency: 'USD',
            merchant: 'Netflix Inc.',
            reference: 'SUB991827375'
          },
          {
            id: 'tx-6',
            amount: 42.50,
            type: 'withdrawal',
            description: 'Dinner at Olive Garden',
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            category_id: 'cat-3',
            status: 'completed',
            account_id: 'account-1',
            currency: 'USD',
            merchant: 'Olive Garden',
            reference: 'POS182736495'
          }
        ]
        
        // Simulate loading account transactions
        setTransactions(mockTransactions.filter(tx => tx.account_id === 'account-1'))
        
        // Create mock bills and scheduled payments
        const mockBills = [
          {
            id: 'bill-1',
            name: 'Rent',
            amount: 1200,
            due_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
            category_id: 'cat-1',
            recurring: true,
            frequency: 'monthly',
            account_id: 'account-1',
            autopay: true,
            payee: 'Cityview Apartments'
          },
          {
            id: 'bill-2',
            name: 'Electricity',
            amount: 150,
            due_date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
            category_id: 'cat-11',
            recurring: true,
            frequency: 'monthly',
            account_id: 'account-1',
            autopay: false,
            payee: 'City Power & Electric'
          },
          {
            id: 'bill-3',
            name: 'Internet',
            amount: 79.99,
            due_date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
            category_id: 'cat-11',
            recurring: true,
            frequency: 'monthly',
            account_id: 'account-1',
            autopay: true,
            payee: 'Comcast'
          }
        ]
        
        // Add mock data to window for access across components
        window.mockBills = mockBills;
        
        setLoading(false)
        
      } catch (err) {
        console.error('Mock setup error:', err)
        setLoading(false)
      }
    }
    
    setupMockUser()
  }, [])
  
  const handleLogout = () => {
    setUser(null)
  }
  
  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0)
  
  // Get the category color for a transaction
  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.color : '#808080'
  }
  
  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }
  
  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }
  
  // Get relative time for a date
  const getRelativeTime = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return formatDate(dateStr)
  }
  
  // Get transaction amount with sign
  const getTransactionAmount = (transaction) => {
    if (transaction.type === 'deposit') {
      return `+${formatCurrency(transaction.amount)}`
    } else if (transaction.type === 'withdrawal') {
      return `-${formatCurrency(transaction.amount)}`
    } else {
      return formatCurrency(transaction.amount)
    }
  }
  
  // Get transaction amount color
  const getTransactionAmountColor = (transaction) => {
    return transaction.type === 'deposit' ? '#10b981' : '#ef4444'
  }
  
  // Get account type icon & color
  const getAccountTypeInfo = (type) => {
    switch (type) {
      case 'checking':
        return { icon: '🏦', color: '#3b82f6' }
      case 'savings':
        return { icon: '💰', color: '#10b981' }
      case 'credit':
        return { icon: '💳', color: '#f59e0b' }
      case 'investment':
        return { icon: '📈', color: '#8b5cf6' }
      default:
        return { icon: '🏦', color: '#64748b' }
    }
  }
  
  // Toggle notifications panel
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.authContainer}>
          <h1 style={styles.title}>Bank of Trust</h1>
          <p style={styles.subtitle}>Welcome to your secure banking portal</p>
          
          <div style={styles.authTabs}>
            <button
              style={{
                ...styles.authTab,
                ...(isLoginMode ? styles.activeAuthTab : {})
              }}
              onClick={() => setIsLoginMode(true)}
            >
              Login
            </button>
            <button
              style={{
                ...styles.authTab,
                ...(!isLoginMode ? styles.activeAuthTab : {})
              }}
              onClick={() => setIsLoginMode(false)}
            >
              Register
            </button>
          </div>
          
          {isLoginMode ? (
            <form style={styles.authForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  style={styles.input}
                  placeholder="Enter your username"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  style={styles.input}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="button"
                style={styles.button}
                onClick={() => setupMockUser()}
              >
                Login
              </button>
            </form>
          ) : (
            <form style={styles.authForm}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    style={styles.input}
                    placeholder="First name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    style={styles.input}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  style={styles.input}
                  placeholder="Enter your email"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  style={styles.input}
                  placeholder="Choose a username"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  style={styles.input}
                  placeholder="Create a password"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number (optional)</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  style={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="button"
                style={styles.button}
                onClick={() => setupMockUser()}
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>B<span style={styles.logoHighlight}>o</span>T</div>
          <div style={styles.logoText}>Bank of Trust</div>
        </div>
        
        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'dashboard' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('dashboard')}
          >
            <span style={styles.navIcon}>📊</span> Dashboard
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'accounts' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('accounts')}
          >
            <span style={styles.navIcon}>💼</span> Accounts
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'transactions' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('transactions')}
          >
            <span style={styles.navIcon}>💸</span> Transactions
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'payments' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('payments')}
          >
            <span style={styles.navIcon}>💳</span> Payments
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'cards' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('cards')}
          >
            <span style={styles.navIcon}>💳</span> Cards
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'bills' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('bills')}
          >
            <span style={styles.navIcon}>📃</span> Bills
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'analytics' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('analytics')}
          >
            <span style={styles.navIcon}>📈</span> Analytics
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(activeSection === 'settings' ? styles.navButtonActive : {})
            }}
            onClick={() => setActiveSection('settings')}
          >
            <span style={styles.navIcon}>⚙️</span> Settings
          </button>
        </nav>
        
        <div style={styles.userPanel}>
          <div style={styles.userAvatar}>
            {user.first_name.charAt(0) + user.last_name.charAt(0)}
          </div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>{user.first_name} {user.last_name}</p>
            <p style={styles.userRole}>{user.role}</p>
          </div>
          <button style={styles.logoutIcon} onClick={handleLogout}>
            🚪
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.pageTitle}>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          
          <div style={styles.headerActions}>
            <button style={styles.notificationButton} onClick={toggleNotifications}>
              🔔
              {/* Notification Badge */}
              <span style={styles.notificationBadge}>3</span>
            </button>
            
            {/* Notifications Panel */}
            {isNotificationsOpen && (
              <div style={styles.notificationsPanel}>
                <h3 style={styles.notificationsPanelTitle}>Notifications</h3>
                <div style={styles.notificationsList}>
                  <div style={styles.notificationItem}>
                    <span style={styles.notificationIcon}>💰</span>
                    <div style={styles.notificationContent}>
                      <p style={styles.notificationMessage}>
                        Your salary of $2,850.75 has been deposited into your checking account.
                      </p>
                      <p style={styles.notificationDate}>7 days ago</p>
                    </div>
                  </div>
                  <div style={styles.notificationItem}>
                    <span style={styles.notificationIcon}>⚠️</span>
                    <div style={styles.notificationContent}>
                      <p style={styles.notificationMessage}>
                        Your utility bill of $150 is due in 10 days.
                      </p>
                      <p style={styles.notificationDate}>2 days ago</p>
                    </div>
                  </div>
                  <div style={styles.notificationItem}>
                    <span style={styles.notificationIcon}>🔒</span>
                    <div style={styles.notificationContent}>
                      <p style={styles.notificationMessage}>
                        Security alert: Your password was changed recently.
                      </p>
                      <p style={styles.notificationDate}>5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
        
        {/* Main */}
        <main style={styles.main}>
          {activeSection === 'dashboard' && (
            <div style={styles.dashboard}>
              {/* Quick Actions */}
              <div style={styles.quickActions}>
                <button style={{
                  ...styles.quickActionButton,
                  backgroundColor: '#3b82f6'
                }}>
                  <span style={styles.quickActionIcon}>💸</span>
                  Transfer
                </button>
                <button style={{
                  ...styles.quickActionButton,
                  backgroundColor: '#10b981'
                }}>
                  <span style={styles.quickActionIcon}>💰</span>
                  Deposit
                </button>
                <button style={{
                  ...styles.quickActionButton,
                  backgroundColor: '#f59e0b'
                }}>
                  <span style={styles.quickActionIcon}>💳</span>
                  Pay Bill
                </button>
                <button style={{
                  ...styles.quickActionButton,
                  backgroundColor: '#8b5cf6'
                }}>
                  <span style={styles.quickActionIcon}>📊</span>
                  Insights
                </button>
              </div>
              
              {/* Dashboard Grid */}
              <div style={styles.dashboardGrid}>
                {/* Account Summary Card */}
                <div style={styles.accountSummaryCard}>
                  <h3 style={styles.cardTitle}>Account Summary</h3>
                  <div style={styles.accountSummaryContent}>
                    <div style={styles.totalBalanceWrapper}>
                      <p style={styles.totalBalanceLabel}>Total Balance</p>
                      <p style={styles.totalBalanceAmount}>{formatCurrency(totalBalance)}</p>
                    </div>
                    
                    <div style={styles.accountsList}>
                      {accounts.map(account => {
                        const { icon, color } = getAccountTypeInfo(account.account_type)
                        return (
                          <div key={account.id} style={styles.accountSummaryItem}>
                            <div style={styles.accountTypeIndicator}>
                              <div style={{
                                ...styles.accountIcon,
                                backgroundColor: color
                              }}>
                                {icon}
                              </div>
                              <div style={styles.accountInfo}>
                                <p style={styles.accountName}>
                                  {account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)}
                                </p>
                                <p style={styles.accountNumber}>**** {account.account_number.slice(-4)}</p>
                              </div>
                            </div>
                            <p style={styles.accountBalance}>{formatCurrency(account.balance)}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Recent Transactions Card */}
                <div style={styles.recentTransactionsCard}>
                  <h3 style={styles.cardTitle}>Recent Transactions</h3>
                  <div style={styles.recentTransactionsList}>
                    {transactions.slice(0, 5).map(transaction => (
                      <div key={transaction.id} style={styles.recentTransactionItem}>
                        <div style={styles.transactionLeft}>
                          <div style={{
                            ...styles.categoryDot,
                            backgroundColor: getCategoryColor(transaction.category_id)
                          }}></div>
                          <div style={styles.transactionInfo}>
                            <p style={styles.transactionDescription}>
                              {transaction.description}
                            </p>
                            <p style={styles.transactionDate}>
                              {getRelativeTime(transaction.created_at)}
                            </p>
                          </div>
                        </div>
                        <p style={{
                          ...styles.transactionAmount,
                          color: getTransactionAmountColor(transaction)
                        }}>
                          {getTransactionAmount(transaction)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button style={styles.viewAllButton}>
                    View All Transactions
                  </button>
                </div>
                
                {/* Upcoming Bills Card */}
                <div style={styles.upcomingBillsCard}>
                  <h3 style={styles.cardTitle}>Upcoming Bills</h3>
                  <div style={styles.upcomingBillsList}>
                    {window.mockBills.map(bill => (
                      <div key={bill.id} style={styles.upcomingBillItem}>
                        <div style={styles.billInfo}>
                          <p style={styles.billName}>{bill.name}</p>
                          <p style={styles.billDueDate}>
                            <span>Due {formatDate(bill.due_date)}</span>
                            {bill.autopay && (
                              <span style={styles.autopayBadge}>Autopay</span>
                            )}
                          </p>
                        </div>
                        <p style={styles.billAmount}>{formatCurrency(bill.amount)}</p>
                      </div>
                    ))}
                  </div>
                  <button style={styles.viewAllButton}>
                    View All Bills
                  </button>
                </div>
                
                {/* Savings Goal Card */}
                <div style={styles.savingsGoalCard}>
                  <h3 style={styles.cardTitle}>Savings Goal</h3>
                  <div style={styles.savingsGoalContent}>
                    <p style={styles.savingsGoalText}>
                      Vacation Fund
                    </p>
                    <div style={styles.savingsProgressBarContainer}>
                      <div style={{
                        ...styles.savingsProgressBar,
                        width: '65%'
                      }}></div>
                    </div>
                    <div style={styles.savingsGoalStats}>
                      <p style={styles.savingsGoalAmount}>
                        $3,250 <span style={styles.savingsGoalTotal}>of $5,000</span>
                      </p>
                      <p style={styles.savingsGoalPercentage}>65%</p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Insights Card */}
                <div style={styles.quickInsightsCard}>
                  <h3 style={styles.cardTitle}>Quick Insights</h3>
                  <div style={styles.insightsList}>
                    <div style={styles.insightItem}>
                      <div style={styles.insightData}>
                        <p style={styles.insightTitle}>Monthly Income</p>
                        <p style={styles.insightValue}>$4,350</p>
                      </div>
                      <span style={styles.insightIcon}>💰</span>
                    </div>
                    <div style={styles.insightItem}>
                      <div style={styles.insightData}>
                        <p style={styles.insightTitle}>Monthly Expenses</p>
                        <p style={styles.insightValue}>$2,850</p>
                      </div>
                      <span style={styles.insightIcon}>💸</span>
                    </div>
                    <div style={styles.insightItem}>
                      <div style={styles.insightData}>
                        <p style={styles.insightTitle}>Savings Rate</p>
                        <p style={styles.insightValue}>34.5%</p>
                      </div>
                      <span style={styles.insightIcon}>📈</span>
                    </div>
                    <div style={styles.insightItem}>
                      <div style={styles.insightData}>
                        <p style={styles.insightTitle}>Largest Expense</p>
                        <p style={styles.insightValue}>Housing</p>
                      </div>
                      <span style={styles.insightIcon}>🏠</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Accounts Section */}
          {activeSection === 'accounts' && (
            <div style={styles.accountSection}>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>My Accounts</h2>
                <button style={{
                  ...styles.quickActionButton,
                  backgroundColor: '#3b82f6',
                  width: 'auto',
                  padding: '8px 16px'
                }}>
                  <span style={{ marginRight: '8px' }}>➕</span> Open New Account
                </button>
              </div>
              
              {/* Accounts Grid */}
              <div style={styles.dashboardGrid}>
                {accounts.map(account => {
                  const { icon, color } = getAccountTypeInfo(account.account_type);
                  return (
                    <div key={account.id} style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '20px',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '15px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            backgroundColor: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            marginRight: '12px'
                          }}>
                            {icon}
                          </div>
                          <div>
                            <h3 style={{
                              margin: '0',
                              fontSize: '18px',
                              fontWeight: '600'
                            }}>
                              {account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)} Account
                            </h3>
                            <p style={{
                              margin: '3px 0 0',
                              fontSize: '14px',
                              color: '#64748b'
                            }}>
                              {account.account_number}
                            </p>
                          </div>
                        </div>
                        {account.is_default && (
                          <div style={{
                            padding: '4px 8px',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: '500'
                          }}>
                            Default
                          </div>
                        )}
                      </div>
                      
                      <div style={{
                        borderTop: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                        padding: '15px 0',
                        margin: '15px 0'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '10px'
                        }}>
                          <p style={{
                            margin: '0',
                            fontSize: '14px',
                            color: '#64748b'
                          }}>
                            Current Balance
                          </p>
                          <p style={{
                            margin: '0',
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#0f172a'
                          }}>
                            {formatCurrency(account.balance)}
                          </p>
                        </div>
                        
                        {account.available_credit !== null && (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <p style={{
                              margin: '0',
                              fontSize: '14px',
                              color: '#64748b'
                            }}>
                              Available Credit
                            </p>
                            <p style={{
                              margin: '0',
                              fontSize: '14px',
                              color: '#0f172a'
                            }}>
                              {formatCurrency(account.available_credit)}
                            </p>
                          </div>
                        )}
                        
                        {account.interest_rate !== null && (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <p style={{
                              margin: '8px 0 0',
                              fontSize: '14px',
                              color: '#64748b'
                            }}>
                              Interest Rate
                            </p>
                            <p style={{
                              margin: '8px 0 0',
                              fontSize: '14px',
                              color: '#0f172a'
                            }}>
                              {account.interest_rate}%
                            </p>
                          </div>
                        )}
                        
                        {account.ytd_return !== undefined && (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}>
                            <p style={{
                              margin: '8px 0 0',
                              fontSize: '14px',
                              color: '#64748b'
                            }}>
                              YTD Return
                            </p>
                            <p style={{
                              margin: '8px 0 0',
                              fontSize: '14px',
                              color: '#10b981'
                            }}>
                              +{account.ytd_return}%
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        gap: '10px'
                      }}>
                        <button style={{
                          flex: '1',
                          padding: '8px',
                          backgroundColor: '#f1f5f9',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#0f172a',
                          cursor: 'pointer'
                        }}>
                          View Details
                        </button>
                        <button style={{
                          flex: '1',
                          padding: '8px',
                          backgroundColor: '#3b82f6',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: 'white',
                          cursor: 'pointer'
                        }}>
                          Transfer
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Transactions Section */}
          {activeSection === 'transactions' && (
            <div>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>Transaction History</h2>
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <select style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    fontSize: '14px'
                  }}>
                    <option value="all">All Accounts</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)} (*{account.account_number.slice(-4)})
                      </option>
                    ))}
                  </select>
                  <select style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    fontSize: '14px'
                  }}>
                    <option value="all">All Types</option>
                    <option value="deposit">Deposits</option>
                    <option value="withdrawal">Withdrawals</option>
                    <option value="transfer">Transfers</option>
                  </select>
                  <button style={{
                    padding: '8px 12px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Export
                  </button>
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                marginTop: '20px'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>
                      <th style={{
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#64748b'
                      }}>Date</th>
                      <th style={{
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#64748b'
                      }}>Description</th>
                      <th style={{
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#64748b'
                      }}>Category</th>
                      <th style={{
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#64748b'
                      }}>Account</th>
                      <th style={{
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#64748b',
                        textAlign: 'right'
                      }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => {
                      const category = categories.find(c => c.id === transaction.category_id);
                      const account = accounts.find(a => a.id === transaction.account_id);
                      return (
                        <tr key={transaction.id} style={{
                          borderBottom: '1px solid #e2e8f0'
                        }}>
                          <td style={{
                            padding: '12px 10px',
                            fontSize: '14px',
                            color: '#64748b'
                          }}>
                            {formatDate(transaction.created_at)}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontSize: '14px',
                            color: '#0f172a'
                          }}>
                            {transaction.description}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontSize: '14px',
                            color: '#0f172a'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: category ? category.color : '#ccc'
                              }}></div>
                              {category ? category.name : 'Uncategorized'}
                            </div>
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontSize: '14px',
                            color: '#0f172a'
                          }}>
                            {account ? `${account.account_type.charAt(0).toUpperCase() + account.account_type.slice(1)} (*${account.account_number.slice(-4)})` : 'Unknown Account'}
                          </td>
                          <td style={{
                            padding: '12px 10px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: transaction.type === 'deposit' ? '#10b981' : '#ef4444',
                            textAlign: 'right'
                          }}>
                            {getTransactionAmount(transaction)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Showing 1-{transactions.length} of {transactions.length} transactions
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button style={{
                      padding: '8px 12px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#64748b',
                      cursor: 'pointer'
                    }} disabled>
                      Previous
                    </button>
                    <button style={{
                      padding: '8px 12px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#64748b',
                      cursor: 'pointer'
                    }} disabled>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Payments Section */}
          {activeSection === 'payments' && (
            <div>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>Payments & Transfers</h2>
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    New Payment
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Manage Payees
                  </button>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
              }}>
                {/* Transfer Money Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    marginBottom: '15px'
                  }}>
                    🔄
                  </div>
                  <h3 style={{
                    margin: '0 0 5px',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    Transfer Money
                  </h3>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Move money between your accounts
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Start Transfer
                  </button>
                </div>
                
                {/* Pay Bills Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    marginBottom: '15px'
                  }}>
                    📃
                  </div>
                  <h3 style={{
                    margin: '0 0 5px',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    Pay Bills
                  </h3>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Pay your bills online
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Pay Bills
                  </button>
                </div>
                
                {/* Send Money Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    marginBottom: '15px'
                  }}>
                    👤
                  </div>
                  <h3 style={{
                    margin: '0 0 5px',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    Send to People
                  </h3>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Send money to friends and family
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Send Money
                  </button>
                </div>
                
                {/* Scheduled Payments Card */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    marginBottom: '15px'
                  }}>
                    🕒
                  </div>
                  <h3 style={{
                    margin: '0 0 5px',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    Scheduled Payments
                  </h3>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Manage your scheduled payments
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    View Schedule
                  </button>
                </div>
              </div>
              
              <h3 style={{
                margin: '30px 0 15px',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Recent Payees
              </h3>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '15px'
                }}>
                  {window.mockBills.map(bill => (
                    <div key={bill.id} style={{
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        {bill.payee.charAt(0)}
                      </div>
                      <div>
                        <p style={{
                          margin: '0',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {bill.payee}
                        </p>
                        <p style={{
                          margin: '3px 0 0',
                          fontSize: '12px',
                          color: '#64748b'
                        }}>
                          Last paid: 7 days ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Cards Section */}
          {activeSection === 'cards' && (
            <div>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>My Cards</h2>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Request New Card
                </button>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '20px',
                marginTop: '20px'
              }}>
                {/* Credit Card */}
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '16px',
                  padding: '25px',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '-10%',
                    width: '150%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)',
                    zIndex: '0'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '30px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    <div>
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        opacity: '0.7'
                      }}>
                        Credit Card
                      </p>
                      <p style={{
                        margin: '5px 0 0',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Bank of Trust Platinum
                      </p>
                    </div>
                    <div style={{
                      fontSize: '24px'
                    }}>
                      💳
                    </div>
                  </div>
                  
                  <p style={{
                    margin: '0 0 5px',
                    fontSize: '18px',
                    letterSpacing: '2px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    **** **** **** 5678
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    <div>
                      <p style={{
                        margin: '0',
                        fontSize: '10px',
                        opacity: '0.7'
                      }}>
                        CARDHOLDER NAME
                      </p>
                      <p style={{
                        margin: '5px 0 0',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        margin: '0',
                        fontSize: '10px',
                        opacity: '0.7'
                      }}>
                        EXPIRES
                      </p>
                      <p style={{
                        margin: '5px 0 0',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        12/25
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end'
                    }}>
                      <div style={{
                        width: '44px',
                        height: '28px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginBottom: '5px'
                      }}></div>
                      <p style={{
                        margin: '0',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        VISA
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '20px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    <button style={{
                      flex: '1',
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      Card Details
                    </button>
                    <button style={{
                      flex: '1',
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      Manage
                    </button>
                  </div>
                </div>
                
                {/* Debit Card */}
                <div style={{
                  backgroundColor: '#0f172a',
                  borderRadius: '16px',
                  padding: '25px',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '-10%',
                    width: '150%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)',
                    zIndex: '0'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '30px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    <div>
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        opacity: '0.7'
                      }}>
                        Debit Card
                      </p>
                      <p style={{
                        margin: '5px 0 0',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Bank of Trust Checking
                      </p>
                    </div>
                    <div style={{
                      fontSize: '24px'
                    }}>
                      💳
                    </div>
                  </div>
                  
                  <p style={{
                    margin: '0 0 5px',
                    fontSize: '18px',
                    letterSpacing: '2px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    **** **** **** 1234
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    <div>
                      <p style={{
                        margin: '0',
                        fontSize: '10px',
                        opacity: '0.7'
                      }}>
                        CARDHOLDER NAME
                      </p>
                      <p style={{
                        margin: '5px 0 0',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        margin: '0',
                        fontSize: '10px',
                        opacity: '0.7'
                      }}>
                        EXPIRES
                      </p>
                      <p style={{
                        margin: '5px 0 0',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        08/26
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end'
                    }}>
                      <div style={{
                        width: '44px',
                        height: '28px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginBottom: '5px'
                      }}></div>
                      <p style={{
                        margin: '0',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        VISA
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '20px',
                    position: 'relative',
                    zIndex: '1'
                  }}>
                    <button style={{
                      flex: '1',
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      Card Details
                    </button>
                    <button style={{
                      flex: '1',
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      Manage
                    </button>
                  </div>
                </div>
              </div>
              
              <h3 style={{
                margin: '30px 0 15px',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Card Controls
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 15px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Spending Limits
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Set daily/monthly spending limits
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Manage Limits
                  </button>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 15px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Freeze Card
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Temporarily lock your card
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Freeze Card
                  </button>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 15px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    PIN Management
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Change your card PIN
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Manage PIN
                  </button>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 15px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Travel Notices
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Notify us about your travel plans
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Add Notice
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Bills Section */}
          {activeSection === 'bills' && (
            <div>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>Bills & Utilities</h2>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Add New Bill
                </button>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginTop: '20px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    margin: '0 0 20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>Upcoming Bills</span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b'
                    }}>
                      Next 30 days
                    </span>
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {window.mockBills.map(bill => (
                      <div key={bill.id} style={{
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: getCategoryColor(bill.category_id)
                          }}></div>
                          <div>
                            <p style={{
                              margin: '0',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}>
                              {bill.name}
                            </p>
                            <p style={{
                              margin: '3px 0 0',
                              fontSize: '12px',
                              color: '#64748b'
                            }}>
                              Due in {new Date(bill.due_date).getDate() - new Date().getDate()} days
                            </p>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '3px'
                        }}>
                          <p style={{
                            margin: '0',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            {formatCurrency(bill.amount)}
                          </p>
                          {bill.autopay && (
                            <span style={{
                              fontSize: '11px',
                              padding: '2px 6px',
                              backgroundColor: '#10b981',
                              color: 'white',
                              borderRadius: '4px'
                            }}>
                              Autopay
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    margin: '0 0 20px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Bill Payment History
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getCategoryColor('cat-1')
                        }}></div>
                        <div>
                          <p style={{
                            margin: '0',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            Rent
                          </p>
                          <p style={{
                            margin: '3px 0 0',
                            fontSize: '12px',
                            color: '#64748b'
                          }}>
                            Paid on {formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))}
                          </p>
                        </div>
                      </div>
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {formatCurrency(1200)}
                      </p>
                    </div>
                    
                    <div style={{
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getCategoryColor('cat-11')
                        }}></div>
                        <div>
                          <p style={{
                            margin: '0',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            Electricity
                          </p>
                          <p style={{
                            margin: '3px 0 0',
                            fontSize: '12px',
                            color: '#64748b'
                          }}>
                            Paid on {formatDate(new Date(Date.now() - 25 * 24 * 60 * 60 * 1000))}
                          </p>
                        </div>
                      </div>
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {formatCurrency(150)}
                      </p>
                    </div>
                    
                    <div style={{
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getCategoryColor('cat-11')
                        }}></div>
                        <div>
                          <p style={{
                            margin: '0',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            Internet
                          </p>
                          <p style={{
                            margin: '3px 0 0',
                            fontSize: '12px',
                            color: '#64748b'
                          }}>
                            Paid on {formatDate(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000))}
                          </p>
                        </div>
                      </div>
                      <p style={{
                        margin: '0',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {formatCurrency(79.99)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 style={{
                margin: '30px 0 15px',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Bill Payment Settings
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 5px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Autopay Settings
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Manage your automatic bill payments
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Manage Autopay
                  </button>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 5px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Payment Reminders
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Set up reminders for upcoming bills
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Set Reminders
                  </button>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    margin: '0 0 5px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Payment Methods
                  </h4>
                  <p style={{
                    margin: '0 0 15px',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Manage your payment methods
                  </p>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Manage Methods
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>Financial Analytics</h2>
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <select style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    fontSize: '14px'
                  }}>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  <button style={{
                    padding: '8px 12px',
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#0f172a',
                    cursor: 'pointer'
                  }}>
                    Export
                  </button>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginTop: '20px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Total Income
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    {formatCurrency(4350.75)}
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: '12px',
                    color: '#10b981'
                  }}>
                    ↑ 12% from last month
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Total Expenses
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    {formatCurrency(2850.30)}
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: '12px',
                    color: '#ef4444'
                  }}>
                    ↑ 5% from last month
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Savings Rate
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    34.5%
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: '12px',
                    color: '#10b981'
                  }}>
                    ↑ 2.5% from last month
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '20px',
                marginTop: '20px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                  gridColumn: '1 / 2',
                  gridRow: '1 / 3'
                }}>
                  <h3 style={{
                    margin: '0 0 20px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Spending by Category
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {categories.slice(0, 6).map(category => {
                      // Random percentage for demo
                      const percentage = Math.floor(Math.random() * 30) + 5;
                      return (
                        <div key={category.id} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: category.color
                              }}></div>
                              <p style={{
                                margin: '0',
                                fontSize: '14px',
                                fontWeight: '500'
                              }}>
                                {category.name}
                              </p>
                            </div>
                            <p style={{
                              margin: '0',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}>
                              {percentage}%
                            </p>
                          </div>
                          <div style={{
                            height: '8px',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${percentage}%`,
                              backgroundColor: category.color,
                              borderRadius: '4px'
                            }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div style={{
                    marginTop: '30px'
                  }}>
                    <h3 style={{
                      margin: '0 0 20px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      Monthly Spending Trend
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      height: '150px',
                      paddingBottom: '20px',
                      alignItems: 'flex-end',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                        // Random height for demo
                        const height = Math.floor(Math.random() * 80) + 20;
                        return (
                          <div key={month} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '50px'
                          }}>
                            <div style={{
                              height: `${height}%`,
                              width: '30px',
                              backgroundColor: '#3b82f6',
                              borderRadius: '4px 4px 0 0'
                            }}></div>
                            <p style={{
                              margin: '8px 0 0',
                              fontSize: '12px',
                              color: '#64748b'
                            }}>
                              {month}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    margin: '0 0 20px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Top Spending Categories
                  </h3>
                  
                  <div style={{
                    width: '180px',
                    height: '180px',
                    margin: '0 auto 20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    {/* Pie chart segments */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                      background: '#FF5733'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%)',
                      background: '#3357FF'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      clipPath: 'polygon(50% 50%, 0% 100%, 0% 0%, 50% 0%)',
                      background: '#33FF57'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      width: '70%',
                      height: '70%',
                      borderRadius: '50%',
                      background: 'white'
                    }}></div>
                    <p style={{
                      margin: '0',
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: '1'
                    }}>
                      Total Expenses
                      <br />
                      <span style={{
                        fontSize: '16px',
                        display: 'block',
                        margin: '5px 0 0'
                      }}>
                        {formatCurrency(2850.30)}
                      </span>
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#FF5733'
                        }}></div>
                        <p style={{ margin: '0', fontSize: '14px' }}>Housing</p>
                      </div>
                      <p style={{ margin: '0', fontSize: '14px' }}>40%</p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#3357FF'
                        }}></div>
                        <p style={{ margin: '0', fontSize: '14px' }}>Food</p>
                      </div>
                      <p style={{ margin: '0', fontSize: '14px' }}>30%</p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#33FF57'
                        }}></div>
                        <p style={{ margin: '0', fontSize: '14px' }}>Transport</p>
                      </div>
                      <p style={{ margin: '0', fontSize: '14px' }}>30%</p>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    margin: '0 0 20px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Budget Status
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '5px'
                      }}>
                        <p style={{
                          margin: '0',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          Food
                        </p>
                        <p style={{
                          margin: '0',
                          fontSize: '14px'
                        }}>
                          {formatCurrency(320.45)} / {formatCurrency(500)}
                        </p>
                      </div>
                      <div style={{
                        height: '8px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: '64%',
                          backgroundColor: '#10b981',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '5px'
                      }}>
                        <p style={{
                          margin: '0',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          Entertainment
                        </p>
                        <p style={{
                          margin: '0',
                          fontSize: '14px'
                        }}>
                          {formatCurrency(150.20)} / {formatCurrency(200)}
                        </p>
                      </div>
                      <div style={{
                        height: '8px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: '75%',
                          backgroundColor: '#f59e0b',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '5px'
                      }}>
                        <p style={{
                          margin: '0',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          Transportation
                        </p>
                        <p style={{
                          margin: '0',
                          fontSize: '14px'
                        }}>
                          {formatCurrency(280.75)} / {formatCurrency(300)}
                        </p>
                      </div>
                      <div style={{
                        height: '8px',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: '94%',
                          backgroundColor: '#ef4444',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748b',
                    cursor: 'pointer',
                    marginTop: '20px'
                  }}>
                    Manage Budgets
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div>
              <div style={styles.sectionHeaderMain}>
                <h2 style={styles.sectionTitleMain}>Account Settings</h2>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '250px 1fr',
                gap: '30px',
                marginTop: '20px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '15px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                  height: 'fit-content'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <button style={{
                      textAlign: 'left',
                      padding: '10px 15px',
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}>
                      Personal Information
                    </button>
                    <button style={{
                      textAlign: 'left',
                      padding: '10px 15px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}>
                      Security
                    </button>
                    <button style={{
                      textAlign: 'left',
                      padding: '10px 15px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}>
                      Notifications
                    </button>
                    <button style={{
                      textAlign: 'left',
                      padding: '10px 15px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}>
                      Linked Accounts
                    </button>
                    <button style={{
                      textAlign: 'left',
                      padding: '10px 15px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}>
                      Privacy
                    </button>
                    <button style={{
                      textAlign: 'left',
                      padding: '10px 15px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}>
                      Preferences
                    </button>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '25px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    margin: '0 0 25px',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    Personal Information
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '15px'
                    }}>
                      <div style={{
                        flex: '1'
                      }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '5px'
                        }}>
                          First Name
                        </label>
                        <input type="text" value={user.first_name} readOnly style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '14px'
                        }} />
                      </div>
                      <div style={{
                        flex: '1'
                      }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '5px'
                        }}>
                          Last Name
                        </label>
                        <input type="text" value={user.last_name} readOnly style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '14px'
                        }} />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '5px'
                      }}>
                        Email Address
                      </label>
                      <input type="email" value={user.email} readOnly style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }} />
                    </div>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '5px'
                      }}>
                        Phone Number
                      </label>
                      <input type="tel" value={user.phone_number} readOnly style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }} />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '15px'
                    }}>
                      <div style={{
                        flex: '1'
                      }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '5px'
                        }}>
                          Username
                        </label>
                        <input type="text" value={user.username} readOnly style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '14px'
                        }} />
                      </div>
                      <div style={{
                        flex: '1'
                      }}>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '5px'
                        }}>
                          Account Status
                        </label>
                        <input type="text" value={user.status.charAt(0).toUpperCase() + user.status.slice(1)} readOnly style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '14px',
                          backgroundColor: '#f8fafc'
                        }} />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '5px'
                      }}>
                        Address
                      </label>
                      <textarea readOnly placeholder="Enter your address..." rows={3} style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}></textarea>
                    </div>
                    
                    <div style={{
                      marginTop: '10px'
                    }}>
                      <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>
                        Edit Information
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App