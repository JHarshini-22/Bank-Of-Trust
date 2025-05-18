const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');
const connectPgSimple = require('connect-pg-simple');
const helmet = require('helmet');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Log API URL for debugging
console.log('API Server URL:', `http://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session with PostgreSQL store
const PgSession = connectPgSimple(session);
app.use(session({
  store: new PgSession({
    pool,
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'bank-of-trust-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: false, // Set to false for HTTP
    sameSite: 'lax' // Changed to 'lax' for better compatibility
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Helper functions for password hashing and verification
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex') + '.' + salt);
    });
  });
}

async function verifyPassword(password, hash) {
  const [hashedPassword, salt] = hash.split('.');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(crypto.timingSafeEqual(
        Buffer.from(hashedPassword, 'hex'),
        derivedKey
      ));
    });
  });
}

// Initialize database tables
async function initDatabase() {
  try {
    // Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        phone_number VARCHAR(20),
        role VARCHAR(50) NOT NULL DEFAULT 'customer',
        status VARCHAR(50) NOT NULL DEFAULT 'pending_verification',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("Users table created or already exists");
    
    // Create accounts table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        account_number VARCHAR(20) NOT NULL UNIQUE,
        account_type VARCHAR(20) NOT NULL,
        balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
        currency VARCHAR(3) NOT NULL DEFAULT 'USD',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        is_default BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("Accounts table created or already exists");
    
    // Create transactions table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        from_account_id UUID REFERENCES accounts(id),
        to_account_id UUID REFERENCES accounts(id),
        amount NUMERIC(15, 2) NOT NULL,
        currency VARCHAR(3) NOT NULL,
        type VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        reference VARCHAR(36) NOT NULL,
        description TEXT,
        category_id UUID,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("Transactions table created or already exists");
    
    // Create categories table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE,
        color VARCHAR(7) NOT NULL DEFAULT '#6366F1',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("Categories table created or already exists");
    
    // Insert default categories if table is empty
    const categoriesResult = await pool.query('SELECT * FROM categories');
    if (categoriesResult.rows.length === 0) {
      const defaultCategories = [
        { name: "Housing", color: "#FF5733" },
        { name: "Transportation", color: "#33FF57" },
        { name: "Food", color: "#3357FF" },
        { name: "Entertainment", color: "#F033FF" },
        { name: "Healthcare", color: "#33FFF0" },
        { name: "Personal", color: "#FFC733" },
        { name: "Education", color: "#FF33A8" },
        { name: "Savings", color: "#33FFAA" },
        { name: "Debt", color: "#AA33FF" },
        { name: "Income", color: "#33FFA8" },
        { name: "Transfer", color: "#808080" }
      ];
      
      for (const category of defaultCategories) {
        await pool.query(
          'INSERT INTO categories (name, color) VALUES ($1, $2)',
          [category.name, category.color]
        );
      }
      console.log("Default categories inserted");
    } else {
      console.log("Default categories already exist");
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// User data access functions
const userDB = {
  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },
  
  async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  },
  
  async createUser(user) {
    const hashedPassword = await hashPassword(user.password);
    const result = await pool.query(
      `INSERT INTO users (username, email, first_name, last_name, password, phone_number, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        user.username,
        user.email,
        user.firstName,
        user.lastName,
        hashedPassword,
        user.phoneNumber,
        user.role || 'customer',
        user.status || 'pending_verification'
      ]
    );
    return result.rows[0];
  }
};

// Configure Passport
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userDB.findByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDB.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// API Routes

