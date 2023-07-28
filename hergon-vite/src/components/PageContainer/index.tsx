import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps){
  return(
    <Flex 
      direction="row" 
      height="100vh" 
      padding="1rem 1rem 0"
    >
      {children}
    </Flex>
  )
}