import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(["/:locale/dashboard(.*)", "/:locale/docs(.*)"]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();

	return handleI18nRouting(req);
});

export const config = {
	matcher: [
		"/",
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
		// Match only internationalized pathnames
		"/(nl|en)/:path*",
	],
};
