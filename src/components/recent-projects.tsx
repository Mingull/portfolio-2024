import { getProjects } from "@/lib/projects";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Projects from "./projects";
import { getTranslations } from "next-intl/server";

export default async function RecentProjects() {
	const projects = await getProjects(2);
	const t = await getTranslations("homepage.titles");
	return (
		<section className="pb-24">
			<h2 className="title mb-12">{t("recentProjects")}</h2>
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
