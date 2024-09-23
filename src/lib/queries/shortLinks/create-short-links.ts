import { z } from "zod";
import { queryKeys } from "../keys";
import { queryClient } from "@/main";
import {
	ApiError,
	ApiErrorObjectSchema,
	NetworkError,
	SchemaError,
	ServerError,
} from "../errors";
import { useMutation } from "@tanstack/react-query";

async function createShortLink({
	original_url,
	name,
}: {
	original_url: string;
	name: string;
}) {
	const basePath = import.meta.env.VITE_SERVER_URL;
	return await fetch(`${basePath}/shortLinks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			original_url,
			name,
		}),
	})
		.then(async (response) => {
			const res = await response.json();
			const { success, data } = createShortLinksResponseSchema.safeParse(res);

			if (success) {
				if (!data.ok) {
					if (data.code === 400) {
						throw new ServerError(
							"it looks like some of the information provided is incorrect. Please double-check and try again!"
						);
					}
					throw new ServerError(
						"an error occurred on our end, the developers have been notified. Please try again later"
					);
				}
				return data;
			}

			throw new SchemaError(
				"an error occurred on our end but don't worry your short link has been created. The developers have been notified. Please try to refresh the page or try again later"
			);
		})
		.catch(() => {
			throw new NetworkError(
				"an error occurred while trying to get your short links. The developers have been notified. Please try again later"
			);
		});
}

const createShortLinksResponseSchema = z.discriminatedUnion("ok", [
	z.object({
		ok: z.literal(true),
		data: z.object({
			id: z.string(),
			createdAt: z.string(),
			updatedAt: z.string(),
		}),
	}),
	ApiErrorObjectSchema,
]);

export const useCreateShortLink = () =>
	useMutation({
		mutationFn: createShortLink,
		onSuccess: () => {
			return queryClient.invalidateQueries({
				queryKey: queryKeys.getShortLinks(" "),
			});
		},
		onError: (error) => {
			const defaultErrorMsg =
				"an unknown error occurred while trying to create your short link. The developers have been notified. Please try again later";
			return {
				msg: error instanceof ApiError ? error.clientMsg : defaultErrorMsg,
			};
		},
	});
