import { AreaData } from "@/services/http/areas/AreaServices";
import { create } from "zustand";

export type OptionType = {
  label?: string;
  value?: string;
} | null;

interface AreaStore {
  //dado para edicao
  areaToEdit: AreaData | undefined;
  //estado para obter a empresa selecionada e utilizar para formar o departmentOptions da company selecionada
  companyValue: OptionType | null;
  departmentOptions: OptionType[] | undefined;
  isOpen: boolean;
  onOpen: () => void
  onClose: () => void
  setAreaToEdit: (data: AreaData | undefined) => void;
  setCompanyValue: (data: OptionType[]) => void;
  setDepartmentOptions: (data: OptionType[]) => void;
}

export const useAreaStore = create<AreaStore>((set) => ({
  areaToEdit: undefined,
  companyValue: null,
  departmentOptions: undefined,
  isOpen: false,  
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false, areaToEdit: undefined })),
  setAreaToEdit: (areaToEdit) => set({ areaToEdit }),
  setCompanyValue: (data) => set(() => ({
    companyValue: data.length > 0 ? { label: data[0]?.label, value: data[0]?.value } : null
  })),
  setDepartmentOptions: (departmentOptions) => set({ departmentOptions }),
}));