// Bank of Trust App Styles

const styles = {
  // Overall container
  container: {
    display: 'flex',
    height: '100vh',
    margin: '0',
    padding: '0',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#333',
    backgroundColor: '#f5f7fa',
    overflow: 'hidden'
  },
  
  // Sidebar
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)'
  },
  logoContainer: {
    padding: '0 20px 20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '20px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '0 8px 0 0'
  },
  logoHighlight: {
    color: '#3b82f6'
  },
  logoText: {
    fontSize: '16px',
    fontWeight: 'medium',
    color: '#64748b'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    padding: '0 10px'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    margin: '4px 0',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  navButtonActive: {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    fontWeight: '600'
  },
  navIcon: {
    marginRight: '12px',
    fontSize: '18px'
  },
  userPanel: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    marginTop: 'auto',
    borderTop: '1px solid #e2e8f0'
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '10px'
  },
  userInfo: {
    flex: '1'
  },
  userName: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a'
  },
  userRole: {
    margin: '0',
    fontSize: '12px',
    color: '#64748b'
  },
  logoutIcon: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  // Main content area
  mainContent: {
    flex: '1',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '20px 30px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0',
    zIndex: '10'
  },
  pageTitle: {
    margin: '0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#0f172a'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  notificationButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '22px',
    padding: '8px',
    position: 'relative',
    marginLeft: '10px'
  },
  notificationBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationsPanel: {
    position: 'absolute',
    top: '45px',
    right: '0',
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    zIndex: '100'
  },
  notificationsPanelTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 15px 0',
    padding: '0 0 10px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  notificationsEmpty: {
    color: '#64748b',
    textAlign: 'center',
    padding: '20px 0'
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '350px',
    overflowY: 'auto'
  },
  notificationItem: {
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#f8fafc',
    transition: 'background-color 0.2s'
  },
  notificationRead: {
    backgroundColor: 'transparent',
    opacity: '0.7'
  },
  notificationIcon: {
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationContent: {
    flex: '1'
  },
  notificationMessage: {
    margin: '0',
    fontSize: '13px',
    lineHeight: '1.4'
  },
  notificationDate: {
    margin: '4px 0 0',
    fontSize: '11px',
    color: '#64748b'
  },
  
  // Main content
  main: {
    padding: '20px 30px',
    flex: '1',
    overflowY: 'auto'
  },
  
  // Dashboard specific styles
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  quickActions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  quickActionButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    border: 'none',
    padding: '15px',
    color: 'white',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    width: '110px',
    transition: 'transform 0.2s'
  },
  quickActionIcon: {
    fontSize: '24px',
    marginBottom: '8px'
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px'
  },
  
  // Dashboard cards
  accountSummaryCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    gridColumn: 'span 2'
  },
  recentTransactionsCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    height: '400px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  upcomingBillsCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    height: '400px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  savingsGoalCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
  },
  quickInsightsCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 20px 0',
    color: '#0f172a'
  },
  
  // Account summary styling
  accountSummaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  totalBalanceWrapper: {
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    marginBottom: '10px',
    border: '1px solid #e2e8f0'
  },
  totalBalanceLabel: {
    margin: '0',
    fontSize: '14px',
    color: '#64748b'
  },
  totalBalanceAmount: {
    margin: '5px 0 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a'
  },
  accountsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '250px',
    overflowY: 'auto'
  },
  accountSummaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    border: '1px solid #e2e8f0'
  },
  accountTypeIndicator: {
    display: 'flex',
    alignItems: 'center'
  },
  accountIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginRight: '10px'
  },
  accountInfo: {},
  accountName: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a'
  },
  accountNumber: {
    margin: '3px 0 0',
    fontSize: '12px',
    color: '#64748b'
  },
  accountBalance: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a'
  },
  
  // Recent transactions styling
  recentTransactionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: '1',
    overflowY: 'auto'
  },
  recentTransactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0'
  },
  transactionLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  categoryDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '12px'
  },
  transactionInfo: {},
  transactionDescription: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f172a'
  },
  transactionDate: {
    margin: '3px 0 0',
    fontSize: '12px',
    color: '#64748b'
  },
  transactionAmount: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '600'
  },
  viewAllButton: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#f1f5f9',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s'
  },
  
  // Upcoming bills styling
  upcomingBillsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: '1',
    overflowY: 'auto'
  },
  upcomingBillItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0'
  },
  billInfo: {},
  billName: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f172a'
  },
  billDueDate: {
    margin: '3px 0 0',
    fontSize: '12px',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  autopayBadge: {
    backgroundColor: '#10b981',
    color: 'white',
    fontSize: '10px',
    padding: '2px 5px',
    borderRadius: '4px',
    marginLeft: '5px'
  },
  billAmount: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a'
  },
  
  // Savings goal styling
  savingsGoalContent: {
    padding: '10px'
  },
  savingsGoalText: {
    margin: '0 0 15px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f172a'
  },
  savingsProgressBarContainer: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  savingsProgressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '4px'
  },
  savingsGoalStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  savingsGoalAmount: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a'
  },
  savingsGoalTotal: {
    fontWeight: '400',
    color: '#64748b'
  },
  savingsGoalPercentage: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#10b981'
  },
  
  // Insights styling
  insightsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '15px'
  },
  insightItem: {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  insightData: {},
  insightTitle: {
    margin: '0',
    fontSize: '12px',
    color: '#64748b'
  },
  insightValue: {
    margin: '5px 0 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a'
  },
  insightIcon: {
    fontSize: '18px'
  },
  
  // Common styles
  sectionHeaderMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitleMain: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0'
  },
  
  // Bills & Analytics specific styles
  billsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px'
  },
  analyticsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  analyticsFilters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  analyticsFilter: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'transparent',
    fontSize: '14px',
    cursor: 'pointer'
  },
  analyticsFilterActive: {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
    fontWeight: '500'
  },
  
  // Card styles for accounts section
  accountSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  
  // Original styles
  oldContainer: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    color: '#333'
  },
  oldHeader: {
    marginBottom: '30px',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 5px 0',
    color: '#1f2937'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: '0'
  },
  oldMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  accountSelector: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0',
    color: '#1f2937'
  },
  accountList: {
    display: 'flex',
    gap: '15px',
    overflowX: 'auto',
    padding: '5px 0',
    marginTop: '15px'
  },
  accountCard: {
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    minWidth: '200px',
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s ease'
  },
  selectedAccount: {
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  transactionSection: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '20px'
  },
  transactionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px'
  },
  transactionCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb'
  },
  transactionMeta: {
    margin: '0',
    fontSize: '13px',
    color: '#6b7280'
  },
  emptyState: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '20px 0'
  },
  error: {
    color: '#ef4444',
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    borderRadius: '6px',
    border: '1px solid #fecaca',
    marginBottom: '16px',
    fontSize: '14px'
  },
  // Auth styles
  authContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '24px'
  },
  authTabs: {
    display: 'flex',
    marginBottom: '24px',
    borderBottom: '1px solid #e5e7eb'
  },
  authTab: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s ease'
  },
  activeAuthTab: {
    color: '#3b82f6',
    borderBottom: '2px solid #3b82f6'
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%'
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    width: '100%'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563'
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  button: {
    padding: '10px 16px',
    borderRadius: '6px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '8px'
  },
  // User info styles
  welcomeText: {
    fontSize: '15px',
    fontWeight: '500',
    margin: '0'
  },
  logoutButton: {
    padding: '6px 12px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#4b5563',
    transition: 'all 0.2s ease'
  },
  // Section header with actions
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  addButton: {
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  actionButton: {
    padding: '6px 12px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '24px',
    width: '450px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#1f2937'
  },
  modalCloseButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    color: '#6b7280',
    padding: '0',
    lineHeight: '1'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px'
  },
  cancelButton: {
    padding: '10px 16px',
    borderRadius: '6px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  }
};

export default styles;