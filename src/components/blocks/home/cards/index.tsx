import { Card } from "./card";

export function Cards() {
	return (
		<main className="w-full mt-12  max-w-[calc(100%-40px)] sm:max-w-xl md:max-w-2xl flex flex-col justify-start items-center mx-auto gap-y-4">
			<h1 className="capitalize text-2xl self-start">ShortLinks:</h1>
			<Card />
		</main>
	);
}
