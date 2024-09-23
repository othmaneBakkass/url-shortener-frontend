import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../keys";
import {
	ApiError,
	ApiErrorObjectSchema,
	AppError,
	NetworkError,
	SchemaError,
	ServerError,
} from "../errors";
import { z } from "zod";
import { toast } from "sonner";

const deleteShortLinkSuccessPayloadSchema = z.object({
	name: z.string(),
	short_link: z.string(),
	original_url: z.string(),
});

export type DeleteShortLinkSuccessPayload = z.infer<
	typeof deleteShortLinkSuccessPayloadSchema
>;

const deleteShortLinksResponseSchema = z.discriminatedUnion("ok", [
	z.object({
		ok: z.literal(true),
		data: deleteShortLinkSuccessPayloadSchema,
	}),
	ApiErrorObjectSchema,
]);

async function deleteShortLink(id: string) {
	const basePath = import.meta.env.VITE_SERVER_URL;
	return await fetch(`${basePath}/shortLinks/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(async (response) => {
			const res = await response.json();
			const { success, data } = deleteShortLinksResponseSchema.safeParse(res);

			if (success) {
				if (!data.ok) {
					throw new ServerError(
						"An error occurred on our end, the developers have been notified. Please try again later"
					);
				}
				return data;
			}

			throw new SchemaError(
				"An error occurred on our end but don't worry your short link has been created. The developers have been notified. Please try to refresh the page or try again later"
			);
		})
		.catch(() => {
			throw new NetworkError(
				"An error occurred while trying to delete your short link. The developers have been notified. Please try again later"
			);
		});
}

export const useDeleteShortLink = (id: string) =>
	useMutation({
		mutationFn: () => deleteShortLink(id),
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.getShortLinks(" "),
			});
			const name = data.name;
			toast.success(`${name} has been deleted successfully`);
		},
		onError: (error) => {
			let defaultErrorMsg =
				"an unknown error occurred while trying to delete your short link. The developers have been notified. Please try again later";

			if (error instanceof ApiError) {
				defaultErrorMsg = error.clientMsg;
			}
			toast.error("Problems Deleting your short link", {
				description: defaultErrorMsg,
			});
		},
	});
