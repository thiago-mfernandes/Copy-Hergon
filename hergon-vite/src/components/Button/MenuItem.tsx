import { ButtonOptions, MenuItem as ChakraMenuItem, HTMLChakraProps, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

type MenuItemProps = HTMLChakraProps<"button"> & ButtonOptions & {
  children: ReactNode;
  textColor: string;
  backgroundColor: string;
  icon: IconType;
}

export function MenuItem({ backgroundColor, children, icon, textColor, ...rest } : MenuItemProps ){
  return (
    <ChakraMenuItem
      {...rest}
      display="flex"
      alignItems="center"
      color={textColor}
      backgroundColor={backgroundColor}
      _hover={{ opacity: '0.8' }}
      padding="4"
      margin="0"
      borderRadius="8"
    >
      <Icon as={icon} fontSize="16" marginRight="2" />
      {children}
    </ChakraMenuItem>
  );
}