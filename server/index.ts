import express from "express";
import cors from "cors";
import path from "path";
import { registerRoutes } from "./routes";
import { initDatabase } from "./dbInit";

async function startServer() {
  try {
    // Initialize database
    await initDatabase();
    
    // Create Express application
    const app = express();
  
    // Apply middleware
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  
    // Serve static files from client build directory in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));
    }
  
    // Setup API routes
    const server = registerRoutes(app);
  
    // In production, serve client for any other requests
    if (process.env.NODE_ENV === "production") {
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }
  
    // Start the server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();