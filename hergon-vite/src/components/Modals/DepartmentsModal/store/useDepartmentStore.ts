import { DepartmentsData } from "@/services/http/departments/DepartmentServices";
import { create } from "zustand";

interface DepartmentStore {
  departmentToEdit: DepartmentsData | undefined;
  setDepartmentToEdit: (data: DepartmentsData | undefined) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departmentToEdit: undefined,
  setDepartmentToEdit: (departmentToEdit) => set({ departmentToEdit }),
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false, departmentToEdit: undefined })),
}));