import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner.tsx";

export function Root({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
			<Toaster richColors />
		</>
	);
}
