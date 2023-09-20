import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TdActionsProps {
  children: ReactNode;
}

export function Actions({ children }: TdActionsProps){

  return (
    <Flex 
      flex={1}
      maxWidth="fit-content"
      paddingTop="2"
      paddingBottom="2"
    >
      {children}
    </Flex> 
  );
}