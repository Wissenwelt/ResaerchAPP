import { json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").notNull().unique(),
  email: varchar("email").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  name: varchar("name").notNull(),
  subscriptionId: varchar("subscription_id").notNull().default('free'),
});

export const Library = pgTable("library", {
  id: serial("id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  searchInput: text("searchInput").notNull(),
  userEmail: varchar("userEmail").notNull().references(() => UsersTable.email, { onDelete: 'cascade' }),
  type: varchar("type").notNull(),
  libId: varchar("libId").primaryKey().unique(),
});

export const Chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  libId: varchar("libId").notNull().references(() => Library.libId, { onDelete: 'cascade' }),
  searchResult: json('searchResult').notNull(),
  aiResponse: text('aiResponse').notNull(),
});