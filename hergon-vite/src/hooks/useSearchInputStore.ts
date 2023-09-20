import { create } from "zustand";

interface InputSearch {
  search: string ;
  setSearch: (data: string) => void;
}

export const useSearchInputStore = create<InputSearch>((set) => ({
  search: "",
  setSearch: (data) => set({ search: data }),
}));