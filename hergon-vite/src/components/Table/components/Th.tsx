import { Th as ThChakra } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function Th({ children }: ChildrenProps){
  return (
    <ThChakra width="100%">{children}</ThChakra>
  );
}