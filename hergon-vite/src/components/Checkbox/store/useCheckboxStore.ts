import { create } from "zustand";

interface CheckboxStore {
  selectedCheckbox: string[] | [];
  selectAllCheckbox: boolean;
  setSelectedCheckbox: (data: string[]) => void;
  setSelectAllCheckbox: (selectAllCheckbox: boolean) => void;
}

export const useCheckboxStore = create<CheckboxStore>((set) => ({
  selectedCheckbox: [],
  selectAllCheckbox: false,
  setSelectedCheckbox: (data) => set({ selectedCheckbox: data }),
  setSelectAllCheckbox: (selectAllCheckbox) => set({ selectAllCheckbox }),
}));

