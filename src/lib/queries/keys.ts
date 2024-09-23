export const queryKeys = {
	getShortLinks: (searchKey: string) => {
		const searchKeyValue =
			searchKey.length > 0 && searchKey !== " " ? searchKey : " ";
		return ["getShortLinks", searchKeyValue] as const;
	},
	getShortLinkByMiniUrl: () => ["getShortLinkByMiniUrl"] as const,
};

export type QueryKeys = typeof queryKeys;
