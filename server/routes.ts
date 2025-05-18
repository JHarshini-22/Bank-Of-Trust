import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "./db";
import { accounts, transactions, categories } from "../shared/schema";
import { eq, desc, and } from "drizzle-orm";

// Register all routes for the Express app
export function registerRoutes(app: Express): Server {
  // Setup authentication routes
  setupAuth(app);

  // API Routes
  
  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    return res.status(200).json({ status: "healthy", message: "Bank of Trust API is running!" });
  });

  // Account Routes
  
  // Get all accounts for current user
  app.get("/api/accounts", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
      return res.status(200).json(userAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return res.status(500).json({ error: "Failed to fetch accounts" });
    }
  });

  // Get specific account by ID
  app.get("/api/accounts/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const [account] = await db.select().from(accounts).where(
        and(
          eq(accounts.id, req.params.id),
          eq(accounts.userId, req.user.id)
        )
      );

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      return res.status(200).json(account);
    } catch (error) {
      console.error("Error fetching account:", error);
      return res.status(500).json({ error: "Failed to fetch account" });
    }
  });

  // Transaction Routes
  
  // Get recent transactions for current user
  app.get("/api/transactions", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    try {
      // Get all accounts for this user
      const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, req.user.id));
      const accountIds = userAccounts.map(account => account.id);
      
      if (accountIds.length === 0) {
        return res.status(200).json([]);
      }

      // Get transactions where user's accounts are either the sender or receiver
      const userTransactions = await db
        .select()
        .from(transactions)
        .where(
          // Transaction either sent from user's account OR received in user's account
          or(
            inArray(transactions.fromAccountId, accountIds),
            inArray(transactions.toAccountId, accountIds)
          )
        )
        .orderBy(desc(transactions.createdAt))
        .limit(limit)
        .offset(offset);

      return res.status(200).json(userTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  // Get transactions for a specific account
  app.get("/api/accounts/:id/transactions", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    try {
      // First verify the account belongs to the user
      const [account] = await db.select().from(accounts).where(
        and(
          eq(accounts.id, req.params.id),
          eq(accounts.userId, req.user.id)
        )
      );

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      // Get transactions where this account is either the sender or receiver
      const accountTransactions = await db
        .select()
        .from(transactions)
        .where(
          or(
            eq(transactions.fromAccountId, req.params.id),
            eq(transactions.toAccountId, req.params.id)
          )
        )
        .orderBy(desc(transactions.createdAt))
        .limit(limit)
        .offset(offset);

      return res.status(200).json(accountTransactions);
    } catch (error) {
      console.error("Error fetching account transactions:", error);
      return res.status(500).json({ error: "Failed to fetch account transactions" });
    }
  });

  // Category Routes
  
  // Get all transaction categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const allCategories = await db.select().from(categories);
      return res.status(200).json(allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Create HTTP server with the Express app
  const httpServer = createServer(app);
  return httpServer;
}

// Helper for SQL "IN" operation
function inArray(column: any, values: any[]) {
  return or(...values.map(value => eq(column, value)));
}

// Helper for SQL "OR" operation
function or(...conditions: any[]) {
  return {
    operator: "or" as const,
    conditions,
  };
}