import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import slugify from "slugify";

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
	href?: string;
	category?: string;
	slug: string;
};

export async function getDocBySlug(slug?: string[]): Promise<Doc | null> {
	try {
		const filePath =
			!slug || slug.length === 0 ? path.join(rootDirectory, "index.mdx")
			: slug.length === 1 ? path.join(rootDirectory, `${slug[0]}/index.mdx`)
			: path.join(rootDirectory, slug[0], `${slug[1]}.mdx`);

		const fileContent = await fs.readFile(filePath, "utf-8");

		const { data, content } = matter(fileContent);
		const category =
			filePath.includes("\\") && !filePath.includes("index.mdx") ?
				filePath.split(/\\/g).slice(-2).shift() + ""
			:	"getting-started";

		return { metadata: { ...data, slug: slugify(data.title), category }, content };
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getDocs(limit?: number) {
	const filePaths = await fs.readdir(rootDirectory, { recursive: true });

	const docs = await Promise.all(
		filePaths.filter((file) => file.endsWith(".mdx")).map(async (file) => await getDocMetadata(file)),
	);

	if (limit) {
		return docs.slice(0, limit);
	}
	return docs;
}

export async function getDocMetadata(filepath: string): Promise<DocMetadata> {
	const filePath = path.join(rootDirectory, filepath);
	const category =
		filepath.includes("\\") && !filepath.includes("index.mdx") ?
			filepath.split(/\\/g).shift() + ""
		:	"getting-started";

	const fileContent = await fs.readFile(filePath, "utf-8");

	const { data } = matter(fileContent);

	const slug = slugify(`${data.title}`, { lower: true });

	let href = "/";
	if (filepath.includes("\\")) {
		href = filepath.includes("index.mdx") ? `/${filepath.split(/\\/g).shift()}` : `/${category}/${slug}`;
	} else if (!filepath.includes("index.mdx")) {
		href = `/${slug}`;
	}

	return {
		...data,
		slug,
		category,
		href,
	};
}

export async function getDocCategories() {
	const filePaths = await fs.readdir(rootDirectory, { recursive: true });

	const categories = new Set<string>();

	filePaths.forEach((file) => {
		if (file.endsWith(".mdx")) {
			const category = file.includes("\\") ? file.split(/\\/g).shift() + "" : "getting-started";
			categories.add(category);
		}
	});

	return Array.from(categories);
}
