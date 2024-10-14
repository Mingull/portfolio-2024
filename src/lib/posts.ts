import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "src", "content", "posts");

export type Post = {
	metadata: PostMetadata;
	content: string;
};

export type PostMetadata = {
	title?: string;
	summary?: string;
	image?: string;
	author?: string;
	publishedAt?: string;
	slug: string;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const filePath = path.join(rootDirectory, `${slug}.mdx`);
		const fileContent = await fs.readFile(filePath, "utf-8");

		const { data, content } = matter(fileContent);

		return { metadata: { ...data, slug }, content };
	} catch (e) {
		console.log(e)
		return null;
	}
}

export async function getPosts(limit?: number) {
	const files = await fs.readdir(rootDirectory);

	// get the posts sorted by date in descending order using the metadata from the posts
	const posts = (await Promise.all(files.map(async (file) => await getPostMetadata(file)))).sort((a, b) => (new Date(a.publishedAt ?? "") < new Date(b.publishedAt ?? "") ? 1 : -1));

	if (limit) {
		return posts.slice(0, limit);
	}
	return posts;
}

export async function getPostMetadata(filepath: string): Promise<PostMetadata> {
	const slug = filepath.replace(/\.mdx$/, "");
	const filePath = path.join(rootDirectory, filepath);
	const fileContent = await fs.readFile(filePath, "utf-8");
	const { data } = matter(fileContent);

	return { ...data, slug };
}
