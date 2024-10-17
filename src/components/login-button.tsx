"use client";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
// const DotIcon = () => {
// 	return (
// 		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
// 			<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
// 		</svg>
// 	);
// };
export default function LoginButton() {
	const { data: session, isPending } = useSession();
	if (isPending) return null;
	if (session)
		return (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={session.user.image} />
						<AvatarFallback>{session.user.name}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
			</DropdownMenu>
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
