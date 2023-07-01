import { MenuItem as ChakraMenuItem, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  children: ReactNode;
  textColor: string;
  backgroundColor: string;
  icon: IconType;
  onClick: () => void;
}

export function MenuItem({ backgroundColor, children, icon, textColor, onClick } : MenuItemProps ){
  return (
    <ChakraMenuItem
      display="flex"
      alignItems="center"
      color={textColor}
      backgroundColor={backgroundColor}
      _hover={{ opacity: '0.8' }}
      padding="4"
      margin="0"
      borderRadius="8"
      onClick={onClick}
    >
      <Icon as={icon} fontSize="16" marginRight="2" />
      {children}
    </ChakraMenuItem>
  );
}