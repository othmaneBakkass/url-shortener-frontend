import { Cards } from "@/components/blocks/home/cards";
import { CreateShortLinkForm } from "@/components/blocks/home/form";
import { SearchBar } from "@/components/blocks/home/searchbar";
import { Navbar } from "@/components/ui/navbar";

export function Home() {
	return (
		<>
			<Navbar />
			<section className="mt-28">
				<CreateShortLinkForm />
			</section>

			<main className="max-w-[calc(100%-40px)] sm:max-w-xl md:max-w-2xl w-full p-1  mt-12 mx-auto">
				<section className="flex flex-col gap-2 justify-between items-center mb-4">
					<h1 className="capitalize text-2xl self-start">ShortLinks:</h1>
					<SearchBar />
				</section>
				<Cards />
			</main>
		</>
	);
}
