import Intro from "@/components/intro";
import NewsletterForm from "@/components/newsletter-form";
import RecentPosts from "@/components/recent-posts";
import RecentProjects from "@/components/recent-projects";
import Skills from "@/components/skills";

export default function Home() {
	return (
		<section className="py-24">
			<div className="container max-w-3xl xl:max-w-4xl">
				<Intro />

				<Skills />

				<RecentProjects />
				<RecentPosts />

				<NewsletterForm />
			</div>
		</section>
	);
}
export const dynamic = "force-dynamic";
