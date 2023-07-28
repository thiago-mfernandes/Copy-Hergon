import { CompaniesData } from "@/services/http/companies/CompanieServices";
import { create } from "zustand";

interface CompanieStore {
  companieToEdit: CompaniesData | undefined;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setCompanieToEdit: (data: CompaniesData | undefined) => void;
}

export const useCompanieStore = create<CompanieStore>((set) => ({
  companieToEdit: undefined,
  isOpen: false,
  setCompanieToEdit: (companieToEdit) => set({ companieToEdit }),
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false, companieToEdit: undefined })),
}));

