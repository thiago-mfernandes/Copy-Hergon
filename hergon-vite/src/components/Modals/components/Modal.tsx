import { Modal as ChakraModal, ModalProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChakraModalProps extends ModalProps {
  children: ReactNode;
}

export function Modal({ children, ...rest}: ChakraModalProps) {
  return (
    <ChakraModal 
      isCentered
      motionPreset="scale"
      {...rest}
    >
      {children}
    </ChakraModal>
  );
}