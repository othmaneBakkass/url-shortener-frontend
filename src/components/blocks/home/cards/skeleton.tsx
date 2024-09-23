import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
	return (
		<>
			<Card className="w-full max-w-2xl">
				<CardHeader className="flex-row justify-between items-center">
					<Skeleton className="h-8 w-full max-w-64 rounded-lg" />
					<Skeleton className="size-8 rounded-lg" />
				</CardHeader>
				<CardContent className="flex flex-col items-center gap-2">
					<Skeleton className="w-full h-16 rounded-lg"></Skeleton>
				</CardContent>
			</Card>
		</>
	);
}
