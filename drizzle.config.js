// drizzle.config.js
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Ensure the .env.local file is loaded
dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
});

