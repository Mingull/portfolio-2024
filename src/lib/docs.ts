import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "src", "content", "docs");

export type Doc = {
	metadata: DocMetadata;
	content: string;
};

export type DocMetadata = {
	title?: string;
	summary?: string;
	image?: string;
	author?: string;
	publishedAt?: string;
	tableOfContents?: string[];
	slug: string;
};

export async function getDocBySlug(slug: string | string[]): Promise<Doc | null> {
	console.log({ slug });
	try {
		if (typeof slug === "string") {
			const filePath = path.join(rootDirectory, `${slug}.mdx`);
			const fileContent = await fs.readFile(filePath, "utf-8");

			const { data, content } = matter(fileContent);

			return { metadata: { ...data, slug }, content };
		} else {
			const filePath = path.join(rootDirectory, slug[0], `${slug[1]}.mdx`);
			const fileContent = await fs.readFile(filePath, "utf-8");

			const { data, content } = matter(fileContent);

			return { metadata: { ...data, slug: slug.join("/") }, content };
		}
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getDocs(limit?: number) {
	const files = await fs.readdir(rootDirectory);

	// get the posts sorted by date in descending order using the metadata from the posts
	const docs = (await Promise.all(files.map(async (file) => await getDocMetadata(file)))).sort((a, b) =>
		new Date(a.publishedAt ?? "") < new Date(b.publishedAt ?? "") ? 1 : -1,
	);

	if (limit) {
		return docs.slice(0, limit);
	}
	return docs;
}

export async function getDocMetadata(filepath: string): Promise<DocMetadata> {
	const slug = filepath.replace(/\.mdx$/, "");
	const filePath = path.join(rootDirectory, filepath);
	const fileContent = await fs.readFile(filePath, "utf-8");
	const { data } = matter(fileContent);

	return { ...data, slug };
}
