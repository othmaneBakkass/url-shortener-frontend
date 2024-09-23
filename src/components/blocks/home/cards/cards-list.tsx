import { useShortLinksWithSuspense } from "@/lib/queries/shortLinks/get-short-links";
import { EmptySearchResult } from "@/components/blocks/home/searchbar/empty-search-result";
import { useSearchBarStore } from "@/lib/store";

import { Card } from "./card";

export function CardsList() {
	const searchKey = useSearchBarStore((s) => {
		return s.searchKey;
	});

	const { data, error, isFetching } = useShortLinksWithSuspense(searchKey, 300);
	if (error && !isFetching) {
		throw error;
	}

	return (
		<>
			{data.length > 0 ? (
				data.map((shortLink) => (
					<Card
						key={shortLink.id}
						id={shortLink.id}
						shortLink={shortLink.short_link}
						name={shortLink.name}
						originalUrl={shortLink.original_url}
					/>
				))
			) : (
				<EmptySearchResult />
			)}
		</>
	);
}
