import { Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import logo from "@/assets/logo.svg";
import { useSidebarDrawer } from "@/contexts/SidebarDrawerContext";

export function HamburguerMenu() {

  const { onOpen } = useSidebarDrawer();
  
  return (
    <Flex 
      width="100%" 
      alignItems="center" 
      justifyContent="space-between"
      paddingBottom="2"
      marginBottom="2"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.100"
      padding="0.5rem 1rem"
    >
      <IconButton
        aria-label="Open Navigation Menu" //acessibilidade
        icon={<Icon as={MdMenu} />}
        display="flex"
        fontSize="24"
        variant="unstyled"
        onClick={onOpen}
      />
      <Image src={logo} alt={""} />
    </Flex>
  );
}