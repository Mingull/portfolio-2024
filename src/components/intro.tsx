"use client";
import Image from "next/image";
import authorImage from "@/../public/images/authors/niels.jpg";
import { useTranslations } from "next-intl";

export default function Intro() {
	const t = useTranslations("homepage.intro");
	return (
		<section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center">
			<div className="mt-2 flex-1 md:mt-0">
				<h1 className="title no-underline">{t("title")}</h1>
				<p className="mt-3 font-light text-muted-foreground">{t("description")}</p>
			</div>
			<div className="relative">
				<Image
					className="size-44 flex-1 rounded-lg object-cover grayscale"
					src={authorImage}
					alt="Niels Plug"
					width={175}
					height={175}
					priority
				/>
			</div>
		</section>
	);
}
