import { Flex } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function Th({ children }: ChildrenProps){
  return (
    <Flex 
      flex={1} 
      fontWeight="bold"
      padding="4"
    >
      {children}
    </Flex>
  );
}