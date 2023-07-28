import { Button as ChakraButton, HTMLChakraProps, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps extends HTMLChakraProps<"button"> {
  children: ReactNode;
  textColor: string;
  backgroundColor: string;
  icon?: IconType;
}

export function Button({ backgroundColor, textColor, children, icon, ...rest }: ButtonProps){
  return (
    <ChakraButton
      {...rest}
      color={textColor}
      backgroundColor={backgroundColor}
      boxShadow="xl"
      marginLeft="2"
      _hover={{ opacity: "0.8" }}
    >
      <Icon as={icon} fontSize="16" marginRight="2" />
      {children}
    </ChakraButton>
  );
}