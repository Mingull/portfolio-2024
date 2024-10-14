"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import ReactCountryFlag from "react-country-flag";
import { Button } from "./ui/button";

export default function LanguageSelector() {
	const locale = useLocale();
	const pathname = usePathname();
	return (
		<Button size="sm" variant="ghost" asChild>
			<Link href={pathname} locale={locale === "en" ? "nl" : "en"}>
				<ReactCountryFlag countryCode={locale === "en" ? "gb" : "nl"} className="size-4" />
			</Link>
		</Button>
	);
}
