import { DefaultErrorShell } from "@/components/blocks/error";
import { ApiError } from "@/lib/queries/errors";
import { useRouteError } from "react-router-dom";

export function Error() {
	const error = useRouteError();

	return (
		<DefaultErrorShell
			title={error instanceof ApiError ? error.title : "Something Went Wrong"}
			message={
				error instanceof ApiError
					? error.clientMsg
					: "an error occurred on our end but don't worry the developers have been notified. Please try again later or return to the home page"
			}
		/>
	);
}
