"use client";
import { Link } from "@/i18n/routing";
import LanguageSelector from "./language-selector";
import LoginButton from "./login-button";
import ThemeToggle from "./theme-toggle";
import { ComponentProps } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
			<nav className="container flex max-w-5xl items-center justify-between xl:max-w-screen-2xl">
				<div className="flex gap-8">
					<Link href="/" className="font-serif text-2xl font-bold">
						Mingull
					</Link>
					<ul className="flex items-center gap-3 text-sm font-light text-muted-foreground sm:gap-10">
						<HeaderLink href="/posts">Posts</HeaderLink>
						{/* <HeaderLink href="/docs">Docs</HeaderLink> */}
						<HeaderLink href="/projects">Projects</HeaderLink>
						<HeaderLink href="/contact">Contact</HeaderLink>
					</ul>
				</div>

				<div className="flex">
					<LanguageSelector />
					<ThemeToggle />
					<LoginButton />
				</div>
			</nav>
		</header>
	);
}

function HeaderLink({ href, ...rest }: ComponentProps<typeof Link>) {
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
	const isActive = pathname === href;

	return (
		<li className={cn("transition-colors hover:text-foreground", { "text-foreground": isActive })}>
			<Link aria-current={isActive ? "page" : undefined} href={href} {...rest} />
		</li>
	);
}
