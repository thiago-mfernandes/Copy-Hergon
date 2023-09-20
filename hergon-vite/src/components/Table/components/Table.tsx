import { Flex } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function Table({ children }: ChildrenProps) {
  return (
    <Flex
      flexDir={{ lg: "column" }}
      width="100%"
      maxWidth="100%"
    >
      {children}
    </Flex>
  );
}