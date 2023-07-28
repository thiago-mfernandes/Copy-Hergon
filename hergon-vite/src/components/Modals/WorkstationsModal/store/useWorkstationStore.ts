import { WorkstationData } from "@/services/http/workstations/WorkstationServices";
import { create } from "zustand";

type OptionType = {
  label?: string;
  value?: string;
} | null;

interface WorkstationStore {
  //dado para edicao
  workstationToEdit: WorkstationData | undefined;
  //estado para obter a empresa selecionada e utilizar para formar o departmentOptions da company selecionada
  companyValue: OptionType | null;
  departmentValue: OptionType | null;
  departmentOptions: OptionType[] | undefined;
  areaOptions: OptionType[] | undefined;
  isOpen: boolean;
  onOpen: () => void
  onClose: () => void
  setWorkstationToEdit: (data: WorkstationData | undefined) => void;
  setCompanyValue: (data: OptionType[]) => void;
  setDepartmentValue: (data: OptionType[]) => void;
  setDepartmentOptions: (data: OptionType[]) => void;
  setAreaOptions: (data: OptionType[]) => void;
}

export const useWorkstationStore = create<WorkstationStore>((set) => ({
  workstationToEdit: undefined,
  companyValue: null,
  departmentValue: null,
  departmentOptions: undefined,
  areaOptions: undefined,
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false, workstationToEdit: undefined })),
  setWorkstationToEdit: (workstationToEdit) => set({ workstationToEdit }),
  setCompanyValue: (data) => set(() => ({
    companyValue: data.length > 0 ? { label: data[0]?.label, value: data[0]?.value } : null
  })),
  setDepartmentValue: (data) => set(() => ({
    companyValue: data.length > 0 ? { label: data[0]?.label, value: data[0]?.value } : null
  })),
  setDepartmentOptions: (departmentOptions) => set({ departmentOptions }),
  setAreaOptions: (areaOptions) => set({ areaOptions }),
}));
