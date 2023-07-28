import { MenuButton, Button } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

export function TableActionButton(){
  return (
    <MenuButton 
      as={Button} 
      rightIcon={<FaChevronDown />}
      backgroundColor="transparent"
      color="gray.700"
      padding={{ base: "0 1rem", lg: "0 1rem"}}
    >
      Ações
    </MenuButton>
  );
}