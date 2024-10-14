import { getPosts } from "@/lib/posts";
import Posts from "./posts";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function RecentPosts() {
	const posts = await getPosts(4);
	const t = await getTranslations("homepage.titles");
	return (
		<section className="pb-24">
			<h2 className="title mb-12">{t("recentPosts")}</h2>
			<Posts posts={posts} />

			<Link
				href="/posts"
				className="mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground"
			>
				<span>All posts</span>
			</Link>
		</section>
	);
}
