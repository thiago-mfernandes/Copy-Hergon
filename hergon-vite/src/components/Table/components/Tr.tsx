import { ReactNode } from "react";
import { Tr as TrChakra, HTMLChakraProps } from "@chakra-ui/react";

interface TrProps extends HTMLChakraProps<"tr"> {
  children: ReactNode;
}

export function Tr({ children, ...rest }: TrProps) {
  return (
    <TrChakra
    display={{ base: "block", lg: "flex"}}
    alignItems={{lg: "center"}}
    max-width="100%"
    
    {...rest}
    >
      {children}
    </TrChakra>
  )
}