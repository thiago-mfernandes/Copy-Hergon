import { HTMLChakraProps, Icon, Button, ButtonOptions } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

type DeleteButtonProps = HTMLChakraProps<"button"> & ButtonOptions & {
  title?: string;
}

export function DeleteButton({ title, ...rest }: DeleteButtonProps){
  return(
    <Button
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
    
      {...rest}
    >
      <Icon as={FaTrash} fontSize="16" marginRight="2"/>
        {title ? title : "Excluir"}
    </Button>
  );
}