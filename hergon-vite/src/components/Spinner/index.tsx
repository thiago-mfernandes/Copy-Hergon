import { Box, Spinner as ChakraSpinner } from "@chakra-ui/react";

export function Spinner(){
  return (
    <Box
      as="tr" 
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraSpinner as="td" color="green.500" size="lg" />
    </Box>
  );
}