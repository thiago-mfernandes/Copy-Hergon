import { Button as ChakraButton, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  children: ReactNode;
  textColor: string;
  backgroundColor: string;
  icon?: IconType;
  onClick: () => void;
}

export function Button({ backgroundColor, textColor, children, icon, onClick }: ButtonProps){
  return (
    <ChakraButton
      color={textColor}
      backgroundColor={backgroundColor}
      boxShadow="xl"
      marginLeft="2"
      _hover={{ opacity: "0.8" }}
      onClick={onClick}
    >
      <Icon as={icon} fontSize="16" marginRight="2" />
      {children}
    </ChakraButton>
  );
}