import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateShortLink } from "@/lib/queries/shortLinks/create-short-links";
import { LoadingSpinner } from "@/components/ui/loading";
import { useEffect } from "react";
import { toast } from "sonner";
import { ApiError, AppError } from "@/lib/queries/errors";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "name must be at least 2 characters.",
	}),
	url: z.string().min(2).url(),
});

export function CreateShortLinkForm() {
	const mutation = useCreateShortLink();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			url: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutation.mutate({
			original_url: values.url,
			name: values.name,
		});
	}

	useEffect(() => {
		if (
			(mutation.isError && mutation.error instanceof ApiError) ||
			mutation.error instanceof AppError
		) {
			toast.error("error", {
				description: mutation.error.clientMsg,
			});
		}
	}, [mutation.isError]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex gap-y-4 mx-auto flex-col max-w-[calc(100%-40px)] sm:max-w-96 p-4 rounded-2xl border border-neutral-800">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>name</FormLabel>
							<FormControl>
								<Input placeholder="short link name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>url</FormLabel>
							<FormControl>
								<Input
									type="url"
									placeholder="https://example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={mutation.isPending}
					className="self-end flex justify-center items-center"
					type="submit">
					{mutation.isPending ? <LoadingSpinner /> : "create short link"}
				</Button>
			</form>
		</Form>
	);
}
