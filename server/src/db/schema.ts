import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role").$type<"regular" | "admin">().notNull().default("regular"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});
