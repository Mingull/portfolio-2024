import MDXContent from "@/components/mdx-content";
import { Link, routing } from "@/i18n/routing";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const posts = await getPosts();
	const slugs = posts.map((post) => ({ slug: post.slug }));
	return slugs.flatMap((slug) => routing.locales.map((locale) => ({ ...slug, locale })));
}

export default async function Post({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
	unstable_setRequestLocale(locale);

	const post = await getPostBySlug(slug);
	const t = await getTranslations("post");

	if (!post) {
		notFound();
	}

	const { metadata, content } = post;
	const { title, image, author, publishedAt } = metadata;

	return (
		<section className="pb-24 pt-32">
			<div className="container max-w-3xl xl:max-w-4xl">
				<Link
					href="/posts"
					className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeftIcon className="size-5" />
					<span>{t("back")}</span>
				</Link>

				{image ?
					<div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
						<Image src={image} alt={title || ""} className="object-cover" fill />
					</div>
				:	null}
				<header>
					<h1 className="title">{title}</h1>
					<p className="mt-3 text-xs text-muted-foreground">
						{author} / {formatDate(publishedAt ?? "")}
					</p>
				</header>

				<main className="prose mt-16 dark:prose-invert">
					<MDXContent source={content} />
				</main>

				{/* <footer className="mt-16">
					<NewsletterForm />
				</footer> */}
			</div>
		</section>
	);
}
