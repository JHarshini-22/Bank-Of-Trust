import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  text,
  boolean,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User table schema
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  password: text("password").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull().default("customer"),
  status: varchar("status", { length: 50 }).notNull().default("pending_verification"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Account table schema
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  accountNumber: varchar("account_number", { length: 20 }).notNull().unique(),
  accountType: varchar("account_type", { length: 20 }).notNull(),
  balance: numeric("balance", { precision: 15, scale: 2 }).notNull().default("0"),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Transaction table schema
export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  fromAccountId: uuid("from_account_id").references(() => accounts.id),
  toAccountId: uuid("to_account_id").references(() => accounts.id),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  reference: varchar("reference", { length: 36 }).notNull(),
  description: text("description"),
  categoryId: uuid("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Category table schema
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  color: varchar("color", { length: 7 }).notNull().default("#6366F1"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Credit Card table schema
export const creditCards = pgTable("credit_cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  cardNumber: varchar("card_number", { length: 19 }).notNull().unique(),
  cardType: varchar("card_type", { length: 50 }).notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
  creditLimit: numeric("credit_limit", { precision: 15, scale: 2 }).notNull(),
  availableCredit: numeric("available_credit", { precision: 15, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Loan table schema
export const loans = pgTable("loans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  loanType: varchar("loan_type", { length: 50 }).notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  interestRate: numeric("interest_rate", { precision: 5, scale: 2 }).notNull(),
  termMonths: integer("term_months").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relationships

// User relations
export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  creditCards: many(creditCards),
  loans: many(loans),
}));

// Account relations
export const accountRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
  incomingTransactions: many(transactions, { relationName: "toAccount" }),
  outgoingTransactions: many(transactions, { relationName: "fromAccount" }),
}));

// Transaction relations
export const transactionRelations = relations(transactions, ({ one }) => ({
  fromAccount: one(accounts, {
    fields: [transactions.fromAccountId],
    references: [accounts.id],
    relationName: "fromAccount",
  }),
  toAccount: one(accounts, {
    fields: [transactions.toAccountId],
    references: [accounts.id],
    relationName: "toAccount",
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

// Category relations
export const categoryRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

// Credit Card relations
export const creditCardRelations = relations(creditCards, ({ one }) => ({
  user: one(users, {
    fields: [creditCards.userId],
    references: [users.id],
  }),
}));

// Loan relations
export const loanRelations = relations(loans, ({ one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type CreditCard = typeof creditCards.$inferSelect;
export type InsertCreditCard = typeof creditCards.$inferInsert;
export type Loan = typeof loans.$inferSelect;
export type InsertLoan = typeof loans.$inferInsert;

// Enum definitions for TypeScript type checking
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  TELLER = 'teller',
  COMPLIANCE_OFFICER = 'compliance_officer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
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

export enum TimeFrame {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}