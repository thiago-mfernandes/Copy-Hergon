import { Flex } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function Thead({ children }: ChildrenProps) {
  return (
    <Flex
      display={{ base: "none", lg: "flex"}}
      width="100%"
      paddingBottom="3"
    >
      {children}
    </Flex>
  );
}