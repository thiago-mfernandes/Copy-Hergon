import { MenuButton as ChakraMenuButton, Button } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

export function MenuButton(){
  return(
    <ChakraMenuButton
      as={Button}
      rightIcon={<FaChevronDown />}
      backgroundColor="transparent"
      color="gray.700"
      _hover={{ backgroundColor: 'blackAlpha.100' }}
    >
      Ações
    </ChakraMenuButton>
  );
}