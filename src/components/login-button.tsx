"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icons } from "./ui/icons";
export default function LoginButton() {
	const { data: session, isPending } = useSession();
	if (isPending)
		return (
			<Button size="sm" variant="ghost">
				<Icons.spinner className="size-4 animate-spin" />
				<span className="sr-only">loading user button</span>
			</Button>
		);
	if (session)
		return (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="">
						<AvatarImage src={session.user.image} />
						<AvatarFallback>{session.user.name}</AvatarFallback>
					</Avatar>
					<span className="sr-only">user button</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<UserIcon className="mr-2 size-4" />
						Profile
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={async () => await signOut()}>
						<LogOutIcon className="mr-2 size-4" />
						logout
					</DropdownMenuItem>
				</DropdownMenuContent>
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
