import MDXContent from "@/components/mdx-content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/routing";
import { getDocBySlug } from "@/lib/docs";

export default async function DocsPage({ params }: { params: { slug?: string | string[] } }) {
	const doc = await getDocBySlug(params.slug ?? "introduction");
	return (
		<section className="py-24">
			<div className="container flex-1 items-start md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
				<div className="h-full w-full overflow-x-hidden overflow-y-scroll">
					<div className="pb-4">
						<h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Getting Started</h4>
						<div className="grid grid-flow-row auto-rows-max text-sm">
							<Link
								className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
								target=""
								rel=""
								href="/docs"
							>
								Introduction
							</Link>
						</div>
					</div>
					<div className="pb-4">
						<h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Components</h4>
						<div className="grid grid-flow-row auto-rows-max text-sm">
							<Link
								className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
								target=""
								rel=""
								href="/docs/components/fade-up"
							>
								Fade Up
							</Link>
						</div>
					</div>
				</div>
				<div className="max-w-4xl">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>Docs</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>{doc?.metadata.title ?? "Introduction"}</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					{doc ?
						<>
							<div className="space-y-2">
								<h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{doc.metadata.title}</h1>
								<p className="text-base text-muted-foreground">{doc.metadata.summary}</p>
							</div>
							<div className="prose pb-12 pt-8 dark:prose-invert">
								<MDXContent source={doc.content} />
							</div>
						</>
					:	null}
				</div>
				<div className="max-w-xl"></div>
			</div>
		</section>
	);
}
