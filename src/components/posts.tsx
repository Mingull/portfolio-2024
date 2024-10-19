import { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link  from "next/link";

export default function Posts({ posts }: { posts: PostMetadata[] }) {
	return (
		<ul className="flex flex-col gap-8">
			{posts.map((post) => (
				<li key={post.slug}>
					<Link
						href={`/posts/${post.slug}`}
						className="flex flex-col justify-between gap-x-4 gap-y-1 rounded border border-border p-4 hover:bg-accent/60 sm:flex-row"
					>
						<div className="flex max-w-lg gap-x-4">
							{post.image ?
								<div className="relative min-w-28 overflow-hidden rounded">
									<Image src={post.image} alt={post.title ?? ""} className="object-cover" fill />
								</div>
							:	null}
							<div>
								<p className="text-lg">{post.title}</p>
								<p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
									{post.summary}
								</p>
							</div>
						</div>

						{post.publishedAt ?
							<p className="mt-1 text-sm font-light">{formatDate(post.publishedAt)}</p>
						:	null}
					</Link>
				</li>
			))}
		</ul>
	);
}
