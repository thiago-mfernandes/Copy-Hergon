import { HTMLChakraProps, Icon, MenuItem } from "@chakra-ui/react";
import { BsPrinterFill } from "react-icons/bs";

export function FunctionReportButton({ ...rest }: HTMLChakraProps<"button">) {
  return (
    <MenuItem
      display="flex"
      alignItems="center"
      color="white" 
      backgroundColor="green.500" 
      _hover={{ backgroundColor: 'green.400' }}
      padding="4"
      margin="0"
      borderRadius="8"      
      {...rest}
    >
    <Icon as={BsPrinterFill} fontSize="16" marginRight="2"/>
      Relatório da Função
    </MenuItem>
  );
}