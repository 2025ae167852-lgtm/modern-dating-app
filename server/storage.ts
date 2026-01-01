import { type User, type InsertUser, type Match, type ChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for user, match, and chat methods
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Match methods
  getMatchesForUser(userId: string): Promise<Match[]>;
  createMatch(userId1: string, userId2: string): Promise<Match>;
  // Chat methods
  getMessagesForMatch(matchId: string): Promise<ChatMessage[]>;
  addMessageToMatch(matchId: string, senderId: string, text: string): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private matches: Map<string, Match>;
  private messages: Map<string, ChatMessage[]>;

  constructor() {
    this.users = new Map();
    this.matches = new Map();
    this.messages = new Map();
  }
  async getMatchesForUser(userId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(m => m.userIds.includes(userId));
  }

  async createMatch(userId1: string, userId2: string): Promise<Match> {
    // Check if match already exists
    const existing = Array.from(this.matches.values()).find(m => m.userIds.includes(userId1) && m.userIds.includes(userId2));
    if (existing) return existing;
    const id = randomUUID();
    const match: Match = { id, userIds: [userId1, userId2], createdAt: new Date().toISOString() };
    this.matches.set(id, match);
    this.messages.set(id, []);
    return match;
  }

  async getMessagesForMatch(matchId: string): Promise<ChatMessage[]> {
    return this.messages.get(matchId) || [];
  }

  async addMessageToMatch(matchId: string, senderId: string, text: string): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { id, matchId, senderId, text, sentAt: new Date().toISOString() };
    if (!this.messages.has(matchId)) this.messages.set(matchId, []);
    this.messages.get(matchId)!.push(message);
    return message;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
