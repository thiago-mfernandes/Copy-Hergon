import { Box, Spinner as ChakraSpinner } from "@chakra-ui/react";

export function Spinner(){
  return (
    <Box
      as="div" 
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraSpinner as="div" color="green.500" size="lg" />
    </Box>
  );
}