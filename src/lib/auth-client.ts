import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";

export const { useSession, signIn, signOut, session, user, signUp } = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [adminClient(), organizationClient()],
});
