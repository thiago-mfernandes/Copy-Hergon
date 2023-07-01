import { MenuList as ChakraMenuList } from "@chakra-ui/react";
import { ChildrenProps } from "@/components/Table/interfaces";

export function MenuList({ children }: ChildrenProps) {
  return (
    <ChakraMenuList
      borderRadius="8"
      boxShadow="2xl"
      padding="4"
    >{children}</ChakraMenuList>
  );
}