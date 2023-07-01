import { Th } from "@chakra-ui/react";

export function ThActions(){
  return (
    <Th 
      textAlign={{ base: "start", lg: "end"}}
      paddingRight={{ base: "0", lg: "4rem"}}
    >
      Ações
    </Th>
  );
}