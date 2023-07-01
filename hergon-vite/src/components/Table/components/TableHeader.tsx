import { Flex, Text } from "@chakra-ui/react";
import { TableActions } from "./TableActions";
import { ReactNode } from "react";

interface TableHeaderProps {
  title: string;
  children: ReactNode;
}

export function TableHeader({ title, children }: TableHeaderProps) {

  return (
    <Flex
      as="header"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="green.100"
      padding="6"
      borderRadius="8px 8px 0 0"
    >
      <Text color="gray.700" fontWeight="600">{title}</Text>
      <TableActions>
        {children}
      </TableActions>
    </Flex>
  )
}

