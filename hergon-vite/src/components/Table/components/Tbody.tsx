import { ChildrenProps } from "../interfaces"; 
import { Flex } from "@chakra-ui/react";

export function Tbody({ children }: ChildrenProps){
  return (
    <Flex
      width="100%"
      flexDirection="column"
    >
      {children}
    </Flex>
  );
}