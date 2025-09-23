import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo API routes for presentation
  // Add simple mock endpoints if needed for demo
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'OSINTraX API is running' });
  });

  const httpServer = createServer(app);
  return httpServer;
}