import { ModalHeader as ChakraModalHeader, ModalHeaderProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChakraModalHeaderProps extends ModalHeaderProps {
  children: ReactNode;
}

export function ModalHeader({ children, ...rest }: ChakraModalHeaderProps){
  return (
    <ChakraModalHeader 
      color="gray.700" 
      fontWeight="bold" 
      fontSize="2xl" 
      marginBottom="1.5rem"
      {...rest}
    >
      {children}
    </ChakraModalHeader>
  );
}