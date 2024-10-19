import PostsWithSearch from "@/components/posts-with-search";
import { getPosts } from "@/lib/posts";

export default async function PostsPage() {
	const posts = await getPosts();
	return (
		<section className="py-24">
			<div className="container max-w-3xl xl:max-w-4xl">
				<h1 className="title mb-12">Posts</h1>
				<PostsWithSearch posts={posts} />
			</div>
		</section>
	);
}
