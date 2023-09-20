import { create } from "zustand";

interface DeleteManyStore {
  isOpen: boolean;
  onDeleteManyModalOpen: () => void;
  onDeleteManyModalClose: () => void;
}

export const useDeleteManyStore = create<DeleteManyStore>((set) => ({
  isOpen: false,
  onDeleteManyModalOpen: () => set((state) => ({ ...state, isOpen: true })),
  onDeleteManyModalClose: () => set((state) => ({ ...state, isOpen: false}))
}));