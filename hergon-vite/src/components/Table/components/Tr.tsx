import { ChildrenProps } from "../interfaces";
import { Tr as TrChakra } from "@chakra-ui/react";

export function Tr({ children }: ChildrenProps) {
  return (
    <TrChakra
      display={{ base: "block", lg: "flex"}}
      alignItems={{lg: "center"}}
      width="100%"
    >{children}</TrChakra>
  )
}