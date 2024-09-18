import {
	Card as DefaultCard,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LinkIcon } from "@/components/ui/icons/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCopyToClipboard, useDebounceCallback } from "usehooks-ts";

export function ClipBoardButton({
	className,
	textToCopy,
}: {
	className?: string;
	textToCopy: string;
}) {
	const tooltipText = {
		default: "copy to clipboard",
		onCopy: "copied!",
	};
	const [, copy] = useCopyToClipboard();
	const [text, setText] = useState(tooltipText.default);
	const resetText = useDebounceCallback(setText, 1000);

	function handleCopy() {
		copy(textToCopy).then(() => {
			setText(tooltipText.onCopy);
			resetText(tooltipText.default);
		});
	}
	return (
		<button
			className="relative group p-1 rounded-sm hover:bg-popover duration-200 ease-in transition-colors border"
			onClick={handleCopy}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				className={cn(
					"text-foreground size-4 hover:text-card-foreground",
					className
				)}>
				<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
				<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
			</svg>
			<div className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in top-[calc(100%+8px)] p-1 bg-popover w-max border left-1/2 -translate-x-1/2">
				<p className="text-xs">{text}</p>
			</div>
		</button>
	);
}

export function Card() {
	return (
		<DefaultCard className="w-full max-w-2xl">
			<CardHeader className="flex-row justify-between items-center">
				<CardTitle className="text-foreground">Google</CardTitle>
				<ClipBoardButton textToCopy="http" />
			</CardHeader>
			<CardContent>
				<div className="mb-2">
					<h4 className="text-sm font-medium mb-1 text-card-foreground">
						short link:
					</h4>
					<div>
						<LinkIcon className="inline-block mr-1 text-primary hover:text-primary" />
						<a
							target="_blank"
							href="http://localhost:5173/"
							className="text-primary underline-offset-4 underline hover:text-green-400">
							http://localhost:5173/
						</a>
					</div>
				</div>
				<div>
					<h4 className="text-sm font-medium mb-1 text-card-foreground">
						original url:
					</h4>
					<div>
						<LinkIcon className="inline-block mr-1 text-primary hover:text-primary" />
						<a
							target="_blank"
							href="http://localhost:5173/"
							className="text-primary underline-offset-4 underline hover:text-green-400">
							http://localhost:5173/
						</a>
					</div>
				</div>
			</CardContent>
		</DefaultCard>
	);
}
