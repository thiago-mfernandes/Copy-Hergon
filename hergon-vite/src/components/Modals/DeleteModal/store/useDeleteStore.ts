import { create } from "zustand";

interface DeleteStore {
  isOpen: boolean;
  onDeleteModalOpen: () => void;
  onDeleteModalClose: () => void;
}

export const useDeleteStore = create<DeleteStore>((set) => ({
  isOpen: false,
  onDeleteModalOpen: () => set((state) => ({ ...state, isOpen: true })),
  onDeleteModalClose: () => set((state) => ({ ...state, isOpen: false}))
}));