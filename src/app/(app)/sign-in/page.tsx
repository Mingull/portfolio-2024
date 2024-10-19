"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
	const [isGithubLoading, setGithubLoading] = useState(false);
	const [isDiscordLoading, setDiscordLoading] = useState(false);
	return (
		<section className="py-24">
			<div className="container flex max-w-3xl justify-center xl:max-w-4xl">
				<Card className="w-full sm:w-96">
					<CardHeader>
						<CardTitle>Sign in to your account</CardTitle>
						<CardDescription>Welcome back! Please sign in to continue</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-y-4">
						<div className="grid grid-cols-2 gap-x-4">
							<Button
								size="sm"
								variant="outline"
								onClick={async () => {
									console.log("login with github");
									await signIn.social(
										{
											provider: "github",
										},
										{
											onSuccess: () => setGithubLoading(false),
											onRequest: () => setGithubLoading(true),
											onError: () => {
												setGithubLoading(false);
												toast.error("Failed to sign in with GitHub");
											},
										},
									);
								}}
							>
								{isGithubLoading ?
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								:	<Icons.gitHub className="mr-2 h-4 w-4" />}
								GitHub
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={async () => {
									console.log("login with discord");
									await signIn.social(
										{
											provider: "discord",
										},
										{
											onSuccess: () => setDiscordLoading(false),
											onRequest: () => setDiscordLoading(true),
											onError: () => {
												setDiscordLoading(false);
												toast.error("Failed to sign in with Discord");
											},
										},
									);
								}}
							>
								{isDiscordLoading ?
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								:	<Icons.discord className="mr-2 h-4 w-4" />}
								Discord
							</Button>
						</div>
						{/* <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
							or
						</p> */}
					</CardContent>
					{/* <CardFooter>
						<div className="grid w-full gap-y-4">
							<Button disabled={isLoading}>
								{isLoading ?
									<Icons.spinner className="size-4 animate-spin" />
								:	"Continue"}
							</Button>
							<Button variant="link" size="sm" asChild>
								<Link href="/sign-in">Already have an account? Sign in</Link>
							</Button>
						</div>
					</CardFooter> */}
				</Card>
			</div>
		</section>
	);
}
