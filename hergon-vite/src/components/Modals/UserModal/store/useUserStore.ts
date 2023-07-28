import { UserData } from "@/contexts/Auth/interfaces";
import { create } from "zustand";

interface UserStore {
  userToEdit: UserData | undefined;
  setUserToEdit: (data: UserData | undefined) => void;
  isOpen: boolean;
  onOpen: () => void
  onClose: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  userToEdit: undefined,
  setUserToEdit: (userToEdit) => set({ userToEdit }),
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false, userToEdit: undefined })),
}));