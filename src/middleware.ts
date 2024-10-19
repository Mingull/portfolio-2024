import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

export default authMiddleware({
	async customRedirect(session, request) {
		const baseURL = request.nextUrl.origin;
		// if (request.nextUrl.pathname === "/sign-in" && session) {
		// 	return NextResponse.redirect(new URL("/profile", baseURL));
		// }
		if (request.nextUrl.pathname === "/docs" && !session) {
			return NextResponse.redirect(new URL("/sign-in", baseURL));
		}
		return NextResponse.next();
	},
});

export const config = {
	matcher: [
		"/docs",
		//"/(nl|en)/:path*",
		// "/:path*",
	],
};
