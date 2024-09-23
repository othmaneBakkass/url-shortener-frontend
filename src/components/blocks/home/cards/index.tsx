import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { CardsListErrorFallback } from "./cards-list-error-fb";
import { Suspense } from "react";
import { CardsList } from "./cards-list";
import { CardsListSkeleton } from "./cards-list-skeleton";

export function Cards() {
	return (
		<section className="w-full mx-auto flex flex-col min-h-64 gap-6 mb-12">
			<QueryErrorResetBoundary>
				{({ reset }) => (
					<ErrorBoundary
						fallbackRender={({ error, resetErrorBoundary }) => {
							return (
								<>
									<CardsListErrorFallback
										error={error}
										onClick={resetErrorBoundary}
									/>
								</>
							);
						}}
						onReset={reset}>
						<Suspense fallback={<CardsListSkeleton />}>
							<CardsList />
						</Suspense>
					</ErrorBoundary>
				)}
			</QueryErrorResetBoundary>
		</section>
	);
}
