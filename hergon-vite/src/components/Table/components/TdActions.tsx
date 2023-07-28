import { Td } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TdActionsProps {
  children: ReactNode;
}

export function TdActions({ children }: TdActionsProps){

  return (
    <Td 
      data-label="Ações"
      display={{ base: "block", lg: "flex"}}
      paddingLeft={{ base: "50%", lg: "0.3625rem" }}
      paddingRight={{ base: "5", lg: "5"}}
      paddingTop={{ base: "0.25rem", lg: "0.3625rem" }}
      paddingBottom={{ base: "0.25rem", lg: "0.3625rem" }}
      position={{ base: "relative", lg: "unset" }}
      textAlign={{ base: "right", lg: "end" }}
      borderBottom={{lg: "transparent"}}
      width={{ base: "100%", lg:"fit-content" }}
    >
      {children}
    </Td> 
  );
}