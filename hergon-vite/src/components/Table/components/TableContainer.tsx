import { TableContainer as ChakraTableContainer } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function TableContainer({ children } : ChildrenProps){
  return (
    <ChakraTableContainer
      gridColumn="1/3"
      backgroundColor="white"
      borderRadius="8px"
      marginBottom="6"
    >
        {children}
    </ChakraTableContainer>
  );
}