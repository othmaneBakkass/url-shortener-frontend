import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type ErrorShellProps = {
	message: string;
	title: string;
};
export function DefaultErrorShell({ title, message }: ErrorShellProps) {
	return (
		<section className="w-full h-full min-h-dvh flex flex-col items-center justify-center gap-4">
			<div className="flex flex-col gap-2 px-5">
				<h1 className="text-xl md:text-2xl font-medium">{title}</h1>
				<p className="text-card-foreground max-w-2xl mb-2">{message}</p>
				<Button asChild>
					<Link to="." relative="path">
						go back home
					</Link>
				</Button>
			</div>
		</section>
	);
}
