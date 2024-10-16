import MDXContent from "@/components/mdx-content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/routing";
import { getDocBySlug, getDocCategories, getDocs } from "@/lib/docs";
import { formatTitle } from "@/lib/utils";

export default async function DocsPage({ params }: { params: { slug?: string[] } }) {
	const doc = await getDocBySlug(params.slug);
	const docs = await getDocs();
	const docCategories = await getDocCategories();
	return (
		<section className="py-24">
			<div className="container flex-1 items-start md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
				<div className="h-full w-full overflow-x-hidden overflow-y-scroll">
					{docCategories.map((category) => (
						<div className="pb-4" key={category}>
							<h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{formatTitle(category)}</h4>
							<div className="grid grid-flow-row auto-rows-max text-sm">
								{docs ?
									docs
										.filter((doc) => doc.category === category)
										.map((doc) => (
											<Link
												key={doc.slug}
												className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
												href={`/docs/${doc.href}`}
											>
												{doc.title}
											</Link>
										))
								:	null}
							</div>
						</div>
					))}
				</div>
				<div className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
					<div className="max-w-4xl">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>Docs</BreadcrumbItem>
								<BreadcrumbSeparator />
								{/* {doc?.metadata.category ?
									<>
										<BreadcrumbItem>{formatTitle(doc.metadata.category)}</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>{doc?.metadata.title}</BreadcrumbItem>
									</>
								:	<BreadcrumbItem>{doc?.metadata.title}</BreadcrumbItem>} */}
								<BreadcrumbItem>{doc?.metadata.title}</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						{doc ?
							<>
								<div className="space-y-2">
									<h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
										{doc.metadata.title}
									</h1>
									<p className="text-base text-muted-foreground">{doc.metadata.summary}</p>
								</div>
								<div className="prose pb-12 pt-8 dark:prose-invert">
									<MDXContent source={doc.content} />
								</div>
							</>
						:	null}
					</div>
				</div>
			</div>
		</section>
	);
}
