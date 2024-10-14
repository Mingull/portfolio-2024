"use client";
import { UserButton, useUser } from "@clerk/nextjs";
const DotIcon = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
			<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
		</svg>
	);
};
export default function LoginButton() {
	const { isSignedIn } = useUser();
	if (isSignedIn)
		return (
			<UserButton>
				<UserButton.MenuItems>
					<UserButton.Action label="Help" labelIcon={<DotIcon />} open="help" />
				</UserButton.MenuItems>
				<UserButton.UserProfilePage label="Help" labelIcon={<DotIcon />} url="help">
					<div>
						<h1>Help Page</h1>
						<p>This is the custom help page</p>
					</div>
				</UserButton.UserProfilePage>
			</UserButton>
		);
	return null;
	//  (
	// 	<Button size="sm" variant="ghost" asChild>
	// 		<Link href={"/sign-in"}>
	// 			<LogIn className="size-4" />
	// 		</Link>
	// 	</Button>
	// );
}
