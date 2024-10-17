import { authMiddleware } from "better-auth/next-js";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default authMiddleware({
	redirectTo: "/sign-in",
	async customRedirect(session, request) {
		const baseURL = request.nextUrl.origin;

		const [, locale, ...segments] = request.nextUrl.pathname.split("/");

		if (locale != null && segments.join("/") === "docs" && !session) {
			return NextResponse.redirect(new URL(locale + "/sign-in", baseURL));
		}

		return handleI18nRouting(request);
	},
});

export const config = {
	matcher: ["/", "/(nl|en)/:path*"],
};
