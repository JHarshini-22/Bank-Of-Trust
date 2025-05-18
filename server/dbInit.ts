import { db } from "./db";
import { users, accounts, transactions, categories } from "../shared/schema";
import { sql } from "drizzle-orm";

/**
 * Initialize the database by creating tables if they don't exist
 * and inserting default values if needed
 */
export async function initDatabase() {
  try {
    console.log("Initializing database...");
    
    // Create tables if they don't exist
    await createTables();
    
    // Insert default transaction categories
    await insertDefaultCategories();
    
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

/**
 * Create the database tables if they don't exist
 */
async function createTables() {
  try {
    // Users table
    await db.execute(sql`
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
    
    // Accounts table
    await db.execute(sql`
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
    
    // Categories table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE,
        color VARCHAR(7) NOT NULL DEFAULT '#6366F1',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("Categories table created or already exists");
    
    // Transactions table
    await db.execute(sql`
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
        category_id UUID REFERENCES categories(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("Transactions table created or already exists");
    
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

/**
 * Insert default categories if they don't exist
 */
async function insertDefaultCategories() {
  try {
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
    
    // Check if categories already exist
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length === 0) {
      // If no categories exist, insert default ones
      await db.insert(categories).values(defaultCategories);
      console.log("Default categories inserted");
    } else {
      console.log("Default categories already exist");
    }
  } catch (error) {
    console.error("Error inserting default categories:", error);
    throw error;
  }
}