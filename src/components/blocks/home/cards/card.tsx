import {
	Card as DefaultCard,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { LinkIcon } from "@/components/ui/icons/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCopyToClipboard, useDebounceCallback } from "usehooks-ts";
import { DeleteCardBTN } from "./delete-card-btn";

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
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
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

export function Card({
	shortLink,
	name,
	originalUrl,
	id,
}: {
	shortLink: string;
	name: string;
	originalUrl: string;
	id: string;
}) {
	const shortLinkURL = import.meta.env.VITE_WEBSITE_URL + "/" + shortLink;
	return (
		<DefaultCard className="w-full max-w-2xl">
			<CardHeader className="flex-row justify-between items-center">
				<CardTitle className="text-foreground">{name}</CardTitle>
				<ClipBoardButton textToCopy={shortLinkURL} />
			</CardHeader>
			<CardContent>
				<div className="mb-2">
					<h4 className="text-sm font-medium mb-1 text-card-foreground">
						short link:
					</h4>
					<div className="flex items-center justify-start gap-x-1">
						<LinkIcon className="shrink-0 mt-1 size-4 text-primary hover:text-primary" />
						<a
							target="_blank"
							href={shortLinkURL}
							className="text-primary truncate underline-offset-4 underline hover:text-green-400">
							{shortLinkURL}
						</a>
					</div>
				</div>
				<div>
					<h4 className="text-sm font-medium mb-1 text-card-foreground">
						original url:
					</h4>
					<div className="flex items-center justify-start gap-x-1">
						<LinkIcon className="shrink-0 mt-1 size-4 text-primary hover:text-primary" />
						<a
							target="_blank"
							href={originalUrl}
							className="text-primary truncate underline-offset-4 underline hover:text-green-400">
							{originalUrl}
						</a>
					</div>
				</div>
			</CardContent>
			<CardFooter className="justify-end">
				<DeleteCardBTN id={id} />
			</CardFooter>
		</DefaultCard>
	);
}
