import { ChildrenProps } from "../interfaces"; 
import { Tbody as ChakraTbody } from "@chakra-ui/react";

export function Tbody({ children }: ChildrenProps){
  return (
    <ChakraTbody
      display={{ base: "block", lg: "table-row-group"}}
      width="100%"
    >{children}</ChakraTbody>
  );
}