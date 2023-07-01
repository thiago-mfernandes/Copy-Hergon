import { useDisclosure } from "@chakra-ui/react";
import { ReactNode, createContext, useContext } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

interface SidebarDrawerContextData {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

export const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children } : SidebarDrawerProviderProps) {

  const disclosure = useDisclosure(); //retornar funcoes de abertura e fechamento

  return (
    <SidebarDrawerContext.Provider value={ disclosure }>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);
  return context;
}