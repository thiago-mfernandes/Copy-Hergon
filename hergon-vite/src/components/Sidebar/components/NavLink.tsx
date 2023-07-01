import { ElementType } from "react";
import { Flex, Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { iconSelector } from "../../../utils/iconSelector";

interface NavLinksProps extends ChakraLinkProps {
  linkTitle: string;
  linkPath: string;
  icon: ElementType;
}

export function NavLink({ linkTitle, icon, linkPath, ...rest }: NavLinksProps) {

  return (
    <Flex width="100%">
      <Link
        display="flex"
        alignItems="center"
        color="gray.600"
        padding="12px 0"
        width="100%"
        _hover={{
          textDecoration: 'none',
          backgroundColor: 'blackAlpha.50'

        }}
        href={linkPath}
        {...rest}
      >
        <Icon as={iconSelector(icon)} fontSize="24" />
        <Text marginLeft="2">{linkTitle}</Text>
      </Link>
    </Flex>
  );
}




