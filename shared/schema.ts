// Match and Chat Message types
import { z as zod } from "zod";

export const matchSchema = zod.object({
  id: zod.string(),
  userIds: zod.array(zod.string()).length(2),
  createdAt: zod.string(),
});
export type Match = zod.infer<typeof matchSchema>;

export const chatMessageSchema = zod.object({
  id: zod.string(),
  matchId: zod.string(),
  senderId: zod.string(),
  text: zod.string(),
  sentAt: zod.string(),
});
export type ChatMessage = zod.infer<typeof chatMessageSchema>;
import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
