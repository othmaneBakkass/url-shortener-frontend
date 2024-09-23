import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShortLinkByMiniUrlQuery } from "@/lib/queries/shortLinks/get-short-link-by-mini-url";

export type RedirectRouteLoaderParams = {
	miniUrlId?: string;
};

export function Redirect() {
	const params = useParams<RedirectRouteLoaderParams>();
	const { isLoading, isError, error, isSuccess, data } = useQuery(
		ShortLinkByMiniUrlQuery({ miniUrl: params.miniUrlId ?? "null" })
	);
	useEffect(() => {
		if (!isLoading && isError) {
			throw error;
		}

		if (!isLoading && isSuccess) {
			if (!data) {
				const URL404 = new URL("/404", import.meta.env.VITE_WEBSITE_URL);
				return window.location.replace(URL404);
			}
			return window.location.replace(data.original_url);
		}
	}, [isLoading, isError, isSuccess]);

	return <></>;
}

export async function RedirectRouteLoader(
	{
		params,
	}: {
		params: RedirectRouteLoaderParams;
	},
	queryClient: QueryClient
) {
	const query = ShortLinkByMiniUrlQuery({
		miniUrl: params.miniUrlId ?? "null",
	});

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
}
