import { ReactNode } from "react";
import { Flex, HTMLChakraProps } from "@chakra-ui/react";

interface TableRowProps extends HTMLChakraProps<"div"> {
  children: ReactNode;
  indexPosition?: number;
  disableRowStyles?: boolean;
}

export function Tr({ indexPosition, disableRowStyles, children, ...rest }: TableRowProps) {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems={{ base:"flex-end", lg:"center"}}
      width="100%"  
      paddingLeft="4"  
      paddingRight="4"  
      borderWidth={disableRowStyles ? "0" : "1px"}
      borderColor="gray.50"
      borderRadius="8px"
      marginBottom="2"
      backgroundColor={indexPosition !== undefined && indexPosition % 2 == 0 ? "gray.50" : "transparent"}
      _hover={{ 
        boxShadow: disableRowStyles ? "none" : "md",
      }}
      {...rest}
    >
      {children}
    </Flex>
  )
}