// Auth routes
app.post('/api/register', async (req, res, next) => {
  try {
    const { username, email, firstName, lastName, password, phoneNumber } = req.body;
    
    // Check if user already exists
    const existingUser = await userDB.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    // Create user
    const user = await userDB.createUser({
      username,
      email,
      firstName,
      lastName,
      password,
      phoneNumber
    });
    
    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;
    
    // Log user in
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(userWithoutPassword);
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    
    req.login(user, (err) => {
      if (err) return next(err);
      
      // Remove password before sending response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/api/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  // Remove password before sending response
  const { password: _, ...userWithoutPassword } = req.user;
  res.json(userWithoutPassword);
});

// Account data access functions
const accountDB = {
  async createAccount(account) {
    // Generate a unique account number (simplified)
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    
    const result = await pool.query(
      `INSERT INTO accounts (user_id, account_number, account_type, currency, is_default)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        account.userId,
        accountNumber.toString(),
        account.accountType,
        account.currency || 'USD',
        account.isDefault || false
      ]
    );
    return result.rows[0];
  },
  
  async getAccountsByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM accounts WHERE user_id = $1 ORDER BY created_at',
      [userId]
    );
    return result.rows;
  },
  
  async getAccountById(id) {
    const result = await pool.query(
      'SELECT * FROM accounts WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
};

// Account Routes
app.post('/api/accounts', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const { accountType, currency, isDefault } = req.body;
    
    // Create new account
    const account = await accountDB.createAccount({
      userId: req.user.id,
      accountType,
      currency,
      isDefault
    });
    
    res.status(201).json(account);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Error creating account' });
  }
});

app.get('/api/accounts', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const accounts = await accountDB.getAccountsByUserId(req.user.id);
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Error fetching accounts' });
  }
});

app.get('/api/accounts/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const account = await accountDB.getAccountById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Security check: only allow access to own accounts
    if (account.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.status(200).json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ message: 'Error fetching account' });
  }
});

// Transaction data access functions
const transactionDB = {
  async getTransactionsByUserId(userId, limit = 20, offset = 0) {
    // First get all accounts for this user
    const accountsResult = await pool.query(
      'SELECT id FROM accounts WHERE user_id = $1',
      [userId]
    );
    
    if (accountsResult.rows.length === 0) {
      return [];
    }
    
    const accountIds = accountsResult.rows.map(account => account.id);
    
    // We'll build the query differently to avoid dynamic placeholders
    let query = `
      SELECT t.*, 
        c.name as category_name, c.color as category_color,
        fa.account_number as from_account_number, fa.account_type as from_account_type,
        ta.account_number as to_account_number, ta.account_type as to_account_type
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN accounts fa ON t.from_account_id = fa.id
      LEFT JOIN accounts ta ON t.to_account_id = ta.id
      WHERE (t.from_account_id = ANY($3) OR t.to_account_id = ANY($3))
      ORDER BY t.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    
    // Get transactions for these accounts
    const result = await pool.query(query, [limit, offset, accountIds]);
    
    return result.rows;
  },
  
  async getTransactionsByAccountId(accountId, limit = 20, offset = 0) {
    // Build a more consistent query
    const query = `
      SELECT t.*, 
        c.name as category_name, c.color as category_color,
        fa.account_number as from_account_number, fa.account_type as from_account_type,
        ta.account_number as to_account_number, ta.account_type as to_account_type
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN accounts fa ON t.from_account_id = fa.id
      LEFT JOIN accounts ta ON t.to_account_id = ta.id
      WHERE t.from_account_id = $1 OR t.to_account_id = $1
      ORDER BY t.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    
    const result = await pool.query(query, [accountId, limit, offset]);
    
    return result.rows;
  },
  
  async createTransaction(transaction) {
    const client = await pool.connect();
    
    try {
      // Start transaction
      await client.query('BEGIN');
      
      // Generate a unique reference
      const reference = `TR-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      
      // Get category ID if category name is provided
      let categoryId = transaction.categoryId;
      if (transaction.categoryName && !categoryId) {
        const categoryResult = await client.query(
          'SELECT id FROM categories WHERE name = $1',
          [transaction.categoryName]
        );
        
        if (categoryResult.rows.length > 0) {
          categoryId = categoryResult.rows[0].id;
        }
      }
      
      // Insert the transaction
      const transactionResult = await client.query(
        `INSERT INTO transactions (
          from_account_id, to_account_id, amount, currency, 
          type, status, reference, description, category_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          transaction.fromAccountId,
          transaction.toAccountId,
          transaction.amount,
          transaction.currency || 'USD',
          transaction.type,
          transaction.status || 'completed',
          reference,
          transaction.description || '',
          categoryId
        ]
      );
      
      const newTransaction = transactionResult.rows[0];
      
      // Update account balances
      if (transaction.fromAccountId && transaction.type !== 'deposit') {
        await client.query(
          'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
          [transaction.amount, transaction.fromAccountId]
        );
      }
      
      if (transaction.toAccountId && transaction.type !== 'withdrawal') {
        await client.query(
          'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
          [transaction.amount, transaction.toAccountId]
        );
      }
      
      // Commit the transaction
      await client.query('COMMIT');
      
      return newTransaction;
    } catch (error) {
      // Rollback in case of error
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client
      client.release();
    }
  }
};

// Transaction Routes
app.get('/api/transactions', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    
    const transactions = await transactionDB.getTransactionsByUserId(
      req.user.id, 
      limit, 
      offset
    );
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

app.post('/api/transactions', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const { 
      fromAccountId, 
      toAccountId, 
      amount, 
      currency, 
      type, 
      description, 
      categoryName 
    } = req.body;
    
    // Validate transaction data
    if (!type || !['deposit', 'withdrawal', 'transfer'].includes(type)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    
    // Validate accounts
    if (type === 'withdrawal' || type === 'transfer') {
      // Make sure fromAccountId is provided for withdrawals and transfers
      if (!fromAccountId) {
        return res.status(400).json({ message: 'Source account is required' });
      }
      
      // Check if the account belongs to the user
      const fromAccount = await accountDB.getAccountById(fromAccountId);
      if (!fromAccount) {
        return res.status(404).json({ message: 'Source account not found' });
      }
      
      if (fromAccount.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied to source account' });
      }
      
      // Check for sufficient funds
      if (parseFloat(fromAccount.balance) < parseFloat(amount)) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
    }
    
    if (type === 'deposit' || type === 'transfer') {
      // Make sure toAccountId is provided for deposits and transfers
      if (!toAccountId) {
        return res.status(400).json({ message: 'Destination account is required' });
      }
      
      // Check if the account belongs to the user
      const toAccount = await accountDB.getAccountById(toAccountId);
      if (!toAccount) {
        return res.status(404).json({ message: 'Destination account not found' });
      }
      
      if (toAccount.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied to destination account' });
      }
    }
    
    // Create the transaction
    const transaction = await transactionDB.createTransaction({
      fromAccountId,
      toAccountId,
      amount: parseFloat(amount),
      currency: currency || 'USD',
      type,
      description,
      categoryName
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

app.get('/api/accounts/:id/transactions', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    // First check if account belongs to user
    const account = await accountDB.getAccountById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Security check: only allow access to own accounts
    if (account.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    
    const transactions = await transactionDB.getTransactionsByAccountId(
      req.params.id,
      limit,
      offset
    );
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching account transactions:', error);
    res.status(500).json({ message: 'Error fetching account transactions' });
  }
});

// Category data access
const categoryDB = {
  async getAllCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  }
};

// Category Routes
app.get('/api/categories', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    const categories = await categoryDB.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    message: 'Bank of Trust API is running!',
    auth: req.isAuthenticated() ? 'authenticated' : 'unauthenticated'
  });
});

// Root path - API documentation or welcome page
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bank of Trust API</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #2563eb;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
        }
        h2 {
          color: #4b5563;
          margin-top: 30px;
        }
        .endpoint {
          background-color: #f9fafb;
          border-left: 4px solid #2563eb;
          padding: 10px 15px;
          margin: 15px 0;
          border-radius: 0 4px 4px 0;
        }
        .method {
          font-weight: bold;
          color: #2563eb;
          display: inline-block;
          width: 80px;
        }
        code {
          background-color: #f1f5f9;
          padding: 2px 5px;
          border-radius: 4px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <h1>Bank of Trust API</h1>
      <p>Welcome to the Bank of Trust RESTful API. This API provides banking services including user authentication, account management, transaction processing, and analytics.</p>
      
      <h2>Authentication Endpoints</h2>
      <div class="endpoint">
        <div><span class="method">POST</span> <code>/api/register</code></div>
        <p>Register a new user account</p>
      </div>
      <div class="endpoint">
        <div><span class="method">POST</span> <code>/api/login</code></div>
        <p>Authenticate and get session</p>
      </div>
      <div class="endpoint">
        <div><span class="method">POST</span> <code>/api/logout</code></div>
        <p>End current session</p>
      </div>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/user</code></div>
        <p>Get current authenticated user details</p>
      </div>
      
      <h2>Account Management</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/accounts</code></div>
        <p>List all accounts for authenticated user</p>
      </div>
      <div class="endpoint">
        <div><span class="method">POST</span> <code>/api/accounts</code></div>
        <p>Create a new bank account</p>
      </div>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/accounts/:id</code></div>
        <p>Get details for a specific account</p>
      </div>
      
      <h2>Transactions</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/transactions</code></div>
        <p>List all transactions for the authenticated user</p>
      </div>
      <div class="endpoint">
        <div><span class="method">POST</span> <code>/api/transactions</code></div>
        <p>Create a new transaction (deposit, withdrawal, or transfer)</p>
      </div>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/accounts/:accountId/transactions</code></div>
        <p>Get transactions for a specific account</p>
      </div>
      
      <h2>Categories</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/categories</code></div>
        <p>List all transaction categories</p>
      </div>
      
      <h2>System Status</h2>
      <div class="endpoint">
        <div><span class="method">GET</span> <code>/api/health</code></div>
        <p>Check API status and authentication state</p>
      </div>
      
      <footer style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px; color: #6b7280;">
        <p>&copy; ${new Date().getFullYear()} Bank of Trust. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `);
});

// Start the server
(async () => {
  try {
    // Initialize the database
    await initDatabase();
    
    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
      console.log(`For local access: http://localhost:${PORT}`);
      console.log(`For Replit access: ${process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'URL not available'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();