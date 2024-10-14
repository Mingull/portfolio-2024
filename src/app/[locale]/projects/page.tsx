import Projects from "@/components/projects";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
	const projects = await getProjects();
	return (
		<section className="py-24">
			<div className="container max-w-3xl xl:max-w-4xl">
				<h1 className="title mb-12">Projects</h1>

				<Projects project={projects} />
			</div>
		</section>
	);
}
