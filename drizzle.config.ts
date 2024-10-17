import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/database/migrations",
	schema: "./src/database/schema.ts",
	dialect: "mysql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
