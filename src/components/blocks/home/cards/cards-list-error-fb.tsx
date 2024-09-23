import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ApiError } from "@/lib/queries/errors";

export function CardsListErrorFallback({
	onClick,
	error,
}: {
	onClick: (...args: any) => void;
	error: any;
}) {
	return (
		<>
			<Card className="w-full max-w-2xl">
				<CardHeader className="flex-row justify-between items-center">
					<CardTitle className="text-red-300">Error</CardTitle>
				</CardHeader>
				<CardContent>
					{error instanceof ApiError ? (
						<p className="text-card-foreground">{error.clientMsg}</p>
					) : (
						<p className="text-card-foreground">
							An error occurred on our end, the developers have been notified.
							Please try again later
						</p>
					)}
				</CardContent>
				<CardFooter className="justify-end">
					<Button
						variant={"ghost"}
						className="transition-colors duration-200 ease-in"
						onClick={onClick}>
						Try again
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}
