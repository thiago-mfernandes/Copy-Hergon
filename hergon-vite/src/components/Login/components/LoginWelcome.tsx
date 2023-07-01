import { Text, Box, Image, Heading, VStack } from "@chakra-ui/react";
import Organization from "@/assets/organizacao_hergon_app.png";

export function LoginWelcome() {
  return (
    <Box
      backgroundImage="url(bg-login.svg)"
      backgroundSize="cover"
      width="55%"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      padding="8rem"
      display={{ base: "none", lg:"flex" }}
      flexDirection="column"
      justifyContent="space-around"
    >
      <VStack spacing="8" alignItems="flex-start">
        <Image width="90%" src={Organization} />
        <Heading color="white" fontSize="2rem">
          Você está a poucos cliques de revolucionar o seu gerenciamento de riscos ocupacionais!
        </Heading>
        <Text color="white" fontSize="1rem">
          Preencha seus dados ao lado e conheça nossa solução.
        </Text>
      </VStack>
    </Box>
  );
}