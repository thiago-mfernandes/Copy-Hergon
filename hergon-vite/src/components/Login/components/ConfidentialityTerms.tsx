import { Link as ReactRouterLink } from "react-router-dom";
import { Text, Box, Link } from "@chakra-ui/react";

export function ConfidentialityTerms() {
  return (
    <Box>
      <Text>
        Ao fazer login na plataforma, você aceita os
        <Link 
          as={ReactRouterLink}
          to="https://hergon.com.br/politica-de-privacidade/"
          target="_blank"
          color="green.500"
        > termos de confidencialidade </Link>
        da Hergon.
      </Text>
    </Box>
  );
}