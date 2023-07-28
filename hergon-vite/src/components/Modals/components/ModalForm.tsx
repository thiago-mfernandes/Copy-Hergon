import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalFormProps extends BoxProps {
  children: ReactNode;
}

export function ModalForm({ children, ...rest }: ModalFormProps){
  return (
    <Box 
      as="form"
      {...rest}
    >
      {children}
    </Box>
  );
}