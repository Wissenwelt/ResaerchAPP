import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  // 'id' is kept as a unique, auto-incrementing integer.
  id: serial("id").notNull().unique(),
  
  // 'email' is now the primary key, used for relationships. This also enforces uniqueness.
  email: varchar("email").primaryKey(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  name: varchar("name").notNull(),
  subscriptionId: varchar("subscription_id").notNull().default('free'),
});

export const Library = pgTable("library", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  searchInput: text("searchInput").notNull(),
  
  // This foreign key relationship correctly points to the 'email' primary key in UsersTable.
  userEmail: varchar("userEmail").notNull().references(() => UsersTable.email, { onDelete: 'cascade' }),

  // This new column will store the search type, e.g., 'Scan' or 'DeepScan'.
  type: varchar("type").notNull(),
  libId: varchar("libId").notNull(),
});