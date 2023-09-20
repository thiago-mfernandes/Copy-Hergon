import { Flex, HTMLChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableDataProps extends HTMLChakraProps<"div"> {
  children: ReactNode;
  isId?: boolean;
}

export function TableData({ isId = false, children, ...rest }: TableDataProps) {
  return (
    <Flex 
      flex={{ lg: 1}}
      display={{ base: "block", lg: "flex" }} 
      textAlign={{ base: "right", lg: "start" }}
      borderBottomStyle={{ base: "solid", lg: "none" }}    
      borderBottomWidth={{ base: "1px", lg: "none" }}    
      borderBottomColor={{ base: "gray.100", lg: "none" }}    
      width="100%"
      maxWidth={{
        base: "100%",
        lg: isId ? "6ch" : "100%"
      }}
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      padding="4"  
      paddingLeft={{ base: "40%", lg: "4" }}
      

      position={{ base: "relative", lg: "unset" }}
      _before={{
        base: {
          content: `attr(data-label)`,
          position: "absolute",
          left: "0",
          width: "50%",
          paddingLeft: "4",
          fontWeight: "700",
          textAlign: "left",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        lg: {
          //contentVisibility: "hidden", => propriedade incompativel no Firefox
          display: "none", //utlizar esta
          position: "none",
          paddingleft: "4",
        }
      }}

      {...rest}
    >
      {children}
    </Flex>
  );
}