import ContactForm from "@/components/contact-form";

export default function Contact() {
	return (
		<section className="py-24">
			<div className="container max-w-3xl xl:max-w-4xl">
				<h2 className="title">Let&apos;s talk about your project</h2>

				<ContactForm />
			</div>
		</section>
	);
}
