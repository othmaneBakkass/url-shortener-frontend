import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../keys";
import { z } from "zod";
import {
	ApiErrorObjectSchema,
	NetworkError,
	SchemaError,
	ServerError,
} from "../errors";
import { sleep } from "@/lib/utils";

const shortLinksData = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		short_link: z.string(),
		original_url: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
);

export type ShortLinksData = z.infer<typeof shortLinksData>;

const getShortLinksResponseSchema = z.discriminatedUnion("ok", [
	z.object({
		ok: z.literal(true),
		data: shortLinksData,
	}),
	ApiErrorObjectSchema,
]);

async function getShortLinks(searchKey: string) {
	const basePath = import.meta.env.VITE_SERVER_URL;
	const url = new URL("/shortLinks", basePath);
	url.searchParams.set("searchKey", searchKey);
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.catch(() => {
			throw new NetworkError(
				"An error occurred while trying to get your short links, the developers have been notified. Please try again later"
			);
		});

	const { success, data } = getShortLinksResponseSchema.safeParse(res);

	if (success) {
		if (data.ok) {
			return data.data;
		}

		if (data.code === 500) {
			throw new ServerError(
				"An error occurred on our end, the developers have been notified. Please try again later"
			);
		}

		throw new NetworkError(
			"An error occurred while trying to get your short links, the developers have been notified. Please try again later"
		);
	}
	throw new SchemaError(
		"An error occurred on our end, the developers have been notified. Please try again later"
	);
}

const FIVE_MINUTES = 5 * 60 * 1000;

export const useShortLinksWithSuspense = (
	searchKey: string = " ",
	minLoadingTime: number = 0
) =>
	useSuspenseQuery({
		queryKey: queryKeys.getShortLinks(searchKey),
		queryFn: async () => {
			if (minLoadingTime > 0) {
				await sleep({ time: minLoadingTime });
			}
			const res = await getShortLinks(searchKey);
			return res;
		},
		staleTime: FIVE_MINUTES,
	});

export const useShortLinks = (
	searchKey: string,
	fetchOnMount: boolean = true,
	minLoadingTime: number = 0
) =>
	useQuery({
		queryKey: queryKeys.getShortLinks(searchKey),
		queryFn: async () => {
			if (minLoadingTime > 0) {
				await sleep({ time: minLoadingTime });
			}
			const res = await getShortLinks(searchKey);
			return res;
		},
		enabled: fetchOnMount,
		staleTime: FIVE_MINUTES,
	});
