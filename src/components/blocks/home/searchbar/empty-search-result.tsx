import { Button } from "@/components/ui/button";
import { useSearchBarStore } from "@/lib/store";
import { SearchSlash } from "lucide-react";

export function EmptySearchResult() {
	const setSearchKey = useSearchBarStore((s) => s.setSearchKey);

	return (
		<>
			<section className="w-full mt-24 mb-24 flex flex-col items-center justify-center gap-4">
				<div className="flex flex-col gap-2 px-5">
					<div className="flex items-center gap-2">
						<SearchSlash className="size-7 " />
						<h1 className="text-xl md:text-2xl  font-medium">
							No Results Were Found
						</h1>
					</div>

					<p className="text-card-foreground max-w-2xl mb-2">
						We couldn't find any short link that matches your search. change
						your spelling and give it another go
					</p>
					<Button
						className="text-card-foreground"
						size={"sm"}
						onClick={() => setSearchKey(" ")}
						variant={"secondary"}>
						reset search
					</Button>
				</div>
			</section>
		</>
	);
}
