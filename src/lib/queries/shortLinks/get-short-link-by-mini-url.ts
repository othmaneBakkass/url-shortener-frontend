import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../keys";
import { z } from "zod";
import {
	ApiErrorObjectSchema,
	NetworkError,
	SchemaError,
	ServerError,
} from "../errors";

const getShortLinksResponseSchema = z.discriminatedUnion("ok", [
	z.object({
		ok: z.literal(true),
		data: z
			.object({
				id: z.string(),
				name: z.string(),
				short_link: z.string(),
				original_url: z.string(),
				createdAt: z.string(),
				updatedAt: z.string(),
			})
			.nullable(),
	}),
	ApiErrorObjectSchema,
]);

export type GetShortLinksResponse = z.infer<typeof getShortLinksResponseSchema>;
type GetShortLinksResponseData = Extract<
	Extract<GetShortLinksResponse, { ok: true }>["data"],
	{ id: string }
>;

export type GetShortLinksResponseDataKeys = keyof GetShortLinksResponseData;
type GetShortLinkByMiniUrlProps = { miniUrl: string };

async function getShortLink({ miniUrl }: GetShortLinkByMiniUrlProps) {
	const basePath = import.meta.env.VITE_SERVER_URL;
	const url = new URL(`/shortLinks/${miniUrl}`, basePath);

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

export const ShortLinkByMiniUrlQuery = (props: GetShortLinkByMiniUrlProps) => ({
	queryKey: queryKeys.getShortLinkByMiniUrl(),
	queryFn: () => getShortLink(props),
});

export const useShortLinkByMiniUrl = (props: GetShortLinkByMiniUrlProps) =>
	useSuspenseQuery(ShortLinkByMiniUrlQuery(props));
