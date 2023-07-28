import { HTMLChakraProps, Icon, MenuItem } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

export function EditButton({ ...rest }: HTMLChakraProps<"button">){
  
  return (
    <MenuItem
      display="flex"
      alignItems="center"
      color="blue.700"
      backgroundColor="blue.200"
      _hover={{ backgroundColor: 'blue.100' }}
      padding="4"
      margin="0"
      borderRadius="8"
      
      {...rest}
    >
    <Icon as={MdEdit} fontSize="16" marginRight="2"/>
      Editar
    </MenuItem>
  );
}