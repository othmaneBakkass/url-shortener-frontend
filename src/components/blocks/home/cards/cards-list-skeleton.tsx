import { CardSkeleton } from "./skeleton";

export function CardsListSkeleton() {
	return (
		<section className="relative w-full max-w-[calc(100%-40px)] sm:max-w-xl md:max-w-2xl flex flex-col justify-start items-center mx-auto gap-y-4 ">
			{Array.from({ length: 3 }).map((_, i) => (
				<CardSkeleton key={i} />
			))}
			<div className="w-full h-full bg-gradient-to-b from-transparent from-30% to-background/50 absolute top-0"></div>
		</section>
	);
}
