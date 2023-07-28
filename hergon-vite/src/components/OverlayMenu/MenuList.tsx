import { MenuList as ChakraMenuList, HTMLChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MenuList extends HTMLChakraProps<"div"> {
  children: ReactNode;
}

export function MenuList({ children, ...rest }: MenuList) {
  return (
    <ChakraMenuList
      borderRadius="8"
      boxShadow="2xl"
      {...rest}
    >
      {children}
    </ChakraMenuList>
  );
}