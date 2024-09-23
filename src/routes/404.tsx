import { DefaultErrorShell } from "@/components/blocks/error";

export function Error404() {
	return (
		<DefaultErrorShell
			title={"The link you’re looking for doesn’t exist."}
			message={
				"It seems like the shortened URL is broken or doesn’t lead anywhere. Please double-check the URL"
			}
		/>
	);
}
