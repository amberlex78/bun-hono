import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL || "postgresql://app:app@postgres:5432/app";
const sql = postgres(connectionString, { prepare: false });

export const db = drizzle(sql);
