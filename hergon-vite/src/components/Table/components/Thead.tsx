import { Thead as ChakraThead } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function Thead({ children }: ChildrenProps) {
  return (
    <ChakraThead
      display={{ base: "none", lg: "table-header-group"}}
      width="100%"
    >{children}</ChakraThead>
  );
}