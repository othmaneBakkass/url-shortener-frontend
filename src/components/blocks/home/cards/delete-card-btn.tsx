import { Button } from "@/components/ui/button";
import { useDeleteShortLink } from "@/lib/queries/shortLinks/delete-short-link-by-id";
import { Trash2Icon } from "lucide-react";

export function DeleteCardBTN({ id }: { id: string }) {
	const mutation = useDeleteShortLink(id);

	function handleDelete() {
		mutation.mutate();
	}

	return (
		<Button variant="destructive" className="gap-1" onClick={handleDelete}>
			<Trash2Icon className="size-4 hover:text-destructive-foreground" />
			Delete
		</Button>
	);
}
