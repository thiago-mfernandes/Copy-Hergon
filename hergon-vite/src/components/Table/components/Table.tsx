import { Table as ChakraTable } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function Table({ children }: ChildrenProps) {
  return (
    <ChakraTable
      display={{ base: "block", lg: "table" }}
      variant="striped"
      size="md"
      colorScheme="gray"
      width="100%"
    >{children}</ChakraTable>
  );
}