import { HTMLChakraProps, Icon, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";


export function DeleteButton({ ...rest }: HTMLChakraProps<"button">){
  return(
    <Button
      {...rest}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      color="red.700"
      backgroundColor="red.200"
      _hover={{ backgroundColor: 'red.100' }}
      margin="0"
      borderRadius="8"

      py="6"
      px="4"
      
    >
      <Icon as={FaTrash} fontSize="16" marginRight="2"/>
        Excluir
    </Button>
  );
}