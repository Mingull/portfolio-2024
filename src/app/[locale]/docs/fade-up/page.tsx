import FadeUp from "@/components/fade-up";

export default function FadeUpPage() {
	return (
		<section className="py-24">
			<div className="container max-w-3xl xl:max-w-4xl">
				<h1 className="title mb-12">Fade Up</h1>

				<div className="m-4 h-96 w-full space-y-8 overflow-scroll">
					{Array.from(Array(30).keys()).map((i) => (
						<FadeUp key={i}>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veniam possimus sapiente
								quasi nesciunt necessitatibus rerum delectus pariatur ducimus rem.
							</p>
						</FadeUp>
					))}
				</div>
			</div>
		</section>
	);
}
