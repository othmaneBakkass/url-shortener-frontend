import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchBarStore } from "@/lib/store";
import { Search } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";

export function SearchBar() {
	const searchKey = useSearchBarStore((s) => s.searchKey);
	const setSearchKey = useSearchBarStore((s) => s.setSearchKey);

	function handleSettingSearchKey(newSearchKey: string) {
		if (newSearchKey === searchKey) {
			return;
		}
		setSearchKey(newSearchKey.length > 0 ? newSearchKey : " ");
	}

	const debouncedChangeHandler = useDebounceCallback((newSearchKey: string) => {
		handleSettingSearchKey(newSearchKey);
	}, 500);

	return (
		<div className="w-full flex gap-2">
			<div className="relative w-full">
				<Input
					id="search"
					className="w-full pl-8 border h-9"
					placeholder="Search for links..."
					type="search"
					onChange={(e) => {
						debouncedChangeHandler(e.target.value);
					}}
				/>
				<label
					htmlFor="search"
					className="absolute top-1/2 -translate-y-1/2 left-2">
					<Search
						aria-hidden
						className=" size-4 pointer-events-none text-card-foreground"
					/>
					<p className="sr-only">search</p>
				</label>
			</div>
			<Button
				className="text-card-foreground"
				size={"sm"}
				onClick={() => handleSettingSearchKey(" ")}
				variant={"secondary"}>
				reset search
			</Button>
		</div>
	);
}
