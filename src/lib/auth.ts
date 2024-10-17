import "dotenv/config";
import { db } from "@/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
	}),
	// emailAndPassword: {
	// 	enabled: true,
	// },
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			redirectURI: process.env.BASE_URL + "/api/auth/callback/github",
		},
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			redirectURI: process.env.BASE_URL + "/api/auth/callback/discord",
		},
	},
	plugins: [admin(), organization()],
});
