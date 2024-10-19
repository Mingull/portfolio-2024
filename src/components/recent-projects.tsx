import { getProjects } from "@/lib/projects";
import Link from "next/link";
import Projects from "./projects";

export default async function RecentProjects() {
	const projects = await getProjects(2);
	return (
		<section className="pb-24">
			<h2 className="title mb-12">Recent Projects</h2>
			<Projects project={projects} />

			<Link
				href="/projects"
				className="mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground"
			>
				<span>All projects</span>
			</Link>
		</section>
	);
}
