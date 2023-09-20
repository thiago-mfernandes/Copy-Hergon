import { emptyTableMessageSelector } from "@/utils/emptyTableMessageSelector";
import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export function EmptyTable(){

  const { pathname } = useLocation();
  
  return (
    <Box>
      <Flex
        justifyContent="center"
        textAlign={{ base: "center", lg: "center" }}
        borderBottomWidth={{ base: "1px!important", lg: "0 !important" }}
        borderBottomStyle={{ base: "solid", lg: "none" }}
        borderBottomColor={{ base: "gray.200!important", lg: "transparent" }}
        width="100%"
        color="gray.700"
        fontSize="1rem"
      >
        {`Você não possui ${emptyTableMessageSelector(pathname)}. Clique no botão adicionar para fazer o cadastro.`}
      </Flex>
    </Box>
  );
}