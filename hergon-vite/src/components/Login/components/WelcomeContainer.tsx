import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface WelcomeContainerProps {
  children: ReactNode;
}

export function WelcomeContainer({ children }: WelcomeContainerProps) {
  return (
  <Flex
      width={{ base: "100%", lg: "45%" }}
      height="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginLeft={{base: "0", lg: "auto" }} 
      padding={{ base: "1rem", lg: "2rem" }}
    >
      {children}
    </Flex>
  );
}