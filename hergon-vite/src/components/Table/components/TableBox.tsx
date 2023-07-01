import { Box } from "@chakra-ui/react";
import { ChildrenProps } from "../interfaces";

export function TableBox({ children }: ChildrenProps) {
  return <Box padding="6">{children}</Box>
}