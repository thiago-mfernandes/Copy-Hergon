import { Flex, HTMLChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableContainerProps extends HTMLChakraProps<"div"> {
  children: ReactNode;
}

export function TableContainer({ children } : TableContainerProps){
  return (
    <Flex
      //o pai possui display grid, esse grid é para o flex ocupar '100%'
      gridColumn="1/3" 
      flexDirection="column"
      backgroundColor="white"
      borderRadius="8px"
      marginBottom="6"
    >
      {children}
    </Flex>
  );
}