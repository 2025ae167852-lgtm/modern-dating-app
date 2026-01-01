import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // GET /api/profiles - return all user profiles (for now, all users)
  app.get("/api/profiles", async (req, res) => {
    // For now, return all users as profiles
    // In a real app, you would filter, exclude sensitive info, etc.
    const users = Array.from((storage as any).users?.values?.() ?? []);
    // Remove password before sending
    const profiles = users.map(({ password, ...rest }) => rest);
    res.json(profiles);
  });

  // Matches endpoints
  // GET /api/matches/:userId - get all matches for a user
  app.get("/api/matches/:userId", async (req, res) => {
    const { userId } = req.params;
    const matches = await storage.getMatchesForUser(userId);
    res.json(matches);
  });

  // POST /api/matches - create a match between two users
  app.post("/api/matches", async (req, res) => {
    const { userId1, userId2 } = req.body;
    if (!userId1 || !userId2) return res.status(400).json({ error: "userId1 and userId2 required" });
    const match = await storage.createMatch(userId1, userId2);
    res.json(match);
  });

  // Chat endpoints
  // GET /api/messages/:matchId - get all messages for a match
  app.get("/api/messages/:matchId", async (req, res) => {
    const { matchId } = req.params;
    const messages = await storage.getMessagesForMatch(matchId);
    res.json(messages);
  });

  // POST /api/messages - send a message in a match
  app.post("/api/messages", async (req, res) => {
    const { matchId, senderId, text } = req.body;
    if (!matchId || !senderId || !text) return res.status(400).json({ error: "matchId, senderId, and text required" });
    const message = await storage.addMessageToMatch(matchId, senderId, text);
    res.json(message);
  });

  return httpServer;
}
