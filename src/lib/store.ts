import { create } from "zustand";

interface SearchBarStore {
	searchKey: string;
	setSearchKey: (v: string) => void;
}

export const useSearchBarStore = create<SearchBarStore>((set) => ({
	searchKey: " ",
	setSearchKey: (v: string) => set({ searchKey: v }),
}));
