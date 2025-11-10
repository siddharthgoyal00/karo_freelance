import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function TopNav() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Link href="/" className="font-semibold text-lg">
						karo Freelance
					</Link>
					<nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
						<Link href="/client/dashboard" className="hover:text-foreground">
							Dashboard
						</Link>
						<Link href="/client/post-project" className="hover:text-foreground">
							Post Project
						</Link>
						<Link href="/freelancer/projects" className="hover:text-foreground">
							Find Work
						</Link>
					</nav>
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}


