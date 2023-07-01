import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
}

export function Grid({ children }: GridProps) {
  return (
    <SimpleGrid
      flex="1" //vai crescer até ocupar o espaco restante fora a sidebar
      gap="4"
      minChildWidth="320px"
      alignItems="space-between"
      height="fit-content"
    >
      {children}
    </SimpleGrid>
  )
}