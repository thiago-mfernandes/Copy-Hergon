import { ModalContent as ChakraModalContent, ModalContentProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChakraModalContentProps extends ModalContentProps {
  children: ReactNode;
}

export function ModalContent({ children, ...rest }: ChakraModalContentProps){
  return (
    <ChakraModalContent 
      margin="1rem"
      {...rest}
    >
      {children}
    </ChakraModalContent>
  );
}