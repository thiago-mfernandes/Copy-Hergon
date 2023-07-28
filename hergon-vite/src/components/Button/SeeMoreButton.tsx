import { Icon, MenuItem } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export function SeeMoreButton(){
  return (
    <MenuItem
      display="flex"
      alignItems="center"
      color="green.700"
      backgroundColor="green.200"
      _hover={{ backgroundColor: 'green.100' }}
      padding="4"
      margin="0"
      borderRadius="8"
    >
      <Icon as={FaPlus} fontSize="16" marginRight="2"/>
      Ver Mais
    </MenuItem>
  );
}