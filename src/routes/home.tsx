import { Cards } from "@/components/blocks/home/cards";
import { CreateShortLinkForm } from "@/components/blocks/home/form";

export function Home() {
	return (
		<>
			<section className="mt-28">
				<CreateShortLinkForm />
			</section>
			<Cards />
		</>
	);
}
