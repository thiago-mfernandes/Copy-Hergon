import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, VStack, Td } from "@chakra-ui/react";
import { FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export function TdActions(){
  return (
    <Td 
      data-label="Ações"
      display={{ base: "block", lg: "flex"}}
      paddingLeft={{ base: "50%", lg: "0.3625rem" }}
      paddingRight={{ base: "5", lg: "5"}}
      paddingTop={{ base: "0.25rem", lg: "0.3625rem" }}
      paddingBottom={{ base: "0.25rem", lg: "0.3625rem" }}
      position={{ base: "relative", lg: "unset" }}
      textAlign={{ base: "right", lg: "end" }}
      borderBottom={{lg: "transparent"}}
      width={{ base: "100%", lg:"fit-content" }}
    >
    <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<FaChevronDown />}
        backgroundColor="transparent"
        color="gray.700"
        padding={{ base: "0 1rem", lg: "0 1rem"}}
      >
        Ações
      </MenuButton>
      <MenuList
        borderRadius="8"
        boxShadow="2xl"
        padding="2"
      >
        <VStack spacing="2">
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
          <MenuItem
            display="flex"
            alignItems="center"
            color="blue.700"
            backgroundColor="blue.200"
            _hover={{ backgroundColor: 'blue.100' }}
            padding="4"
            margin="0"
            borderRadius="8"
          >
          <Icon as={MdEdit} fontSize="16" marginRight="2"/>
            Editar
          </MenuItem>
          <MenuItem
            display="flex"
            alignItems="center"
            color="red.700"
            backgroundColor="red.200"
            _hover={{ backgroundColor: 'red.100' }}
            padding="4"
            margin="0"
            borderRadius="8"
          >
            <Icon as={FaTrash} fontSize="16" marginRight="2"/>
            Excluir
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu> 
    </Td> 
  );
}